const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: Number, required: true },
    password: { type: String, required: true },
    address: {
      fullName: { type: String},
      phone: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String, enum: ["Delhi", "Delhi/NCR"] },
      postalCode: { type: String },
      country: { type: String, enum: ["India"] },
    },
  },
  { timestamps: true }
);

const auth = mongoose.model("auth", authSchema);

module.exports = auth;
