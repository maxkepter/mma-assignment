import ProfileItemProps from "@/types/profile-item-props";
import { Image, Text, View } from "react-native";

export default function ProfileItem(item: ProfileItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={item.image}
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
      </View>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={{ width: 16, height: 16 }}
      />
    </View>
  );
}
