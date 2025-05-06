import React, { useRef } from 'react';
import { useStocks } from '../context/StockContext';

export default function StockForm() {
  const { addStock } = useStocks();
  const formRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const symbol = form.symbol.value.trim();
    const qty = Number(form.qty.value);
    const purchase = Number(form.purchase.value);
    if (!symbol || qty <= 0 || purchase <= 0) return;
    addStock(symbol, qty, purchase);
    form.reset();
  }

  return (
    <form className="stock-form" onSubmit={handleSubmit} ref={formRef} autoComplete="off" style={{ width: '100%' }}>
      <input name="symbol" placeholder="Stock Symbol" style={{ flex: 1 }} />
      <input name="qty" placeholder="Quantity" type="number" min="1" style={{ flex: 1 }} />
      <input name="purchase" placeholder="Purchase Price" type="number" min="0.01" step="any" style={{ flex: 1 }} />
      <button type="submit">Add Stock</button>
    </form>
  );
} 