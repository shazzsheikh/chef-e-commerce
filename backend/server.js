// db/mongoose.js
const seedAdmin = require("./seed.js");
const mongoose = require("mongoose");
const { cloudinary } = require("./config/cloudnary.js");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
    await seedAdmin();
    console.log("✅ admin was created");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
