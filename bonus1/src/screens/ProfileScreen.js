import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const profileItems = [
    { name: "My Profile" },
    { name: "Settings" },
    { name: "Support" },
    { name: "FAQ" },
    { name: "Admin" },
    { name: "Logout" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Hồ sơ</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>K</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Phạm Quang Khang (KHANGPQ3)</Text>
            <Text style={styles.userDept}>(BM SE)</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {profileItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.menuText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  profileSection: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DCF1FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "600",
    color: "#0A96F3",
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  userDept: {
    fontSize: 16,
    color: "#888888",
    marginTop: 5,
  },
  menuSection: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    fontSize: 16,
    color: "#333333",
  },
});
