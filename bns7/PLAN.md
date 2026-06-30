# Kế hoạch xây dựng ứng dụng chụp và xem lại ảnh

## Mục tiêu
Tạo ứng dụng React Native/Expo cho phép:
- Chụp ảnh.
- Lưu trữ thông tin ảnh (ảnh, tọa độ, mô tả) vào bộ nhớ cục bộ.
- Hiển thị danh sách ảnh.
- Hiển thị vị trí chụp trên bản đồ.
- Sử dụng Gemini AI để mô tả ảnh.
- Xóa ảnh.

## Các bước thực hiện

### 1. Thiết lập dự án
- [ ] Khởi tạo dự án Expo (với TypeScript/JavaScript).
- [ ] Cài đặt các thư viện: `expo-image-picker`, `expo-location`, `react-native-maps`, `@react-native-async-storage/async-storage`, `@google/generative-ai`.

### 2. Thiết kế dữ liệu & Storage
- [ ] Định nghĩa cấu trúc dữ liệu `PhotoItem` (id, uri, location: {latitude, longitude}, description, timestamp).
- [ ] Viết các hàm helper để Lưu/Lấy/Xóa dữ liệu với `AsyncStorage`.

### 3. Phát triển tính năng Camera & Xử lý Ảnh
- [ ] Cấu hình `expo-image-picker` để cho phép chụp ảnh.
- [ ] Sử dụng `expo-location` để lấy tọa độ tại thời điểm chụp.

### 4. Tích hợp Gemini AI
- [ ] Thiết lập API Key Gemini (cần hướng dẫn người dùng cấu hình).
- [ ] Viết hàm gửi ảnh (base64) tới Gemini API để nhận mô tả.

### 5. Giao diện người dùng (UI)
- [ ] Màn hình chính: Danh sách ảnh dạng lưới.
- [ ] Màn hình chụp: Nút chụp ảnh.
- [ ] Màn hình chi tiết: Hiển thị ảnh lớn, mô tả, bản đồ (`react-native-maps`), nút xóa.

### 6. Kiểm thử
- [ ] Chạy thử trên máy ảo/thiết bị thật.
