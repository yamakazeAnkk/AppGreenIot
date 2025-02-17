# Hướng Dẫn Chạy Dự Án React Native Expo

## Giới Thiệu
Dự án này được xây dựng với **React Native** và **Expo**. Đây là một hướng dẫn chi tiết để bạn có thể cài đặt và chạy dự án trên máy tính của mình.

---

## Yêu Cầu Hệ Thống
Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau:

1. **Node.js**: Cài đặt Node.js từ [https://nodejs.org/](https://nodejs.org/).
   - Đảm bảo sử dụng **Node 14.x** hoặc phiên bản mới hơn.
   
2. **Expo CLI**: Cài đặt Expo CLI toàn cục bằng cách chạy lệnh sau:
   ```bash
   npm install -g expo-cli
## Cài Đặt Dự Án
### 1. Clone Dự Án
```bash
https://github.com/yamakazeAnkk/AppGreenIot.git
```

### 2. Cài Đặt Phụ Thuộc
Cài đặt tất cả các phụ thuộc cần thiết cho dự án:
```bash
npm install
```
### 4. Chạy Dự Án
```bash
expo start
```
## Cấu trúc dự án
```Plain Text
greeniot/
├── assets/            # Thư mục chứa tài nguyên như hình ảnh, font, v.v.
├── components/        # Các component dùng chung trong ứng dụng
├── screens/           # Các màn hình của ứng dụng
├── navigation/        # Cấu hình và các component điều hướng
├── constants/          # Các hằng số, cấu hình tĩnh
├── services/           # Các lớp dịch vụ (API, Firebase, v.v.)
├── App.js             # Điểm khởi đầu của ứng dụng
└── app.json            # Các cấu hình cho Expo
```
Lỗi Thường Gặp và Cách Khắc Phục
Lỗi npm install không thành công:

Thử xóa node_modules và cài đặt lại:
rm -rf node_modules
npm install

```bash
rm -rf node_modules
npm install
```
Không thể chạy trên thiết bị Android:

Đảm bảo đã cài đặt Android Studio và trình giả lập Android.
Nếu vẫn không chạy được, thử chạy lại trình giả lập hoặc khởi động lại Expo CLI.
Lỗi khi kết nối với thiết bị iOS:

Đảm bảo rằng bạn đã cài đặt Xcode và Simulator.
Kiểm tra lại kết nối giữa Expo CLI và iOS Simulator.
