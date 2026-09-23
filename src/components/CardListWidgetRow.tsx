import React from 'react';
import { CardTraderProduct, CardTraderProductStats } from '../models/cardTraderZero';

export const getConditionColor = (condition?: string): string => {
  if (!condition) return '#222222';
  const cond = condition.toLowerCase();

  if (cond.includes('mint') || cond === 'nm') return '#2e7d32';
  if (cond.includes('slight') || cond.includes('light') || cond === 'sp' || cond === 'lp' || cond === 'ex') return '#1565c0';
  if (cond.includes('moderate') || cond.includes('play') || cond === 'mp' || cond === 'gd') return '#e65100';
  if (cond.includes('heavy') || cond === 'hp' || cond === 'po' || cond.includes('poor')) return '#c62828';
  if (cond.includes('damage') || cond === 'dmg') return '#8e0000';

  return '#222222';
};

interface CardListRowWidgetProps {
  product: CardTraderProduct;
  count: number;
  hasBorder: boolean;
}

export const CardListRowWidget: React.FC<CardListRowWidgetProps> = ({
  product,
  count,
  hasBorder,
}) => {
  const price = (product.price.cents / 100).toFixed(2);
  const language = (
    product.properties_hash.language ||
    product.properties_hash.mtg_language ||
    'N/A'
  ).toUpperCase();
  const isFoil = product.properties_hash.foil;

  return (
    <li
      className="flex justify-between items-center py-3"
      style={{ borderBottom: hasBorder ? '1px solid #eee' : 'none' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold"
        >
          {count + 1}
        </span>

        <div>
          <div
            className="font-semibold text-sm"
            style={{ color: getConditionColor(product.properties_hash.condition) }}
          >
            {product.name_en}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            <span className="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-semibold mr-1">
              {language}
            </span>

            {isFoil && (
              <span className="ml-1 text-amber-700 font-semibold">✨ Foil</span>
            )}
            <span className="ml-2 text-slate-500">
              • Seller: {product.user.username}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-base font-bold text-green-700">
          {price} {product.price.currency}
        </div>
        <div className="text-xs text-slate-500">
          Qty: {product.quantity}
        </div>
      </div>
    </li>
  );
};

interface CardListStatsRowWidgetProps {
  stats: CardTraderProductStats;
}

export const CardListStatRowWidget: React.FC<CardListStatsRowWidgetProps> = ({
  stats,
}) => {
  return (
    <div className="flex justify-between items-center px-3.5 py-2.5 bg-slate-50 rounded-md mb-4 text-xs">
      <span>Lowest: <strong>{(stats.lowestPrice ?? 0).toFixed(2)} {stats.currency}</strong></span>
      <span>Highest: <strong>{(stats.highestPrice ?? 0).toFixed(2)} {stats.currency}</strong></span>
      <span>Available: <strong>{stats.totalAvailable}</strong></span>
    </div>
  );
};