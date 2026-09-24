import React from "react";
import { TypoH4, TypoSpan } from "../../layouts/Typography";
import { CardModel } from "../../models/cardTraderZeroCard";

export interface CardTraderImageContentProps {
  card: CardModel;
}

export const CardTraderImageContent: React.FC<CardTraderImageContentProps> = ({
  card,
}) => {
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <TypoH4 className="m-0">{card.name}</TypoH4>
      {card.expansionName && <TypoSpan>{card.expansionName}</TypoSpan>}
      <div className="w-full rounded-lg overflow-hidden bg-surface-container-low shadow-elev-1">
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-auto object-contain max-h-120"
        />
      </div>
    </div>
  );
};

export default CardTraderImageContent;
