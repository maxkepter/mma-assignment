import { useEffect, useState } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function setupNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status } = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true },
  });

  if (status !== "granted") {
    console.warn("Notification permission not granted");
  }
}

export default function App() {
  const [text, setText] = useState("");

  const lastResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    if (
      lastResponse &&
      lastResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const saved = lastResponse.notification.request.content.data?.inputText;
      if (saved) {
        setText(String(saved));
      }
    }
  }, [lastResponse]);

  const sendNotification = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Tin nhắn của bạn",
        body: trimmed,
        data: { inputText: trimmed },
        channelId: "default",
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập nội dung thông báo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tin nhắn của bạn…"
        value={text}
        onChangeText={setText}
        multiline
      />

      <Button title="Gửi thông báo" onPress={sendNotification} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    width: "100%",
    minHeight: 56,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
});
