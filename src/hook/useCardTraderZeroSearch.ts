import { useState, useCallback } from 'react';

/**
 * Hook to manage CardTrader API card search state and actions.
 * @param {string} apiKey - CardTrader API v2 Bearer Token
 */
export const useCardTraderSearch = (apiKey) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [card, setCard] = useState(null);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const searchCard = useCallback(async (searchQuery = query) => {
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
                        'Authorization': `Bearer ${apiKey}`,
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const blueprints = await response.json();

            // Find the first blueprint that contains a valid image URL
            const match = blueprints.find(
                (blueprint) => blueprint.image_url && blueprint.image_url.trim() !== ''
            );

            if (match) {
                setCard({
                    name: match.name,
                    imageUrl: match.image_url,
                    category: match.category?.name || null
                });
            } else {
                setError('No card found or no image available for this query.');
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch card data.');
        } finally {
            setLoading(false);
        }
    }, [query, apiKey]);

    return {
        query,
        loading,
        error,
        card,
        setQuery,
        handleQueryChange,
        searchCard
    };
};