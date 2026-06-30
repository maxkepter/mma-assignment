import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api';

const PAGE_SIZE = 10;

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = useCallback(async (pageNum = 1, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts({ limit: PAGE_SIZE, skip: (pageNum - 1) * PAGE_SIZE });
      if (data.length < PAGE_SIZE) setHasMore(false);

      if (isRefresh || pageNum === 1) {
        setProducts(data);
      } else {
        setProducts(prev => [...prev, ...data]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(1, false);
  }, [loadProducts]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage, false);
    }
  };

  const refresh = () => {
    setPage(1);
    setHasMore(true);
    loadProducts(1, true);
  };

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
  });

  return { products: filteredProducts, loading, refreshing, error, hasMore, loadMore, refresh, searchQuery, setSearchQuery };
};
