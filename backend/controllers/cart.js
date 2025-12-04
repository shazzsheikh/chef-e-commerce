const Cart = require("../models/cartmodel");
exports.Setitems = async (req, res) => {
  const userId = req.user.userId;
  const itemsFromClient = req.body.items;

  if (!Array.isArray(itemsFromClient)) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  try {
    let usercart = await Cart.findOne({ userId });

    if (!usercart) {
      usercart = new Cart({ userId, items: [] });
    }

    for (let item of itemsFromClient) {
      if (!item.productId || !item.quantity || !item.size) {
        return res
          .status(400)
          .json({
            message: "Each item must include productId, quantity, and size.",
          });
      }
      const existing = usercart.items.find(
        (i) => i.productId.toString() === item.productId && i.size === item.size
      );
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        usercart.items.push({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
        });
      }
    }

    await usercart.save();

    res
      .status(200)
      .json({ message: "Cart synced successfully", cart: usercart });
  } catch (err) {
    console.error("Cart sync error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Getitems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const usercart = await Cart.findOne({ userId: userId }).populate(
      "items.productId"
    );
    if (!usercart) {
      return res.status(200).json({ cart: {items: []}});
    }

    res.status(200).json({ cart: usercart });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

exports.Quantityupdate = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity data" });
  }
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(400).json({ message: "cart not found" });

    const item = cart.items.find((i) => i.productId == productId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Deleteitem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.productId;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId }, // filter by userId to find the cart
      { $pull: { items: { productId: productId } } }, // remove product from items array
      { new: true } // return the updated document
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res
      .status(200)
      .json({ message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ message: "Server error while updating cart" });
  }
};
