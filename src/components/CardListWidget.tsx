import React, { useState } from 'react';
import { useCardTraderZero, SortOrder } from '../hook/useCardTraderZero';
import { CardListRowWidget, CardListStatRowWidget } from './CardListWidgetRow';

interface CardTraderWidgetProps {
  blueprintId: number;
  cardName?: string;
}

export const CardListWidget: React.FC<CardTraderWidgetProps> = ({
  blueprintId,
  cardName = 'Card Listings',
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const apiToken = import.meta.env.VITE_CARDTRADER_API_TOKEN;

  const { products, loading, error, stats, refetch } = useCardTraderZero({
    apiToken,
    blueprintId,
    languages: ['en', 'it'],
    zeroOnly: true,
    sortOrder,
  });

  if (!apiToken) {
    return (
      <div className="p-4 border border-red-300 rounded-lg bg-red-50 text-red-800">
        <strong>Error:</strong>{' '}
        <code>VITE_CARDTRADER_API_TOKEN</code> is missing from your{' '}
        <code>.env</code> file.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-5 border border-slate-200 rounded-xl bg-white shadow-sm text-slate-800">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="m-0 text-lg text-slate-900">{cardName}</h3>
          <span className="text-xs text-slate-500">CardTrader Zero Listings</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1.5 border border-slate-300 rounded-md bg-slate-50 cursor-pointer text-xs font-medium"
          >
            Price: {sortOrder === 'asc' ? 'Low → High' : 'High → Low'}
          </button>
          <button
            onClick={refetch}
            className="px-3 py-1.5 border border-slate-300 rounded-md bg-slate-50 cursor-pointer text-xs"
          >
            ↻
          </button>
        </div>
      </div>

      {!loading && !error && products.length > 0 && (
        <CardListStatRowWidget stats={stats} />
      )}

      {loading && (
        <div className="text-center py-7 text-slate-500">Loading products...</div>
      )}

      {error && (
        <div className="p-3 bg-amber-100 text-amber-800 rounded-md text-sm">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-7 text-slate-500">
          No CardTrader Zero listings available in English or Italian.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ol className="list-none p-0 m-0">
          {products.map((product, index) => (
            <CardListRowWidget
              key={index}
              product={product}
              count={index}
              hasBorder={index < products.length - 1}
            />
          ))}
        </ol>
      )}
    </div>
  );
};