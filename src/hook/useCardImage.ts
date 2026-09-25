import { useCallback, useState } from "react";
import { CardModel } from "../models/cardTraderZeroCard";
import { apiToken, endpoints, resolveImageUrl } from "./utils";

export interface CardImageResult {
  card: CardModel | null;
  loading: boolean;
  error: string | null;
  fetchCardImage: (blueprintId: number) => Promise<void>;
}

export const useCardImage = (): CardImageResult => {
  const [card, setCard] = useState<CardModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCardImage = useCallback(
    async (blueprintId: number): Promise<void> => {
      if (!blueprintId || !apiToken) {
        setError("No blueprint ID or API token available");
        return;
      }

      setLoading(true);
      setError(null);
      setCard(null);

      try {
        const url = new URL(
          `${endpoints.blueprint}/${encodeURIComponent(blueprintId.toString())}`,
        );

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`,
          );
        }

        const bp = await response.json();

        const rawUrl = bp.image?.url || bp.image_url || bp.preview?.url || "";
        const imageUrl = resolveImageUrl(rawUrl);
        const isFallback =
          !imageUrl || imageUrl.includes("fallbacks/card_uploader/default.png");

        if (!isFallback) {
          setCard({
            id: bp.id,
            name: bp.name,
            imageUrl,
            categoryName: bp.category?.name || undefined,
            expansionName: bp.expansion?.name || undefined,
          });
        } else {
          setError("No card image available for this blueprint ID.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch card data.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    card,
    loading,
    error,
    fetchCardImage,
  };
};