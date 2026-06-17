import './globals.css'

export const metadata = {
  title: 'AppBara - POS & Inventory',
  description: 'Sistem Manajemen Kasir dan Gudang',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex h-screen bg-gray-50 text-gray-800 font-sans">
        
        {/* SIDEBAR MENU */}
        <aside className="w-64 bg-white border-r shadow-sm flex flex-col hidden md:flex">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-extrabold text-blue-600">AppBara 🚀</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <div className="block p-3 rounded-lg bg-blue-50 text-blue-700 font-bold cursor-pointer">
              📊 Dashboard
            </div>
            <div className="block p-3 rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition cursor-pointer">
              🛒 Kasir
            </div>
            <div className="block p-3 rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition cursor-pointer">
              📦 Manajemen Stok
            </div>
            <div className="block p-3 rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition cursor-pointer">
              💸 Pengeluaran
            </div>
          </nav>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="bg-white border-b p-4 shadow-sm flex justify-between items-center md:hidden">
            <h1 className="text-xl font-bold text-blue-600">AppBara</h1>
            <button className="p-2 bg-gray-100 rounded">Menu</button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </div>
        </main>

      </body>
    </html>
  )
}