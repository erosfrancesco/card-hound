import { useNavigate } from "react-router-dom";
import { useFavourites } from "../hook/useFavourites";
import { FavouriteCardWidget } from "../components/ProductPrices/FavouriteCardWidget";
import { TypoH3 } from "../layouts/Typography";
import { Button } from "../layouts/Components";

export function FavouriteCardsPage() {
  const { favourites, remove } = useFavourites();
  const navigate = useNavigate();

  if (favourites.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <TypoH3 className="m-0">Favourite Cards</TypoH3>
        <p className="text-on-surface-variant text-sm">
          You haven't saved any cards yet. Save cards from the Search page to see
          them here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <TypoH3 className="m-0">Favourite Cards</TypoH3>
        <Button
          className="md-outlined-button"
          onClick={() => navigate("/search")}
        >
          + Add Card
        </Button>
      </div>

      {favourites.map((blueprintId) => (
        <FavouriteCardWidget
          key={blueprintId}
          blueprintId={blueprintId}
          onRemove={remove}
        />
      ))}
    </div>
  );
}