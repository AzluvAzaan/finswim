import React, { useRef, useEffect } from 'react';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import Toast from './components/Toast';
import WaveBackground from './components/WaveBackground';
import { useTheme, useStocks } from './context/StockContext';
import './App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { stocks } = useStocks();
  const mainDivRef = useRef(null);
  const stockListRef = useRef(null);
  
  // Set theme
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <WaveBackground />
      <div className="container">
        <div 
          className="content-wrapper" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '2rem'
          }}
        >
          <div 
            ref={mainDivRef}
            className="main-glow"
            style={{ 
              maxWidth: 640, 
              padding: '3rem 2.5rem', 
              width: '100%'
            }}
          >
            <header className="header" style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
              <span style={{ marginRight: 24 }}>
                {/* Calculator SVG from screenshots */}
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="12" width="40" height="36" rx="4" fill="#fff" stroke="#222" strokeWidth="2"/>
                  <rect x="16" y="20" width="24" height="8" rx="2" fill="#fbbf24" stroke="#222" strokeWidth="2"/>
                  <rect x="16" y="32" width="8" height="8" rx="2" fill="#a7f3d0" stroke="#222" strokeWidth="2"/>
                  <rect x="24" y="32" width="8" height="8" rx="2" fill="#bae6fd" stroke="#222" strokeWidth="2"/>
                  <rect x="32" y="32" width="8" height="8" rx="2" fill="#fca5a5" stroke="#222" strokeWidth="2"/>
                  <rect x="40" y="4" width="8" height="8" rx="2" fill="#fbbf24" stroke="#222" strokeWidth="2"/>
                  <rect x="8" y="4" width="24" height="8" rx="2" fill="#fbbf24" stroke="#222" strokeWidth="2"/>
                  <circle cx="44" cy="44" r="6" fill="#16a34a" stroke="#222" strokeWidth="2"/>
                  <text x="44" y="48" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">$</text>
                </svg>
              </span>
              <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>Finance Dashboard</h1>
              <div style={{ flex: 1 }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="toggle-switch">
                  <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                  <span className="toggle-slider"></span>
                </span>
                Dark mode
              </label>
            </header>
            <div className="form-container" style={{ width: '100%' }}>
              <StockForm />
            </div>
          </div>
          
          {stocks.length > 0 && (
            <div 
              ref={stockListRef}
              className="stock-list-glow" 
              style={{ 
                maxWidth: 640, 
                width: '100%', 
                padding: '1.5rem', 
                borderRadius: 14
              }}
            >
              <StockList />
            </div>
          )}
        </div>
        <Toast />
      </div>
    </>
  );
}
