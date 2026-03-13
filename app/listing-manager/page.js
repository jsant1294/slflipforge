'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ListingManagerPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    const { data } = await supabase.from('items').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Listing Manager</h1>
        <p className="muted">Manage item titles, pricing, and listing status.</p>

        <div className="grid">
          {items.map((item) => (
            <div className="card" key={item.id}>
              <h3>{item.item_name || 'Untitled Item'}</h3>
              <p><strong>Status:</strong> {item.status || 'inventory'}</p>
              <p><strong>Marketplace:</strong> {item.marketplace || 'Unknown'}</p>
              <p><strong>Expected Sale:</strong> ${Number(item.expected_sale_price || 0).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
