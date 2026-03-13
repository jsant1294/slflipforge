'use client';
import { useState } from 'react';
const DATA = {
  Atlanta:[{item:'Milwaukee M18 Drill',demand:'High',avg:95,fast:80},{item:'DeWalt Impact Driver',demand:'High',avg:90,fast:75}],
  Houston:[{item:'Makita Grinder',demand:'Medium',avg:70,fast:60},{item:'Generator',demand:'High',avg:420,fast:350}],
  Miami:[{item:'Pressure Washer',demand:'High',avg:180,fast:150},{item:'Window AC Unit',demand:'High',avg:140,fast:110}]
}
export default function MarketIntel(){
  const [city,setCity]=useState('Atlanta')
  const items=DATA[city]
  return(
    <main className="page"><div className="container"><h1>Flip Market Intelligence</h1><p className="muted">See hot categories and high-probability flips by city.</p>
      <select value={city} onChange={(e)=>setCity(e.target.value)}><option>Atlanta</option><option>Houston</option><option>Miami</option></select>
      <div className="grid grid-3" style={{marginTop:'20px'}}>
        {items.map((i)=><div className="card" key={i.item}><h3>{i.item}</h3><p>Demand: {i.demand}</p><p>Fast Sale: ${i.fast}</p><p>Average: ${i.avg}</p></div>)}
      </div>
    </div></main>
  )
}
