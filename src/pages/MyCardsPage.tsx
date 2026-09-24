import { CardPriceListWidget } from "../components/ProductPrices/CardPriceListWidget";

const CARDS = [{ blueprintId: 16354, name: "Balefire Dragon" }];

export function MyCardsPage() {
  return (
    <div className="flex flex-col gap-6">
      {CARDS.map((card) => (
        <CardPriceListWidget key={card.blueprintId} blueprintId={card.blueprintId} />
      ))}
    </div>
  );
}
