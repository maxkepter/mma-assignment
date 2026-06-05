import { SafeAreaView, StyleSheet } from "react-native";
import { UserProvider } from "./src/context/user-context";
import Home from "./src/screens/home";
import { ThemeProvider } from "./src/context/theme-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./src/screens/profile";
import EditProfile from "./src/screens/edit-profile";
import Setting from "./src/screens/setting";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    // Thay đổi style ở đây để chiếm trọn màn hình
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <UserProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Setting" component={Setting} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </UserProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
