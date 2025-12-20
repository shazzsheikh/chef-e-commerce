import React, { useEffect, useState } from "react";
import { API } from "../../api/api";

const STATUS_STEPS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusColors = {
  pending: "bg-secondary",
  processing: "bg-secondary",
  shipped: "bg-secondary",
  delivered: "bg-secondary",
  cancelled: "bg-secondary",
};

const getStatusIndex = (status) => STATUS_STEPS.indexOf(status);

export const Myorder = () => {
  // const [orders] = useState(sampleOrders);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [orders, setorderproducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchorders = async () => {
    try {
      const prob = await API.get("/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setorderproducts(prob.data.orders);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchorders();
  }, []);
  const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => {
          const currentStatusIndex = getStatusIndex(order.status);

          return (
            <div
              key={order._id}
              className="relative bg-white rounded-lg shadow-md mb-6 p-4 sm:p-6"
            >
              <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <p className="text-gray-600 font-semibold">
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600 font-semibold">
                  Payment:{" "}
                  <span className="capitalize">{order.paymentMethod}</span>
                </p>
                <p className="text-gray-600 font-semibold">
                  Total: ₹{order.total}
                </p>
              </div>
              {/* Status timeline: circles left, labels right */}
              <div className="mb-6">
                <div
                  className="
                    flex flex-col space-y-4
                    sm:flex-row sm:space-y-0 sm:space-x-8 sm:items-center
                  "
                >
                  {STATUS_STEPS.map((step, idx) => {
                    const active = idx <= currentStatusIndex;
                    const isLast = idx === STATUS_STEPS.length - 1;

                    return (
                      <div
                        key={step}
                        className="flex items-center relative sm:flex-1"
                      >
                        {/* Circle */}
                        <div
                          className={`w-6 h-6 rounded-full flex-shrink-0 ${
                            active
                              ? statusColors[step]
                              : "bg-white border-2 border-gray-300"
                          }`}
                        />
                        {/* Label */}
                        <div
                          className={`ml-3 text-sm capitalize ${
                            active
                              ? "text-gray-900 font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </div>

                        {/* Connector line */}
                        {!isLast && (
                          <>
                            {/* Vertical line for mobile */}
                            <div
                              className={`absolute left-3 top-7 sm:hidden w-0.5 h-10 ${
                                active ? statusColors[step] : "bg-gray-300"
                              }`}
                            />
                            {/* Horizontal line for desktop */}
                            {/* <div
                              className={`hidden sm:block absolute top-3 left-full ml-3 h-0.5 w-full ${
                                active ? statusColors[step] : "bg-gray-300"
                              }`}
                            /> */}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Products (simplified for this demo) */}
              <div>
                <p className="font-semibold mb-2">Order Products:</p>
                {order.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center mb-3 space-x-4"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">
                        {prod.name}
                        {"   "}({prod.color})
                      </p>
                      <p className="text-sm text-gray-600">Size: {prod.size}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {prod.quantity}
                      </p>
                      <p className="font-semibold">₹{prod.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
