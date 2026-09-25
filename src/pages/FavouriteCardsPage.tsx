import { FavouriteCardWidget } from "../components/ProductPrices/FavouriteCardWidget";
import { useFavourites } from "../hook/useFavourites";
import { TypoH3 } from "../layouts/Typography";

export function FavouriteCardsPage() {
  const { favourites, remove } = useFavourites();

  if (favourites.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <TypoH3 className="m-0">Favourite Cards</TypoH3>
        <p className="text-on-surface-variant text-sm">
          You haven't saved any cards yet. Save cards from the Search page to
          see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <TypoH3 className="m-0">Favourite Cards</TypoH3>

      {favourites.map((blueprintId, index) => (
        <FavouriteCardWidget
          key={blueprintId}
          blueprintId={blueprintId}
          onRemove={remove}
          hasBorder={index < favourites.length - 1}
        />
      ))}
    </div>
  );
}
