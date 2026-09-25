import React, { useEffect, useState } from "react";
import { useCardImage } from "../../hook/useCardImage";
import { useCardTraderZero } from "../../hook/useCardTraderZero";
import { TypoH4, TypoSpan, TypoP } from "../../layouts/Typography";
import { Button } from "../../layouts/Components";

interface FavouriteCardWidgetProps {
  blueprintId: number;
  onRemove: (blueprintId: number) => void;
}

export const FavouriteCardWidget: React.FC<FavouriteCardWidgetProps> = ({
  blueprintId,
  onRemove,
}) => {
  const { card, loading: imageLoading, error: imageError, fetchCardImage } =
    useCardImage();

  const {
    products,
    loading: pricesLoading,
    error: pricesError,
    stats,
    refetch,
  } = useCardTraderZero({
    blueprintId,
    languages: ["en", "it"],
    zeroOnly: true,
    sortOrder: "asc",
  });

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchCardImage(blueprintId);
      setHasFetched(true);
    }
  }, [blueprintId, fetchCardImage, hasFetched]);

  const firstPrice = products[0]
    ? (products[0].price.cents / 100).toFixed(2)
    : null;
  const firstPriceCurrency = products[0]?.price?.currency || "EUR";
  const lowestPrice = stats.lowestPrice?.toFixed(2);
  const lowestPriceCurrency = stats.currency || "EUR";

  if (imageLoading && pricesLoading) {
    return (
      <div className="bg-surface-container shadow-elev-2 rounded-xl p-5 animate-pulse">
        <div className="flex gap-4">
          <div className="w-24 h-34 bg-surface-container-high rounded-lg" />
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="h-5 bg-surface-container-high rounded w-3/4" />
            <div className="h-4 bg-surface-container-high rounded w-1/2" />
            <div className="h-5 bg-surface-container-high rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container shadow-elev-2 rounded-xl p-5 relative">
      <Button
        className="md-icon-button absolute top-2 right-2"
        onClick={() => onRemove(blueprintId)}
        aria-label={`Remove card ${blueprintId} from favourites`}
      >
        ✕
      </Button>

      <div className="flex gap-4">
        {imageLoading ? (
          <div className="w-24 h-34 bg-surface-container-high rounded-lg flex items-center justify-center">
            <span className="text-on-surface-variant text-xs">Loading...</span>
          </div>
        ) : imageError ? (
          <div className="w-24 h-34 bg-surface-container-high rounded-lg flex items-center justify-center">
            <span className="text-error text-xs">No image</span>
          </div>
        ) : card ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-24 h-34 object-contain rounded-lg bg-surface-container-low"
          />
        ) : (
          <div className="w-24 h-34 bg-surface-container-high rounded-lg flex items-center justify-center">
            <span className="text-on-surface-variant text-xs">No image</span>
          </div>
        )}

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <TypoH4 className="m-0 truncate">
              {card?.name || `Card #${blueprintId}`}
            </TypoH4>
            {card?.expansionName && (
              <TypoSpan className="text-xs px-2 py-0.5 rounded-full shrink-0">
                {card.expansionName}
              </TypoSpan>
            )}
          </div>

          {pricesLoading ? (
            <TypoP className="m-0 text-on-surface-variant">Loading prices...</TypoP>
          ) : pricesError ? (
            <TypoP className="m-0 text-error text-sm">Error loading prices</TypoP>
          ) : products.length === 0 ? (
            <TypoP className="m-0 text-on-surface-variant">
              No CardTrader Zero listings
            </TypoP>
          ) : (
            <>
              <TypoP className="m-0 text-sm">
                <span className="text-on-surface-variant">First: </span>
                <strong className="text-green-400 font-semibold">
                  {firstPrice} {firstPriceCurrency}
                </strong>
              </TypoP>
              <TypoP className="m-0 text-sm">
                <span className="text-on-surface-variant">Lowest: </span>
                <strong className="text-green-400 font-semibold">
                  {lowestPrice} {lowestPriceCurrency}
                </strong>
                <span className="text-on-surface-variant ml-2 text-xs">
                  ({stats.totalAvailable} available)
                </span>
              </TypoP>
            </>
          )}
        </div>

        <Button
          onClick={refetch}
          className="md-icon-button shrink-0 self-start mt-2"
          aria-label="Refresh prices"
        >
          ↻
        </Button>
      </div>
    </div>
  );
};