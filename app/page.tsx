"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- TIPE DATA ---
interface StatCard { name: string; value: string; change: string; icon: string; bgColor: string; textColor: string; borderColor: string; }

// --- DATA MOCK ---
const stats: StatCard[] = [
  { name: 'Total Profit', value: 'Rp 2.150.000', change: '+12.5%', icon: '💰', bgColor: 'bg-indigo-50', textColor: 'text-indigo-900', borderColor: 'border-indigo-100' },
  { name: 'Total Penjualan', value: 'Rp 5.920.000', change: '+8.1%', icon: '🛒', bgColor: 'bg-emerald-50', textColor: 'text-emerald-900', borderColor: 'border-emerald-100' },
  { name: 'Total Pengeluaran', value: 'Rp 3.770.000', change: '-2.3%', icon: '💸', bgColor: 'bg-rose-50', textColor: 'text-rose-900', borderColor: 'border-rose-100' },
  { name: 'Saldo Tunai', value: 'Rp 1.150.000', change: '+5.0%', icon: '🏦', bgColor: 'bg-amber-50', textColor: 'text-amber-900', borderColor: 'border-amber-100' },
];

const dataChart = [
  { hari: 'Sen', total: 1200000 }, { hari: 'Sel', total: 1900000 },
  { hari: 'Rab', total: 1500000 }, { hari: 'Kam', total: 2200000 },
  { hari: 'Jum', total: 2800000 }, { hari: 'Sab', total: 3500000 }, { hari: 'Min', total: 3100000 },
];

const transactions = [
  { id: '#1', tgl: '15/10', nama: 'Belanja Telur', nom: 1500000, tipe: 'out' },
  { id: '#2', tgl: '15/10', nama: 'Shift 1 Pagi', nom: 3200000, tipe: 'in' },
  { id: '#3', tgl: '14/10', nama: 'Bayar Listrik', nom: 850000, tipe: 'out' },
  { id: '#4', tgl: '14/10', nama: 'Kasbon Budi', nom: 100000, tipe: 'out' },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      
      {/* HEADER COMPACT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-0.5">Ringkasan performa bisnis bulan ini.</p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-600">
          Hari ini: {new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* METRIK FUN MINIMALIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl border ${stat.bgColor} ${stat.borderColor} transition hover:-translate-y-0.5`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${stat.textColor} opacity-80`}>{stat.name}</h3>
              <span className="text-xl bg-white/60 p-1.5 rounded-lg shadow-sm">{stat.icon}</span>
            </div>
            <p className={`text-2xl font-black ${stat.textColor}`}>{stat.value}</p>
            <p className={`mt-2 text-xs font-semibold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stat.change} <span className={`${stat.textColor} opacity-60 font-medium`}>vs bulan lalu</span>
            </p>
          </div>
        ))}
      </div>

      {/* CHART & TRANSAKSI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <div className="mb-4">
             <h3 className="text-base font-bold text-gray-800">Tren Pendapatan</h3>
           </div>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="hari" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} tickFormatter={(val) => `${val/1000000}M`} />
                  <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: '1px solid #E5E7EB', padding: '8px', fontSize: '12px'}} />
                  <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Transaksi */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <h3 className="text-base font-bold text-gray-800 mb-4">Aktivitas Terakhir</h3>
           <div className="space-y-3">
              {transactions.map(t => (
                 <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold ${t.tipe === 'in' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                          {t.tipe === 'in' ? 'in' : 'out'}
                       </div>
                       <div>
                          <p className="font-semibold text-gray-800 text-sm">{t.nama}</p>
                          <p className="text-xs text-gray-500">{t.tgl}</p>
                       </div>
                    </div>
                    <p className={`text-sm font-bold ${t.tipe === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                       {t.tipe === 'in' ? '+' : '-'}Rp{(t.nom/1000)}K
                    </p>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}