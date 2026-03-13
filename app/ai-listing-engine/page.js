'use client';
import { useState } from 'react';
export default function AIListingEnginePage() {
  const [itemName, setItemName] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('Good');
  const [location, setLocation] = useState('Alpharetta');
  const [buyPrice, setBuyPrice] = useState('');
  const [result, setResult] = useState(null);
  function generateListing() {
    const cleanItem = itemName || 'Milwaukee M18 Drill';
    const cleanBrand = brand || 'Milwaukee';
    const buy = parseFloat(buyPrice || 0);
    const priceAverage = buy > 0 ? (buy * 2.25).toFixed(2) : '95.00';
    setResult({
      titleEn: `${cleanItem} - ${condition} Condition - ${location} Pickup`,
      titleEs: `${cleanItem} - Buen Estado - Recogida en ${location}`,
      descriptionEn: `${cleanItem} by ${cleanBrand} in ${condition.toLowerCase()} condition. Local pickup available in ${location}.`,
      descriptionEs: `${cleanItem} marca ${cleanBrand} en buen estado. Disponible para recoger localmente en ${location}.`,
      priceAverage
    });
  }
  return(
    <main className="page"><div className="container"><h1>AI Listing Engine</h1>
      <div className="grid grid-2">
        <div className="card">
          <label>Item Name</label><input value={itemName} onChange={(e)=>setItemName(e.target.value)} placeholder="Milwaukee M18 Drill" />
          <label>Brand</label><input value={brand} onChange={(e)=>setBrand(e.target.value)} placeholder="Milwaukee" />
          <label>Condition</label><select value={condition} onChange={(e)=>setCondition(e.target.value)}><option>Great</option><option>Good</option><option>Used</option><option>Like New</option></select>
          <label>Location</label><input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Alpharetta" />
          <label>Buy Price</label><input value={buyPrice} onChange={(e)=>setBuyPrice(e.target.value)} type="number" placeholder="40" />
          <button className="btn" onClick={generateListing}>Generate Listing</button>
        </div>
        <div className="card">
          <h3>Output Preview</h3>
          {!result && <p className="muted">Your generated listing will appear here.</p>}
          {result && <>
            <h4>English Title</h4><p>{result.titleEn}</p>
            <h4>Spanish Title</h4><p>{result.titleEs}</p>
            <h4>English Description</h4><p>{result.descriptionEn}</p>
            <h4>Spanish Description</h4><p>{result.descriptionEs}</p>
            <p><strong>Suggested Price:</strong> ${result.priceAverage}</p>
          </>}
        </div>
      </div>
    </div></main>
  )
}
