'use client'

import { useState } from 'react'

export default function AIListingGeneratorPage() {
  const [form, setForm] = useState({
    itemName: '',
    brand: '',
    condition: 'Used',
    category: 'Tools',
    notes: '',
    priceTarget: '',
  })
  const [result, setResult] = useState(null)
  const [notice, setNotice] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function generateListing(e) {
    e.preventDefault()
    setNotice('')
    setResult(null)

    const res = await fetch('/api/generate-ai-listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!data.ok) {
      setNotice(data.message || 'Generation failed.')
      return
    }

    setResult(data.listing)
    setNotice('AI listing generated.')
  }

  return (
    <main className="page">
      <div className="container">
        <h1>AI Listing Generator</h1>
        <p className="muted">Generate a stronger marketplace title, description, and keyword set.</p>

        <form className="card" onSubmit={generateListing}>
          <div className="grid grid-2">
            <input name="itemName" value={form.itemName} onChange={handleChange} placeholder="Item name" />
            <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
            <select name="condition" value={form.condition} onChange={handleChange}>
              <option>Used</option>
              <option>New</option>
              <option>Refurbished</option>
            </select>
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Tools</option>
              <option>Electronics</option>
              <option>Appliances</option>
              <option>Furniture</option>
              <option>Collectibles</option>
            </select>
          </div>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Extra details, defects, accessories included, pickup info, etc."
            style={{ marginTop: '12px' }}
          />

          <input
            name="priceTarget"
            value={form.priceTarget}
            onChange={handleChange}
            placeholder="Target sale price"
            style={{ marginTop: '12px' }}
          />

          <button className="btn" style={{ marginTop: '12px' }} type="submit">
            Generate Listing
          </button>
        </form>

        {notice && <p className="notice">{notice}</p>}

        {result && (
          <div className="grid grid-2" style={{ marginTop: '20px' }}>
            <div className="card">
              <h3>Generated Title</h3>
              <p>{result.title}</p>

              <h3 style={{ marginTop: '20px' }}>Generated Description</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{result.description}</p>
            </div>

            <div className="card">
              <h3>Keywords</h3>
              <p>{result.keywords.join(', ')}</p>

              <h3 style={{ marginTop: '20px' }}>Suggested Category</h3>
              <p>{result.category}</p>

              <h3 style={{ marginTop: '20px' }}>Suggested Price</h3>
              <p>${result.price}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

