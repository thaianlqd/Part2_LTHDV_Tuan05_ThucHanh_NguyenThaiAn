# Project Part 2 - Authentication System

## 📖 Giới thiệu
Dự án **Part 2** xây dựng hệ thống **xác thực người dùng** với các chức năng:
- Đăng ký tài khoản mới (Register)
- Đăng nhập (Login)
- Quản lý phiên đăng nhập bằng **express-session** và **connect-mongo**
- Xem danh sách người dùng (Profile) chỉ khi đã đăng nhập
- Đăng xuất (Logout)
- Mã hóa mật khẩu bằng **bcryptjs**
- API được mô tả bằng **Swagger**

---

## 🚀 Công nghệ sử dụng
- **Node.js + Express**: Xây dựng server và API
- **MongoDB + Mongoose**: Lưu trữ và quản lý dữ liệu người dùng
- **express-session + connect-mongo**: Lưu session trong MongoDB
- **bcryptjs**: Hash mật khẩu
- **cookie-parser**: Xử lý cookie
- **Swagger (swagger-ui-express, swagger-jsdoc)**: Viết tài liệu API
- **dotenv**: Quản lý biến môi trường

---

## ⚙️ Cấu trúc dự án

Part2_Project/
│── models/
│ └── User.js # Mongoose schema cho User
│── routes/
│ └── auth.js # Các route /auth/register, /auth/login, /auth/profile, /auth/logout
│── app.js # File chính khởi động server
│── swagger.js # Cấu hình Swagger
│── .env # Chứa biến môi trường (MONGO_URI, SESSION_SECRET, PORT)
│── package.json

yaml
Sao chép mã

---

## 🔑 Các API chính

### 1. Đăng ký tài khoản
POST /auth/register
Body:
{
"username": "yourname",
"password": "yourpassword"
}

shell
Sao chép mã

### 2. Đăng nhập
POST /auth/login
Body:
{
"username": "yourname",
"password": "yourpassword"
}

css
Sao chép mã

### 3. Xem danh sách người dùng (yêu cầu đăng nhập)
GET /auth/profile

shell
Sao chép mã

### 4. Đăng xuất
GET /auth/logout

yaml
Sao chép mã

---

## 📚 Swagger API Docs
Sau khi chạy server, truy cập:
http://localhost:3000/api-docs

yaml
Sao chép mã
để xem tài liệu API trực quan.

---

## ▶️ Cách chạy dự án

### 1. Cài đặt dependencies
```bash
npm install