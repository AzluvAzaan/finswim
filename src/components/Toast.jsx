import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from '../context/StockContext';

export default function Toast() {
  const { toast } = useToast();
  const [animation, setAnimation] = useState('');
  
  const handleToastAnimation = useCallback(() => {
    if (toast.visible) {
      setAnimation('toast-slide-in');
      
      const timer = setTimeout(() => {
        setAnimation('toast-fade-out');
      }, 4500);
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);
  
  useEffect(() => {
    return handleToastAnimation();
  }, [handleToastAnimation]);
  
  if (!toast.visible) return null;
  
  return (
    <div className={`toast toast-${toast.type} ${animation}`}>
      <div className="toast-content">
        {toast.message}
      </div>
    </div>
  );
} 