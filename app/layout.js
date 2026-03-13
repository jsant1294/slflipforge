export const metadata = {
  title: "SLFlipForge",
  description: "Reseller intelligence dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b1120] text-white">

        {/* TOP NAV */}
        <header className="w-full border-b border-slate-800 bg-[#020617]">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

            <div className="text-xl font-bold">
              SLFlipForge
            </div>

            <nav className="flex gap-6 text-sm text-slate-300">
              <a href="/dashboard">Dashboard</a>
              <a href="/inventory">Inventory</a>
              <a href="/scanner">Scanner</a>
              <a href="/alerts">Alerts</a>
            </nav>

          </div>
        </header>

        {/* PAGE */}
        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>

        {/* MOBILE BOTTOM NAV */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#020617] border-t border-slate-800 md:hidden">
          <div className="grid grid-cols-4 text-center text-xs">

            <a href="/dashboard" className="p-3">Dashboard</a>
            <a href="/scanner" className="p-3">Scan</a>
            <a href="/inventory" className="p-3">Inventory</a>
            <a href="/alerts" className="p-3">Alerts</a>

          </div>
        </footer>

      </body>
    </html>
  );
}