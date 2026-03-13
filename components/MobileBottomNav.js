'use client'

import Link from 'next/link'

export default function MobileBottomNav() {
  return (
    <nav className="mobile-nav">

      <Link href="/">
        Home
      </Link>

      <Link href="/flip-scanner">
        Scan
      </Link>

      <Link href="/barcode-lab">
        Barcode
      </Link>

      <Link href="/inventory-manager">
        Inventory
      </Link>

      <Link href="/alerts-center">
        Alerts
      </Link>

      <Link href="/analytics">
        Analytics
      </Link>

    </nav>
  )
}