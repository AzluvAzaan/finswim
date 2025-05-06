export async function fetchQuote(symbol) {
  const url =
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  const raw = data?.['Global Quote']?.['05. price'];
  return raw ? Number(raw) : null;   // null ⇒ invalid symbol
} 