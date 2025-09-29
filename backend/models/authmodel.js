const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: Number, required: true },
    password: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

const auth = mongoose.model("auth", authSchema);

module.exports = auth;
