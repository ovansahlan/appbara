"use client";
import React, { useState, useEffect } from 'react';

export default function StokPage() {
  // 1. STATE UNTUK MENAMPUNG DATA DARI BACKEND
  const [dataStok, setDataStok] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // State untuk form input (opsional saat ini, fokus ke GET data dulu)
  const [formData, setFormData] = useState({ jenis: 'Masuk', nama: '', qty: '' });

  // 2. FUNGSI UNTUK MENYEDOT DATA DARI API VERCEL
  const fetchStokDariVercel = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      // ⚠️ GANTI URL DI BAWAH INI DENGAN URL VERCEL API ANDA ⚠️
      // Contoh: 'https://api-appbara-anda.vercel.app/api/sheet?tab=Stok'
      const response = await fetch('https://appbara.vercel.app/api/data'); 
      
      if (!response.ok) throw new Error('Gagal merespons dari server');
      
      const json = await response.json();
      
      // Asumsi backend Anda mengembalikan format: { data: [ [...], [...] ] }
      // Kita simpan ke dalam state
      setDataStok(json.data || []);
      
    } catch (err: any) {
      console.error("Error Fetching:", err);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. JALANKAN FUNGSI FETCH SECARA OTOMATIS SAAT HALAMAN DIBUKA
  useEffect(() => {
    fetchStokDariVercel();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">📦 Stok & Inventori</h2>
          <p className="text-sm text-gray-500 mt-0.5">Pantau ketersediaan barang secara real-time dari Google Sheets.</p>
        </div>
        {/* Tombol Manual Refresh */}
        <button 
          onClick={fetchStokDariVercel}
          className="px-4 py-2 bg-amber-50 text-amber-700 font-bold rounded-lg border border-amber-200 hover:bg-amber-100 transition"
        >
          {isLoading ? '⏳ Memuat...' : '🔄 Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Form (UI Statis untuk sekarang) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
          <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Catat Mutasi</h3>
          <div className="space-y-4">
             {/* Form fields sederhana untuk demo UI Minimalist Fun */}
             <input type="text" placeholder="Nama Barang" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
             <input type="number" placeholder="Jumlah" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
             <button className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition">
               Simpan Data
             </button>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Data Real-time */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <h3 className="text-base font-bold text-gray-800">Ketersediaan Saat Ini</h3>
          </div>
          
          <div className="overflow-x-auto p-2">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500">
                  <th className="p-3 font-semibold">No</th>
                  <th className="p-3 font-semibold">Nama Barang</th>
                  <th className="p-3 font-semibold">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {/* STATE 1: LOADING */}
                {isLoading && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-400 font-medium animate-pulse">
                      Menyambungkan ke Google Sheets...
                    </td>
                  </tr>
                )}

                {/* STATE 2: ERROR */}
                {!isLoading && errorMsg && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-rose-500 font-medium">
                      ❌ {errorMsg}
                    </td>
                  </tr>
                )}

                {/* STATE 3: DATA KOSONG */}
                {!isLoading && !errorMsg && dataStok.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-400 font-medium">
                      Belum ada data di Google Sheets.
                    </td>
                  </tr>
                )}

                {/* STATE 4: MENAMPILKAN DATA ASLI */}
                {/* LOGIKA: Menyesuaikan dengan bentuk array dari Sheets (biasanya array of array) */}
                {!isLoading && dataStok.map((baris, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
                    <td className="p-3 text-gray-500">{index + 1}</td>
                    {/* Sesuaikan index array di bawah ini dengan urutan kolom di Sheet Anda */}
                    <td className="p-3 font-semibold text-gray-800">{baris[0] || '-'}</td>
                    <td className="p-3 text-gray-600 font-medium">{baris[1] || '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}