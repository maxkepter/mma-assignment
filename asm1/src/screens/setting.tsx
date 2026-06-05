import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import { Size, ThemeMode, Variant } from "../enum/enum";
import { useTheme } from "../hook/use-theme";

export default function Setting({ navigation }: { navigation: any }) {
  const { theme, setTheme, themeColors } = useTheme();

  const themeOptions = [
    {
      label: "Light Theme",
      value: ThemeMode.Light,
      description: "Bright background with dark text",
    },
    {
      label: "Dark Theme",
      value: ThemeMode.Dark,
      description: "Dark background with bright text",
    },
  ];

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
      <View
        style={{
          padding: 24,
          borderRadius: 20,
          backgroundColor: themeColors.primary,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 30,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          Customize your app theme and quickly navigate to other screens.
        </Text>
      </View>

      <View
        style={{
          padding: 20,
          borderRadius: 16,
          backgroundColor: theme === ThemeMode.Dark ? "#1f1f1f" : "#f4f6f8",
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: themeColors.text,
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 14,
          }}
        >
          Choose Theme
        </Text>

        {themeOptions.map((item) => {
          const isActive = theme === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => setTheme(item.value)}
              style={{
                padding: 16,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isActive ? themeColors.primary : "transparent",
                backgroundColor: isActive
                  ? themeColors.primary
                  : theme === ThemeMode.Dark
                    ? "#2a2a2a"
                    : "#ffffff",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: isActive ? "#ffffff" : themeColors.text,
                  fontSize: 17,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  color: isActive
                    ? "rgba(255,255,255,0.85)"
                    : themeColors.secondary,
                  fontSize: 14,
                }}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          padding: 20,
          borderRadius: 16,
          backgroundColor: theme === ThemeMode.Dark ? "#1f1f1f" : "#f4f6f8",
        }}
      >
        <Text
          style={{
            color: themeColors.text,
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 14,
          }}
        >
          Navigation
        </Text>

        <Button
          title="Go to Home"
          variant={Variant.Primary}
          size={Size.Large}
          style={{ marginBottom: 12 }}
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title="Go to Profile"
          variant={Variant.Secondary}
          size={Size.Large}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </ScrollView>
  );
}
