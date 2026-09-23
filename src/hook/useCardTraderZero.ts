import { useState, useEffect, useCallback, useMemo } from 'react';
import { CardTraderProduct, CardTraderProductStats } from '../models/cardTraderZero'; // Adjust import path as needed

export type SortOrder = 'asc' | 'desc';

interface UseCardTraderZeroOptions {
  apiToken: string;
  blueprintId: number | null;
  languages?: string | string[];
  zeroOnly?: boolean;
  sortOrder?: SortOrder;
}

interface UseCardTraderZeroReturn {
  products: CardTraderProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  stats: CardTraderProductStats;
}

export const useCardTraderZero = ({
  apiToken,
  blueprintId,
  languages = ['en', 'it'],
  zeroOnly = true,
  sortOrder = 'asc',
}: UseCardTraderZeroOptions): UseCardTraderZeroReturn => {
  const [products, setProducts] = useState<CardTraderProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const langList = Array.isArray(languages)
    ? languages.map((l) => l.toLowerCase())
    : languages
      ? [languages.toLowerCase()]
      : [];

  const fetchCardData = useCallback(async () => {
    if (!blueprintId || !apiToken) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = new URL('https://api.cardtrader.com/api/v2/marketplace/products');
      url.searchParams.append('blueprint_id', blueprintId.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`CardTrader API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const rawProducts: CardTraderProduct[] = Array.isArray(data)
        ? data
        : data[blueprintId] || [];

      // Filter by Zero availability and language selection
      const filtered = rawProducts.filter((product) => {
        const isZero = zeroOnly ? product.user?.can_sell_via_hub : true;

        const itemLang = (
          product.properties_hash?.language ||
          product.properties_hash?.mtg_language ||
          ''
        ).toLowerCase();

        const matchesLang = langList.length === 0 || langList.includes(itemLang);

        return isZero && matchesLang;
      });

      // Sort products by price (cents)
      const sorted = [...filtered].sort((a, b) => {
        return sortOrder === 'asc'
          ? a.price.cents - b.price.cents
          : b.price.cents - a.price.cents;
      });

      setProducts(sorted);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiToken, blueprintId, zeroOnly, sortOrder, JSON.stringify(langList)]);

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData]);

  const stats = useMemo(() => {
    if (products.length === 0) {
      return {
        lowestPrice: null,
        highestPrice: null,
        currency: 'EUR',
        totalAvailable: 0,
      };
    }

    const pricesCents = products.map((p) => p.price.cents);

    return {
      lowestPrice: Math.min(...pricesCents) / 100,
      highestPrice: Math.max(...pricesCents) / 100,
      currency: products[0]?.price?.currency || 'EUR',
      totalAvailable: products.reduce((acc, curr) => acc + curr.quantity, 0),
    };
  }, [products]);

  return {
    products,
    loading,
    error,
    refetch: fetchCardData,
    stats,
  };
};
