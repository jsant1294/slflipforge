'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const starterDeals = [
  {
    title: 'Milwaukee Fuel Hammer Drill Kit',
    source: 'Facebook Marketplace',
    category: 'Tools',
    asking_price: 65,
    estimated_sale_price: 145,
    estimated_profit: 68,
    roi: 104.6,
    distance_miles: 9,
    condition: 'Used',
    location: 'Alpharetta, GA',
    source_url: 'https://example.com/milwaukee-fuel',
    confidence_score: 7.8,
    watch_priority: 'high',
    ebay_sold_count: 12,
    ai_flip_score: 88,
    auto_alert: true,
    alert_reason: 'High profit + strong sold comps',
    scanner_source: 'facebook-stream',
  },
  {
    title: 'DeWalt XR Combo Kit',
    source: 'Craigslist',
    category: 'Tools',
    asking_price: 80,
    estimated_sale_price: 170,
    estimated_profit: 72,
    roi: 90.0,
    distance_miles: 15,
    condition: 'Used',
    location: 'Roswell, GA',
    source_url: 'https://example.com/dewalt-xr',
    confidence_score: 8.2,
    watch_priority: 'high',
    ebay_sold_count: 18,
    ai_flip_score: 91,
    auto_alert: true,
    alert_reason: 'Strong ROI and multi-source comps',
    scanner_source: 'craigslist-stream',
  }
]

export default function OpportunitiesPage() {
  const [items, setItems] = useState([])
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [sourceFilter, setSourceFilter] = useState('all')

  useEffect(() => {
    loadDeals()
  }, [])

  async function loadDeals() {
    setLoading(true)
    const { data, error } = await supabase
      .from('sourcing_opportunities')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setNotice(error.message)
      setItems([])
      setLoading(false)
      return
    }

    if (!data || data.length === 0) {
      const prepared = starterDeals.map((deal) => ({
        ...deal,
        auto_alert: !!deal.auto_alert,
      }))

      const inserted = await supabase.from('sourcing_opportunities').insert(prepared).select('*')
      if (inserted.error) {
        setNotice(inserted.error.message)
        setItems(prepared)
      } else {
        setItems(inserted.data || [])
      }
    } else {
      setItems(data)
    }

    setLoading(false)
  }

  async function flagAutoAlert(id, aiFlipScore, estimatedProfit) {
    const alertReason = aiFlipScore >= 85
      ? 'AI flip score exceeded V8 threshold'
      : estimatedProfit >= 60
      ? 'Estimated profit exceeded V8 threshold'
      : 'Manual alert flag'

    const { error } = await supabase
      .from('sourcing_opportunities')
      .update({ auto_alert: true, alert_reason: alertReason })
      .eq('id', id)

    if (error) {
      setNotice(error.message)
      return
    }

    setNotice('Lead flagged in Alerts Center.')
    loadDeals()
  }

  const filtered = useMemo(() => {
    return items.filter((item) =>
      sourceFilter === 'all' ? true : String(item.source || '').toLowerCase() === sourceFilter.toLowerCase()
    )
  }, [items, sourceFilter])

  return (
    <main className="page">
      <div className="container">
        <h1>V8 Opportunity Engine</h1>
        <p className="muted">Review marketplace leads, sold comps, AI scores, and alert thresholds.</p>

        <div className="card" style={{ marginBottom: '20px' }}>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="all">All sources</option>
            <option value="facebook marketplace">Facebook Marketplace</option>
            <option value="craigslist">Craigslist</option>
          </select>
        </div>

        {notice && <p className="notice">{notice}</p>}

        {loading ? (
          <div className="card"><p className="muted">Loading opportunities...</p></div>
        ) : (
          <div className="grid">
            {filtered.map((deal) => (
              <div className="card" key={deal.id}>
                <h3>{deal.title}</h3>
                <p className="muted">{deal.source} · {deal.location} · {deal.scanner_source || 'manual'}</p>
                <p><strong>Asking:</strong> ${Number(deal.asking_price || 0).toFixed(2)}</p>
                <p><strong>Estimated Sale:</strong> ${Number(deal.estimated_sale_price || 0).toFixed(2)}</p>
                <p><strong>Estimated Profit:</strong> ${Number(deal.estimated_profit || 0).toFixed(2)}</p>
                <p><strong>ROI:</strong> {Number(deal.roi || 0).toFixed(1)}%</p>
                <p><strong>Confidence:</strong> {Number(deal.confidence_score || 0).toFixed(1)}/10</p>
                <p><strong>eBay Sold Count:</strong> {Number(deal.ebay_sold_count || 0)}</p>
                <p><strong>AI Flip Score:</strong> {Number(deal.ai_flip_score || 0).toFixed(1)}</p>
                <p><strong>Auto Alert:</strong> {deal.auto_alert ? 'On' : 'Off'}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <button className="btn" onClick={() => flagAutoAlert(deal.id, deal.ai_flip_score, deal.estimated_profit)}>
                    Flag Alert
                  </button>
                  <a className="btn btn-secondary" href={deal.source_url || '#'} target="_blank" rel="noreferrer">
                    Open Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
