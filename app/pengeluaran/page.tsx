"use client";
import React, { useState } from 'react';

export default function PengeluaranPage() {
  const [formData, setFormData] = useState({
    kategori: 'Belanja Operasional',
    nominal: '',
    keterangan: '',
    namaKru: '' // Hanya dipakai jika kategori kasbon
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Simulasi: Pengeluaran Rp ${formData.nominal} berhasil dicatat!`);
    setFormData({ ...formData, nominal: '', keterangan: '', namaKru: '' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">💸 Catat Pengeluaran</h2>
        <p className="text-gray-500 mt-1">Input nota belanja harian, biaya operasional, atau kasbon kru.</p>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Kategori Pengeluaran</label>
          <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none font-medium text-gray-700">
            <option value="Belanja Operasional">🛒 Belanja Operasional (Bahan Baku)</option>
            <option value="Listrik & Air">⚡ Listrik, Air & Internet</option>
            <option value="Gaji & Bonus">💰 Gaji & Bonus Karyawan</option>
            <option value="Kasbon">💳 Kasbon (Pinjaman Kru)</option>
            <option value="Lainnya">Lainnya...</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Nominal (Rp)</label>
          <input type="number" name="nominal" value={formData.nominal} onChange={handleChange} required placeholder="0" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none text-2xl font-bold text-gray-800" />
        </div>

        {/* Kolom ini hanya muncul jika memilih Kasbon */}
        {formData.kategori === 'Kasbon' && (
          <div className="space-y-2 animate-fade-in">
            <label className="text-sm font-semibold text-gray-600">Nama Kru yang Kasbon</label>
            <input type="text" name="namaKru" value={formData.namaKru} onChange={handleChange} required placeholder="Contoh: Budi" className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Keterangan / Detail Nota</label>
          <input type="text" name="keterangan" value={formData.keterangan} onChange={handleChange} required placeholder="Contoh: Beli telur 2 peti, gas 1 tabung" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none" />
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-rose-200 hover:-translate-y-1 transition-all text-lg">
            Simpan Pengeluaran
          </button>
        </div>

      </form>
    </div>
  );
}