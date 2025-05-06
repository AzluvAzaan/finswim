import React from 'react';
import { useTheme } from '../context/StockContext';
import '../styles/WaveBackground.css';

export default function WaveBackground() {
  const { theme } = useTheme();
  
  return (
    <div className={`wave-container ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
} 