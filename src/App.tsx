import './App.css';
import { CardListWidget } from './components/CardListWidget';

// CardTrader Zero blueprint IDs for demonstration
const CARDS = [
  { blueprintId: 16354, name: 'Balefire Dragon' },
];

function App() {
  return (
    <div className="app">
      <header>
        <h1>CardTrader Zero Tracker</h1>
        <p>Live marketplace listings filtered for CardTrader Zero sellers</p>
      </header>
      <main>
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