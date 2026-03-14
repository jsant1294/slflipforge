'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function ProfitChart({ items }) {

  const data = items.map(item => ({
    name: item.item_name,
    profit:
      Number(item.expected_sale_price || 0) -
      Number(item.purchase_price || 0) -
      Number(item.fees || 0) -
      Number(item.shipping_cost || 0)
  }))

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="profit" fill="#f5b84d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
