'use client'

import { useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function FlipScannerPage() {
  const [itemName, setItemName] = useState('')
  const [marketplace, setMarketplace] = useState('Facebook')
  const [category, setCategory] = useState('tools')
  const [buyPrice, setBuyPrice] = useState('')
  const [expectedSalePrice, setExpectedSalePrice] = useState('')
  const [fees, setFees] = useState('')
  const [shippingCost, setShippingCost] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const analysis = useMemo(() => {
    const buy = Number(buyPrice || 0)
    const sell = Number(expectedSalePrice || 0)
    const feeNum = Number(fees || 0)
    const shipNum = Number(shippingCost || 0)

    const profit = sell - buy - feeNum - shipNum
    const roi = buy > 0 ? (profit / buy) * 100 : 0

    let demandScore = 5
    if (category === 'tools') demandScore = 8
    if (category === 'electronics') demandScore = 7
    if (category === 'collectibles') demandScore = 9
    if (category === 'appliances') demandScore = 6
    if (category === 'furniture') demandScore = 5

    let dealScore = 0

    if (profit >= 100) dealScore += 4
    else if (profit >= 60) dealScore += 3
    else if (profit >= 30) dealScore += 2
    else if (profit > 0) dealScore += 1

    if (roi >= 100) dealScore += 4
    else if (roi >= 60) dealScore += 3
    else if (roi >= 30) dealScore += 2
    else if (roi > 0) dealScore += 1

    if (demandScore >= 8) dealScore += 2
    else if (demandScore >= 6) dealScore += 1

    dealScore = Math.min(dealScore, 10)

    let recommendation = 'PASS'
    if (dealScore >= 8) recommendation = 'BUY'
    else if (dealScore >= 5) recommendation = 'GOOD'

    let risk = 'High'
    if (dealScore >= 8) risk = 'Low'
    else if (dealScore >= 5) risk = 'Medium'

    return {
      buy,
      sell,
      feeNum,
      shipNum,
      profit,
      roi,
      demandScore,
      dealScore,
      recommendation,
      risk
    }
  }, [buyPrice, expectedSalePrice, fees, shippingCost, category])

  async function saveToInventory() {
    setSaving(true)
    setMessage('')

    const payload = {
      item_name: itemName || 'Untitled Scan',
      marketplace,
      category,
      purchase_price: Number(buyPrice || 0),
      expected_sale_price: Number(expectedSalePrice || 0),
      fees: Number(fees || 0),
      shipping_cost: Number(shippingCost || 0),
      estimated_profit: analysis.profit,
      status: 'inventory'
    }

    const { error } = await supabase.from('items').insert([payload])

    if (error) {
      setMessage('Could not save item.')
    } else {
      setMessage('Saved to inventory.')
      setItemName('')
      setMarketplace('Facebook')
      setCategory('tools')
      setBuyPrice('')
      setExpectedSalePrice('')
      setFees('')
      setShippingCost('')
    }

    setSaving(false)
  }

  return (
    <main className="page">
      <div className="container">
        <p className="muted">SLFlipForge</p>
        <h1 style={{ marginBottom: '10px' }}>Flip Scanner AI</h1>
        <p className="muted" style={{ maxWidth: '760px', marginBottom: '24px' }}>
          Estimate profit, ROI, demand, and deal score before you buy.
        </p>

        <div className="dashboard-grid-2" style={{ marginBottom: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>Scan Deal</h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '12px'
              }}
            >
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Item name"
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

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="tools">Tools</option>
                <option value="electronics">Electronics</option>
                <option value="collectibles">Collectibles</option>
                <option value="appliances">Appliances</option>
                <option value="furniture">Furniture</option>
                <option value="other">Other</option>
              </select>

              <input
                type="number"
                step="0.01"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="Buy price"
              />

              <input
                type="number"
                step="0.01"
                value={expectedSalePrice}
                onChange={(e) => setExpectedSalePrice(e.target.value)}
                placeholder="Expected sale price"
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

              <button
                type="button"
                className="btn"
                onClick={saveToInventory}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save to Inventory'}
              </button>
            </div>

            {message ? (
              <p className="muted" style={{ marginTop: '12px' }}>
                {message}
              </p>
            ) : null}
          </div>

          <div
            className="card"
            style={{
              background:
                analysis.recommendation === 'BUY'
                  ? 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(255,255,255,0.03))'
                  : analysis.recommendation === 'GOOD'
                  ? 'linear-gradient(135deg, rgba(245,184,77,0.15), rgba(255,255,255,0.03))'
                  : 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(255,255,255,0.03))'
            }}
          >
            <p className="muted" style={{ marginBottom: '8px' }}>
              FlipBot Decision
            </p>

            <h2 style={{ marginBottom: '10px' }}>
              {analysis.recommendation === 'BUY'
                ? '🚀 BUY'
                : analysis.recommendation === 'GOOD'
                ? '⚡ GOOD'
                : '🛑 PASS'}
            </h2>

            <p className="muted" style={{ marginBottom: '18px' }}>
              Risk level: {analysis.risk}
            </p>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div className="card">
                <p className="muted">Projected Profit</p>
                <h2>${analysis.profit.toFixed(2)}</h2>
              </div>

              <div className="dashboard-grid-2">
                <div className="card">
                  <p className="muted">ROI</p>
                  <h2>{analysis.roi.toFixed(1)}%</h2>
                </div>

                <div className="card">
                  <p className="muted">Deal Score</p>
                  <h2>{analysis.dealScore}/10</h2>
                </div>
              </div>

              <div className="dashboard-grid-2">
                <div className="card">
                  <p className="muted">Demand</p>
                  <h2>{analysis.demandScore}/10</h2>
                </div>

                <div className="card">
                  <p className="muted">Marketplace</p>
                  <h2 style={{ fontSize: '1.2rem' }}>{marketplace}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid-4" style={{ marginBottom: '24px' }}>
          <div className="card">
            <p className="muted">Buy Price</p>
            <h2>${analysis.buy.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Expected Sale</p>
            <h2>${analysis.sell.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Fees</p>
            <h2>${analysis.feeNum.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Shipping</p>
            <h2>${analysis.shipNum.toFixed(2)}</h2>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>FlipBot Analysis Logic</h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            <div className="card">
              <strong>Profit Engine</strong>
              <p className="muted" style={{ marginTop: '6px' }}>
                Profit = sale price - buy price - fees - shipping
              </p>
            </div>

            <div className="card">
              <strong>ROI Engine</strong>
              <p className="muted" style={{ marginTop: '6px' }}>
                ROI = profit ÷ buy price × 100
              </p>
            </div>

            <div className="card">
              <strong>Deal Score Engine</strong>
              <p className="muted" style={{ marginTop: '6px' }}>
                Higher profit + higher ROI + stronger demand = higher score and stronger buy signal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}