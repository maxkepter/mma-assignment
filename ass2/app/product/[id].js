import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchProduct } from '../../src/api';
import { useCart } from '../../src/context/CartContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProduct(id);
      setProduct(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  if (!product) return <View style={styles.center}><Text>Product not found.</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity
          style={[styles.addBtn, added && styles.addedBtn]}
          onPress={() => { addToCart(product); setAdded(true); }}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>{added ? '✓ Added to Cart' : 'Add to Cart'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center' },
  image: { width: '100%', height: 350, backgroundColor: '#f5f5f5' },
  info: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#222' },
  price: { fontSize: 26, fontWeight: '700', color: '#e91e63', marginBottom: 8 },
  category: { fontSize: 14, color: '#888', textTransform: 'capitalize', marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 22, color: '#555', marginBottom: 24 },
  addBtn: {
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addedBtn: { backgroundColor: '#4caf50' },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
