
'use client'
import { useState } from 'react'

export default function MarketScanPage(){
 const [results,setResults]=useState([])

 async function runScan(){
  const res = await fetch('/api/scan-market',{method:'POST'})
  const data = await res.json()
  setResults(data.items || [])
 }

 return(
  <main className="page">
   <div className="container">
    <h1>Market Scanner</h1>
    <button className="btn" onClick={runScan}>Scan Marketplace</button>

    <div className="grid" style={{marginTop:'20px'}}>
     {results.map((r,i)=>(
      <div className="card" key={i}>
       <h3>{r.title}</h3>
       <p>Price: ${r.price}</p>
       <p>Resale: ${r.resale}</p>
       <p>Profit: ${r.profit}</p>
      </div>
     ))}
    </div>

   </div>
  </main>
 )
}
