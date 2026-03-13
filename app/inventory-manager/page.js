'use client';

import { useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function FlipScannerPage() {
  const [itemName, setItemName] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [marketplace, setMarketplace] = useState('Facebook');
  const [category, setCategory] = useState('Tools');
  const [sourceUrl, setSourceUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');

  const analysis = useMemo(() => {
    const buy = Number(buyPrice || 0);

    const categoryMultiplier = {
      Tools: { low: 1.8, base: 2.25, high: 2.7, demand: 8 },
      Electronics: { low: 1.5, base: 1.9, high: 2.3, demand: 7 },
      Appliances: { low: 1.4, base: 1.7, high: 2.0, demand: 6 },
      Furniture: { low: 1.3, base: 1.6, high: 1.9, demand: 5 },
      Collectibles: { low: 1.7, base: 2.4, high: 3.1, demand: 8 },
      Auto: { low: 1.4, base: 1.8, high: 2.2, demand: 6 },
    };

    const meta = categoryMultiplier[category] || categoryMultiplier.Tools;
    const lowResale = buy > 0 ? Number((buy * meta.low).toFixed(2)) : 0;
    const baseResale = buy > 0 ? Number((buy * meta.base).toFixed(2)) : 0;
    const highResale = buy > 0 ? Number((buy * meta.high).toFixed(2)) : 0;
    const demandScore = meta.demand;

    const fees = Number((baseResale * 0.08).toFixed(2));
    const shipping = category === 'Furniture' ? 0 : Number((baseResale * 0.05).toFixed(2));
    const estimatedProfit = baseResale - buy - fees - shipping;
    const roi = buy > 0 ? Number(((estimatedProfit / buy) * 100).toFixed(1)) : 0;

    let flipScore = 0;
    if (buy > 0) {
      flipScore = Number((((roi * 0.6) + (demandScore * 8)) / 10).toFixed(1));
    }

    const grade =
      flipScore >= 12 ? 'A+' :
      flipScore >= 10 ? 'A' :
      flipScore >= 8 ? 'B' :
      flipScore >= 6 ? 'C' : 'D';

    return {
      lowResale,
      baseResale,
      highResale,
      fees,
      shipping,
      estimatedProfit,
      roi,
      demandScore,
      flipScore,
      grade,
    };
  }, [buyPrice, category]);

  async function saveToInventory() {
    setMessage('');

    const payload = {
      item_name: itemName,
      purchase_price: Number(buyPrice || 0),
      expected_sale_price: Number(analysis.baseResale || 0),
      marketplace,
      category,
      source_url: sourceUrl,
      image_name: imageName,
      demand_score: Number(analysis.demandScore || 0),
      flip_score: Number(analysis.flipScore || 0),
      fees: Number(analysis.fees || 0),
      shipping_cost: Number(analysis.shipping || 0),
      estimated_profit: Number(analysis.estimatedProfit || 0),
      status: 'inventory',
    };

    const { error } = await supabase.from('items').insert([payload]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage('Flip saved to inventory.');
    setItemName('');
    setBuyPrice('');
    setMarketplace('Facebook');
    setCategory('Tools');
    setSourceUrl('');
    setImageName('');
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageName(file.name);
    setMessage('Photo selected. Image analysis placeholder ready for future AI upgrade.');
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Flip Scanner V3</h1>
        <p className="muted">Estimate low/base/high resale, ROI, demand, and flip score.</p>

        <div className="grid grid-2">
          <div className="card">
            <input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item name" />
            <input type="number" step="0.01" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="Buy price" />
            <input value={marketplace} onChange={(e) => setMarketplace(e.target.value)} placeholder="Marketplace" />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Tools</option>
              <option>Electronics</option>
              <option>Appliances</option>
              <option>Furniture</option>
              <option>Collectibles</option>
              <option>Auto</option>
            </select>
            <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="Source URL (optional)" />
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {imageName && <p className="muted">Selected photo: {imageName}</p>}
            <button className="btn" onClick={saveToInventory}>Save to Inventory</button>
            {message && <p className="notice" style={{ marginTop: '16px' }}>{message}</p>}
          </div>

          <div className="card">
            <h3>Deal Analysis</h3>
            <p><strong>Low Resale:</strong> ${analysis.lowResale.toFixed(2)}</p>
            <p><strong>Base Resale:</strong> ${analysis.baseResale.toFixed(2)}</p>
            <p><strong>High Resale:</strong> ${analysis.highResale.toFixed(2)}</p>
            <p><strong>Fees Estimate:</strong> ${analysis.fees.toFixed(2)}</p>
            <p><strong>Shipping Estimate:</strong> ${analysis.shipping.toFixed(2)}</p>
            <p><strong>Estimated Profit:</strong> ${analysis.estimatedProfit.toFixed(2)}</p>
            <p><strong>ROI:</strong> {analysis.roi.toFixed(1)}%</p>
            <p><strong>Demand Score:</strong> {analysis.demandScore}/10</p>
            <p><strong>Flip Score:</strong> {analysis.flipScore.toFixed(1)}</p>
            <p><strong>Grade:</strong> {analysis.grade}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
