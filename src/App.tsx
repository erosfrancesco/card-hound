import './App.css';
import { CardPriceWidget } from './components/CardPriceWidget';
import { CardListWidget } from './components/CardListWidget';

function App() {
  return (
    <>
      <header>
        <p>Card Trader Finder</p>
      </header>
      <main>
        <p>Hello app! Balefire dragon: 16354</p>
        {/*}
        <CardPriceWidget blueprintId={16354} />
        <CardListWidget blueprintId={16354} />
        {/** */}
      </main>
      {/*}
        {/** */}
    </>
  );
}

export default App;
