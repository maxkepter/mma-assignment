import React from "react";
import { ScrollView, Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllAppScreen() {
  const appCategories = [
    {
      type: "WORK",
      apps: [
        {
          title: "Approve Now",
          description: "Notify managers of pending requests",
        },
        {
          title: "Reward",
          description: "Send colleagues a thank you note or reward Gold",
        },
        {
          title: "Discipline",
          description: "Send a discipline warning to subordinates",
        },
        {
          title: "Learning",
          description:
            "View a list of mandatory, registered and suggested learning courses",
        },
        { title: "My Tasks", description: "Manage your tasks" },
      ],
    },
    {
      type: "UTILITIES",
      apps: [
        { title: "FPT Care", description: "FPT Care" },
        {
          title: "Events",
          description:
            "Register, check-in, check-out, send feedback to Company events",
        },
        {
          title: "Survey",
          description: "Conduct and collect responses for surveys",
        },
        { title: "FPT Dating", description: "Dating feature" },
        { title: "Payslip", description: "Payslip" },
        { title: "Birthday", description: "Your birthday is a special moment" },
      ],
    },
    {
      type: "NEWS",
      apps: [
        {
          title: "News",
          description: "A collection of latest news and notable events",
        },
        {
          title: "Star Ave",
          description: "Recognise notable achievements within a business unit",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Tất cả ứng dụng</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm ứng dụng..."
            placeholderTextColor="#999"
          />
        </View>

        {appCategories.map((category, catIndex) => (
          <View key={catIndex} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.type}</Text>
            {category.apps.map((app, appIndex) => (
              <View key={appIndex} style={styles.appItem}>
                <Text style={styles.appTitle}>{app.title}</Text>
                <Text style={styles.appDescription}>{app.description}</Text>
              </View>
            ))}
          </View>
        ))}
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
  searchContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  categorySection: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  appItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: "#666666",
  },
});
