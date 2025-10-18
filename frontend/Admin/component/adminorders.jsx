import React, { useEffect, useState } from "react";
import { API } from "../../api/api";

export const AdminOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState(""); // "" = All
  const [orders, setlocalproducts] = useState([]);
  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;
  const token = localStorage.getItem("admintoken");
  const fetchorders = async () => {
    try {
      const prob = await API.get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setlocalproducts(prob.data.orders);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchorders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await API.put(
        `/order/${orderId}/status`, // Make sure this route exists in backend
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state if needed:
      // setlocalproducts((prevOrders) =>
      //   prevOrders.map((ord) =>
      //     ord._id.toString() === orderId.toString()
      //       ? { ...ord, status: newStatus }
      //       : ord
      //   )
      // );
      alert("updated succsuflly");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="md:flex flex-wrap justify-between  mb-6 gap-2">
        <button
          onClick={() => setSelectedStatus("")}
          className={`btn-border ${
            selectedStatus === "" ? "bg-secondary font-bold text-white" : ""
          }`}
        >
          All
        </button>
        {["pending", "processing", "shipped", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`btn-border ${
                selectedStatus === status
                  ? "bg-secondary font-bold text-white"
                  : ""
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>
      {filteredOrders.length === 0 ? (
        <p>No orders found for selected status.</p>
      ) : (
        // <div className="space-y-4">
        //   {filteredOrders.map((ord) => (
        //     <div key={ord._id} className="border p-4 rounded shadow bg-white">
        //       <div className="flex justify-between items-center">
        //         <div>
        //           <p>
        //             <strong>Order ID:</strong> {ord._id}
        //           </p>
        //           <p>
        //             <strong>User:</strong> {ord.userId?.name} (
        //             {ord.userId?.email}) {ord.userId.phonenumber}
        //           </p>
        //           <p>
        //             <strong>Order Address:</strong>{" "}
        //             {`${ord.userId?.address?.fullName} ( ${ord.userId?.address?.phone}) ${ord.userId?.address?.street} ${ord.userId?.address?.city} ${ord.userId?.address?.state}  ${ord.userId?.address?.postalCode} ${ord.userId?.address?.country}`}
        //           </p>
        //           <p>Status:{ord.status}</p>
        //           <div>
        //             <strong>Status:</strong>{" "}
        //             <select
        //               value={ord.status}
        //               onChange={(e) =>
        //                 handleStatusChange(ord._id, e.target.value)
        //               }
        //               className="border px-2 py-1 rounded"
        //             >
        //               {/* <option value="">{ord.status}</option> */}
        //               <option value="pending">Pending</option>
        //               <option value="processing">Processing</option>
        //               <option value="shipped">Shipped</option>
        //               <option value="delivered">Delivered</option>
        //               <option value="cancelled">Cancelled</option>
        //             </select>
        //           </div>
        //         </div>
        //         <div>
        //           <p>
        //             <strong>Total:</strong> ₹{ord.total}
        //           </p>
        //           <p>
        //             <strong>Payment:</strong> {ord.paymentMethod}
        //           </p>
        //         </div>
        //       </div>

        //       <div className="mt-4">
        //         <h3 className="font-semibold">Products:</h3>
        //         <ul className="mt-2 space-y-2">
        //           {ord.products.map((prod, idx) => (
        //             <li
        //               key={idx}
        //               className="flex justify-between items-center border-t pt-2"
        //             >
        //               <div className="flex items-center space-x-4">
        //                 <img
        //                   src={prod.image}
        //                   alt={prod.name}
        //                   className="w-16 h-16 object-cover rounded"
        //                 />
        //                 <div>
        //                   <p>
        //                     {prod.name}({prod.color})
        //                   </p>
        //                   <p>Size: {prod.size}</p>
        //                   <p>Qty: {prod.quantity}</p>
        //                 </div>
        //               </div>
        //               <p className="font-semibold">₹{prod.price}</p>
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <div className="space-y-6">
          {filteredOrders.map((ord) => (
            <div
              key={ord._id}
              className="border border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                <div className="space-y-1 text-sm sm:text-base">
                  <p className="text-gray-800">
                    <span className="font-semibold">Order ID:</span> {ord._id}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">User:</span>{" "}
                    {ord.userId?.name} ({ord.userId?.email}){" "}
                    {ord.userId?.phonenumber}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Address:</span>{" "}
                    {`${ord.userId?.address?.fullName} (${ord.userId?.address?.phone}), ${ord.userId?.address?.street}, ${ord.userId?.address?.city}, ${ord.userId?.address?.state}, ${ord.userId?.address?.postalCode}, ${ord.userId?.address?.country}`}
                  </p>
                </div>
                <div className="space-y-1 text-right text-sm sm:text-base sm:min-w-[150px]">
                  <p>
                    <span className="font-semibold">Total:</span> ₹{ord.total}
                  </p>
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {ord.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 text-sm sm:text-base">
                <div>
                  <span className="font-semibold mr-2">Status:</span>
                  <span
                    className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full text-white ${
                      ord.status === "pending"
                        ? "bg-yellow-500"
                        : ord.status === "processing"
                        ? "bg-blue-500"
                        : ord.status === "shipped"
                        ? "bg-purple-500"
                        : ord.status === "delivered"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div>
                  <label className="font-medium mr-2">Change Status:</label>
                  <select
                    value={ord.status}
                    onChange={(e) =>
                      handleStatusChange(ord._id, e.target.value)
                    }
                    className="border px-3 py-1 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Products Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Products:</h3>
                <ul className="divide-y divide-gray-200">
                  {ord.products.map((prod, idx) => (
                    <li
                      key={idx}
                      className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="text-sm text-gray-700 space-y-1">
                          <p className="font-medium">
                            {prod.name} ({prod.color})
                          </p>
                          <p>Size: {prod.size}</p>
                          <p>Qty: {prod.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        ₹{prod.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
