import React, { useState } from "react";
import { SortOrder, useCardTraderZero } from "../hook/useCardTraderZero";
import { CardListRowWidget, CardListStatRowWidget } from "./CardListWidgetRow";

interface CardTraderWidgetProps {
  blueprintId: number;
}

export const CardListWidget: React.FC<CardTraderWidgetProps> = ({
  blueprintId,
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { products, loading, error, stats, refetch } = useCardTraderZero({
    blueprintId,
    languages: ["en", "it"],
    zeroOnly: true,
    sortOrder,
  });

  return (
    <div className="bg-surface-container shadow-elev-2 rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="m-0 text-lg font-medium text-on-surface">
            {products?.[0]?.name_en}
          </h3>
          <span className="text-sm text-on-surface-variant">
            CardTrader Zero Listings
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="md-outlined-button"
          >
            Price: {sortOrder === "asc" ? "Low → High" : "High → Low"}
          </button>
          <button
            onClick={refetch}
            className="md-icon-button"
            aria-label="Refresh"
          >
            ↻
          </button>
        </div>
      </div>

      {!loading && !error && products.length > 0 && (
        <CardListStatRowWidget stats={stats} />
      )}

      {loading && (
        <div className="text-center py-7 text-on-surface-variant">
          Loading products...
        </div>
      )}

      {error && (
        <div className="p-3 bg-error/10 border border-error/30 text-error rounded-lg text-sm">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-7 text-on-surface-variant">
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
