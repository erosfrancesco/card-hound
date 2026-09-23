import React, { FormEvent } from 'react';
import { useCardTraderNameSearch } from '../hook/useCardTraderNameSearch';

export interface CardTraderImageDisplayProps {
  apiKey: string;
}

export const CardTraderImageDisplay: React.FC<CardTraderImageDisplayProps> = ({
  apiKey,
}) => {
  const {
    card,
    loading,
    error,
    blueprintId,
    handleBlueprintIdChange,
    searchCard,
    clearResults,
  } = useCardTraderNameSearch(apiKey);

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
          🃏
        </span>
        <div>
          <h3 className="text-lg font-medium text-on-surface m-0">CardTrader Image Lookup</h3>
          <p className="text-sm text-on-surface-variant m-0">Look up a card by blueprint ID</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="number"
            placeholder=" "
            value={blueprintId}
            onChange={handleBlueprintIdChange}
            disabled={loading}
            className="md-text-field"
          />
          <label className="md-text-field-label">Blueprint ID (e.g. 16354)</label>
        </div>

        <div className="flex gap-2 self-start">
          <button
            type="submit"
            disabled={loading || !blueprintId.trim()}
            className="md-filled-button"
          >
            {loading ? 'Looking up...' : 'Lookup'}
          </button>
          {card && (
            <button
              type="button"
              onClick={clearResults}
              className="md-outlined-button"
            >
              Clear
            </button>
          )}
        </div>
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