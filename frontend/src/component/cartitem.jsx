import { API } from "../../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartItem = ({ setopencart }) => {
  const navigate = useNavigate();
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
  useEffect(() => {
    if (token) {
      fetchcart(); // ✅ Sirf agar token hai to fetch karo
    }
  }, []);

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

  if (!items || items.length === 0) {
    return <div>Your cart is empty</div>;
  }
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 border border-gray-200 mb-4 cursor-pointer"
          onClick={() => {
            setopencart(false); // ✅ Close cart
            navigate(`/items/${item.id}`); // ✅ Navigate to item details
          }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover"
            />
            <div className="flex flex-col space-y-2 items-start">
              <h3 className="text-lg font-semibold">
                {item.name}({item.color})
              </h3>
              <div className="flex items-center gap-4 ">
                <p className="text-black font-bold ">₹{item.price}</p>
                {/* <p className="flex gap-2 flex-wrap mt-2">
                  {item.size.map((size, index) => (
                    <button
                      key={index}
                      className="px-2 py-1 border rounded hover:bg-gray-100 transition cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </p> */}
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              </div>

              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, item.quantity - 1);
                  }}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantities[item.id] || 1}</span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, item.quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-lg font-bold">
          ₹
          {items.reduce(
            (acc, curr) => acc + curr.price * (quantities[curr.id] || 1),
            0
          )}
        </span>
      </div>
      <button
        className={`w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition cursor-pointer ${
          token ? "" : "opacity-50"
        }`}
        onClick={() => {
          if (!token) {
            navigate("/", { state: { open: true } });
          } else {
            navigate("/home/checkout");
          }
          setopencart(false);
        }}
      >
        Checkout
      </button>
    </>
  );
};

export default CartItem;
