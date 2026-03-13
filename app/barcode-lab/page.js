'use client'

import { useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const seedCatalog = {
  '045242778001': {
    product_title: 'Milwaukee Fuel Hammer Drill Kit',
    brand: 'Milwaukee',
    category: 'Tools',
    avg_market_price: 149,
  },
  '885911123456': {
    product_title: 'DeWalt XR Combo Kit',
    brand: 'DeWalt',
    category: 'Tools',
    avg_market_price: 175,
  },
  '088381987654': {
    product_title: 'Makita Brushless Impact Kit',
    brand: 'Makita',
    category: 'Tools',
    avg_market_price: 129,
  },
}

export default function BarcodeLabPage() {
  const [barcode, setBarcode] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [result, setResult] = useState(null)
  const [notice, setNotice] = useState('')

  const analysis = useMemo(() => {
    const buy = Number(buyPrice || 0)
    const avg = Number(result?.avg_market_price || 0)
    const estimatedProfit = avg - buy - avg * 0.08 - avg * 0.05
    const roi = buy > 0 ? (estimatedProfit / buy) * 100 : 0
    const aiFlipScore = (roi * 0.45) + 45

    return {
      estimatedProfit,
      roi,
      aiFlipScore,
    }
  }, [buyPrice, result])

  async function lookupBarcode() {
    setNotice('')
    setResult(null)

    const code = barcode.trim()

    if (!code) {
      setNotice('Enter a barcode first.')
      return
    }

    const local = seedCatalog[code]

    if (!local) {
      setNotice('No barcode match in local V8 lookup cache.')
      return
    }

    setResult(local)

    await supabase.from('barcode_lookup_cache').upsert(
      [
        {
          barcode: code,
          product_title: local.product_title,
          brand: local.brand,
          category: local.category,
          avg_market_price: local.avg_market_price,
        },
      ],
      { onConflict: 'barcode' }
    )
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Barcode Lab</h1>
        <p className="muted">Lookup barcode candidates and estimate resale potential.</p>

        <div className="card">
          <input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Enter barcode"
          />

          <input
            style={{ marginTop: '12px' }}
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="Your buy price"
          />

          <div style={{ marginTop: '12px' }}>
            <button className="btn" onClick={lookupBarcode}>
              Lookup Barcode
            </button>
          </div>
        </div>

        {notice && <p className="notice">{notice}</p>}

        {result && (
          <div className="grid grid-2" style={{ marginTop: '20px' }}>
            <div className="card">
              <h3>{result.product_title}</h3>
              <p><strong>Brand:</strong> {result.brand}</p>
              <p><strong>Category:</strong> {result.category}</p>
              <p><strong>Average Market Price:</strong> ${Number(result.avg_market_price).toFixed(2)}</p>
            </div>

            <div className="card">
              <h3>V8 Projection</h3>
              <p><strong>Estimated Profit:</strong> ${analysis.estimatedProfit.toFixed(2)}</p>
              <p><strong>ROI:</strong> {analysis.roi.toFixed(1)}%</p>
              <p><strong>AI Flip Score:</strong> {analysis.aiFlipScore.toFixed(1)}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}