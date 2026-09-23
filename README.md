# CardTrader Zero Tracker

A React + Vite app that tracks live **CardTrader Zero** marketplace listings for Magic: The Gathering cards.

It queries the CardTrader API, filters results to only sellers using the CardTrader Zero fulfillment network, and displays pricing, condition, language, foil status, and seller info in a sortable, styled list.

## Features

- Fetches live marketplace products by card blueprint ID
- Filters to CardTrader Zero listings only (`can_sell_via_hub`)
- Sortable by price (low → high / high → low)
- Refresh button for on-demand refetch
- Aggregated stats: lowest price, highest price, total available quantity
- Color-coded card conditions (Mint / Near Mint / Lightly Played / Moderately Played / Heavily Played / Damaged)
- Language and foil badges per listing

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your API token file (copy the example and fill in your token):

   ```bash
   cp .env.example .env
   ```

   Then set `VITE_CARDTRADER_API_TOKEN` to your CardTrader API token in `.env`.

3. Start the dev server:

   ```bash
   npm start
   ```

   Open <http://localhost:3000/> in your browser.

## Build for Production

```bash
npm run build
```

The production bundle is output to the `dist/` directory.

## Configuration

| Variable | Required | Description |
|---|---|---|
| `VITE_CARDTRADER_API_TOKEN` | Yes | Your CardTrader API bearer token |

## CardTrader Zero

"CardTrader Zero" is CardTrader's own fulfillment network. Listings from sellers enrolled in it ship via CT's warehouse, giving buyers a lower-fee, faster experience. This app surfaces only those listings.

## Learn More

- [Vite](https://vitejs.dev/guide/)
- [React](https://reactjs.org/)
- [CardTrader API](https://docs.cardtrader.com/)