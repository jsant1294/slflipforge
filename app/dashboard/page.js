'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [items, setItems] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    const [{ data: itemsData }, { data: opportunitiesData }, { data: alertsData }] =
      await Promise.all([
        supabase.from('items').select('*').order('created_at', { ascending: false }),
        supabase.from('sourcing_opportunities').select('*').order('created_at', { ascending: false }),
        supabase.from('flipbot_alerts').select('*').order('created_at', { ascending: false }),
      ])

    setItems(itemsData || [])
    setOpportunities(opportunitiesData || [])
    setAlerts(alertsData || [])
  }

  const stats = useMemo(() => {
    const totalInventory = items.length

    const potentialProfit = items.reduce((sum, item) => {
      const buy = Number(item.purchase_price || 0)
      const sell = Number(item.expected_sale_price || 0)
      const fees = Number(item.fees || 0)
      const shipping = Number(item.shipping_cost || 0)
      return sum + (sell - buy - fees - shipping)
    }, 0)

    const activeAlerts = alerts.length

    const hotOpportunities = opportunities.filter((item) => {
      const roi = Number(item.roi || 0)
      const profit = Number(item.estimated_profit || 0)
      return roi >= 50 || profit >= 50
    }).length

    return {
      totalInventory,
      potentialProfit,
      activeAlerts,
      hotOpportunities,
    }
  }, [items, opportunities, alerts])

  const bestFlip = useMemo(() => {
    if (!opportunities.length) return null
    return [...opportunities].sort(
      (a, b) => Number(b.estimated_profit || 0) - Number(a.estimated_profit || 0)
    )[0]
  }, [opportunities])

  return (
    <main className="page">
      <div className="container dashboard-shell">
        <section className="hero-panel">
          <p className="eyebrow">Reseller Intelligence</p>
          <h1>Find profitable flips faster.</h1>
          <p className="hero-text">
            Scan products, estimate resale value, track inventory, and surface the best
            opportunities from one dashboard.
          </p>

          <div className="hero-actions">
            <Link className="btn" href="/flip-scanner">Scan Product</Link>
            <Link className="btn btn-secondary" href="/market-scan">Run Market Scan</Link>
            <Link className="btn btn-secondary" href="/listing-builder">AI Listing</Link>
          </div>
        </section>

        <section className="dashboard-grid dashboard-grid-4">
          <div className="stat-card">
            <p>Items in Inventory</p>
            <div className="stat-number">{stats.totalInventory}</div>
          </div>

          <div className="stat-card">
            <p>Potential Profit</p>
            <div className="stat-number">${stats.potentialProfit.toFixed(2)}</div>
          </div>

          <div className="stat-card">
            <p>Hot Opportunities</p>
            <div className="stat-number">{stats.hotOpportunities}</div>
          </div>

          <div className="stat-card">
            <p>Active Alerts</p>
            <div className="stat-number">{stats.activeAlerts}</div>
          </div>
        </section>

        <section className="dashboard-grid dashboard-main-grid">
          <div className="section-card">
            <div className="section-head">
              <span className="badge badge-hot">Best Flip Today</span>
            </div>

            {bestFlip ? (
              <>
                <h2 className="spotlight-title">{bestFlip.title || 'Untitled Opportunity'}</h2>
                <p className="muted">
                  {bestFlip.source || 'Unknown source'} · {bestFlip.location || 'No location'}
                </p>

                <div className="spotlight-stats">
                  <div className="spotlight-stat">
                    <span>Buy</span>
                    <strong>${Number(bestFlip.asking_price || 0).toFixed(2)}</strong>
                  </div>
                  <div className="spotlight-stat">
                    <span>Sell</span>
                    <strong>${Number(bestFlip.estimated_sale_price || 0).toFixed(2)}</strong>
                  </div>
                  <div className="spotlight-stat">
                    <span>Profit</span>
                    <strong>${Number(bestFlip.estimated_profit || 0).toFixed(2)}</strong>
                  </div>
                  <div className="spotlight-stat">
                    <span>ROI</span>
                    <strong>{Number(bestFlip.roi || 0).toFixed(1)}%</strong>
                  </div>
                </div>

                <div className="hero-actions">
                  <Link className="btn btn-secondary" href="/opportunities">View Opportunities</Link>
                  <Link className="btn btn-secondary" href="/inventory-manager">Inventory</Link>
                </div>
              </>
            ) : (
              <p className="muted">No opportunities loaded yet.</p>
            )}
          </div>

          <div className="section-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              <Link className="quick-action-btn" href="/barcode-lab">
                <span className="quick-action-title">Barcode Lab</span>
                <span className="quick-action-sub">Check resale fast</span>
              </Link>

              <Link className="quick-action-btn" href="/inventory-profit">
                <span className="quick-action-title">Profit View</span>
                <span className="quick-action-sub">Track margins</span>
              </Link>

              <Link className="quick-action-btn" href="/listing-builder">
                <span className="quick-action-title">Create Listing</span>
                <span className="quick-action-sub">Build once, post anywhere</span>
              </Link>

              <Link className="quick-action-btn" href="/flipbot">
                <span className="quick-action-title">Run FlipBot</span>
                <span className="quick-action-sub">Find top deals</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="dashboard-grid dashboard-main-grid">
          <div className="section-card">
            <div className="section-head">
              <h3>Recent Alerts</h3>
              <Link className="text-link" href="/flipbot-alerts">View all</Link>
            </div>

            {alerts.length === 0 ? (
              <p className="muted">No recent alerts yet.</p>
            ) : (
              <div className="stack-list">
                {alerts.slice(0, 3).map((alert) => (
                  <div className="stack-item" key={alert.id}>
                    <div>
                      <strong>{alert.title || 'Untitled Alert'}</strong>
                    </div>
                    <div className="stack-side">
                      <strong>${Number(alert.profit || 0).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section-card">
            <div className="section-head">
              <h3>Inventory Snapshot</h3>
              <Link className="text-link" href="/inventory-manager">Open inventory</Link>
            </div>

            {items.length === 0 ? (
              <p className="muted">No inventory items yet.</p>
            ) : (
              <div className="stack-list">
                {items.slice(0, 3).map((item) => {
                  const buy = Number(item.purchase_price || 0)
                  const sell = Number(item.expected_sale_price || 0)
                  const fees = Number(item.fees || 0)
                  const shipping = Number(item.shipping_cost || 0)
                  const profit = sell - buy - fees - shipping

                  return (
                    <div className="stack-item" key={item.id}>
                      <div>
                        <strong>{item.item_name || 'Untitled Item'}</strong>
                        <p className="muted">
                          {item.marketplace || 'Unknown marketplace'} · {item.status || 'inventory'}
                        </p>
                      </div>
                      <div className="stack-side">
                        <strong>${profit.toFixed(2)}</strong>
                        <div className="muted">est. profit</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}