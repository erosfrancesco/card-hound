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
- Image lookup by blueprint ID with CardTrader image CDN
- **Favourites** — save cards from search, view with image, name, and lowest price
- Click any favourite card to view full price list
- Remove cards from favourites with one click

## Routing

The app is a single-page app using [React Router](https://reactrouter.com/) v7. Available routes:

| Path | Page | Description |
|---|---|---|
| `/` | (redirect) | Redirects to `/my_favourites` |
| `/search` | `SearchPage` | CardTrader image lookup widget (enter a blueprint ID) |
| `/search/:blueprintId` | `SearchPage` | Deep-linkable lookup with an ID in the URL |
| `/product/:blueprintId` | `ProductPage` | Shows marketplace listings for a given blueprint ID via `CardPriceListWidget` |
| `/my_favourites` | `FavouriteCardsPage` | Saved cards with image, name, first/lowest price, expansion badge |

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

    > In GitHub Codespaces the dev server must bind to `--host` so the port-forward proxy can reach it:
    > ```bash
    > npm start -- --host
    > ```

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

## Styling

The UI is built with [Tailwind CSS](https://tailwindcss.com/) v4 via `@tailwindcss/vite`.

- Utility classes live directly in the JSX components
- `src/index.css` contains the `@tailwind` directives and Material 3 CSS custom properties (color tokens, elevation, state layers, neon glow utilities)
- `tailwind.config.js` defines a custom dark palette (`primary`, `surface-container`, `error`, etc.) consumed by the component utilities
- Neon glow effects on header, inputs, and buttons using CSS custom properties

## Learn More

- [Vite](https://vitejs.dev/guide/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CardTrader API](https://docs.cardtrader.com/)