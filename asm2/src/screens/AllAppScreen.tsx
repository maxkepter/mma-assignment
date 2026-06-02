import React, { useState } from "react";
import Header from "../components/header";
import AppType from "../components/app/app-type";
import { Image } from "expo-image";
import { ScrollView, TextInput, View, TouchableOpacity } from "react-native";
import { AppCategory } from "../types/app-category";

export default function AllAppScreen() {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [searchText, setSearchText] = useState("");
  const appCategories: AppCategory[] = [
    {
      type: "WORK",
      apps: [
        {
          image: require("../../assets/appIcon/approve.svg"),
          title: "Approve Now",
          description:
            "Notify managers of pending requests and allow managers to approve/reject requests from internal tools",
        },
        {
          image: require("../../assets/appIcon/reward.svg"),
          title: "Reward",
          description:
            "Send colleagues a thank you note or reward Gold for exceptional contribution",
        },
        {
          image: require("../../assets/appIcon/discipline.svg"),
          title: "Discipline",
          description:
            "Send a discipline warning to subordinates for violation of codes of conduct",
        },
        {
          image: require("../../assets/appIcon/learning.svg"),
          title: "Learning",
          description:
            "View a list of mandatory, registered and suggested learning courses; check-in and send feedback for each course",
        },
        {
          image: require("../../assets/appIcon/task.svg"),
          title: "My Tasks",
          description: "",
        },
      ],
    },
    {
      type: "UTILITIES",
      apps: [
        {
          image: require("../../assets/appIcon/care.svg"),
          title: "FPT Care",
          description: "FPT Care",
        },
        {
          image: require("../../assets/appIcon/event.svg"),
          title: "Events",
          description:
            "Register, check-in, check-out, send feedback to Company events and programs",
        },
        {
          image: require("../../assets/appIcon/survey.svg"),
          title: "Survey",
          description:
            "Conduct and collect responses for company-wide or department-wide surveys",
        },
        {
          image: require("../../assets/appIcon/dating.svg"),
          title: "FPT Dating",
          description: "Dating feature",
        },
        {
          image: require("../../assets/appIcon/payslip.svg"),
          title: "Payslip",
          description: "Payslip",
        },
        {
          image: require("../../assets/appIcon/birthday.svg"),
          title: "Birthday",
          description:
            "Your birthday is a special moment. We're very happy to send the best wishes for you. Colleagues can send you birthday wishes on myFPT.",
        },
      ],
    },
    {
      type: "NEWS",
      apps: [
        {
          image: require("../../assets/appIcon/news.svg"),
          title: "News",
          description:
            "A collection of latest news and notable events around the company",
        },
        {
          image: require("../../assets/appIcon/star.svg"),
          title: "Star Ave",
          description: "Recognise notable achievements within a business unit",
        },
      ],
    },
    {
      type: "WIKI",
      apps: [
        {
          image: require("../../assets/appIcon/employee.svg"),
          title: "Employee Info",
          description:
            "Basic, non-confidential employee information (name, gender, department, etc.)",
        },
      ],
    },
    {
      type: "GAME",
      apps: [
        {
          image: require("../../assets/appIcon/game.svg"),
          title: "Game",
          description: "Community-engaging games with Gold as rewards",
        },
      ],
    },
  ];

  const filteredAppCategories = appCategories
    .map((category) => ({
      ...category,
      apps: category.apps.filter((app) =>
        app.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    }))
    .filter((category) => category.apps.length > 0);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F0F0",
            paddingHorizontal: 10,
            marginRight: 8,
          }}
        >
          <Image
            style={{ width: 24, height: 24, marginRight: 6 }}
            source={require("../../assets/search.svg")}
          />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 8,
            }}
            placeholder="Type feature's name"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity onPress={() => setIsGridLayout(!isGridLayout)}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/menu.svg")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ padding: 16 }}>
          <Header type={1}>All Apps</Header>

          <View style={{ marginTop: 16 }}>
            {filteredAppCategories.map((category) => (
              <View key={category.type}>
                <AppType type={category.type} apps={category.apps} grid={isGridLayout} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
