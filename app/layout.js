import './globals.css'
import Link from 'next/link'
import MobileBottomNav from '../components/MobileBottomNav'

export const metadata = {
  title: 'SLFlipForge',
  description: 'Marketplace and reseller operating system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav">
            <Link className="logo" href="/">
              SLFlipForge
            </Link>

            <nav className="nav-links">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/flip-scanner">Scanner</Link>
              <Link href="/inventory-manager">Inventory</Link>
              <Link href="/messages">Messages</Link>
              <Link href="/analytics">Analytics</Link>
              <Link href="/alerts">Alerts</Link>
              <Link href="/alerts-center">Alerts Center</Link>
              <Link href="/templates">Templates</Link>
              <Link href="/opportunities">Opportunities</Link>
              <Link href="/barcode-lab">Barcode Lab</Link>
              <Link href="/ai-estimator">AI Estimator</Link>
              <Link href="/mobile-scanner">Mobile Scanner</Link>
            </nav>
          </div>
        </header>

        {children}

        <MobileBottomNav />

        <footer>
          <div className="container">
            SLFlipForge · Flip smarter. Sell faster.
          </div>
        </footer>
      </body>
    </html>
  )
}
