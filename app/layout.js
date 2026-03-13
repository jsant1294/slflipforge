import "./globals.css";

export const metadata = {
  title: "SLFlipForge",
  description: "Reseller intelligence dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="site-shell">
        <header className="site-header">
          <div className="site-header-inner">
            <div className="site-logo">SLFlipForge</div>

            <nav className="top-nav">
              <a href="/dashboard">Dashboard</a>
              <a href="/inventory-manager">Inventory</a>
              <a href="/flip-scanner">Scanner</a>
              <a href="/flipbot-alerts">Alerts</a>
            </nav>
          </div>
        </header>

        <main className="page-wrap">{children}</main>

        <footer className="mobile-tabbar">
          <a href="/dashboard">Dashboard</a>
          <a href="/flip-scanner">Scan</a>
          <a href="/inventory-manager">Inventory</a>
          <a href="/flipbot-alerts">Alerts</a>
        </footer>
      </body>
    </html>
  );
}