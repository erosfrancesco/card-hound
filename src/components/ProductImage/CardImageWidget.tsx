import React, { SubmitEvent } from "react";
import { useCardTraderZeroSearch } from "../../hook/useCardTraderZeroSearch";
import { Button, Input } from "../../layouts/Components";

export interface CardTraderImageDisplayProps {}

export const CardTraderImageDisplay: React.FC<
  CardTraderImageDisplayProps
> = () => {
  const {
    card,
    loading,
    error,
    blueprintId,
    handleBlueprintIdChange,
    searchCard,
    clearResults,
  } = useCardTraderZeroSearch();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    searchCard();
  };

  return (
    <div className="bg-surface-container shadow-elev-2 rounded-xl p-6 max-w-md mx-auto">
      <h3 className="text-lg font-medium text-on-surface m-0">
        🃏 CardTrader Image Lookup
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <Input
            label="Blueprint ID (e.g. 16354)"
            type="number"
            placeholder=" "
            value={blueprintId}
            onChange={handleBlueprintIdChange}
            disabled={loading}
            className="md-text-field"
          />
        </div>

        <div className="flex gap-2 self-start">
          <Button
            type="submit"
            disabled={loading || !blueprintId.trim()}
            className="md-filled-button"
          >
            {loading ? "Looking up..." : "Lookup"}
          </Button>
          {card && (
            <Button
              type="button"
              onClick={clearResults}
              className="md-outlined-button"
            >
              Clear
            </Button>
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
          <h4 className="text-base font-medium text-on-surface m-0">
            {card.name}
          </h4>
          {card.expansionName && (
            <span className="text-xs bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full">
              {card.expansionName}
            </span>
          )}
          <div className="w-full rounded-lg overflow-hidden bg-surface-container-low shadow-elev-1">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-auto object-contain max-h-120"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTraderImageDisplay;
