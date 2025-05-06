import React, { useRef, useEffect } from 'react';
import { useStocks } from '../context/StockContext';
import StockRow from './StockRow';

export default function StockList() {
  const { stocks } = useStocks();
  const listRef = useRef(null);
  const headerRef = useRef(null);
  
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.opacity = '0';
      headerRef.current.style.transform = 'translateY(15px)';
      
      setTimeout(() => {
        headerRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);
  
  return (
    <div className="stock-list" ref={listRef}>
      <header className="stock-list-header" ref={headerRef}>
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
        stocks.map((stock, index) => (
          <StockRow 
            key={stock.id} 
            stock={stock} 
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))
      )}
    </div>
  );
} 