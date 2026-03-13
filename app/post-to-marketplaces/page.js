'use client'

import { useState } from 'react'

export default function PostToMarketplacesPage() {
  const [notice, setNotice] = useState('')

  async function simulatePost(platform) {
    const res = await fetch('/api/post-listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    })
    const data = await res.json()
    setNotice(data.message || 'Listing post simulated.')
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Post to Marketplaces</h1>
        <p className="muted">Prototype flow for posting a listing draft to multiple selling channels.</p>

        <div className="grid grid-3">
          <div className="card">
            <h3>Facebook Marketplace</h3>
            <button className="btn" onClick={() => simulatePost('Facebook Marketplace')}>Post Draft</button>
          </div>

          <div className="card">
            <h3>eBay</h3>
            <button className="btn" onClick={() => simulatePost('eBay')}>Post Draft</button>
          </div>

          <div className="card">
            <h3>OfferUp</h3>
            <button className="btn" onClick={() => simulatePost('OfferUp')}>Post Draft</button>
          </div>
        </div>

        {notice && <p className="notice">{notice}</p>}
      </div>
    </main>
  )
}

