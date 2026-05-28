import { Image, ScrollView, Text, View } from "react-native";
import ProfileItem from "../../components/profile/profile-item";
import ProfileItemProps from "@/types/profile-item-props";
import Header from "@/components/header";

export default function Profile() {
  const profileItems: ProfileItemProps[] = [
    {
      image: require("@/assets/images/react-logo.png"),
      name: "My Profile",
    },
    {
      image: require("@/assets/images/react-logo.png"),
      name: "Settings",
    },
    {
      image: require("@/assets/images/react-logo.png"),
      name: "Support",
    },
    {
      image: require("@/assets/images/react-logo.png"),
      name: "FAQ",
    },
    {
      image: require("@/assets/images/react-logo.png"),
      name: "Admin",
    },
    {
      image: require("@/assets/images/react-logo.png"),
      name: "Logout",
    },
  ];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        <Header type={1} style={{ margin: 16 }}>
          Profile
        </Header>
        <View
          style={{
            backgroundColor: "#1E90FF",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: "absolute",
              bottom: -50,
              borderWidth: 4,
              borderColor: "#fff",
            }}
          />
        </View>
        <View style={{ marginTop: 60, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Phạm Quang Khang (KHANGPQ3)
          </Text>
          <Text style={{ fontSize: 16, color: "#888" }}>(BM SE)</Text>
        </View>
        <View style={{ padding: 16, marginTop: 20 }}>
          {profileItems.map((item, index) => (
            <ProfileItem key={index} image={item.image} name={item.name} />
          ))}
        </View>
        <View
          style={{ alignItems: "center", marginTop: 20, paddingBottom: 20 }}
        >
          <Text style={{ color: "#888" }}>myFPT Version 5.9.10</Text>
          <Text style={{ color: "#888" }}>Copyright @ FPT Software 2021</Text>
        </View>
      </View>
    </ScrollView>
  );
}
