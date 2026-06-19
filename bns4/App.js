import { useEffect, useState } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

// ─── Module-level handler ─────────────────────────────────────────────────────
// Must be set at module scope (outside the component) so it takes effect
// before any notification arrives.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,   // SDK 54 foreground banner
    shouldShowList: true,     // show in notification list/tray
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ─── Android channel + permission helper ──────────────────────────────────────
async function setupNotifications() {
  // Android 8+ requires a channel before scheduling notifications.
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status } = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true },
  });

  if (status !== 'granted') {
    console.warn('Notification permission not granted');
  }
}

// ─── App Component ────────────────────────────────────────────────────────────
export default function App() {
  const [text, setText] = useState('');

  // useLastNotificationResponse handles both cold starts (when app is opened from notification)
  // and runtime taps (when app is in background/foreground and user taps the notification).
  const lastResponse = Notifications.useLastNotificationResponse();

  // 1. Request permissions & create Android channel on mount.
  useEffect(() => {
    setupNotifications();
  }, []);

  // 2. React to notification taps (both cold start and background taps).
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

  // ── Send notification ────────────────────────────────────────────────────────
  const sendNotification = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tin nhắn của bạn',
        body: trimmed,
        data: { inputText: trimmed }, // payload used to re-fill TextInput on tap
        channelId: 'default',         // Android: associate with our channel
      },
      trigger: null, // immediate delivery
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    width: '100%',
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
});
