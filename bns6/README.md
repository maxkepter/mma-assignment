# Ứng dụng Expo với Firebase Authentication & Push Notification

## 📋 Mục lục
1. [Cài đặt Firebase Console](#1-cài-đặt-firebase-console)
2. [Cấu hình Firebase trong ứng dụng](#2-cấu-hình-firebase-trong-ứng-dụng)
3. [Cài đặt Google Services cho Android](#3-cài-đặt-google-services-cho-android)
4. [Cài đặt EAS Build (nếu cần)](#4-cài-đặt-eas-build-nếu-cần)
5. [Chạy ứng dụng](#5-chạy-ứng-dụng)
6. [Cấu trúc project](#6-cấu-trúc-project)
7. [Tính năng](#7-tính-năng)

---

## 1. Cài đặt Firebase Console

### Bước 1: Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** → Đặt tên project → **Create**
3. Sau khi tạo xong, vào **Project Settings** → **General**

### Bước 2: Đăng ký ứng dụng Web
1. Trong phần **"Your apps"**, click **Web** (</>) icon
2. Đặt tên app → **Register app**
3. Copy các thông số `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`

### Bước 3: Bật Authentication
1. Vào **Authentication** → **Sign-in method**
2. Click **Email/Password** → Enable → **Save**

### Bước 4: Cấu hình Cloud Messaging (FCM)
1. Vào **Project Settings** → **Cloud Messaging**
2. Copy **Cloud Messaging sender ID**

---

## 2. Cấu hình Firebase trong ứng dụng

Mở file `src/firebase/config.js` và thay thế các giá trị:

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',           // Từ Firebase Console
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

### Cách lấy các giá trị:
- Vào Firebase Console → Project Settings → General → Your apps → Web app
- Các giá trị nằm trong object `firebaseConfig`

---

## 3. Cài đặt Google Services cho Android

### Bước 1: Tải google-services.json
1. Vào Firebase Console → **Project Settings** → **Your apps**
2. Click **Android** icon → Nhập:
   - **Android package name**: `com.yourcompany.bns6` (hoặc tên bạn đặt)
   - **Debug signing certificate SHA-1**: (tùy chọn, để test debug)
3. Click **Register app** → Download `google-services.json`
4. Đặt file vào thư mục gốc của project

### Bước 2: Cập nhật app.json
Đảm bảo `app.json` có cấu hình đúng:

```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.bns6",
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

---

## 4. Cài đặt EAS Build (nếu cần)

Để build ứng dụng với native code (Firebase, Push Notification):

```bash
# Đăng nhập Expo
eas login

# Khởi tạo EAS
eas build:configure

# Build Android (Development)
eas build --platform android --profile development

# Build Android (Production)
eas build --platform android --profile production
```

---

## 5. Chạy ứng dụng

### Development với Expo Go (không có native code đầy đủ)
```bash
npx expo start
# Quét QR code bằng Expo Go
```

### Development với Development Build (đầy đủ native code)
```bash
# Tạo development build
eas build --platform android --profile development

# Hoặc chạy local
npx expo prebuild
npx expo run:android
```

---

## 6. Cấu trúc project

```
bns6/
├── App.js                          # Main app entry
├── app.json                        # Expo config
├── google-services.json            # Firebase config (Android)
├── src/
│   ├── firebase/
│   │   └── config.js               # Firebase initialization
│   ├── context/
│   │   └── AuthContext.js          # Auth state management
│   ├── screens/
│   │   ├── LoginScreen.js          # Đăng nhập
│   │   ├── RegisterScreen.js       # Đăng ký
│   │   └── ProfileScreen.js        # Quản lý tài khoản
│   └── services/
│       └── notificationService.js  # Push notification service
└── assets/                         # Images, icons
```

---

## 7. Tính năng

### ✅ Authentication
- [x] Đăng nhập bằng email/password
- [x] Đăng ký tài khoản mới
- [x] Đăng xuất
- [x] Cập nhật email (cần xác minh mật khẩu)
- [x] Đổi mật khẩu (cần xác minh mật khẩu hiện tại)
- [x] Cập nhật tên hiển thị
- [x] Cập nhật số điện thoại (cần tích hợp thêm OTP)
- [x] Lưu địa chỉ (cần tích hợp Firestore)

### ✅ Push Notification
- [x] Đăng ký nhận push notification
- [x] Hiển thị notification khi app đang mở
- [x] Xử lý khi người dùng chạm vào notification
- [x] Lấy Expo Push Token

### 🔧 Cần làm thêm
- [ ] Tích hợp Firebase Firestore để lưu địa chỉ
- [ ] Tích hợp Firebase Phone Auth cho OTP
- [ ] Gửi push notification từ server
- [ ] Xử lý notification khi app background/terminated

---

## 📝 Lưu ý quan trọng

### Về Push Notification
- Push notification chỉ hoạt động trên **thiết bị thật**
- Không hoạt động trên Android Emulator (trừ khi có Google Play Services)
- Cần build production/release để test đầy đủ

### Về Authentication
- Khi đổi email/password, Firebase yêu cầu **re-authentication**
- Người dùng cần nhập mật khẩu hiện tại để xác minh

### Về Expo Go
- Firebase JS SDK hoạt động trên Expo Go
- Tuy nhiên, một số tính năng native (FCM) cần Development Build

---

## 🔗 Tài liệu tham khảo

- [Expo SDK 54 Documentation](https://docs.expo.dev/versions/v54.0.0/)
- [Firebase JS SDK](https://firebase.google.com/docs/web/setup)
- [React Navigation](https://reactnavigation.org/)
- [Expo Notifications](https://docs.expo.dev/versions/v54.0.0/sdk/notifications/)