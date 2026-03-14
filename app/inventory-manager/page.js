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

  function getProfit(item) {
    const buy = Number(item.purchase_price || 0)
    const sell = Number(item.expected_sale_price || 0)
    const feeNum = Number(item.fees || 0)
    const shipNum = Number(item.shipping_cost || 0)
    return sell - buy - feeNum - shipNum
  }

  function getROI(item) {
    const buy = Number(item.purchase_price || 0)
    if (buy <= 0) return 0
    return (getProfit(item) / buy) * 100
  }

  function getDealScore(item) {
    const profit = getProfit(item)
    const roi = getROI(item)

    let score = 0

    if (profit >= 100) score += 4
    else if (profit >= 60) score += 3
    else if (profit >= 30) score += 2
    else if (profit > 0) score += 1

    if (roi >= 100) score += 4
    else if (roi >= 60) score += 3
    else if (roi >= 30) score += 2
    else if (roi > 0) score += 1

    if ((item.marketplace || '').toLowerCase() === 'facebook') score += 1
    if ((item.status || '') === 'inventory') score += 1

    return Math.min(score, 10)
  }

  function getRecommendation(item) {
    const score = getDealScore(item)
    if (score >= 8) return 'BUY'
    if (score >= 5) return 'GOOD'
    return 'PASS'
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

    const { error } = await supabase.from('items').delete().eq('id', id)

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

    const avgROI =
      items.length > 0
        ? items.reduce((sum, item) => sum + getROI(item), 0) / items.length
        : 0

    const bestDeal =
      [...items].sort((a, b) => getDealScore(b) - getDealScore(a))[0] || null

    return {
      totalItems,
      inventoryCount,
      listedCount,
      soldCount,
      totalCost,
      projectedRevenue,
      projectedProfit,
      soldProfit,
      avgROI,
      bestDeal
    }
  }, [items])

  const leaderboard = useMemo(() => {
    return [...items]
      .map((item) => ({
        ...item,
        profit: getProfit(item),
        roi: getROI(item)
      }))
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5)
  }, [items])

  return (
    <main className="page">
      <div className="container">
        <h1>Inventory Manager</h1>
        <p className="muted">
          Track every flip, score every deal, and monitor projected profit.
        </p>

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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}
        >
          <div className="card">
            <p className="muted">Average ROI</p>
            <h2>{stats.avgROI.toFixed(1)}%</h2>
          </div>

          <div className="card">
            <p className="muted">Best Deal Score</p>
            <h2>{stats.bestDeal ? getDealScore(stats.bestDeal) : 0}/10</h2>
          </div>
        </div>

        <div
          className="card"
          style={{
            marginBottom: '24px',
            padding: '28px',
            background: 'linear-gradient(135deg,#0f172a,#1e293b)'
          }}
        >
          <h3 style={{ marginBottom: '12px' }}>🚀 Rocket Profit Counter</h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p className="muted">Total Potential Profit</p>
              <h2 style={{ fontSize: '34px', fontWeight: '700' }}>
                ${stats.projectedProfit.toFixed(2)}
              </h2>
            </div>

            <div
              style={{
                fontSize: '42px',
                animation: 'rocketFloat 2s ease-in-out infinite'
              }}
            >
              🚀
            </div>
          </div>

          <p className="muted" style={{ marginTop: '8px' }}>
            Every flip fuels the rocket.
          </p>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <div>
              <p className="muted" style={{ marginBottom: '6px' }}>
                Performance
              </p>
              <h3>Flip Leaderboard</h3>
            </div>
          </div>

          {loading ? (
            <p>Loading leaderboard...</p>
          ) : leaderboard.length === 0 ? (
            <p className="muted">No flips yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {leaderboard.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1.4fr 1fr 1fr 1fr',
                    gap: '12px',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '14px',
                    background:
                      index === 0
                        ? 'linear-gradient(180deg, rgba(245,184,77,0.10), rgba(255,255,255,0.03))'
                        : 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '999px',
                        display: 'grid',
                        placeItems: 'center',
                        background: index === 0 ? '#f5b84d' : 'rgba(255,255,255,0.08)',
                        color: index === 0 ? '#111' : '#fff',
                        fontWeight: 800
                      }}
                    >
                      #{index + 1}
                    </div>
                  </div>

                  <div>
                    <strong>{item.item_name || 'Untitled Item'}</strong>
                    <div className="muted" style={{ marginTop: '6px' }}>
                      {item.marketplace || 'Unknown marketplace'} • {item.status || 'inventory'}
                    </div>
                  </div>

                  <div>
                    <div className="muted">Buy</div>
                    <strong>${Number(item.purchase_price || 0).toFixed(2)}</strong>
                  </div>

                  <div>
                    <div className="muted">Sell</div>
                    <strong>${Number(item.expected_sale_price || 0).toFixed(2)}</strong>
                  </div>

                  <div>
                    <div className="muted">Profit / ROI</div>
                    <strong>${Number(item.profit || 0).toFixed(2)}</strong>
                    <div className="muted" style={{ marginTop: '4px' }}>
                      {item.roi.toFixed(1)}% ROI
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
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

            <select value={marketplace} onChange={(e) => setMarketplace(e.target.value)}>
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
                  <p><strong>Profit: ${getProfit(item).toFixed(2)}</strong></p>
                  <p><strong>ROI: {getROI(item).toFixed(1)}%</strong></p>
                  <p>
                    <strong>Deal Score: {getDealScore(item)}/10</strong> •{' '}
                    {getRecommendation(item)}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                      marginTop: '14px'
                    }}
                  >
                    <button type="button" onClick={() => updateStatus(item.id, 'inventory')}>
                      Inventory
                    </button>

                    <button type="button" onClick={() => updateStatus(item.id, 'listed')}>
                      Listed
                    </button>

                    <button type="button" onClick={() => updateStatus(item.id, 'sold')}>
                      Sold
                    </button>

                    <button type="button" onClick={() => deleteItem(item.id)}>
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