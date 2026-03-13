
'use client'

import { useState } from 'react'

export default function FlipBotPage(){

 const [results,setResults] = useState([])

 async function runBot(){

  const res = await fetch('/api/run-flipbot',{method:'POST'})
  const data = await res.json()

  setResults(data.items || [])

 }

 return(
  <main className="page">
   <div className="container">

    <h1>FlipBot Automation</h1>
    <p className="muted">Automatically detect profitable flips.</p>

    <button className="btn" onClick={runBot}>
     Run FlipBot Scan
    </button>

    <div className="grid" style={{marginTop:'20px'}}>

     {results.map((r,i)=>(
      <div className="card" key={i}>
       <h3>{r.title}</h3>
       <p>Buy: ${r.buy}</p>
       <p>Resale: ${r.resale}</p>
       <p>Profit: ${r.profit}</p>
       <p>ROI: {r.roi}%</p>
      </div>
     ))}

    </div>

   </div>
  </main>
 )
}

