import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import AllAppScreen from "./src/screens/AllAppScreen";
import GameScreen from "./src/screens/GameScreen";
import GoldScreen from "./src/screens/GoldScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const tabs = [
  {
    key: "Home",
    label: "Home",
    icon: require("./assets/botNav/home.svg"),
    activeIcon: require("./assets/botNav/home.svg"),
  },
  {
    key: "All Apps",
    label: "All Apps",
    icon: require("./assets/botNav/apps.svg"),
    activeIcon: require("./assets/botNav/apps_active.svg"),
  },
  {
    key: "Gold",
    label: "Gold",
    icon: require("./assets/botNav/gold.svg"),
    activeIcon: require("./assets/botNav/gold_active.svg"),
  },
  {
    key: "Game",
    label: "Game",
    icon: require("./assets/botNav/game.svg"),
    activeIcon: require("./assets/botNav/game_active.svg"),
  },
  {
    key: "Profile",
    label: "Profile",
    icon: require("./assets/botNav/profile.svg"),
    activeIcon: require("./assets/botNav/profile_active.svg"),
  },
];

function TabBar({ activeTab, onTabPress }) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={[styles.tabItem, isActive && styles.activeTabItem]}
          >
            <Image
              source={isActive ? tab.activeIcon : tab.icon}
              style={styles.tabIcon}
              resizeMode="contain"
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState("All Apps");
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen />;
      case "Gold":
        return <GoldScreen />;
      case "Game":
        return <GameScreen />;
      case "Profile":
        return <ProfileScreen />;
      case "All Apps":
      default:
        return <AllAppScreen />;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.content}>{renderContent()}</View>
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  activeTabItem: {
    backgroundColor: "#eaf5ff",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabText: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "700",
  },
});
