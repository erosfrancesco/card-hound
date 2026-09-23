import { useState, useEffect, useCallback } from 'react';
import { CardTraderProduct, UseCardTraderZeroOptions, UseCardTraderZeroReturn } from '../models/cardTraderZero';


export const useCardTraderZero = ({
  apiToken,
  blueprintId,
  languages = ['en', 'it'], // Default to EN and IT
  zeroOnly = true,
}: UseCardTraderZeroOptions): UseCardTraderZeroReturn => {
  const [products, setProducts] = useState<CardTraderProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Normalize languages into a clean string array lowercase: ['en', 'it']
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

      // Filter by CT Zero and match any of the allowed languages in langList
      const filteredProducts = rawProducts.filter((product) => {
        const isZero = zeroOnly ? product.user?.can_sell_via_hub : true;

        const itemLang = (
          product.properties_hash?.language ||
          product.properties_hash?.mtg_language ||
          ''
        ).toLowerCase();

        // If no language filter specified, keep all. Otherwise check inclusion.
        const matchesLang = langList.length === 0 || langList.includes(itemLang);

        return isZero && matchesLang;
      });

      setProducts(filteredProducts);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiToken, blueprintId, zeroOnly, JSON.stringify(langList)]);

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData]);

  const stats = {
    lowestPrice: products.length > 0 ? Math.min(...products.map((p) => p.price.cents)) / 100 : null,
    highestPrice: products.length > 0 ? Math.max(...products.map((p) => p.price.cents)) / 100 : null,
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