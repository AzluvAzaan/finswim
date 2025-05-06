# Finance Dashboard

A modern React application for tracking stock prices and portfolio performance. This web application features a clean UI with both light and dark modes, animated backgrounds, and real-time stock price tracking.

## Features

- Track multiple stocks with purchase price and quantity
- Calculate profit/loss percentages
- Light and dark mode toggle
- Animated wave background that adapts to theme
- Toast notifications for error handling
- Responsive design with frosted glass UI elements

## Setup and Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your API key (see below)
4. Run the development server with `npm run dev`

## API Key Setup

This project uses the Alpha Vantage API to fetch stock price data. You'll need to:

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Create a `.env` file in the root of the project
3. Add your API key to the `.env` file as follows:

```
VITE_ALPHA_VANTAGE_KEY=your_api_key_here
```

**Note:** The `.env` file is gitignored and should not be committed to version control to keep your API key private.

## Technologies Used

- React
- Vite
- Alpha Vantage API for stock data
- CSS animations
