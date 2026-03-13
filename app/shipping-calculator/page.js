'use client'
import { useState } from 'react'

export default function ShippingCalculatorPage() {
  const [salePrice, setSalePrice] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    const sale = Number(salePrice || 0)
    const pounds = Number(weight || 0)
    const fees = sale * 0.08
    const shipping = pounds * 1.75 + 4
    setResult({
      fees,
      shipping,
      net: sale - fees - shipping,
    })
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Shipping Calculator</h1>
        <p className="muted">Estimate fees, shipping cost, and net proceeds.</p>

        <div className="card">
          <input value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="Sale price" />
          <input style={{ marginTop: '12px' }} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (lbs)" />
          <button className="btn" style={{ marginTop: '12px' }} onClick={calculate}>Calculate</button>
        </div>

        {result && (
          <div className="card" style={{ marginTop: '20px' }}>
            <p><strong>Fees:</strong> ${result.fees.toFixed(2)}</p>
            <p><strong>Shipping:</strong> ${result.shipping.toFixed(2)}</p>
            <p><strong>Net After Costs:</strong> ${result.net.toFixed(2)}</p>
          </div>
        )}
      </div>
    </main>
  )
}

