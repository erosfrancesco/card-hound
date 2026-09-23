import React from 'react';
import { CardTraderProduct, CardTraderProductStats } from '../models/cardTraderZero';

const conditionTone = (condition?: string): string => {
  if (!condition) return 'text-on-surface-variant';
  const cond = condition.toLowerCase();
  if (cond.includes('mint') || cond === 'nm') return 'text-green-400';
  if (cond.includes('slight') || cond.includes('light') || cond === 'sp' || cond === 'lp' || cond === 'ex') return 'text-primary';
  if (cond.includes('moderate') || cond.includes('play') || cond === 'mp' || cond === 'gd') return 'text-amber-400';
  if (cond.includes('heavy') || cond === 'hp' || cond === 'po' || cond.includes('poor')) return 'text-error';
  if (cond.includes('damage') || cond === 'dmg') return 'text-error';
  return 'text-on-surface-variant';
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
      className="flex justify-between items-center py-3.5 px-1 -mx-1 rounded-lg transition-colors hover:bg-surface-container-high"
      style={{ borderBottom: hasBorder ? '1px solid var(--md-sys-color-outline-variant)' : 'none' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-xs font-semibold"
        >
          {count + 1}
        </span>

        <div>
          <div
            className={`font-semibold text-sm ${conditionTone(product.properties_hash.condition)}`}
          >
            {product.name_en}
          </div>
          <div className="text-sm text-on-surface-variant mt-0.5 flex items-center flex-wrap gap-1">
            <span className="bg-surface-container-high text-primary px-1.5 py-0.5 rounded text-xs font-semibold">
              {language}
            </span>

            {isFoil && (
              <span className="text-amber-400 font-semibold">✨ Foil</span>
            )}
            <span className="text-on-surface-variant">
              • Seller: {product.user.username}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-base font-bold text-green-400">
          {price} {product.price.currency}
        </div>
        <div className="text-sm text-on-surface-variant">
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
    <div className="flex justify-between items-center px-3.5 py-2.5 bg-surface-container rounded-lg mb-4 text-sm">
      <span className="text-on-surface-variant">
        Lowest:{' '}
        <strong className="text-green-400 font-semibold">
          {(stats.lowestPrice ?? 0).toFixed(2)} {stats.currency}
        </strong>
      </span>
      <span className="text-on-surface-variant">
        Highest:{' '}
        <strong className="text-amber-400 font-semibold">
          {(stats.highestPrice ?? 0).toFixed(2)} {stats.currency}
        </strong>
      </span>
      <span className="text-on-surface">
        Available:{' '}
        <strong className="font-semibold">
          {stats.totalAvailable}
        </strong>
      </span>
    </div>
  );
};