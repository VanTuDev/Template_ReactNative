# Cấu trúc thư mục app

Thư mục này chứa mã nguồn chính của ứng dụng React Native.

## Cấu trúc

```
app/
  ├── components/          # Các component tái sử dụng
  │   ├── Header.tsx       # Component header
  │   ├── Sidebar.tsx      # Component sidebar
  │   └── MainContent.tsx  # Component nội dung chính
  │
  ├── config/              # Cấu hình ứng dụng
  │   ├── api.ts           # Cấu hình API endpoints
  │   └── env.ts           # Cấu hình môi trường
  │
  ├── hooks/               # Custom hooks
  │   └── useAuth.tsx      # Hook xác thực
  │
  ├── layouts/             # Các layout chung
  │   └── MainLayout.tsx   # Layout chính
  │
  ├── navigation/          # Cấu hình điều hướng
  │   └── index.tsx        # Điều hướng chính
  │
  ├── screens/             # Các màn hình
  │   ├── home.tsx         # Màn hình chính
  │   ├── login.tsx        # Màn hình đăng nhập
  │   └── loading.tsx      # Màn hình loading
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

## Luồng xác thực

1. Người dùng nhập thông tin đăng nhập tại `screens/login.tsx`
2. Thông tin được gửi đến API thông qua `services/authService.ts`
3. API được gọi bằng `services/api.ts` với cấu hình từ `config/api.ts`
4. Token và thông tin người dùng được lưu trữ bằng `utils/storage.ts`
5. Trạng thái xác thực được quản lý bởi `hooks/useAuth.tsx`
6. Điều hướng được xử lý bởi `navigation/index.tsx`

## API

API được cấu hình tại `config/api.ts` với base URL: `http://103.90.226.74:8080`

Các endpoint chính:
- Đăng nhập: `/auth/login`
- Đăng ký: `/auth/register`
- Đăng xuất: `/auth/logout`

## Môi trường

Cấu hình môi trường được định nghĩa trong `config/env.ts` với các biến môi trường khác nhau cho phát triển và sản xuất. 