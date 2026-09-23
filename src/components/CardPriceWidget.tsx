import { useCardTraderZero } from '../hook/useCardTraderZero';

export const CardPriceWidget = ({ blueprintId }: { blueprintId: number }) => {
  const apiToken = import.meta.env.VITE_CARDTRADER_API_TOKEN;

  const { products, loading, error, stats } = useCardTraderZero({
    apiToken,
    blueprintId: blueprintId,
    zeroOnly: true,
  });

  if (loading) return <div className="text-center py-7 text-slate-500">Loading CardTrader Zero prices...</div>;
  if (error) return <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">Error: {error}</div>;

  return (
    <div className="p-4 border border-slate-200 rounded-lg">
      <h2 className="text-base mb-2">CardTrader Zero Listings</h2>

      {stats.lowestPrice !== null && (
        <div className="mb-3">
          <p className="text-sm">
            <strong>Lowest CT Zero Price:</strong> {stats.lowestPrice} {stats.currency}
          </p>
          <p className="text-sm">
            <strong>Total Available via Zero:</strong> {stats.totalAvailable}
          </p>
        </div>
      )}

      <h3 className="text-sm mb-1">Listings</h3>
      <ul className="list-disc pl-5 m-0">
        {products.map((item) => (
          <li key={item.id} className="text-sm">
            <strong>{(item.price.cents / 100).toFixed(2)} {item.price.currency}</strong>
            {' - '}
            Condition: {item.properties_hash.condition || 'N/A'}
            {' | '}
            Lang: {(item.properties_hash.language || item.properties_hash.mtg_language || 'N/A').toUpperCase()}
            {' | '}
            Seller: {item.user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};