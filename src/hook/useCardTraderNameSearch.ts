import { useState, useCallback } from 'react';
import { CardModel } from '../models/cardTraderZeroCard';

const API_BASE = 'https://api.cardtrader.com/api/v2';

export interface CardTraderNameSearchResult {
  card: CardModel | null;
  loading: boolean;
  error: string | null;
  blueprintId: string;
  setBlueprintId: (id: string) => void;
  handleBlueprintIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchCard: (searchId?: string) => Promise<void>;
  clearResults: () => void;
}

/** Resolve a relative CardTrader image URL to an absolute one. */
function resolveImageUrl(raw?: string): string {
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${API_BASE.replace('/api/v2', '')}${raw.startsWith('/') ? raw : `/${raw}`}`;
}

/**
 * Hook that looks up a single CardTrader blueprint by ID and fetches its image.
 *
 * The CardTrader API v2 exposes only two blueprint endpoints:
 *   GET /blueprints/export?expansion_id=X   (list by expansion)
 *   GET /blueprints/:id                       (single by ID)
 *
 * There is no name-based search, so this hook performs a single
 * `GET /blueprints/:id` call per lookup — the most efficient path available.
 *
 * @param apiKey - CardTrader API v2 Bearer Token
 */
export const useCardTraderNameSearch = (
  apiKey: string
): CardTraderNameSearchResult => {
  const [blueprintId, setBlueprintId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<CardModel | null>(null);

  const handleBlueprintIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBlueprintId(e.target.value);
  };

  const clearResults = useCallback((): void => {
    setCard(null);
    setError(null);
  }, []);

  const searchCard = useCallback(
    async (searchId: string = blueprintId): Promise<void> => {
      const trimmedId = searchId.trim();
      if (!trimmedId || isNaN(Number(trimmedId))) {
        setError('Please enter a valid numeric blueprint ID.');
        return;
      }

      setLoading(true);
      setError(null);
      setCard(null);

      try {
        const response = await fetch(
          `${API_BASE}/blueprints/${encodeURIComponent(trimmedId)}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const bp = await response.json();

        // The blueprint image lives under `image.url`; the API also provides
        // a fallback image used when no real art is available.
        const rawUrl = bp.image?.url || bp.image_url || bp.preview?.url || '';
        const imageUrl = resolveImageUrl(rawUrl);
        const isFallback =
          !imageUrl ||
          imageUrl.includes('fallbacks/card_uploader/default.png');

        if (!isFallback) {
          setCard({
            id: bp.id,
            name: bp.name,
            imageUrl,
            categoryName: bp.category?.name || undefined,
            expansionName: bp.expansion?.name || undefined,
          });
        } else {
          setError('No card image available for this blueprint ID.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch card data.');
      } finally {
        setLoading(false);
      }
    },
    [blueprintId, apiKey]
  );

  return {
    card,
    loading,
    error,
    blueprintId,
    setBlueprintId,
    handleBlueprintIdChange,
    searchCard,
    clearResults,
  };
};