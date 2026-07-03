import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFavorites } from "../../src/context/FavoritesContext";
import ProductCard from "../../src/components/ProductCard";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const {
    favorites,
    favoriteCount,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  } = useFavorites();
  const router = useRouter();

  const handleClearAll = () => {
    Alert.alert("Clear Favorites", "Remove all items from your wishlist?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear All", style: "destructive", onPress: clearFavorites },
    ]);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>🤍</Text>
        <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart on any product to save it here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {favoriteCount} saved item{favoriteCount !== 1 ? "s" : ""}
        </Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearBtn}>Clear all</Text>
        </TouchableOpacity>
      </View>
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
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: { fontSize: 14, color: "#888", textAlign: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 15, fontWeight: "600", color: "#333" },
  clearBtn: { fontSize: 14, color: "#e91e63", fontWeight: "600" },
});
