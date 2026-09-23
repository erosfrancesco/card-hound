import { CardListWidget } from './components/CardListWidget';
import { CardTraderImageDisplay } from './components/CardSearchWidget';

// CardTrader Zero blueprint IDs for demonstration
const CARDS = [
  { blueprintId: 16354, name: 'Balefire Dragon' },
];

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans">
      <header className="text-center py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary-container/40 border border-primary/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            CardTrader Zero Marketplace
          </div>
          <h1 className="md-headline">
            CardTrader Zero Tracker
          </h1>
          <p className="mt-3 text-on-surface-variant text-base sm:text-lg">
            Live marketplace listings filtered for CardTrader Zero sellers
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 flex flex-col gap-6">
        <CardTraderImageDisplay apiKey={import.meta.env.VITE_CARDTRADER_API_TOKEN} />
        {CARDS.map((card) => (
          <CardListWidget
            key={card.blueprintId}
            blueprintId={card.blueprintId}
            cardName={card.name}
          />
        ))}
      </main>

      <footer className="text-center text-xs text-on-surface-variant pb-8">
        Data sourced from CardTrader API v2
      </footer>
    </div>
  );
}

export default App;