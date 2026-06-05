import { Image, Text, View } from "react-native";
import { User } from "../../types/types";
import Button from "../button";
import { Size, Variant } from "../../enum/enum";
import { useTheme } from "../../hook/use-theme";

export default function ProfileCard({
  user,
  navigation,
}: {
  user: User;
  navigation: any;
}) {
  const { themeColors } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        padding: 24,
        borderRadius: 20,
        backgroundColor:
          themeColors.background === "#ffffff" ? "#f9f9f9" : "#1f1f1f",
      }}
    >
      <View
        style={{
          marginBottom: 20,
          padding: 4,
          borderRadius: 60,
          borderWidth: 3,
          borderColor: themeColors.primary,
        }}
      >
        <Image
          source={{ uri: user.avatarUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          color: themeColors.text,
          marginBottom: 8,
        }}
      >
        {user.name}
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: themeColors.secondary,
          textAlign: "center",
          marginBottom: 24,
          lineHeight: 22,
          paddingHorizontal: 16,
        }}
      >
        {user.bio}
      </Text>
      <Button
        title="Edit Profile"
        variant={Variant.Primary}
        size={Size.Large}
        onPress={() => navigation.navigate("EditProfile")}
      />
    </View>
  );
}
