'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [items, setItems] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    const itemsRes = await supabase.from('items').select('*').order('created_at', { ascending: false })
    const oppsRes = await supabase.from('sourcing_opportunities').select('*').order('created_at', { ascending: false })

    if (itemsRes.error) setMessage(itemsRes.error.message)
    if (oppsRes.error) setMessage(oppsRes.error.message)

    setItems(itemsRes.data || [])
    setOpportunities(oppsRes.data || [])
  }

  const stats = useMemo(() => {
    const inventoryValue = items.reduce((sum, item) => sum + Number(item.purchase_price || 0), 0)
    const expectedRevenue = items.reduce((sum, item) => sum + Number(item.expected_sale_price || 0), 0)
    const expectedProfit = items.reduce((sum, item) => sum + (
      Number(item.expected_sale_price || 0) -
      Number(item.purchase_price || 0) -
      Number(item.fees || 0) -
      Number(item.shipping_cost || 0)
    ), 0)

    const avgConfidence = items.length
      ? items.reduce((sum, item) => sum + Number(item.confidence_score || 0), 0) / items.length
      : 0

    const hotLeads = opportunities.filter((item) => Boolean(item.auto_alert)).length
    const avgAiFlipScore = opportunities.length
      ? opportunities.reduce((sum, item) => sum + Number(item.ai_flip_score || 0), 0) / opportunities.length
      : 0

    return { inventoryValue, expectedRevenue, expectedProfit, avgConfidence, hotLeads, avgAiFlipScore }
  }, [items, opportunities])

  function money(v) {
    return `$${Number(v || 0).toFixed(2)}`
  }

  return (
    <main className="page">
      <div className="container">
        <h1>SLFlipForge V8 Intelligence Dashboard</h1>
        <p className="muted">Monitor inventory, opportunity quality, and auto-alert sourcing signals.</p>

        {message && <p className="notice">{message}</p>}

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link className="btn" href="/flip-scanner">Scanner</Link>
          <Link className="btn btn-secondary" href="/opportunities">Opportunities</Link>
          <Link className="btn btn-secondary" href="/barcode-lab">Barcode Lab</Link>
          <Link className="btn btn-secondary" href="/alerts-center">Alerts Center</Link>
        </div>

        <div className="grid grid-3">
          <div className="card"><p className="muted">Inventory Value</p><h2>{money(stats.inventoryValue)}</h2></div>
          <div className="card"><p className="muted">Expected Revenue</p><h2>{money(stats.expectedRevenue)}</h2></div>
          <div className="card"><p className="muted">Expected Profit</p><h2>{money(stats.expectedProfit)}</h2></div>
          <div className="card"><p className="muted">Average Confidence</p><h2>{stats.avgConfidence.toFixed(1)}/10</h2></div>
          <div className="card"><p className="muted">Hot Leads</p><h2>{stats.hotLeads}</h2></div>
          <div className="card"><p className="muted">Average AI Flip Score</p><h2>{stats.avgAiFlipScore.toFixed(1)}</h2></div>
        </div>
      </div>
    </main>
  )
}
