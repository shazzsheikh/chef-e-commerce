const { default: mongoose } = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  size: {
    type: String,
    required: true, // ✅ Make sure size is saved
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt fields
  }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
