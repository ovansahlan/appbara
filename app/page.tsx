"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data contoh untuk grafik (nanti kita ganti dengan data asli dari Vercel)
const dataPenjualan = [
  { hari: 'Sen', total: 1200000 },
  { hari: 'Sel', total: 1900000 },
  { hari: 'Rab', total: 1500000 },
  { hari: 'Kam', total: 2200000 },
  { hari: 'Jum', total: 2800000 },
  { hari: 'Sab', total: 3500000 },
  { hari: 'Min', total: 3100000 },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header Dashboard */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard Keuangan 📈</h2>
        <p className="text-gray-500 mt-1">Pantau performa dan arus kas bisnis Anda secara real-time.</p>
      </div>

      {/* KOTAK-KOTAK METRIK (Sekarang lebih modern dengan gradient) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Profit */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Total Profit</h3>
            <span className="p-2 bg-white/20 rounded-lg">💰</span>
          </div>
          <p className="text-3xl font-bold">Rp 0</p>
        </div>

        {/* Card Sales */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-200 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-emerald-100 text-sm font-semibold uppercase tracking-wider">Total Penjualan</h3>
            <span className="p-2 bg-white/20 rounded-lg">🛒</span>
          </div>
          <p className="text-3xl font-bold">Rp 0</p>
        </div>

        {/* Card Pengeluaran */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-rose-100 text-sm font-semibold uppercase tracking-wider">Pengeluaran</h3>
            <span className="p-2 bg-white/20 rounded-lg">💸</span>
          </div>
          <p className="text-3xl font-bold">Rp 0</p>
        </div>

        {/* Card Saldo Tunai */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-200 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-amber-100 text-sm font-semibold uppercase tracking-wider">Saldo Tunai</h3>
            <span className="p-2 bg-white/20 rounded-lg">🏦</span>
          </div>
          <p className="text-3xl font-bold">Rp 0</p>
        </div>

      </div>

      {/* AREA GRAFIK RECHARTS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            📊 Tren Penjualan 7 Hari Terakhir
         </h3>
         <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPenjualan}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="hari" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} tickFormatter={(value) => `Rp${value/1000000}M`} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

    </div>
  )
}