'use client'

import { useState } from 'react'

export default function ListingBuilderPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Tools',
    condition: 'Used',
  })
  const [notice, setNotice] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function saveDraft(e) {
    e.preventDefault()
    setNotice('Listing draft saved in V11 prototype UI.')
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Listing Builder</h1>
        <p className="muted">Create one listing draft that can later be posted to multiple marketplaces.</p>

        <form className="card" onSubmit={saveDraft}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Listing title" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Listing description" style={{ marginTop: '12px' }} />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" style={{ marginTop: '12px' }} />
          <select name="category" value={form.category} onChange={handleChange} style={{ marginTop: '12px' }}>
            <option>Tools</option>
            <option>Electronics</option>
            <option>Appliances</option>
            <option>Furniture</option>
            <option>Collectibles</option>
          </select>
          <select name="condition" value={form.condition} onChange={handleChange} style={{ marginTop: '12px' }}>
            <option>Used</option>
            <option>New</option>
            <option>Refurbished</option>
          </select>
          <button className="btn" style={{ marginTop: '12px' }} type="submit">Save Listing Draft</button>
        </form>

        {notice && <p className="notice">{notice}</p>}
      </div>
    </main>
  )
}

