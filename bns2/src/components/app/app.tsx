import { Image, Text, TouchableOpacity, View } from "react-native";
import Header from "../header";
import AppProps from "@/src/types/app-props";

export default function App({ image, title, description, grid }: AppProps) {
  if (grid) {
    return (
      <TouchableOpacity
        style={{
          width: "25%",
          alignItems: "center",
          paddingVertical: 15,
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
            overflow: "hidden",
            padding: 10,
            marginBottom: 8,
          }}
        >
          <Image source={image} style={{ width: 32, height: 32 }} />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "#333",
            textAlign: "center",
            paddingHorizontal: 4,
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

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
