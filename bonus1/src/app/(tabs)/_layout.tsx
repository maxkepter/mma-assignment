import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/botNav/home.svg")
                  : require("@/assets/botNav/home.svg")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="all-app"
        options={{
          title: "All App",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/botNav/apps_active.svg")
                  : require("@/assets/botNav/apps.svg")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gold"
        options={{
          title: "Gold",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/botNav/gold_active.svg")
                  : require("@/assets/botNav/gold.svg")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/botNav/game_active.svg")
                  : require("@/assets/botNav/game.svg")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/botNav/profile_active.svg")
                  : require("@/assets/botNav/profile.svg")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
