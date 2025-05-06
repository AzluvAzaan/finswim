import React from 'react';

export default function StockRow({ stock }) {
  const { symbol, qty, purchase, current, loading, error } = stock;
  let content;
  if (loading) {
    content = <div className="card"><em>Fetching {symbol}…</em></div>;
  } else if (error) {
    content = <div className="card"><span className="text-red">{error}</span></div>;
  } else {
    const profit = ((current - purchase) * qty).toFixed(2);
    const profitClass = profit >= 0 ? 'text-green' : 'text-red';
    const percentChange = (((current - purchase) / purchase) * 100).toFixed(2);
    
    content = (
      <div className="stock-card">
        <div className="stock-header">
          <div className="stock-symbol">{symbol}</div>
          <div className={`stock-profit ${profitClass}`}>
            {profit >= 0 ? '+' : ''}{profit}
            <span className="stock-percent">({percentChange}%)</span>
          </div>
        </div>
        
        <div className="stock-details">
          <div className="stock-detail-row">
            <div className="stock-label">Quantity</div>
            <div className="stock-value">{qty}</div>
          </div>
          <div className="stock-detail-row">
            <div className="stock-label">Purchase Price</div>
            <div className="stock-value">${purchase}</div>
          </div>
          <div className="stock-detail-row">
            <div className="stock-label">Current Price</div>
            <div className="stock-value">${current}</div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="stock-row">{content}</div>;
} 