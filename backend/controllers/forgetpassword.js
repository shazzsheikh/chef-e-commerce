const auth = require("../models/authmodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/adminmodel.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const otpStore = new Map(); // In-memory store for OTPs

exports.sendotp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const hashedOtp = await bcrypt.hash(otp, 10);
    otpStore.set(email, { hashedOtp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
        // user: "shazzsheikh07@gmail.com",
        // pass: "hwaz etvd hszy jmbm",
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
    console.log("OTP entries:", Array.from(otpStore.entries()));
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // check expiry
    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    // verify otp
    const isMatch = await bcrypt.compare(otp, record.hashedOtp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
    // otpStore.delete(email); // clean up
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

exports.forgetpassword = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // check expiry
    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    // verify otp
    const isMatch = await bcrypt.compare(otp, record.hashedOtp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified → reset password
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    otpStore.delete(email); // clean up
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};
