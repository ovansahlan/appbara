import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// ----------------------------------------------------
// MATIKAN CACHE NEXT.JS (Agar tidak tersangkut error lama)
// ----------------------------------------------------
export const dynamic = 'force-dynamic';

async function getGoogleSheets() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.SPREADSHEET_ID;

  if (!email || !privateKey || !spreadsheetId) {
    throw new Error("🚨 GAGAL: File .env kosong atau belum terbaca oleh Next.js!");
  }

  // 1. Bersihkan tanda kutip di awal dan akhir string (jika tidak sengaja terbaca)
  let cleanKey = privateKey.replace(/^"|"$/g, '');
  
  // 2. Ubah teks "\n" menjadi karakter enter (newline) sungguhan
  const formattedKey = cleanKey.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: formattedKey },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId };
}
// ----------------------------------------------------
// [GET] AMBIL DATA (PELINDUNG MAXIMAL)
// ----------------------------------------------------
export async function GET(request) {
  try {
    const { sheets, spreadsheetId } = await getGoogleSheets();

    const ranges = [
      'Master Product!A:E', 'CurrentStock!A:J', 'Stock-In!A:G', 
      'Stock-Out!A:I', 'Opname!A:E', 'DB_Penjualan!A:H', 
      'DB_Penjualan_Gerobak!A:H', 'DB_Pengeluaran!A:E', 'DB_Kasbon!A:D'
    ];
    
    const response = await sheets.spreadsheets.values.batchGet({ spreadsheetId, ranges });
    const valueRanges = response.data.valueRanges || [];

    const getSheetData = (index) => {
      if (!valueRanges || !valueRanges[index] || !valueRanges[index].values) return [];
      return valueRanges[index].values;
    };

    const dataProduk = getSheetData(0);
    const dataCurrent = getSheetData(1);
    const dIn = getSheetData(2);
    const dOut = getSheetData(3);
    const dOp = getSheetData(4);
    const dataPenjualan = getSheetData(5);
    const dataPenjualanG = getSheetData(6);
    const dataPengeluaran = getSheetData(7);
    const dataKasbon = getSheetData(8);

    const products = [];
    for (let i = 1; i < dataProduk.length; i++) {
      const row = dataProduk[i];
      if (!row || !Array.isArray(row)) continue; // Pelindung lapis baja
      if (row[0]) products.push({ id: row[0], name: row[1], unit: row[3] });
    }

    let totalAset = 0, totalHPP = 0;
    const stockList = [];
    for (let i = 1; i < dataCurrent.length; i++) {
      const row = dataCurrent[i]; 
      if (!row || !Array.isArray(row)) continue;
      if (row[0]) {
        totalAset += Number(row[8]) || 0;    
        totalHPP += Number(row[9]) || 0;     
        stockList.push({
          id: row[0], name: row[1], stokAkhir: Number(row[5]) || 0, totalKeluar: Number(row[3]) || 0, unit: products.find(p => p.id === row[0])?.unit || ''
        });
      }
    }

    let stockLogs = [];
    const parseLogDate = (d) => String(d || '');
    
    for(let i=1; i<dIn.length; i++) { const row = dIn[i]; if(!row || !Array.isArray(row)) continue; if(row[0]) stockLogs.push({ date: parseLogDate(row[0]), id: row[1], type: 'Masuk', qty: row[3], pic: row[6], note: `Beli (Rp ${row[4] || 0}/unit)` }); }
    for(let i=1; i<dOut.length; i++) { const row = dOut[i]; if(!row || !Array.isArray(row)) continue; if(row[0]) stockLogs.push({ date: parseLogDate(row[0]), id: row[1], type: 'Keluar', qty: row[3], pic: row[5], note: row[4] }); }
    for(let i=1; i<dOp.length; i++) { const row = dOp[i]; if(!row || !Array.isArray(row)) continue; if(row[0]) stockLogs.push({ date: parseLogDate(row[0]), id: row[1], type: 'Opname', qty: row[3], pic: row[4], note: 'Koreksi Fisik' }); }

    let totalSales = 0, totalExpense = 0, totalKasbon = 0;
    let totalTunai = 0, totalQris = 0, totalEdc = 0, totalGrab = 0;
    let shift1DataByDate = {}; 

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    function isThisMonth(val) {
      if (!val) return false;
      let d = new Date(val);
      if (isNaN(d.getTime()) && typeof val === 'string') {
        const parts = val.split(' ')[0].split('/');
        if (parts && parts.length === 3) d = new Date(parts[2], parts[1] - 1, parts[0]);
      }
      if (isNaN(d.getTime())) return false;
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }

    for (let i = 1; i < dataPenjualan.length; i++) {
      const row = dataPenjualan[i];
      if (!row || !Array.isArray(row)) continue;
      
      if (row[0] !== "Tanggal" && row[0]) {
        let tglFormat = String(row[0]).trim();
        let shiftStr = String(row[2] || ''); 
        if (shiftStr.includes('Shift 1')) {
           if (!shift1DataByDate[tglFormat]) shift1DataByDate[tglFormat] = { tunai: 0, qris: 0, edc: 0, grab: 0 };
           shift1DataByDate[tglFormat].tunai += Number(row[3]) || 0; shift1DataByDate[tglFormat].qris += Number(row[4]) || 0; shift1DataByDate[tglFormat].edc += Number(row[5]) || 0; shift1DataByDate[tglFormat].grab += Number(row[6]) || 0;
        }
        if (isThisMonth(row[0])) {
          totalSales += Number(row[7]) || 0; totalTunai += Number(row[3]) || 0; totalQris += Number(row[4]) || 0; totalEdc += Number(row[5]) || 0; totalGrab += Number(row[6]) || 0;
        }
      }
    }

    for (let i = 1; i < dataPenjualanG.length; i++) {
      const row = dataPenjualanG[i];
      if (!row || !Array.isArray(row)) continue;

      if (row[0] !== "Tanggal" && row[0]) {
        if (isThisMonth(row[0])) {
          totalSales += Number(row[7]) || 0; totalTunai += Number(row[3]) || 0; totalQris += Number(row[4]) || 0; totalEdc += Number(row[5]) || 0; totalGrab += Number(row[6]) || 0;
        }
      }
    }

    for (let i = 1; i < dataPengeluaran.length; i++) {
      const row = dataPengeluaran[i];
      if (!row || !Array.isArray(row)) continue;

      if (row[0] !== "Tanggal" && row[0]) {
        if (isThisMonth(row[0])) totalExpense += Number(row[4]) || 0;
      }
    }

    for (let i = 1; i < dataKasbon.length; i++) {
      const row = dataKasbon[i];
      if (!row || !Array.isArray(row)) continue;

      if (row[0] !== "Tanggal" && row[0]) {
        if (isThisMonth(row[0])) totalKasbon += Number(row[2]) || 0;
      }
    }

    return NextResponse.json({
      products, stockList, stockLogs, shift1Data: shift1DataByDate,
      summary: { 
        plafonModal: 8000000, aset: totalAset, hpp: totalHPP, sales: totalSales, expenses: totalExpense, kasbon: totalKasbon,
        profit: totalSales - totalExpense, tunai: totalTunai, qris: totalQris, edc: totalEdc, grab: totalGrab,
        saldoTunai: totalTunai - totalExpense - totalKasbon 
      }
    });

  } catch (error) {
    // Jika masih error, kita paksa keluar letak barisnya
    return NextResponse.json({ 
      error: error.message,
      detailKodingan: error.stack 
    }, { status: 500 });
  }
}

// ----------------------------------------------------
// [POST] SIMPAN TRANSAKSI 
// ----------------------------------------------------
export async function POST(request) {
  try {
    const { sheets, spreadsheetId } = await getGoogleSheets(); 
    const body = await request.json();
    const { action, form } = body;

    let targetSheet = '';
    let rowData = [];
    const tglSekarang = new Date().toLocaleDateString('id-ID');

    switch (action) {
      case 'saveSales':
        targetSheet = 'DB_Penjualan';
        rowData = [form.tanggal || tglSekarang, form.penginput, form.shift, Number(form.tunai)||0, Number(form.qris)||0, Number(form.edc)||0, Number(form.grab)||0, (Number(form.tunai)||0) + (Number(form.qris)||0) + (Number(form.edc)||0) + (Number(form.grab)||0)];
        break;
      case 'saveSalesGerobak':
        targetSheet = 'DB_Penjualan_Gerobak';
        rowData = [form.tanggal || tglSekarang, form.penginput, form.shift, Number(form.tunai)||0, Number(form.qris)||0, Number(form.edc)||0, Number(form.grab)||0, (Number(form.tunai)||0) + (Number(form.qris)||0) + (Number(form.edc)||0) + (Number(form.grab)||0)];
        break;
      case 'saveStockIn':
        targetSheet = 'Stock-In';
        rowData = [form.tanggal || tglSekarang, form.id, form.nama, Number(form.qty), Number(form.harga), Number(form.qty) * Number(form.harga), form.penginput];
        break;
      case 'saveExpense':
        targetSheet = 'DB_Pengeluaran';
        for (let item of form.items) {
          if (!item.deskripsi || !item.total) continue;
          await sheets.spreadsheets.values.append({
            spreadsheetId, range: `${targetSheet}!A:E`, valueInputOption: 'USER_ENTERED',
            requestBody: { values: [[form.tanggal || tglSekarang, form.penginput, form.kategori, item.deskripsi, Number(item.total)]] }
          });
        }
        return NextResponse.json({ success: true, message: 'Pengeluaran Berhasil Disimpan!' });
      case 'saveKasbon':
        targetSheet = 'DB_Kasbon';
        rowData = [form.tanggal || tglSekarang, form.namaKru, Number(form.nominal), form.keterangan];
        break;
      default:
        return NextResponse.json({ error: 'Action backend tidak valid' }, { status: 400 });
    }

    if (targetSheet && rowData.length > 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${targetSheet}!A:A`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [rowData] }
      });
    }

    return NextResponse.json({ success: true, message: 'Data Berhasil Sinkron ke Google Sheet!' });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}