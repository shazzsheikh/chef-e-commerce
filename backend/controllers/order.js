const order = require("../models/ordermodel");
exports.Setorder = async (req, res) => {
  const { userId, products, total, paymentMethod } = req.body;
  if (!userId || !products || products.length === 0) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const existingOrder = await order.findOne({ userId, status: "pending" });
    // if (existingOrder) {
    //   return res
    //     .status(400)
    //     .json({ message: "You already have a pending order." });
    // }
    const newOrder = new order({
      userId,
      products, // array of { id, name, size,color, price, quantity, image }
      total,
      paymentMethod,
      status: "pending", // or "confirmed" if auto-confirmed
      createdAt: new Date(),
    });
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
exports.Getorder = async (req, res) => {
  try {
    const id = req.user.userId || req.user.adminId || req.user.id;
    const admin = req.user.role === "admin";
    let orders;
    if (admin) {
      orders = await order
        .find()
        .sort({ createdAt: -1 })
        .populate("userId", "name email phonenumber address");
    } else {
      orders = await order.find({ userId: id }).sort({ createdAt: -1 });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.Updatestatus = async (req, res) => {
  try {
    const adminId = req.user.id;
    const orderid = req.params.orderId;
    console.log(orderid);
    const { status } = req.body;
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const existingOrder = await order.findById(orderid);
    if (!existingOrder) {
      return res.status(400).json({ message: "order not found" });
    }
    console.log("reci", existingOrder);
    existingOrder.status = status;
    await existingOrder.save();
    return res
      .status(200)
      .json({ message: "order status updated succesfully" });
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
