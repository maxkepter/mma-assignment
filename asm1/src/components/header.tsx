import { Text, View } from "react-native";
import { HeaderProps } from "../types/types";

export default function Header(props: HeaderProps) {
  return (
    <>
      <View
        style={{
          padding: 20,
          backgroundColor: "#f0f0f0",
          alignItems: "flex-start",
        }}
      >
        <Text>{props.page}</Text>
      </View>
    </>
  );
}
