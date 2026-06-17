"use client";
import React, { useState } from 'react';

export default function KasirPage() {
  // Mengingat kembali fitur GAS: Menyimpan state/data dari form
  const [formData, setFormData] = useState({
    lokasi: 'Toko Utama',
    shift: '1',
    penginput: '',
    tunai: '',
    qris: '',
    edc: '',
    grab: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  // Menangkap setiap ketikan ke dalam state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi saat tombol Simpan ditekan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Nanti di sini kita pasang fetch() ke Vercel API
    console.log("Data yang siap dikirim ke Vercel:", formData);
    
    // Simulasi loading 1 detik
    setTimeout(() => {
      alert("Simulasi berhasil! Data terekam di console.");
      setIsLoading(false);
      // Reset form setelah sukses
      setFormData({ ...formData, tunai: '', qris: '', edc: '', grab: '' });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">🛒 Input Kasir</h2>
        <p className="text-gray-500 mt-1">Masukkan data penjualan per shift dengan teliti.</p>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
        
        {/* Bagian 1: Info Shift & Petugas */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Shift</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Lokasi / Cabang</label>
              <select name="lokasi" value={formData.lokasi} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="Toko Utama">Toko Utama</option>
                <option value="Gerobak">Gerobak</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Shift</label>
              <select name="shift" value={formData.shift} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="1">Shift 1 (Pagi)</option>
                <option value="2">Shift 2 (Siang)</option>
                <option value="3">Shift 3 (Malam)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Nama Kasir / Penginput</label>
              <input type="text" name="penginput" value={formData.penginput} onChange={handleChange} required placeholder="Contoh: Budi" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

          </div>
        </div>

        {/* Bagian 2: Rincian Pendapatan */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Rincian Pendapatan (Rp)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">💵 Uang Tunai / Cash</label>
              <input type="number" name="tunai" value={formData.tunai} onChange={handleChange} placeholder="0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-lg font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">📱 QRIS / Transfer</label>
              <input type="number" name="qris" value={formData.qris} onChange={handleChange} placeholder="0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">💳 Mesin EDC</label>
              <input type="number" name="edc" value={formData.edc} onChange={handleChange} placeholder="0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-lg font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">🛵 Grab / Gojek</label>
              <input type="number" name="grab" value={formData.grab} onChange={handleChange} placeholder="0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none text-lg font-medium" />
            </div>

          </div>
        </div>

        {/* Tombol Action */}
        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`px-8 py-4 text-white font-bold rounded-xl shadow-lg transition-all ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-blue-200'}`}
          >
            {isLoading ? 'Menyimpan...' : '💾 Simpan Transaksi'}
          </button>
        </div>

      </form>
    </div>
  );
}