import React from 'react';
import { useStocks } from '../context/StockContext';
import StockRow from './StockRow';

export default function StockList() {
  const { stocks } = useStocks();
  return (
    <div className="stock-list">
      <header className="stock-list-header">
        <span className="stock-list-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="18" rx="2" stroke="#222" strokeWidth="1.5" fill="none"/>
            <path d="M7 16L10 13L13 16L17 12" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 12H17V13" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="8.5" x2="21" y2="8.5" stroke="#222" strokeWidth="1.5"/>
            <circle cx="5" cy="6" r="1" fill="#222"/>
            <circle cx="8" cy="6" r="1" fill="#222"/>
          </svg>
        </span>
        <h2>Stock List</h2>
      </header>
      {stocks.length === 0 ? (
        <div className="no-stocks">No stocks added yet.</div>
      ) : (
        stocks.map(stock => <StockRow key={stock.id} stock={stock} />)
      )}
    </div>
  );
} 