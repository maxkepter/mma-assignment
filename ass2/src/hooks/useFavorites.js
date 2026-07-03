import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'favorites';

/**
 * Custom hook that manages a persisted favorites/wishlist list.
 * Handles AsyncStorage reads/writes so the context stays thin.
 */
export const useFavoritesStorage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load persisted favorites on mount
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Persist helper
  const persist = useCallback(async (newList) => {
    setFavorites(newList);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, []);

  /** Add or remove a product from favorites */
  const toggleFavorite = useCallback(
    (product) => {
      const exists = favorites.some((item) => item.id === product.id);
      const updated = exists
        ? favorites.filter((item) => item.id !== product.id)
        : [...favorites, product];
      persist(updated);
    },
    [favorites, persist]
  );

  /** Returns true if the product id is in favorites */
  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites]
  );

  /** Remove all favorites */
  const clearFavorites = useCallback(async () => {
    await persist([]);
  }, [persist]);

  return {
    favorites,
    favoriteCount: favorites.length,
    loading,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
