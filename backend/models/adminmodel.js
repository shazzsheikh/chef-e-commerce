const mongoose = require("mongoose");

const adminschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: Number, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const admin = mongoose.model("admin", adminschema);

module.exports = admin;
