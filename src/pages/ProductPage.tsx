import { useParams } from "react-router-dom";
import { CardPriceListWidget } from "../components/ProductPrices/CardPriceListWidget";

export function ProductPage() {
  const { blueprintId } = useParams<{ blueprintId: string }>();

  if (!blueprintId) {
    return (
      <p className="text-on-surface-variant">
        No blueprint ID provided. Use /product/:blueprintId
      </p>
    );
  }

  const id = Number(blueprintId);
  if (isNaN(id)) {
    return (
      <p className="text-error">Invalid blueprint ID: {blueprintId}</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <CardPriceListWidget blueprintId={id} />
    </div>
  );
}
