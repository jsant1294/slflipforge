'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'
import ProfitChart from '../../components/ProfitChart'


export default function DashboardPage() {

const [items,setItems] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{
loadDashboard()
},[])

async function loadDashboard(){

const {data,error} = await supabase
.from('items')
.select('*')
.order('created_at',{ascending:false})

if(!error){
setItems(data || [])
}

setLoading(false)

}

function getProfit(item){

const buy = Number(item.purchase_price || 0)
const sell = Number(item.expected_sale_price || 0)
const fees = Number(item.fees || 0)
const ship = Number(item.shipping_cost || 0)

return sell - buy - fees - ship

}

function getROI(item){

const buy = Number(item.purchase_price || 0)

if(buy <= 0) return 0

return (getProfit(item)/buy)*100

}

const stats = useMemo(()=>{

const totalCost = items.reduce((s,i)=>s+Number(i.purchase_price||0),0)

const projectedRevenue = items.reduce((s,i)=>s+Number(i.expected_sale_price||0),0)

const projectedProfit = items.reduce((s,i)=>s+getProfit(i),0)

const bestFlip = [...items]
.sort((a,b)=>getProfit(b)-getProfit(a))[0]

return {
totalCost,
projectedRevenue,
projectedProfit,
bestFlip
}

},[items])

const leaderboard = useMemo(()=>{

return [...items]
.map(item=>({
...item,
profit:getProfit(item),
roi:getROI(item)
}))
.sort((a,b)=>b.profit-a.profit)
.slice(0,5)

},[items])

return(

<main className="page">

<div className="container">

<p className="muted">SLFlipForge</p>

<h1 style={{marginBottom:'10px'}}>
Command Center
</h1>

<p className="muted" style={{maxWidth:'720px'}}>
Track inventory, profit, alerts, and sourcing opportunities from one flipping dashboard.
</p>

<div style={{
display:'flex',
gap:'12px',
flexWrap:'wrap',
marginTop:'18px'
}}>

<Link href="/inventory-manager" className="btn">
Open Inventory
</Link>

<Link href="/flip-scanner" className="btn">
Open Scanner
</Link>

</div>

<div style={{
display:'grid',
gridTemplateColumns:'repeat(3,minmax(0,1fr))',
gap:'16px',
marginTop:'26px'
}}>

<div className="card">

<p className="muted">
Projected Profit
</p>

<h2 style={{fontSize:'32px'}}>
${stats.projectedProfit.toFixed(2)}
</h2>

</div>

<div className="card">

<p className="muted">
Inventory Cost
</p>

<h2>
${stats.totalCost.toFixed(2)}
</h2>

</div>

<div className="card">

<p className="muted">
Projected Revenue
</p>

<h2>
${stats.projectedRevenue.toFixed(2)}
</h2>

</div>

</div>

<div className="card" style={{
marginTop:'24px',
padding:'28px',
background:'linear-gradient(135deg,#0f172a,#1e293b)'
}}>

<h3 style={{marginBottom:'12px'}}>
🚀 Rocket Profit Counter
</h3>

<div style={{
display:'flex',
alignItems:'center',
justifyContent:'space-between'
}}>

<div>

<p className="muted">
Total Potential Profit
</p>

<h2 style={{fontSize:'34px',fontWeight:'700'}}>
${stats.projectedProfit.toFixed(2)}
</h2>

</div>

<div style={{
fontSize:'42px',
animation:'rocketFloat 2s ease-in-out infinite'
}}>
🚀
</div>

</div>

<p className="muted" style={{marginTop:'8px'}}>
Every flip fuels the rocket.
</p>

</div>

{stats.bestFlip && (

<div className="card" style={{marginTop:'24px'}}>

<p className="muted">
Best Flip
</p>

<h3>
{stats.bestFlip.item_name}
</h3>

<p className="muted">
Profit: ${getProfit(stats.bestFlip).toFixed(2)} • ROI: {getROI(stats.bestFlip).toFixed(0)}%
</p>

<p className="muted">
{stats.bestFlip.marketplace} • {stats.bestFlip.status}
</p>

</div>

)}

<div className="card" style={{marginTop:'24px'}}>

<h3>
Flip Leaderboard
</h3>

{loading ? (

<p>Loading flips...</p>

): leaderboard.length === 0 ? (

<p>No flips yet.</p>

):(

<div style={{display:'grid',gap:'12px',marginTop:'16px'}}>

{leaderboard.map((item,index)=>(
<div key={item.id} style={{
display:'grid',
gridTemplateColumns:'60px 1fr 120px 120px',
gap:'12px',
alignItems:'center',
padding:'10px',
border:'1px solid rgba(255,255,255,0.08)',
borderRadius:'10px'
}}>

<div>
<strong>
#{index+1}
</strong>
</div>

<div>
{item.item_name}
</div>

<div>
${item.profit.toFixed(2)}
</div>

<div>
{item.roi.toFixed(0)}%
</div>

</div>
))}

</div>

)}

</div>

<div className="card" style={{marginTop:'24px'}}>

<h3>
Profit Overview
</h3>

<ProfitChart items={items} />

</div>

</div>

</main>

)

}