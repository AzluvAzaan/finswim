import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useStocks } from '../context/StockContext';

export default function StockRow({ stock, style }) {
  const { symbol, qty, purchase, current, loading, error, id } = stock;
  const { removeStock } = useStocks();
  const rowRef = useRef(null);
  const [isRemoving, setIsRemoving] = useState(false);
  
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

  const handleRemove = useCallback(() => {
    if (rowRef.current) {
      setIsRemoving(true);
      rowRef.current.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      rowRef.current.style.opacity = '0';
      rowRef.current.style.transform = 'translateX(50px)';
      
      setTimeout(() => {
        removeStock(id);
      }, 400); // Match timing with transition
    }
  }, [id, removeStock]);
  
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

        <button 
          className="stock-remove-btn" 
          onClick={handleRemove}
          aria-label="Remove stock"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  }
  
  const rowClass = isRemoving ? 'stock-row removing' : 'stock-row';
  return <div className={rowClass} ref={rowRef} style={style}>{content}</div>;
} 