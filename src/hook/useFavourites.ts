import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cardtrader_favourites";

export function useFavourites() {
  const [favourites, setFavourites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      /* quota exceeded / unavailable — ignore silently */
    }
  }, [favourites]);

  const add = useCallback((blueprintId: number) => {
    setFavourites((prev) =>
      prev.includes(blueprintId) ? prev : [...prev, blueprintId],
    );
  }, []);

  const remove = useCallback((blueprintId: number) => {
    setFavourites((prev) => prev.filter((id) => id !== blueprintId));
  }, []);

  const has = useCallback(
    (blueprintId: number) => favourites.includes(blueprintId),
    [favourites],
  );

  const toggle = useCallback(
    (blueprintId: number) => {
      favourites.includes(blueprintId)
        ? setFavourites((prev) => prev.filter((id) => id !== blueprintId))
        : setFavourites((prev) => [...prev, blueprintId]);
    },
    [favourites],
  );

  return { favourites, add, remove, has, toggle };
}
