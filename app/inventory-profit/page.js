'use client'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function InventoryProfitPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    const { data } = await supabase.from('items').select('*').order('created_at', { ascending: false })
    setItems(data || [])
  }

  const totals = useMemo(() => {
    const invested = items.reduce((sum, item) => sum + Number(item.purchase_price || 0), 0)
    const expectedRevenue = items.reduce((sum, item) => sum + Number(item.expected_sale_price || 0), 0)
    const fees = items.reduce((sum, item) => sum + Number(item.fees || 0), 0)
    const shipping = items.reduce((sum, item) => sum + Number(item.shipping_cost || 0), 0)
    const expectedProfit = expectedRevenue - invested - fees - shipping
    return { invested, expectedRevenue, fees, shipping, expectedProfit }
  }, [items])

  return (
    <main className="page">
      <div className="container">
        <h1>Inventory Profit</h1>
        <p className="muted">Track the profit performance of your active inventory.</p>

        <div className="grid grid-3" style={{ marginBottom: '20px' }}>
          <div className="card"><h3>Invested</h3><p>${totals.invested.toFixed(2)}</p></div>
          <div className="card"><h3>Expected Revenue</h3><p>${totals.expectedRevenue.toFixed(2)}</p></div>
          <div className="card"><h3>Expected Profit</h3><p>${totals.expectedProfit.toFixed(2)}</p></div>
        </div>

        <div className="grid">
          {items.map((item) => {
            const purchase = Number(item.purchase_price || 0)
            const sale = Number(item.expected_sale_price || 0)
            const fees = Number(item.fees || 0)
            const shipping = Number(item.shipping_cost || 0)
            const profit = sale - purchase - fees - shipping

            return (
              <div className="card" key={item.id}>
                <h3>{item.item_name || 'Untitled Item'}</h3>
                <p><strong>Buy:</strong> ${purchase.toFixed(2)}</p>
                <p><strong>Expected Sale:</strong> ${sale.toFixed(2)}</p>
                <p><strong>Profit:</strong> ${profit.toFixed(2)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
