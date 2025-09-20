// swagger.js
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API - Part 2",
      version: "1.0.0",
      description: "Tài liệu API cho hệ thống xác thực (Register, Login, Profile, Logout)",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      { name: "Auth", description: "API quản lý người dùng & xác thực" },
    ],
    paths: {
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Đăng ký tài khoản mới",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["username", "password"],
                  properties: {
                    username: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Đăng ký thành công" },
            400: { description: "Tên người dùng đã tồn tại" },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Đăng nhập hệ thống",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["username", "password"],
                  properties: {
                    username: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Đăng nhập thành công" },
            400: { description: "Sai tên đăng nhập hoặc mật khẩu" },
          },
        },
      },
      "/auth/profile": {
        get: {
          tags: ["Auth"],
          summary: "Xem danh sách người dùng (yêu cầu đăng nhập)",
          responses: {
            200: { description: "Trả về danh sách người dùng (ẩn mật khẩu)" },
            401: { description: "Chưa đăng nhập" },
          },
        },
        post: {
          tags: ["Auth"],
          summary: "Xem danh sách người dùng (yêu cầu đăng nhập, method POST)",
          responses: {
            200: { description: "Trả về danh sách người dùng (ẩn mật khẩu)" },
            401: { description: "Chưa đăng nhập" },
          },
        },
      },
      "/auth/logout": {
        get: {
          tags: ["Auth"],
          summary: "Đăng xuất người dùng",
          responses: {
            200: { description: "Đăng xuất thành công" },
            401: { description: "Không có phiên đăng nhập" },
          },
        },
        post: {
          tags: ["Auth"],
          summary: "Đăng xuất người dùng (method POST)",
          responses: {
            200: { description: "Đăng xuất thành công" },
            401: { description: "Không có phiên đăng nhập" },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = (app) => {
  const swaggerDocs = swaggerJsDoc(swaggerSpec);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
