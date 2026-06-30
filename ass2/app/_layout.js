import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';
import { FavoritesProvider } from '../src/context/FavoritesContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" options={{ headerShown: true, title: 'Product Details', presentation: 'modal' }} />
        </Stack>
      </FavoritesProvider>
    </CartProvider>
  );
}
