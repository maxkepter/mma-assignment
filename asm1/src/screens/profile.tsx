import { Text, View, ScrollView } from "react-native";
import ProfileCard from "../components/profile/profile-card";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { useTheme } from "../hook/use-theme";

export default function Profile({ navigation }: { navigation: any }) {
  const user = useContext(UserContext)?.user || null;
  const { themeColors } = useTheme();

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeColors.background,
        }}
      >
        <Text style={{ color: themeColors.text, fontSize: 16 }}>
          User not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: themeColors.background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
      }}
    >
      <ProfileCard user={user} navigation={navigation}></ProfileCard>
    </ScrollView>
  );
}
