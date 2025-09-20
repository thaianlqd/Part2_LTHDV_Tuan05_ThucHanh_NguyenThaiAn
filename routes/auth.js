const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra trùng lặp username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Tên người dùng đã tồn tại. Vui lòng chọn tên khác." });
    }

    // Tạo user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Đăng ký thành công", user: { username } });
  } catch (err) {
    console.error("❌ Lỗi đăng ký:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Tên người dùng đã tồn tại. Vui lòng kiểm tra lại." });
    }
    res.status(500).json({ error: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Tên người dùng không tồn tại." });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).json({ error: "Mật khẩu không đúng." });
    }

    req.session.user = user;
    console.log("✅ Đăng nhập thành công:", user.username);

    // Đặt cookie session
    res.cookie("sessionId", req.sessionID, { httpOnly: true, maxAge: 3600000 }); // 1 giờ
    res.status(200).json({ message: "Đăng nhập thành công", user: { username } });
  } catch (err) {
    console.error("❌ Lỗi đăng nhập:", err.message);
    res.status(500).json({ error: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
});

// Cập nhật cả GET và POST /auth/profile để xem tất cả người dùng
router.get("/profile", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: "Vui lòng đăng nhập để xem danh sách người dùng." });
    }
    const users = await User.find({}, { password: 0 }); // Loại bỏ trường password khi trả về
    res.status(200).json({ message: "Danh sách tất cả người dùng", users });
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách người dùng:", err.message);
    res.status(500).json({ error: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
});

router.post("/profile", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: "Vui lòng đăng nhập để xem danh sách người dùng." });
    }
    const users = await User.find({}, { password: 0 }); // Loại bỏ trường password khi trả về
    res.status(200).json({ message: "Danh sách tất cả người dùng", users });
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách người dùng:", err.message);
    res.status(500).json({ error: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
});

// Cập nhật logout để hỗ trợ cả GET và POST
router.get("/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Không có phiên đăng nhập để đăng xuất." });
  }
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Lỗi đăng xuất:", err.message);
      return res.status(500).json({ error: "Đã xảy ra lỗi khi đăng xuất." });
    }
    res.clearCookie("sessionId"); // Xóa cookie session
    res.status(200).json({ message: "Đăng xuất thành công" });
  });
});

router.post("/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Không có phiên đăng nhập để đăng xuất." });
  }
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Lỗi đăng xuất:", err.message);
      return res.status(500).json({ error: "Đã xảy ra lỗi khi đăng xuất." });
    }
    res.clearCookie("sessionId"); // Xóa cookie session
    res.status(200).json({ message: "Đăng xuất thành công" });
  });
});

module.exports = router;