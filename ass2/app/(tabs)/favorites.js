import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../../src/hooks/useFavorites';
import { useCart } from '../../src/context/CartContext';
import ProductCard from '../../src/components/ProductCard';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const cart = useCart();
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
