const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: [String], // URL
      required: true,
      default: [],
    },

    clothType: {
      type: String,
      required: true,
      enum: [
        "chef-coat",
        "apron",
        "chef-hat",
        "bow",
        "t-Shirt",
        "shirt",
        "pant",
        "shoes",
        "other",
      ],
    },

    brand: {
      type: String,
    },

    size: {
      type: [String],
      required: true,
      default: [],
    },

    quantity: { //stock available
      type: Number,
      required:true,
      default: 0,
    },

    category: {
      type: String,
    },

    color: {
      type: String,
      required: true,
    },

    material: {
      type: String, // cotton, silk, denim, etc.
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["active", "stop"],
    },

    productdetails: {
      type: [String],
      required: true,
      default: [],
    },

    specification: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

// Indexes for optimizing queries
productSchema.index({ createdAt: -1 });// For sorting by creation date
productSchema.index({ clothType: 1 });
productSchema.index({ status: 1 });

module.exports = mongoose.model("Product", productSchema);
