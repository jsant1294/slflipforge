'use client'

import { useEffect, useState } from 'react'

export default function ListingTemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [name, setName] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('flipforgeListingTemplates')
      if (saved) setTemplates(JSON.parse(saved))
    } catch (error) {
      console.error(error)
    }
  }, [])

  function saveTemplate() {
    if (!name.trim()) {
      setNotice('Enter a template name first.')
      return
    }

    const next = [...templates, { name: name.trim() }]
    setTemplates(next)
    localStorage.setItem('flipforgeListingTemplates', JSON.stringify(next))
    setName('')
    setNotice('Listing template saved.')
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Listing Templates</h1>
        <p className="muted">Save repeatable listing patterns for faster posting.</p>

        <div className="card" style={{ marginBottom: '20px' }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name" />
          <button className="btn" style={{ marginTop: '12px' }} onClick={saveTemplate}>Save Template</button>
        </div>

        {notice && <p className="notice">{notice}</p>}

        <div className="grid">
          {templates.length === 0 ? (
            <div className="card"><p className="muted">No templates yet.</p></div>
          ) : templates.map((template, index) => (
            <div className="card" key={`${template.name}-${index}`}>
              <h3>{template.name}</h3>
              <p className="muted">Reusable marketplace listing template.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
