'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    buyer_name: '',
    item_id: '',
    item_name: '',
    message: '',
    status: 'new',
    buyer_stage: 'new',
  });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    loadMessages();
    loadItems();
  }, []);

  async function loadMessages() {
    const { data, error } = await supabase
      .from('buyer_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setMessages(data || []);
  }

  async function loadItems() {
    const { data, error } = await supabase
      .from('items')
      .select('id, item_name')
      .order('created_at', { ascending: false });

    if (!error) setItems(data || []);
  }

  async function addMessage(e) {
    e.preventDefault();

    const { error } = await supabase.from('buyer_inquiries').insert([{
      buyer_name: form.buyer_name,
      item_id: form.item_id || null,
      item_name: form.item_name,
      message: form.message,
      status: form.status,
      buyer_stage: form.buyer_stage,
    }]);

    if (error) {
      setNotice(error.message);
      return;
    }

    setForm({
      buyer_name: '',
      item_id: '',
      item_name: '',
      message: '',
      status: 'new',
      buyer_stage: 'new',
    });

    setNotice('Message saved.');
    loadMessages();
  }

  async function updateBuyerStage(id, buyerStage) {
    const { error } = await supabase
      .from('buyer_inquiries')
      .update({ buyer_stage: buyerStage })
      .eq('id', id);

    if (error) {
      setNotice(error.message);
      return;
    }

    setNotice(`Buyer stage updated to ${buyerStage}.`);
    loadMessages();
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Messages V3</h1>

        <form className="card" onSubmit={addMessage} style={{ marginBottom: '20px' }}>
          <input value={form.buyer_name} onChange={(e) => setForm((p) => ({ ...p, buyer_name: e.target.value }))} placeholder="Buyer name" />

          <select
            value={form.item_id}
            onChange={(e) => {
              const chosen = items.find((item) => item.id === e.target.value);
              setForm((p) => ({
                ...p,
                item_id: e.target.value,
                item_name: chosen?.item_name || '',
              }));
            }}
          >
            <option value="">Link to item (optional)</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.item_name || 'Untitled Item'}
              </option>
            ))}
          </select>

          <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Message" />

          <select value={form.buyer_stage} onChange={(e) => setForm((p) => ({ ...p, buyer_stage: e.target.value }))}>
            <option value="new">New</option>
            <option value="interested">Interested</option>
            <option value="negotiating">Negotiating</option>
            <option value="ready_to_buy">Ready to Buy</option>
            <option value="closed">Closed</option>
          </select>

          <button className="btn" type="submit">Save Message</button>
        </form>

        {notice && <p className="notice">{notice}</p>}

        <div className="grid">
          {messages.length === 0 ? (
            <div className="card"><p className="muted">No messages yet.</p></div>
          ) : (
            messages.map((msg) => (
              <div className="card" key={msg.id}>
                <h3>{msg.buyer_name || 'Unknown Buyer'}</h3>
                {msg.item_name && <p className="muted">Linked Item: {msg.item_name}</p>}
                <p>{msg.message}</p>
                <p className="muted">Stage: {msg.buyer_stage || 'new'}</p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <button className="btn btn-secondary" type="button" onClick={() => updateBuyerStage(msg.id, 'interested')}>Interested</button>
                  <button className="btn btn-secondary" type="button" onClick={() => updateBuyerStage(msg.id, 'negotiating')}>Negotiating</button>
                  <button className="btn btn-secondary" type="button" onClick={() => updateBuyerStage(msg.id, 'ready_to_buy')}>Ready to Buy</button>
                  <button className="btn btn-secondary" type="button" onClick={() => updateBuyerStage(msg.id, 'closed')}>Closed</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

