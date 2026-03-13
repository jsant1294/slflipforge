'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AlertsCenterPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    loadAlerts()
  }, [])

  async function loadAlerts() {
    const { data } = await supabase
      .from('sourcing_opportunities')
      .select('*')
      .eq('auto_alert', true)
      .order('created_at', { ascending: false })

    setItems(data || [])
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Alerts Center</h1>
        <p className="muted">High-priority sourcing leads flagged by the V8 engine.</p>

        <div className="grid">
          {items.length === 0 ? (
            <div className="card">
              <p className="muted">No active V8 auto alerts yet.</p>
            </div>
          ) : (
            items.map((item) => (
              <div className="card" key={item.id}>
                <h3>{item.title}</h3>
                <p><strong>Reason:</strong> {item.alert_reason || 'High AI opportunity score'}</p>
                <p><strong>Estimated Profit:</strong> ${Number(item.estimated_profit || 0).toFixed(2)}</p>
                <p><strong>AI Flip Score:</strong> {Number(item.ai_flip_score || 0).toFixed(1)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
