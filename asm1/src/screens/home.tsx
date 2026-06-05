import { useContext } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { UserContext } from "../context/user-context";
import Header from "../components/header";
import { ThemeContext } from "../context/theme-context";
import { themes } from "../const/theme";
import Button from "../components/button";
import { Variant, Size } from "../enum/enum";

export default function Home({ navigation }: { navigation: any }) {
  const userContex = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const themeColors = theme?.themeColors || themes.light;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: themeColors.background,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Hero Section */}
      <View
        style={{
          padding: 24,
          paddingTop: 40,
          paddingBottom: 60,
          backgroundColor: themeColors.primary,
          marginBottom: 30,
          borderRadius: 24,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: 8,
          }}
        >
          Welcome back, {userContex?.user?.name}!
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 20,
            marginBottom: 20,
          }}
        >
          Manage your profile, customize your theme, and explore settings
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ paddingHorizontal: 24, paddingTop: 30, gap: 12 }}>
        <Button
          title="View Profile"
          variant={Variant.Primary}
          size={Size.Large}
          onPress={() => navigation.navigate("Profile")}
        />
        <Button
          title="Settings"
          variant={Variant.Secondary}
          size={Size.Large}
          onPress={() => navigation.navigate("Setting")}
        />
      </View>
    </ScrollView>
  );
}
