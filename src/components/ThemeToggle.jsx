import React from 'react';
import { useTheme } from '../context/StockContext';
import '../styles/ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="theme-toggle-container">
      <div 
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        role="button"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-track">
          <div className="toggle-icon sun">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" fill="#FDB813" stroke="#FDB813" strokeWidth="1.5" />
              <path d="M12 3V5" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 19V21" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12H5" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M19 12H21" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5.6 5.6L7 7" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M17 17L18.4 18.4" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5.6 18.4L7 17" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M17 7L18.4 5.6" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="toggle-icon moon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#FCFCFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="toggle-thumb"></div>
        </div>
      </div>
    </div>
  );
} 