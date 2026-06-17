"use client";
import React, { useState } from 'react';

// Data sementara (Mock) untuk tabel stok
const mockStok = [
  { id: 1, nama: 'Telur Ayam (kg)', jumlah: 45, status: 'Aman' },
  { id: 2, nama: 'Beras Premium (kg)', jumlah: 12, status: 'Menipis' },
  { id: 3, nama: 'Minyak Goreng (L)', jumlah: 30, status: 'Aman' },
  { id: 4, nama: 'Gas Elpiji 3kg (tabung)', jumlah: 2, status: 'Kritis' },
];

export default function StokPage() {
  const [formData, setFormData] = useState({
    jenisTransaksi: 'Masuk',
    namaBarang: '',
    jumlah: '',
    keterangan: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Simulasi: Data Stok ${formData.jenisTransaksi} berhasil disimpan!`);
    setFormData({ ...formData, namaBarang: '', jumlah: '', keterangan: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">📦 Manajemen Stok</h2>
        <p className="text-gray-500 mt-1">Pantau ketersediaan bahan baku dan catat pergerakan barang.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Input Transaksi Stok (Kiri) */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Catat Mutasi Stok</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Jenis Transaksi</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="jenisTransaksi" value="Masuk" checked={formData.jenisTransaksi === 'Masuk'} onChange={handleChange} className="peer sr-only" />
                  <div className="text-center p-3 rounded-xl border border-gray-200 peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-700 font-bold transition">⬇️ Masuk</div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="jenisTransaksi" value="Keluar" checked={formData.jenisTransaksi === 'Keluar'} onChange={handleChange} className="peer sr-only" />
                  <div className="text-center p-3 rounded-xl border border-gray-200 peer-checked:bg-red-50 peer-checked:border-red-500 peer-checked:text-red-700 font-bold transition">⬆️ Keluar</div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Nama Barang</label>
              <input type="text" name="namaBarang" value={formData.namaBarang} onChange={handleChange} required placeholder="Contoh: Telur Ayam" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Jumlah (Qty)</label>
              <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} required placeholder="0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Keterangan / Supplier</label>
              <input type="text" name="keterangan" value={formData.keterangan} onChange={handleChange} placeholder="Opsional..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <button type="submit" className="w-full py-4 mt-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all">
              Simpan Data Stok
            </button>
          </form>
        </div>

        {/* Tabel Stok Saat Ini (Kanan) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Ketersediaan Stok (Real-time)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="p-4 text-sm font-semibold text-gray-500">Nama Barang</th>
                  <th className="p-4 text-sm font-semibold text-gray-500">Sisa Stok</th>
                  <th className="p-4 text-sm font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockStok.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-800">{item.nama}</td>
                    <td className="p-4 text-gray-600">{item.jumlah}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Aman' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Menipis' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
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