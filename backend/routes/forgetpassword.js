const express = require("express");
const router = express.Router();
const {
  sendotp,
  forgetpassword,
  verifyOtp,
} = require("../controllers/forgetpassword.js");

router.post("/send-otp", sendotp);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", forgetpassword);

module.exports = router;
