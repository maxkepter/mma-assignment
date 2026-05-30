import { Text, View } from "react-native";
import App from "./app";
import { AppCategory } from "@/src/types/app-category";

type AppTypeProps = AppCategory & { grid?: boolean };

export default function AppType({ type, apps, grid }: AppTypeProps) {
  return (
    <View style={{ marginHorizontal: -16 }}>
      <View
        style={{
          backgroundColor: "#EFEDF0",
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#888",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          {type}
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16, flexDirection: grid ? "row" : "column", flexWrap: grid ? "wrap" : "nowrap" }}>
        {apps.map((app, index) => (
          <App
            key={index}
            image={app.image}
            title={app.title}
            description={app.description}
            grid={grid}
          />
        ))}
      </View>
    </View>
  );
}
