import { Image, Text, View } from "react-native";
import AppProps from "@/types/app-props";

export default function App({ image, title, description }: AppProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Image
        source={image}
        style={{ width: 50, height: 50, marginRight: 16 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 14 }}>{description}</Text>
      </View>
    </View>
  );
}
