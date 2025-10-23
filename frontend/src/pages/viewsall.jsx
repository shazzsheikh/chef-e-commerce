import { API } from "../../api/api";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Viewsall = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = location.state?.products || [];

  // Track which product has been added to cart
  const [addedItems, setAddedItems] = useState({});

  const handleaddtocard = async (e, product) => {
    e.stopPropagation(); // Prevent card click from firing
    const token = localStorage.getItem("token");
    console.log(products);
    if (token) {
      const itemsforbackend = [
        {
          productId: product._id,
          quantity: 1,
          size: product.size[0],
        },
      ];
      try {
        const response = await API.post(
          "/cart/setitems",
          {
            items: itemsforbackend,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 Token must be sent
            },
          }
        );
        alert("cart was succesully add");
        setAddedItems((prev) => ({
          ...prev,
          [product._id]: true,
        }));
        console.log("Cart synced with server:", response.data);
      } catch (err) {
        alert("cart was not  add somthing was worng");
        console.error("Error syncing cart:", err.response?.data || err.message);
      }
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.findIndex((item) => item.id === product._id);

      if (existing >= 0) {
        cart[existing].quantity += 1;
      } else {
        cart.push({
          id: product._id,
          name: product.name,
          price: product.price,
          size: product.size[0],
          img: product.image[0],
          quantity: 1,
        });
      }
      // Cart ko wapas localStorage mein save karo
      localStorage.setItem("cart", JSON.stringify(cart));
      setAddedItems((prev) => ({
        ...prev,
        [product._id]: true,
      }));
    }
  };

  return (
    <div className="md:py-4 py-3 md:px-12 px-3">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-3">
        {products.map((p) => {
          const isAdded = addedItems[p._id];

          return (
            <div
              key={p._id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer relative transition duration-300 ${
                isAdded ? "opacity-50" : ""
              }`}
              onClick={() => navigate(`/items/${p._id}`)}
            >
              {/* Tick icon when added */}
              {isAdded && (
                <div className="absolute top-2 left-2 z-20 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  ✔ Added
                </div>
              )}

              {/* Image */}
              <div className="relative w-full h-40 sm:h-52 md:h-60 lg:h-64 overflow-hidden">
                <img
                  src={p.image?.[0]}
                  alt={`Product ${p._id}`}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="uppercase text-[10px] sm:text-xs tracking-wide text-gray-500">
                    CITYFAB Collection
                  </p>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">
                    {p.name || `Product ${p._id}`}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    ₹ {p.price} INR
                  </p>
                </div>
                <div>
                  <button
                    className="border px-2 py-2 rounded-lg hover:bg-secondary hover:text-white cursor-pointer text-sm"
                    onClick={(e) => handleaddtocard(e, p)}
                  >
                    {isAdded ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
