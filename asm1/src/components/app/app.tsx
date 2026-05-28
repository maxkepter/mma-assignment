import { Image, Text, TouchableOpacity, View } from "react-native";
import Header from "../header";
import AppProps from "@/src/types/app-props";

export default function App({ image, title, description }: AppProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 15,
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#FAF2FA",
      }}
    >
      <View
        style={{
          width: 45,
          height: 45,
          borderRadius: 100,
          backgroundColor: "#EAF2FF",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15,
          overflow: "hidden",
          padding: 10,
        }}
      >
        <Image source={image} style={{ width: 32, height: 32 }} />
      </View>
      <View style={{ flex: 1 }}>
        <Header type={5}>{title}</Header>
        <Text style={{ fontSize: 12, color: "#333" }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
