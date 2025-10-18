// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth", // optional, if you have a User model
      required: true,
    },
    products: [
      {
        id: {
          type: String, // or ObjectId if referencing a Product model
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending", // can be: pending, paid, shipped, delivered
    },
    paymentMethod: {
      type: String,
      default: "COD", // optional
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Order", orderSchema);
