
'use client'

import Link from 'next/link'

export default function MobileBottomNav() {
  return (
    <nav className="mobile-nav">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/flip-scanner">Scan</Link>
      <Link href="/inventory-manager">Inventory</Link>
      <Link href="/flipbot-alerts">Alerts</Link>
    </nav>
  )
}
