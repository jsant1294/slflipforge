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

  const data = items.map((item) => ({
    name: item.item_name || "Item",
    profit:
      Number(item.expected_sale_price || 0) -
      Number(item.purchase_price || 0) -
      Number(item.fees || 0) -
      Number(item.shipping_cost || 0)
  }))

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />

          <XAxis dataKey="name" />

          <YAxis tickFormatter={(value) => `$${value}`} />

          <Tooltip />

          <Bar
            dataKey="profit"
            fill="#f5b84d"
            radius={[4,4,0,0]}
            barSize={60}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}