import React from 'react';
import { View, FlatList, TextInput, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts } from '../../src/hooks/useProducts';
import { useFavorites } from '../../src/hooks/useFavorites';
import ProductCard from '../../src/components/ProductCard';

export default function ProductListScreen() {
  const { products, loading, refreshing, refresh, loadMore, searchQuery, setSearchQuery } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  if (loading && products.length === 0) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(item.id)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  center: { flex: 1, justifyContent: 'center' },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
