import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="all-app" options={{ title: "All App", headerShown: false }} />
      <Tabs.Screen name="gold" options={{ title: "Gold", headerShown: false }} />
      <Tabs.Screen name="game" options={{ title: "Game", headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false }} />
    </Tabs>
  );
}
