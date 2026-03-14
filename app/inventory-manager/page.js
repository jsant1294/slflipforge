'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import ProfitChart from '../../components/ProfitChart'

export default function InventoryManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [itemName, setItemName] = useState('')
  const [marketplace, setMarketplace] = useState('Facebook')
  const [buyPrice, setBuyPrice] = useState('')
  const [expectedSalePrice, setExpectedSalePrice] = useState('')
  const [fees, setFees] = useState('')
  const [shippingCost, setShippingCost] = useState('')
  const [status, setStatus] = useState('inventory')

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    setLoading(true)

    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setItems(data || [])
    }

    setLoading(false)
  }

  async function addItem(e) {
    e.preventDefault()
    setSaving(true)

    const buy = Number(buyPrice || 0)
    const sell = Number(expectedSalePrice || 0)
    const feeNum = Number(fees || 0)
    const shipNum = Number(shippingCost || 0)
    const estimatedProfit = sell - buy - feeNum - shipNum

    const payload = {
      item_name: itemName,
      marketplace,
      purchase_price: buy,
      expected_sale_price: sell,
      fees: feeNum,
      shipping_cost: shipNum,
      estimated_profit: estimatedProfit,
      status
    }

    const { error } = await supabase.from('items').insert([payload])

    if (!error) {
      setItemName('')
      setMarketplace('Facebook')
      setBuyPrice('')
      setExpectedSalePrice('')
      setFees('')
      setShippingCost('')
      setStatus('inventory')
      await loadItems()
    }

    setSaving(false)
  }

  async function deleteItem(id) {
    const ok = window.confirm('Delete this item?')
    if (!ok) return

    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (!error) {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from('items')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      )
    }
  }

  function getProfit(item) {
    const buy = Number(item.purchase_price || 0)
    const sell = Number(item.expected_sale_price || 0)
    const feeNum = Number(item.fees || 0)
    const shipNum = Number(item.shipping_cost || 0)

    return sell - buy - feeNum - shipNum
  }

  const stats = useMemo(() => {
    const totalItems = items.length
    const inventoryCount = items.filter((item) => item.status === 'inventory').length
    const listedCount = items.filter((item) => item.status === 'listed').length
    const soldCount = items.filter((item) => item.status === 'sold').length

    const totalCost = items.reduce(
      (sum, item) => sum + Number(item.purchase_price || 0),
      0
    )

    const projectedRevenue = items.reduce(
      (sum, item) => sum + Number(item.expected_sale_price || 0),
      0
    )

    const projectedProfit = items.reduce(
      (sum, item) => sum + getProfit(item),
      0
    )

    const soldProfit = items
      .filter((item) => item.status === 'sold')
      .reduce((sum, item) => sum + getProfit(item), 0)

    return {
      totalItems,
      inventoryCount,
      listedCount,
      soldCount,
      totalCost,
      projectedRevenue,
      projectedProfit,
      soldProfit
    }
  }, [items])

  return (
    <main className="page">
      <div className="container">
        <h1>Inventory Manager</h1>
        <p className="muted">Track every flip and monitor projected profit.</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '16px',
            margin: '24px 0'
          }}
        >
          <div className="card">
            <p className="muted">Items</p>
            <h2>{stats.totalItems}</h2>
          </div>

          <div className="card">
            <p className="muted">Inventory</p>
            <h2>{stats.inventoryCount}</h2>
          </div>

          <div className="card">
            <p className="muted">Listed</p>
            <h2>{stats.listedCount}</h2>
          </div>

          <div className="card">
            <p className="muted">Sold</p>
            <h2>{stats.soldCount}</h2>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '16px',
            margin: '0 0 24px 0'
          }}
        >
          <div className="card">
            <p className="muted">Inventory Cost</p>
            <h2>${stats.totalCost.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Projected Revenue</p>
            <h2>${stats.projectedRevenue.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Projected Profit</p>
            <h2>${stats.projectedProfit.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Sold Profit</p>
            <h2>${stats.soldProfit.toFixed(2)}</h2>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
          <h3>Profit Overview</h3>
          <ProfitChart items={items} />
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3>Add Item</h3>

          <form
            onSubmit={addItem}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '12px',
              marginTop: '16px'
            }}
          >
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
              required
            />

            <select
              value={marketplace}
              onChange={(e) => setMarketplace(e.target.value)}
            >
              <option>Facebook</option>
              <option>Craigslist</option>
              <option>OfferUp</option>
              <option>eBay</option>
              <option>Mercari</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              step="0.01"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="Buy price"
              required
            />

            <input
              type="number"
              step="0.01"
              value={expectedSalePrice}
              onChange={(e) => setExpectedSalePrice(e.target.value)}
              placeholder="Expected sale price"
              required
            />

            <input
              type="number"
              step="0.01"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="Fees"
            />

            <input
              type="number"
              step="0.01"
              value={shippingCost}
              onChange={(e) => setShippingCost(e.target.value)}
              placeholder="Shipping cost"
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="inventory">Inventory</option>
              <option value="listed">Listed</option>
              <option value="sold">Sold</option>
            </select>

            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Saving...' : 'Add Item'}
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Saved Inventory</h3>

          {loading ? (
            <p>Loading inventory...</p>
          ) : items.length === 0 ? (
            <p>No inventory yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    background: 'rgba(255,255,255,0.03)'
                  }}
                >
                  <h3 style={{ marginBottom: '8px' }}>
                    {item.item_name || 'Untitled Item'}
                  </h3>

                  <p className="muted" style={{ marginBottom: '10px' }}>
                    {item.marketplace || 'Unknown marketplace'} • {item.status || 'inventory'}
                  </p>

                  <p>Buy: ${Number(item.purchase_price || 0).toFixed(2)}</p>
                  <p>Sell: ${Number(item.expected_sale_price || 0).toFixed(2)}</p>
                  <p>Fees: ${Number(item.fees || 0).toFixed(2)}</p>
                  <p>Shipping: ${Number(item.shipping_cost || 0).toFixed(2)}</p>
                  <p>
                    <strong>Profit: ${getProfit(item).toFixed(2)}</strong>
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                      marginTop: '14px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, 'inventory')}
                      style={{
                        background: item.status === 'inventory' ? '#f5b84d' : 'transparent',
                        color: item.status === 'inventory' ? '#07122b' : '#f5b84d',
                        border: '1px solid rgba(245,184,77,0.35)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Inventory
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, 'listed')}
                      style={{
                        background: item.status === 'listed' ? '#f5b84d' : 'transparent',
                        color: item.status === 'listed' ? '#07122b' : '#f5b84d',
                        border: '1px solid rgba(245,184,77,0.35)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Listed
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, 'sold')}
                      style={{
                        background: item.status === 'sold' ? '#f5b84d' : 'transparent',
                        color: item.status === 'sold' ? '#07122b' : '#f5b84d',
                        border: '1px solid rgba(245,184,77,0.35)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Sold
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      style={{
                        background: 'transparent',
                        color: '#f5b84d',
                        border: '1px solid rgba(245,184,77,0.35)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}