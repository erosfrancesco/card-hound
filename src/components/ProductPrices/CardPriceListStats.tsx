import React from "react";
import { TypoSpan } from "../../layouts/Typography";
import { CardTraderProductStats } from "../../models/cardTraderZero";

interface CardPriceListStatsProps {
  stats: CardTraderProductStats;
}

// TODO: - Outliers
export const CardPriceListStats: React.FC<CardPriceListStatsProps> = ({
  stats,
}) => {
  return (
    <div className="flex justify-between items-center px-3.5 py-2.5 bg-surface-container rounded-lg mb-4 text-sm">
      <TypoSpan>
        Lowest:{" "}
        <strong className="text-green-400 font-semibold">
          {(stats.lowestPrice ?? 0).toFixed(2)} {stats.currency}
        </strong>
      </TypoSpan>
      <TypoSpan>
        Highest:{" "}
        <strong className="text-amber-400 font-semibold">
          {(stats.highestPrice ?? 0).toFixed(2)} {stats.currency}
        </strong>
      </TypoSpan>
      <TypoSpan>
        Available:{" "}
        <strong className="font-semibold">{stats.totalAvailable}</strong>
      </TypoSpan>
    </div>
  );
};
