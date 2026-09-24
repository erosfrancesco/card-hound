import React from "react";
import { Badge } from "../../layouts/Components";
import { CardTraderProduct } from "../../models/cardTraderZero";
import { CardPriceListRowName } from "./CardPriceListRowName";
import clsx from "clsx";

interface CardPriceListRowProps {
  product: CardTraderProduct;
  count: number;
  hasBorder: boolean;
}

export const CardPriceListRow: React.FC<CardPriceListRowProps> = ({
  product,
  count,
  hasBorder,
}) => {
  const price = (product.price.cents / 100).toFixed(2);
  const language = (
    product.properties_hash.language ||
    product.properties_hash.mtg_language ||
    "N/A"
  ).toUpperCase();
  const isFoil = product.properties_hash.foil;

  return (
    <li
      className={clsx(
        "flex justify-between items-center", 
        "py-3.5 px-1 -mx-1", 
        "rounded-lg transition-colors hover:bg-surface-container-high",

      )}
      style={{
        borderBottom: hasBorder
          ? "1px solid var(--md-sys-color-outline-variant)"
          : "none",
      }}
    >
      <div className="flex items-center gap-3">
        <Badge className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface">
          {count + 1}
        </Badge>
        {/*}
        <span className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-xs font-semibold">
          {count + 1}
        </span>
        {/** */}

        <div>
          <CardPriceListRowName product={product} />
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
