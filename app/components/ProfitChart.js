'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

export default function ProfitChart({ items }) {
  const data = items.map((item) => ({
    name: item.item_name || 'Item',
    profit:
      Number(item.expected_sale_price || 0) -
      Number(item.purchase_price || 0) -
      Number(item.fees || 0) -
      Number(item.shipping_cost || 0)
  }))

  return (
  <div style={{ width: '100%', height: 320 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="profit" fill="#f5b84d" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)