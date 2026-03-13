'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AnalyticsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data } = await supabase.from('items').select('*');
    setItems(data || []);
  }

  const categoryBreakdown = useMemo(() => {
    const groups = {};
    items.forEach((item) => {
      const key = item.category || 'Uncategorized';
      if (!groups[key]) {
        groups[key] = { count: 0, profit: 0, avgScore: 0, avgConfidence: 0 };
      }
      groups[key].count += 1;
      groups[key].profit += Number(item.expected_sale_price || 0) - Number(item.purchase_price || 0) - Number(item.fees || 0) - Number(item.shipping_cost || 0);
      groups[key].avgScore += Number(item.flip_score || 0);
      groups[key].avgConfidence += Number(item.confidence_score || 0);
    });

    return Object.entries(groups).map(([category, values]) => ({
      category,
      count: values.count,
      profit: values.profit,
      avgScore: values.count ? values.avgScore / values.count : 0,
      avgConfidence: values.count ? values.avgConfidence / values.count : 0,
    }));
  }, [items]);

  const stats = useMemo(() => {
    const inventoryValue = items.reduce((sum, item) => sum + Number(item.purchase_price || 0), 0);
    const expectedRevenue = items.reduce((sum, item) => sum + Number(item.expected_sale_price || 0), 0);
    const fees = items.reduce((sum, item) => sum + Number(item.fees || 0), 0);
    const shipping = items.reduce((sum, item) => sum + Number(item.shipping_cost || 0), 0);
    const expectedProfit = expectedRevenue - inventoryValue - fees - shipping;
    const roi = inventoryValue > 0 ? (expectedProfit / inventoryValue) * 100 : 0;
    const avgFlipScore = items.length ? items.reduce((sum, item) => sum + Number(item.flip_score || 0), 0) / items.length : 0;
    const avgConfidence = items.length ? items.reduce((sum, item) => sum + Number(item.confidence_score || 0), 0) / items.length : 0;

    return { inventoryValue, expectedRevenue, fees, shipping, expectedProfit, roi, avgFlipScore, avgConfidence };
  }, [items]);

  return (
    <main className="page">
      <div className="container">
        <h1>Analytics V4</h1>
        <div className="grid grid-3" style={{ marginBottom: '20px' }}>
          <div className="card"><h3>Inventory Value</h3><p>${stats.inventoryValue.toFixed(2)}</p></div>
          <div className="card"><h3>Expected Revenue</h3><p>${stats.expectedRevenue.toFixed(2)}</p></div>
          <div className="card"><h3>Total Fees</h3><p>${stats.fees.toFixed(2)}</p></div>
          <div className="card"><h3>Total Shipping</h3><p>${stats.shipping.toFixed(2)}</p></div>
          <div className="card"><h3>Expected Profit</h3><p>${stats.expectedProfit.toFixed(2)}</p></div>
          <div className="card"><h3>ROI</h3><p>{stats.roi.toFixed(1)}%</p></div>
          <div className="card"><h3>Average Flip Score</h3><p>{stats.avgFlipScore.toFixed(1)}</p></div>
          <div className="card"><h3>Average Confidence</h3><p>{stats.avgConfidence.toFixed(1)}</p></div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Category Performance</h3>
          {categoryBreakdown.length === 0 ? (
            <p className="muted">No category data yet.</p>
          ) : (
            <div className="grid" style={{ gap: '12px' }}>
              {categoryBreakdown.map((row) => (
                <div
                  key={row.category}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '14px',
                  }}
                >
                  <div>
                    <strong>{row.category}</strong>
                    <p className="muted" style={{ margin: '6px 0 0' }}>{row.count} items</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>${Number(row.profit || 0).toFixed(2)}</strong>
                    <p className="muted" style={{ margin: '6px 0 0' }}>
                      score {Number(row.avgScore || 0).toFixed(1)} · confidence {Number(row.avgConfidence || 0).toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
