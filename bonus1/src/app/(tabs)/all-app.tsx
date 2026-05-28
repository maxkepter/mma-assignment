import Header from "@/components/header";
import AppType from "@/components/app/app-type";
import { ScrollView, View } from "react-native";
import { AppCategory } from "@/types/app-category";

export default function AllApp() {
  const appCategories: AppCategory[] = [
    {
      type: "WORK",
      apps: [
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Approve Now",
          description:
            "Notify managers of pending requests and allow managers to approve/reject requests from internal tools",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Reward",
          description:
            "Send colleagues a thank you note or reward Gold for exceptional contribution",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Discipline",
          description:
            "Send a discipline warning to subordinates for violation of codes of conduct",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Learning",
          description:
            "View a list of mandatory, registered and suggested learning courses; check-in and send feedback for each course",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "My Tasks",
          description: "",
        },
      ],
    },
    {
      type: "UTILITIES",
      apps: [
        {
          image: require("@/assets/images/react-logo.png"),
          title: "FPT Care",
          description: "FPT Care",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Events",
          description:
            "Register, check-in, check-out, send feedback to Company events and programs",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Survey",
          description:
            "Conduct and collect responses for company-wide or department-wide surveys",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "FPT Dating",
          description: "Dating feature",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Payslip",
          description: "Payslip",
        },
        {
          image: require("@/assets/images/react-logo.png"),
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
          image: require("@/assets/images/react-logo.png"),
          title: "News",
          description:
            "A collection of latest news and notable events around the company",
        },
        {
          image: require("@/assets/images/react-logo.png"),
          title: "Star Ave",
          description: "Recognise notable achievements within a business unit",
        },
      ],
    },
    {
      type: "WIKI",
      apps: [
        {
          image: require("@/assets/images/react-logo.png"),
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
          image: require("@/assets/images/react-logo.png"),
          title: "Game",
          description: "Community-engaging games with Gold as rewards",
        },
      ],
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Header type={1}>All Apps</Header>

        {appCategories.map((category) => (
          <View key={category.type} style={{ marginTop: 20 }}>
            <AppType type={category.type} apps={category.apps} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
