import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import ProfileItem from "../components/profile/profile-item";
import ProfileItemProps from "../types/profile-item-props";

export default function ProfileScreen() {
  const profileItems: ProfileItemProps[] = [
    {
      image: require("../../assets/profile/myprofile.svg"),
      name: "My Profile",
    },
    {
      image: require("../../assets/profile/setting.svg"),
      name: "Settings",
    },
    {
      image: require("../../assets/profile/support.svg"),
      name: "Support",
    },
    {
      image: require("../../assets/profile/faq.svg"),
      name: "FAQ",
    },
    {
      image: require("../../assets/profile/admin.svg"),
      name: "Admin",
    },
    {
      image: require("../../assets/profile/logout.svg"),
      name: "Logout",
    },
  ];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 16 }}>
      <View>
        <View
          style={{
            height: 140,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Image
            source={require("../../assets/profile/building.png")}
            style={{
              width: "100%",
              height: 140,
              backgroundColor: "#4A90E2",
              borderRadius: 6,
              overflow: "hidden",
            }}
          />
        </View>

        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#DCF1FF",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -60,
            borderWidth: 3,
            borderColor: "#fff",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 78, fontWeight: "600", color: "#0A96F3" }}>
            K
          </Text>
          <Image
            source={require("../../assets/profile/uploadImage.svg")}
            style={{
              position: "absolute",
              bottom: -10,
              right: 10,
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
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
