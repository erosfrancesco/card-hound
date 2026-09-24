import React, { SubmitEvent } from "react";
import { useCardTraderZeroSearch } from "../../hook/useCardTraderZeroSearch";
import { Button, Input } from "../../layouts/Components";
import { TypoH3 } from "../../layouts/Typography";
import CardTraderImageContent from "./CardImageContent";

export interface CardTraderImageSearchProps {
  onNavigateSearch?: (blueprintId: number) => void;
}

export const CardTraderImageSearch: React.FC<
  CardTraderImageSearchProps
> = ({ onNavigateSearch }) => {
  const {
    card,
    loading,
    error,
    blueprintId,
    handleBlueprintIdChange,
    searchCard,
    clearResults,
  } = useCardTraderZeroSearch();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await searchCard();
    if (card && onNavigateSearch && blueprintId.trim()) {
      onNavigateSearch(Number(blueprintId.trim()));
    }
  };

  return (
    <div className="">
      <TypoH3 className="m-0">🃏 CardTrader Image Lookup</TypoH3>

      <div className="flex gap-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start gap-3 max-w-40"
        >
          <Input
            label="Blueprint ID"
            type="number"
            placeholder="e.g. 16354"
            value={blueprintId}
            onChange={handleBlueprintIdChange}
            disabled={loading}
          />

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
        </form>

        {error && (
          <div className="mt-4 p-3 bg-error/10 border border-error/30 text-error rounded-lg text-sm">
            {error}
          </div>
        )}

        {card && <CardTraderImageContent card={card} />}
      </div>
    </div>
  );
};

export default CardTraderImageSearch;
