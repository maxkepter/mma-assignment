import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceSummary = ({ subtotal, shipping, taxRate = 0.08 }) => {
  const tax = subtotal * taxRate;
  const shippingCost = subtotal > 100 ? 0 : (shipping ?? 9.99);
  const total = subtotal + tax + shippingCost;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Shipping</Text>
        <Text style={styles.value}>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax (8%)</Text>
        <Text style={styles.value}>${tax.toFixed(2)}</Text>
      </View>
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e91e63',
  },
});

export default PriceSummary;
