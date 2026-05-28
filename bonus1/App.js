import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import GoldScreen from "./src/screens/GoldScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AllAppScreen from "./src/screens/AllAppScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Game") {
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
            } else if (route.name === "Gold") {
              iconName = focused ? "star" : "star-outline";
            } else if (route.name === "AllApp") {
              iconName = focused ? "apps" : "apps-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
            tabBarLabel: "Trang chủ",
          }}
        />
        <Tab.Screen
          name="AllApp"
          component={AllAppScreen}
          options={{
            title: "Tất cả ứng dụng",
            tabBarLabel: "Ứng dụng",
          }}
        />
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: "Trò chơi",
            tabBarLabel: "Trò chơi",
          }}
        />
        <Tab.Screen
          name="Gold"
          component={GoldScreen}
          options={{
            title: "Vàng",
            tabBarLabel: "Vàng",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Hồ sơ",
            tabBarLabel: "Hồ sơ",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
