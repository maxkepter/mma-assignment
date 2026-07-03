import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProducts } from '../api';

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // Try to load from cache first if not refreshing
      if (!isRefresh) {
        const cachedData = await AsyncStorage.getItem('cached_products');
        if (cachedData) {
          setAllProducts(JSON.parse(cachedData));
          setLoading(false); // Show cached data immediately
        }
      }

      const data = await fetchProducts();
      setAllProducts(data);
      // Save to cache
      await AsyncStorage.setItem('cached_products', JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(false);
  }, [loadProducts]);

  const loadMore = () => {
    // FakeStoreAPI returns all products at once — no pagination needed
  };

  const refresh = () => {
    loadProducts(true);
  };

  const filteredProducts = allProducts.filter(product => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
  });

  return { products: filteredProducts, loading, refreshing, error, hasMore: false, loadMore, refresh, searchQuery, setSearchQuery };
};
