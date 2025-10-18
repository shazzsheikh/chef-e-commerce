// src/hooks/useCart.js
import { useState, useEffect } from "react";
import { API } from "../../api/api";

export const useCart = () => {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const token = localStorage.getItem("token");

  const [quantities, setQuantities] = useState(() =>
    items.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );
  const fetchcart = async () => {
    try {
      const res = await API.get("/cart/getitems", {
        headers: {
          Authorization: `Bearer ${token}`, // Token bhejna zaroori hai
        },
      });
      const cartdata = res.data.cart;

      // Map data to local format
      const mappedItems = cartdata.items.map((item) => ({
        id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        color: item.productId.color,
        img: item.productId.image[0],
        quantity: item.quantity,
        size: item.size,
      }));

      setItems(mappedItems);
      const quantityMap = {};
      mappedItems.forEach((item) => {
        quantityMap[item.id] = item.quantity;
      });

      setQuantities(quantityMap);
    } catch (err) {
      console.error("Failed to fetch cart:", err.response?.data || err.message);
      alert("Cart fetch karne me error aayi.");
    }
  };
  const updateQuantity = async (id, newQuantity) => {
    // Prevent going below 1
    if (newQuantity < 1) return;

    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems); // ✅ Update UI immediately
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));

    if (token) {
      // ✅ Logged-in user → Update backend
      try {
        const res = await API.patch(
          "/cart/updatequantity",
          {
            productId: id,
            quantity: newQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("❌ Failed to update quantity on server:", error);
        alert("Failed to update quantity.");
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("📝 Quantity updated in localStorage", updatedCart);
    }
  };

  const removeItem = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    if (token) {
      try {
        // Use backticks for template literals!
        const res = await API.delete(`/cart/deleteitem/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // send token in headers
          },
        });
        // Optionally update cart based on server response if needed
        console.log("Item removed from backend cart", res.data);
      } catch (error) {
        console.error("Failed to remove item from cart on server:", error);
        alert("Failed to remove item from cart on server.");
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedItems));

      setQuantities((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const totalAmount = items.reduce(
    (acc, curr) => acc + curr.price * (quantities[curr.id] || 1),
    0
  );

  return {
    items,
    quantities,
    updateQuantity,
    removeItem,
    totalAmount,
    fetchcart,
  };
};
