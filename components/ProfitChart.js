'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function ProfitChart({ items }) {
  const data = items
    .map((item) => {
      const buy = Number(item.purchase_price || 0)
      const sell = Number(item.expected_sale_price || 0)
      const fees = Number(item.fees || 0)
      const shipping = Number(item.shipping_cost || 0)
      const profit = sell - buy - fees - shipping
      const roi = buy > 0 ? ((profit / buy) * 100).toFixed(1) : 0

      return {
        name: item.item_name || 'Item',
        profit,
        roi: Number(roi),
        marketplace: item.marketplace || 'Unknown',
        status: item.status || 'inventory'
      }
    })
    .sort((a, b) => b.profit - a.profit)

  const bestFlip = data[0] || null
  const topFive = data.slice(0, 5)

  return (
    <div>
      {bestFlip && (
        <div
          style={{
            marginBottom: '20px',
            padding: '16px',
            border: '1px solid rgba(245,184,77,0.25)',
            borderRadius: '14px',
            background: 'rgba(245,184,77,0.06)'
          }}
        >
          <p style={{ margin: 0, opacity: 0.8 }}>Best Flip</p>
          <h3 style={{ margin: '8px 0 6px 0' }}>{bestFlip.name}</h3>
          <p style={{ margin: 0 }}>
            Profit: <strong>${bestFlip.profit.toFixed(2)}</strong> • ROI:{' '}
            <strong>{bestFlip.roi}%</strong>
          </p>
          <p style={{ margin: '6px 0 0 0', opacity: 0.8 }}>
            {bestFlip.marketplace} • {bestFlip.status}
          </p>
        </div>
      )}

      <div style={{ width: '100%', height: 320, marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topFive}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === 'profit') return [`$${value}`, 'Profit']
                return [value, name]
              }}
              labelFormatter={(label, payload) => {
                const row = payload?.[0]?.payload
                return row ? `${label} • ROI ${row.roi}%` : label
              }}
            />
            <Bar
              dataKey="profit"
              fill="#f5b84d"
              radius={[4, 4, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '12px'
        }}
      >
        {topFive.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 14px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)'
            }}
          >
            <div>
              <strong>{item.name}</strong>
              <div style={{ fontSize: '14px', opacity: 0.75 }}>
                {item.marketplace} • {item.status}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div>
                <strong>${item.profit.toFixed(2)}</strong>
              </div>
              <div style={{ fontSize: '14px', opacity: 0.75 }}>
                ROI {item.roi}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
