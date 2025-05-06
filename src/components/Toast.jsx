import React, { useEffect, useState } from 'react';
import { useToast } from '../context/StockContext';

export default function Toast() {
  const { toast } = useToast();
  const [animation, setAnimation] = useState('');
  
  useEffect(() => {
    if (toast.visible) {
      setAnimation('toast-slide-in');
      
      // Start fade-out animation shortly before disappearing
      const timer = setTimeout(() => {
        setAnimation('toast-fade-out');
      }, 4500);
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);
  
  if (!toast.visible) return null;
  
  return (
    <div className={`toast toast-${toast.type} ${animation}`}>
      <div className="toast-content">
        {toast.message}
      </div>
    </div>
  );
} 