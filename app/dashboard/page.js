'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [items, setItems] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    setLoading(true)

    const [
      { data: itemsData },
      { data: opportunitiesData },
      { data: alertsData }
    ] = await Promise.all([
      supabase.from('items').select('*').order('created_at', { ascending: false }),
      supabase.from('sourcing_opportunities').select('*').order('created_at', { ascending: false }),
      supabase.from('flipbot_alerts').select('*').order('created_at', { ascending: false })
    ])

    setItems(itemsData || [])
    setOpportunities(opportunitiesData || [])
    setAlerts(alertsData || [])
    setLoading(false)
  }

  function getProfit(item) {
    const buy = Number(item.purchase_price || 0)
    const sell = Number(item.expected_sale_price || 0)
    const fees = Number(item.fees || 0)
    const shipping = Number(item.shipping_cost || 0)
    return sell - buy - fees - shipping
  }

  const stats = useMemo(() => {
    const totalInventory = items.length

    const potentialProfit = items.reduce((sum, item) => {
      return sum + getProfit(item)
    }, 0)

    const activeAlerts = alerts.length

    const hotOpportunities = opportunities.filter((item) => {
      const roi = Number(item.roi || 0)
      const profit = Number(item.estimated_profit || 0)
      return roi >= 50 || profit >= 50
    }).length

    const bestFlip =
      [...items].sort((a, b) => getProfit(b) - getProfit(a))[0] || null

    return {
      totalInventory,
      potentialProfit,
      activeAlerts,
      hotOpportunities,
      bestFlip
    }
  }, [items, opportunities, alerts])

  const recentItems = items.slice(0, 5)
  const recentAlerts = alerts.slice(0, 5)

  return (
    <main className="page">
      <div className="container">
        <div
          className="card"
          style={{
            marginBottom: '24px',
            padding: '24px',
            background:
              'linear-gradient(180deg, rgba(245,184,77,0.08), rgba(255,255,255,0.02))'
          }}
        >
          <p className="muted" style={{ marginBottom: '8px' }}>
            SLFlipForge
          </p>

          <h1 style={{ marginBottom: '10px' }}>Command Center</h1>

          <p className="muted" style={{ maxWidth: '720px' }}>
            Track inventory, profit, alerts, and sourcing opportunities from one flipping dashboard.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '18px'
            }}
          >
            <Link href="/inventory-manager" className="btn">
              Open Inventory
            </Link>

            <Link href="/flip-scanner" className="btn">
              Open Scanner
            </Link>

            <Link href="/flipbot-alerts" className="btn">
              View Alerts
            </Link>
          </div>
        </div>

        <div className="dashboard-grid-4" style={{ marginBottom: '24px' }}>
          <div className="card">
            <p className="muted">Total Inventory</p>
            <h2>{stats.totalInventory}</h2>
          </div>

          <div className="card">
            <p className="muted">Potential Profit</p>
            <h2>${stats.potentialProfit.toFixed(2)}</h2>
          </div>

          <div className="card">
            <p className="muted">Active Alerts</p>
            <h2>{stats.activeAlerts}</h2>
          </div>

          <div className="card">
            <p className="muted">Hot Opportunities</p>
            <h2>{stats.hotOpportunities}</h2>
          </div>
        </div>

        <div className="dashboard-grid-2" style={{ marginBottom: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>

            <div className="dashboard-grid-2">
              <Link
                href="/inventory-manager"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <strong>Inventory Manager</strong>
                <p className="muted" style={{ marginTop: '6px' }}>
                  Add items, update statuses, and track projected profit.
                </p>
              </Link>

              <Link
                href="/flip-scanner"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <strong>Flip Scanner</strong>
                <p className="muted" style={{ marginTop: '6px' }}>
                  Scan deals and estimate resale margin.
                </p>
              </Link>

              <Link
                href="/flipbot-alerts"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <strong>FlipBot Alerts</strong>
                <p className="muted" style={{ marginTop: '6px' }}>
                  Review sourcing alerts and hot deals.
                </p>
              </Link>

              <Link
                href="/inventory-manager"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <strong>Profit Dashboard</strong>
                <p className="muted" style={{ marginTop: '6px' }}>
                  Review profit charts, leaderboard, and ROI.
                </p>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>Best Flip</h3>

            {stats.bestFlip ? (
              <div>
                <h3 style={{ marginBottom: '8px' }}>
                  {stats.bestFlip.item_name || 'Untitled Item'}
                </h3>

                <p className="muted" style={{ marginBottom: '12px' }}>
                  {stats.bestFlip.marketplace || 'Unknown marketplace'} •{' '}
                  {stats.bestFlip.status || 'inventory'}
                </p>

                <p>Buy: ${Number(stats.bestFlip.purchase_price || 0).toFixed(2)}</p>
                <p>Sell: ${Number(stats.bestFlip.expected_sale_price || 0).toFixed(2)}</p>
                <p>
                  <strong>Profit: ${getProfit(stats.bestFlip).toFixed(2)}</strong>
                </p>
              </div>
            ) : (
              <p className="muted">No flip data yet.</p>
            )}
          </div>
        </div>

        <div className="dashboard-grid-2">
          <div className="card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <h3>Latest Inventory</h3>
              <Link href="/inventory-manager" className="muted">
                Open full inventory
              </Link>
            </div>

            {loading ? (
              <p>Loading dashboard...</p>
            ) : recentItems.length === 0 ? (
              <p className="muted">No inventory yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {recentItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '16px',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <div>
                      <strong>{item.item_name || 'Untitled Item'}</strong>
                      <div className="muted" style={{ marginTop: '6px' }}>
                        {item.marketplace || 'Unknown marketplace'} •{' '}
                        {item.status || 'inventory'}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div>Buy: ${Number(item.purchase_price || 0).toFixed(2)}</div>
                      <div>Sell: ${Number(item.expected_sale_price || 0).toFixed(2)}</div>
                      <div>
                        <strong>Profit: ${getProfit(item).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <h3>Recent Alerts</h3>
              <Link href="/flipbot-alerts" className="muted">
                Open alerts
              </Link>
            </div>

            {loading ? (
              <p>Loading alerts...</p>
            ) : recentAlerts.length === 0 ? (
              <p className="muted">No alerts yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <strong>{alert.title || alert.item_name || 'Flip Alert'}</strong>
                    <div className="muted" style={{ marginTop: '6px' }}>
                      {alert.message || 'New opportunity detected.'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}