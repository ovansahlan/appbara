import './globals.css'
import Link from 'next/link';

export const metadata = {
  title: 'AppBara - POS & Inventory',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex h-screen bg-[#F8FAFC] text-gray-800 text-sm font-sans antialiased">
        
        {/* SIDEBAR LBH KECIL & RAPI */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col hidden md:flex z-10">
          <div className="p-5 border-b border-gray-100 flex items-center justify-center">
            <h1 className="text-xl font-black text-indigo-600 tracking-tight">AppBara 🚀</h1>
          </div>
          
          <nav className="flex-1 p-3 space-y-1 mt-2">
            <Link href="/" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-indigo-50 text-gray-600 hover:text-indigo-700 font-semibold transition">
              <span className="text-lg">📊</span> Dashboard
            </Link>
            <Link href="/kasir" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 font-semibold transition">
              <span className="text-lg">🛒</span> Kasir
            </Link>
            <Link href="/stok" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-gray-600 hover:text-amber-700 font-semibold transition">
              <span className="text-lg">📦</span> Stok
            </Link>
            <Link href="/pengeluaran" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-rose-50 text-gray-600 hover:text-rose-700 font-semibold transition">
              <span className="text-lg">💸</span> Pengeluaran
            </Link>
          </nav>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <header className="bg-white border-b border-gray-200 p-3 flex justify-between items-center md:hidden">
            <h1 className="text-lg font-bold text-indigo-600">AppBara</h1>
            <button className="p-1.5 bg-gray-100 rounded-md">Menu</button>
          </header>
          {/* Padding konten dikecilkan dari p-8 ke p-6 */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </div>
        </main>

      </body>
    </html>
  )
}