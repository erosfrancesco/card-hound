import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { CardModel } from '../models/cardTraderZeroCard';

export interface CardTraderImageDisplayProps {
  apiKey: string;
}

export const CardTraderImageDisplay: React.FC<CardTraderImageDisplayProps> = ({
  apiKey,
}) => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<CardModel | null>(null);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const searchCard = useCallback(
    async (searchQuery: string = query): Promise<void> => {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      setLoading(true);
      setError(null);
      setCard(null);

      try {
        const response = await fetch(
          `https://api.cardtrader.com/api/v2/blueprints/export?name=${encodeURIComponent(trimmedQuery)}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const blueprints = await response.json();

        const match = blueprints.find(
          (bp: any) => bp.image_url && bp.image_url.trim() !== ''
        );

        if (match) {
          setCard({
            id: match.id,
            name: match.name,
            imageUrl: match.image_url,
            categoryName: match.category?.name || undefined,
            expansionName: match.expansion?.name || undefined,
          });
        } else {
          setError('No card found or no image available for this query.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch card data.');
      } finally {
        setLoading(false);
      }
    },
    [query, apiKey]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    searchCard();
  };

  if (!apiKey) {
    return (
      <div className="bg-surface-container shadow-elev-2 rounded-xl p-5 text-on-surface">
        <p className="text-on-surface-variant">
          <strong>Configuration:</strong> Set <code>VITE_CARDTRADER_API_TOKEN</code> in your <code>.env</code> file.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container shadow-elev-2 rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-lg">
          🔍
        </span>
        <div>
          <h3 className="text-lg font-medium text-on-surface m-0">CardTrader Image Search</h3>
          <p className="text-sm text-on-surface-variant m-0">Find cards by name</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            value={query}
            onChange={handleQueryChange}
            disabled={loading}
            className="md-text-field"
          />
          <label className="md-text-field-label">Enter card name (e.g. Black Lotus)</label>
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="md-filled-button self-start"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-error/10 border border-error/30 text-error rounded-lg text-sm">
          {error}
        </div>
      )}

      {card && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <h4 className="text-base font-medium text-on-surface m-0">{card.name}</h4>
          {card.expansionName && (
            <span className="text-xs bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full">
              {card.expansionName}
            </span>
          )}
          <div className="w-full rounded-lg overflow-hidden bg-surface-container-low shadow-elev-1">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-auto object-contain max-h-[480px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTraderImageDisplay;