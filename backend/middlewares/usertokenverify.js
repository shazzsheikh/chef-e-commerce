// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decodedUnverified = jwt.decode(token);
    if (!decodedUnverified?.role) {
      return res.status(401).json({ message: "Invalid token structure" });
    }
    let secret;
    if (decodedUnverified.role === "admin") {
      secret = process.env.ADMIN_TOKEN;
    } else if (decodedUnverified.role === "user") {
      secret = process.env.JWT_SECRET;
    } else {
      return res.status(401).json({ message: "Unknown role" });
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
