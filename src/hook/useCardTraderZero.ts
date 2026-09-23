import { useState, useEffect, useCallback } from 'react';

export interface CardTraderProduct {
  id: number;
  blueprint_id: number;
  name_en: string;
  quantity: number;
  price: {
    cents: number;
    currency: string;
    formatted: string;
  };
  description: string;
  properties_hash: {
    condition?: string;
    mtg_language?: string;
    language?: string;
    foil?: boolean;
    [key: string]: any;
  };
  expansion: {
    id: number;
    code: string;
    name_en: string;
  };
  user: {
    id: number;
    username: string;
    can_sell_via_hub: boolean; // CardTrader Zero indicator
    country_code: string;
  };
}

interface UseCardTraderZeroOptions {
  apiToken: string;
  blueprintId: number | null;
  language?: string; // e.g., 'en', 'it', 'fr'
  zeroOnly?: boolean; // Default true to isolate CardTrader Zero items
}

interface UseCardTraderZeroReturn {
  products: CardTraderProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  stats: {
    lowestPrice: number | null;
    highestPrice: number | null;
    currency: string;
    totalAvailable: number;
  };
}

export const useCardTraderZero = ({
  apiToken,
  blueprintId,
  language,
  zeroOnly = true,
}: UseCardTraderZeroOptions): UseCardTraderZeroReturn => {
  const [products, setProducts] = useState<CardTraderProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCardData = useCallback(async () => {
    if (!blueprintId || !apiToken) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build search URL
      const url = new URL('https://api.cardtrader.com/api/v2/marketplace/products');
      url.searchParams.append('blueprint_id', blueprintId.toString());

      if (language) {
        url.searchParams.append('language', language);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`CardTrader API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Normalize object response or direct array response
      const rawProducts: CardTraderProduct[] = Array.isArray(data)
        ? data
        : data[blueprintId] || [];

      // Filter for CardTrader Zero (can_sell_via_hub = true) and specific language if needed
      const filteredProducts = rawProducts.filter((product) => {
        const isZero = zeroOnly ? product.user?.can_sell_via_hub : true;
        const itemLang = product.properties_hash?.language || product.properties_hash?.mtg_language;
        const matchesLang = language ? itemLang?.toLowerCase() === language.toLowerCase() : true;

        return isZero && matchesLang;
      });

      setProducts(filteredProducts);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiToken, blueprintId, language, zeroOnly]);

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData]);

  // Derive pricing and availability statistics
  const stats = {
    lowestPrice: products.length > 0 ? Math.min(...products.map(p => p.price.cents)) / 100 : null,
    highestPrice: products.length > 0 ? Math.max(...products.map(p => p.price.cents)) / 100 : null,
    currency: products[0]?.price?.currency || 'EUR',
    totalAvailable: products.reduce((acc, curr) => acc + curr.quantity, 0),
  };

  return {
    products,
    loading,
    error,
    refetch: fetchCardData,
    stats,
  };
};