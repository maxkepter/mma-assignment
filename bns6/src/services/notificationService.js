import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';

// Cấu hình handler cho notification khi app ở foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Đăng ký nhận Push Notification
 * @returns {Promise<string|null>} Expo Push Token hoặc null nếu lỗi
 */
export async function registerForPushNotificationsAsync() {
  let token;

  // Android: tạo notification channel (cần cho Android 8+)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Thông báo chung',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Kiểm tra thiết bị thật (không chạy trên simulator/emulator)
  if (!Device.isDevice) {
    Alert.alert(
      'Thông báo',
      'Push notification chỉ hoạt động trên thiết bị thật.'
    );
    return null;
  }

  // Kiểm tra quyền thông báo
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Lỗi', 'Không có quyền nhận thông báo!');
    return null;
  }

  // Lấy Expo Push Token
  try {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
  } catch (e) {
    console.error('Lỗi lấy push token:', e);
    return null;
  }

  return token;
}

/**
 * Gửi push notification qua Expo Push Service
 * @param {string} expoPushToken - Token của người nhận
 * @param {string} title - Tiêu đề
 * @param {string} body - Nội dung
 * @param {object} data - Dữ liệu kèm (tùy chọn)
 */
export async function sendPushNotification(expoPushToken, title, body, data = {}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data,
  };

  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Lỗi gửi push notification:', error);
  }
}

/**
 * Lắng nghe notification khi app đang mở
 */
export function addNotificationReceivedListener(callback) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Lắng nghe khi người dùng chạm vào notification
 */
export function addNotificationResponseListener(callback) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * Lấy last notification response (khi app mở từ notification)
 */
export function getLastNotificationResponse() {
  return Notifications.getLastNotificationResponse();
}
