import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchQuote } from '../api/fetchQuote';

const StockContext = createContext();
const ThemeContext = createContext();
const ToastContext = createContext();

export function StockProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' });

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    let timer;
    if (toast.visible) {
      timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [toast.visible]);

  function showToast(message, type = 'error') {
    setToast({ visible: true, message, type });
  }

  async function addStock(symbol, qty, purchase) {
    const id = Date.now() + Math.random();
    const upperSymbol = symbol.toUpperCase();
    
    try {
      const current = await fetchQuote(upperSymbol);
      if (current === null) {
        showToast(`Invalid symbol: ${upperSymbol}`, 'error');
        return; // Don't add invalid stocks
      }
      setStocks(s => [
        { id, symbol: upperSymbol, qty, purchase, current, loading: false },
        ...s // Add new entry at the beginning of the array
      ]);
    } catch {
      showToast('API error - please try again later', 'error');
    }
  }

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      <StockContext.Provider value={{ stocks, addStock }}>
        {children}
      </StockContext.Provider>
    </ToastContext.Provider>
  );
}

export function useStocks() {
  return useContext(StockContext);
}

export function useToast() {
  return useContext(ToastContext);
}

// Theme context for dark mode
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 