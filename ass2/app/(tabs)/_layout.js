import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import { useFavorites } from '../../src/context/FavoritesContext';

export default function TabLayout() {
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#999',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🛍️</Text>,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🛒</Text>,
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>❤️</Text>,
          tabBarBadge: favoriteCount > 0 ? favoriteCount : undefined,
        }}
      />
    </Tabs>
  );
}

