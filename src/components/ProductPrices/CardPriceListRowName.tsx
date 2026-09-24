import clsx from "clsx";
import React from "react";
import { CardTraderProduct } from "../../models/cardTraderZero";

interface CardPriceListRowNameProps {
  product: CardTraderProduct;
}

export const CardPriceListRowName: React.FC<CardPriceListRowNameProps> = ({
  product,
}) => {
  const cond = product?.properties_hash?.condition?.toLowerCase() || "";

  const isMint = cond.includes("mint") || cond === "nm";

  const isSlightly =
    cond.includes("slight") ||
    cond.includes("light") ||
    cond === "sp" ||
    cond === "lp" ||
    cond === "ex";

  const isModerate =
    cond.includes("moderate") ||
    cond.includes("play") ||
    cond === "mp" ||
    cond === "gd";

  const isHeavy =
    cond.includes("heavy") ||
    cond === "hp" ||
    cond === "po" ||
    cond.includes("poor");

  const isDamaged = cond.includes("damage") || cond === "dmg";

  return (
    <div
      className={clsx("font-semibold text-sm", {
        "text-green-400": isMint,
        "text-amber-100": isSlightly,
        "text-amber-400": isModerate,
        "text-red-500": isHeavy,
        "text-red-800": isDamaged,
      })}
    >
      {product?.name_en || ""}
    </div>
  );
};
