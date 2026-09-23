import { useState, useCallback } from 'react';
import { CardModel, UseCardTraderSearchReturn } from '../models/cardTraderZeroCard';

/**
 * Hook to manage CardTrader API card search state and actions.
 * @param apiKey - CardTrader API v2 Bearer Token
 */
export const useCardTraderSearch = (apiKey: string): UseCardTraderSearchReturn => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<CardModel | null>(null);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const searchCard = useCallback(
    async (searchQuery: string = query): Promise<void> => {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      setLoading(true);
      setError(null);
      setCard(null);

      try {
        const response = await fetch(
          `https://api.cardtrader.com/api/v2/blueprints/export?name=${encodeURIComponent(trimmedQuery)}`,
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

        const blueprints = await response.json();

        const match = blueprints.find(
          (bp: any) => bp.image_url && bp.image_url.trim() !== ''
        );

        if (match) {
          setCard({
            id: match.id,
            name: match.name,
            imageUrl: match.image_url,
            categoryName: match.category?.name || undefined,
            expansionName: match.expansion?.name || undefined,
          });
        } else {
          setError('No card found or no image available for this query.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch card data.');
      } finally {
        setLoading(false);
      }
    },
    [query, apiKey]
  );

  return {
    query,
    loading,
    error,
    card,
    setQuery,
    handleQueryChange,
    searchCard,
  };
};