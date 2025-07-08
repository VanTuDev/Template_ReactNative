# Template React Native

Mẫu dự án React Native với cấu trúc thư mục tổ chức tốt và các tính năng cơ bản.

## Cấu trúc dự án

```
app/
  ├── components/          # Các component tái sử dụng
  │   ├── Header.tsx
  │   ├── Sidebar.tsx
  │   └── MainContent.tsx
  │
  ├── config/              # Cấu hình ứng dụng
  │   ├── api.ts           # Cấu hình API endpoints
  │   └── env.ts           # Cấu hình môi trường
  │
  ├── hooks/               # Custom hooks
  │   └── useAuth.tsx
  │
  ├── layouts/             # Các layout chung
  │   └── MainLayout.tsx
  │
  ├── navigation/          # Cấu hình điều hướng
  │   └── index.tsx
  │
  ├── screens/             # Các màn hình
  │   ├── home.tsx
  │   ├── login.tsx
  │   └── loading.tsx
  │
  ├── services/            # Các dịch vụ
  │   ├── api.ts           # Service gọi API
  │   └── authService.ts   # Service xác thực
  │
  ├── utils/               # Các tiện ích
  │   ├── storage.ts       # Tiện ích lưu trữ
  │   └── logger.ts        # Tiện ích ghi log
  │
  ├── tailwind.js          # Cấu hình Tailwind CSS
  ├── _layout.tsx          # Layout gốc của Expo Router
  └── index.tsx            # Điểm vào ứng dụng
```

## Tính năng

- Xác thực người dùng (đăng nhập/đăng xuất)
- Kết nối API với Axios
- Lưu trữ dữ liệu người dùng với AsyncStorage
- Điều hướng với Expo Router
- Giao diện đáp ứng với Tailwind CSS (twrnc)
- Cấu trúc thư mục rõ ràng để dễ dàng mở rộng
- Hệ thống ghi log

## API

Dự án được cấu hình để kết nối với API tại:
```
http://103.90.226.74:8080
```

Các endpoint chính:
- Đăng nhập: `/auth/login`
- Đăng ký: `/auth/register`
- Đăng xuất: `/auth/logout`

## Cài đặt

```bash
# Cài đặt các gói phụ thuộc
npm install

# Chạy ứng dụng
npx expo start
```

## Sử dụng

1. Màn hình đăng nhập: Nhập email và mật khẩu để đăng nhập
2. Màn hình chính: Hiển thị thông tin và có thanh bên để điều hướng
3. Đăng xuất: Nhấn nút đăng xuất để kết thúc phiên

## Môi trường

Dự án hỗ trợ nhiều môi trường khác nhau (phát triển, sản xuất) thông qua file `app/config/env.ts`. Các biến môi trường được tự động chọn dựa trên biến `__DEV__` của React Native.
Nhớ thêm .env