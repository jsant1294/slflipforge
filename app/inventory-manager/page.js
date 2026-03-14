'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function InventoryManager() {
  console.log('Inventory page loaded')

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('useEffect running')
    loadItems()
  }, [])

  async function loadItems() {
    console.log('loadItems called')
    setLoading(true)

    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('Supabase returned:', data, error)

    if (!error) {
      setItems(data || [])
    }

    setLoading(false)
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Inventory Manager</h1>

        {loading ? (
          <p>Loading inventory...</p>
        ) : items.length === 0 ? (
          <p>No inventory yet.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id} style={{ marginBottom: '16px' }}>
                <h3>{item.item_name || 'Untitled Item'}</h3>
                <p>Buy: ${Number(item.purchase_price || 0).toFixed(2)}</p>
                <p>Sell: ${Number(item.expected_sale_price || 0).toFixed(2)}</p>
                <p>
                  Profit: $
                  {(
                    Number(item.expected_sale_price || 0) -
                    Number(item.purchase_price || 0)
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
