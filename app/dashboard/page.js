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

    const ranked = [...opportunities].sort((a, b) => {
      const aProfit = Number(a.estimated_profit || 0)
      const bProfit = Number(b.estimated_profit || 0)
      return bProfit - aProfit
    })

    return ranked[0]
  }, [opportunities])

  const recentAlerts = alerts.slice(0, 3)

  return (
    <main className="page">
      <div className="container dashboard-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Reseller Intelligence</p>
            <h1>Find profitable flips faster.</h1>
            <p className="hero-text">
              Scan products, estimate resale value, track inventory, and surface
              the best opportunities from one dashboard.
            </p>
          </div>

          <div className="hero-actions">
            <Link className="btn dashboard-cta" href="/flip-scanner">
              Scan Product
            </Link>
            <Link className="btn btn-secondary dashboard-cta" href="/market-scan">
              Run Market Scan
            </Link>
            <Link className="btn btn-secondary dashboard-cta" href="/ai-listing-generator">
              AI Listing
            </Link>
          </div>
        </section>

        <section className="dashboard-grid dashboard-grid-4">
          <div className="metric-card">
            <p className="metric-label">Items in Inventory</p>
            <h2>{stats.totalInventory}</h2>
          </div>

          <div className="metric-card">
            <p className="metric-label">Potential Profit</p>
            <h2>${stats.potentialProfit.toFixed(2)}</h2>
          </div>

          <div className="metric-card">
            <p className="metric-label">Hot Opportunities</p>
            <h2>{stats.hotOpportunities}</h2>
          </div>

          <div className="metric-card">
            <p className="metric-label">Active Alerts</p>
            <h2>{stats.activeAlerts}</h2>
          </div>
        </section>

        <section className="dashboard-grid dashboard-main-grid">
          <div className="card spotlight-card">
            <div className="section-head">
              <span className="badge badge-hot">Best Flip Today</span>
            </div>

            {bestFlip ? (
              <>
                <h3 className="spotlight-title">{bestFlip.title || 'Untitled Opportunity'}</h3>
                <p className="muted">
                  {bestFlip.source || 'Unknown source'} · {bestFlip.location || 'No location'}
                </p>

                <div className="spotlight-stats">
                  <div>
                    <span>Buy</span>
                    <strong>${Number(bestFlip.asking_price || 0).toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Sell</span>
                    <strong>${Number(bestFlip.estimated_sale_price || 0).toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Profit</span>
                    <strong>${Number(bestFlip.estimated_profit || 0).toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>ROI</span>
                    <strong>{Number(bestFlip.roi || 0).toFixed(1)}%</strong>
                  </div>
                </div>

                <div className="spotlight-actions">
                  <Link className="btn" href="/opportunities">
                    View Opportunities
                  </Link>
                  <Link className="btn btn-secondary" href="/inventory-manager">
                    Inventory
                  </Link>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No opportunities loaded yet.</p>
                <Link className="btn" href="/market-scan">
                  Start Scanning
                </Link>
              </div>
            )}
          </div>

          <div className="card quick-actions-card">
            <div className="section-head">
              <h3>Quick Actions</h3>
            </div>

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
          <div className="card">
            <div className="section-head">
              <h3>Recent Alerts</h3>
              <Link className="text-link" href="/flipbot-alerts">
                View all
              </Link>
            </div>

            {recentAlerts.length === 0 ? (
              <p className="muted">No recent alerts yet.</p>
            ) : (
              <div className="stack-list">
                {recentAlerts.map((alert) => (
                  <div className="stack-item" key={alert.id}>
                    <div>
                      <strong>{alert.title || 'Untitled Alert'}</strong>
                      <p className="muted">
                        Buy ${Number(alert.buy_price || 0).toFixed(2)} ·
                        Resale ${Number(alert.resale_price || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="stack-side">
                      <strong className="profit-text">
                        ${Number(alert.profit || 0).toFixed(2)}
                      </strong>
                      <span className="muted">{Number(alert.roi || 0).toFixed(0)}% ROI</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <div className="section-head">
              <h3>Inventory Snapshot</h3>
              <Link className="text-link" href="/inventory-manager">
                Open inventory
              </Link>
            </div>

            {items.length === 0 ? (
              <p className="muted">No inventory items yet.</p>
            ) : (
              <div className="stack-list">
                {items.slice(0, 4).map((item) => {
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
                        <span className="muted">est. profit</span>
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