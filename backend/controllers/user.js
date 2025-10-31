const auth = require("../models/authmodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/adminmodel.js");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.Userprofile = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is set in req.user by auth middleware
    const user = await auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.EditProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is set in req.user by auth middleware
    const { name, email, phonenumber, address } = req.body;
    const updatedUser = await auth.findByIdAndUpdate(
      userId,
      { name, email, phonenumber, address },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
