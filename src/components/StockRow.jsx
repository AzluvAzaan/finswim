import React, { useRef, useEffect, useCallback } from 'react';

export default function StockRow({ stock, style }) {
  const { symbol, qty, purchase, current, loading, error } = stock;
  const rowRef = useRef(null);
  
  const animateRow = useCallback(() => {
    if (rowRef.current) {
      rowRef.current.style.opacity = '0';
      rowRef.current.style.transform = 'translateY(20px)';
      
      void rowRef.current.offsetWidth;
      
      rowRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      rowRef.current.style.opacity = '1';
      rowRef.current.style.transform = 'translateY(0)';
    }
  }, []);
  
  useEffect(() => {
    animateRow();
  }, [animateRow]);
  
  const calculateProfitDetails = useCallback(() => {
    const profit = ((current - purchase) * qty).toFixed(2);
    const profitClass = profit >= 0 ? 'text-green' : 'text-red';
    const percentChange = (((current - purchase) / purchase) * 100).toFixed(2);
    
    return { profit, profitClass, percentChange };
  }, [current, purchase, qty]);
  
  let content;
  if (loading) {
    content = <div className="card"><em>Fetching {symbol}…</em></div>;
  } else if (error) {
    content = <div className="card"><span className="text-red">{error}</span></div>;
  } else {
    const { profit, profitClass, percentChange } = calculateProfitDetails();
    
    content = (
      <div className="stock-card">
        <div className="stock-header">
          <div className="stock-symbol">{symbol}</div>
          <div className={`stock-profit ${profitClass}`}>
            {profit >= 0 ? '+$' : '-$'}{Math.abs(profit).toFixed(2)} <span className="currency">USD</span>
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
            <div className="stock-value">${purchase.toFixed(2)}</div>
          </div>
          <div className="stock-detail-row">
            <div className="stock-label">Current Price</div>
            <div className="stock-value">${current.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }
  
  return <div className="stock-row" ref={rowRef} style={style}>{content}</div>;
} 