'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([])
  const [form, setForm] = useState({ title: '', amount: '', category: 'Supplies' })
  const [notice, setNotice] = useState('')

  useEffect(() => {
    loadExpenses()
  }, [])

  async function loadExpenses() {
    const { data } = await supabase.from('expenses').select('*').order('created_at', { ascending: false })
    setExpenses(data || [])
  }

  async function addExpense(e) {
    e.preventDefault()
    const { error } = await supabase.from('expenses').insert([{
      title: form.title,
      amount: Number(form.amount || 0),
      category: form.category,
    }])

    if (error) {
      setNotice(error.message)
      return
    }

    setForm({ title: '', amount: '', category: 'Supplies' })
    setNotice('Expense saved.')
    loadExpenses()
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Expenses</h1>
        <p className="muted">Track business and sourcing expenses.</p>

        <form className="card" onSubmit={addExpense} style={{ marginBottom: '20px' }}>
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Expense title" />
          <input style={{ marginTop: '12px' }} value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} placeholder="Amount" />
          <select style={{ marginTop: '12px' }} value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
            <option>Supplies</option>
            <option>Fuel</option>
            <option>Shipping</option>
            <option>Tools</option>
            <option>Software</option>
          </select>
          <button className="btn" style={{ marginTop: '12px' }} type="submit">Save Expense</button>
        </form>

        {notice && <p className="notice">{notice}</p>}

        <div className="grid">
          {expenses.map((expense) => (
            <div className="card" key={expense.id}>
              <h3>{expense.title}</h3>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Amount:</strong> ${Number(expense.amount || 0).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
