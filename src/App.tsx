import { CardListWidget } from './components/CardListWidget';

// CardTrader Zero blueprint IDs for demonstration
const CARDS = [
  { blueprintId: 16354, name: 'Balefire Dragon' },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 font-sans">
      <header className="text-center py-10 px-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          CardTrader Zero Tracker
        </h1>
        <p className="mt-2 text-slate-400 text-base">
          Live marketplace listings filtered for CardTrader Zero sellers
        </p>
      </header>
      <main className="max-w-2xl mx-auto px-4 pb-16 flex flex-col gap-6">
        {CARDS.map((card) => (
          <CardListWidget
            key={card.blueprintId}
            blueprintId={card.blueprintId}
            cardName={card.name}
          />
        ))}
      </main>
    </div>
  );
}

export default App;