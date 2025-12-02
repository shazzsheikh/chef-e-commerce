import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { API } from "../../api/api";
import CartItem from "@/component/cartitem";
import { useCart } from "@/component/cartlogic";
import { useLocation, useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const location = useLocation();
  const buyNowProduct = location.state?.buyNowProduct;
  const size = location.state?.size;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  const [address, setAddress] = useState();
  const [form, setform] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {
    items,
    quantities,
    updateQuantity,
    removeItem,
    totalAmount,
    fetchcart,
  } = useCart();
  const token = localStorage.getItem("token");
  const fetchAddress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;
      if (!userId) return;
      const res = await API.get(`auth/user/address/${userId}`);
      setAddress(res.data.address);
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // 🔁 Redirect to login
    }
    fetchAddress();
    fetchcart();
  }, []);

  const navigate = useNavigate();
  const handlePlaceOrder = async (paymentMethod) => {
    if (address === null || address === undefined) {
      alert("Please add address to proceed");
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please login first");
        navigate("/");
        return;
      }
      const userId = user._id || user.id;
      let products = [];
      if (buyNowProduct) {
        products.push({
          id: buyNowProduct._id || buyNowProduct.id,
          name: buyNowProduct.name,
          size: size || buyNowProduct.size,
          color: buyNowProduct.color,
          price: buyNowProduct.price,
          image: buyNowProduct.image?.[0] || "",
          quantity: buyNowProduct.qty || 1,
        });
      } else {
        products = items.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size,
          color: item.color,
          price: item.price,
          image: item.img,
          quantity: quantities[item.id] || 1,
        }));
      }

      const orderPayload = {
        userId,
        products,
        total: finalTotal,
        paymentMethod,
      };

      // Call backend order create API
      const response = await API.post("/order", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.message);
      if (paymentMethod === "COD") {
        setShowSuccessPopup(true);
        setLoadingDone(false);

        setTimeout(() => {
          setLoadingDone(true);
        }, 2000); // show loader for 2 seconds
      } else {
        // Online Payment flow
        // const { razorpayOrder } = response.data;
        // const options = {
        //   key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        //   amount: razorpayOrder.amount,
        //   currency: razorpayOrder.currency,
        //   name: "Your Shop Name",
        //   order_id: razorpayOrder.id,
        //   handler: async (paymentResponse) => {
        //     // verify payment
        //     const verifyRes = await API.post("/orders/verify", paymentResponse);
        //     if (verifyRes.data.status === "success") {
        //       alert("Payment Successful!");
        //       // Clear cart or navigate to success page
        //       navigate("/order-success");
        //     } else {
        //       alert("Payment verification failed. Please contact support.");
        //     }
        //   },
        //   prefill: {
        //     name: user.name,
        //     email: user.email,
        //     contact: user.phone,
        //   },
        //   theme: {
        //     color: "#3399cc",
        //   },
        // };
        // const rzp = new window.Razorpay(options);
        // rzp.open();
      }
    } catch (error) {
      // ✅ If failed (400, 404, 500, etc.)
      if (error.response) {
        console.log("Backend error:", error.response.data.message);
        alert(error.response.data.message); // Show message to user
      } else {
        console.log("Something went wrong:", error.message);
        alert("Something went wrong. Please try again.");
      }
    }
  };
  const isAddressEmpty = !address || Object.keys(address).length === 0;
  // Variables for calculations
  const shipping = 50;
  let discount = 0;
  const gstRate = 0.18;
  let subtotal = 0;
  let quantity = 1;
  if (buyNowProduct) {
    quantity = buyNowProduct.qty || 1;
    subtotal = buyNowProduct.price * quantity;
  } else {
    subtotal = totalAmount;
    if (subtotal > 1500) {
      discount = 100;
    }
  }
  const gstAmount = subtotal * gstRate;
  const finalTotal = Math.round(subtotal + gstAmount + shipping - discount);

  return (
    <div className="bg-gray-50 md:py-12 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8 text-center">
        {/* Left - Product Info Accordion */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
            Order Details
          </h2>
          <Accordion
            type="multiple"
            collapsible
            defaultValue={["item-1", "item-2"]}
            className="space-y-4"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-medium text-xl">
                Address Details
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <div>
                  {form ? (
                    <AddressForm
                      setform={setform}
                      fetchAddress={fetchAddress}
                      selectedAddress={selectedAddress}
                    />
                  ) : !isAddressEmpty ? (
                    <AddressUi
                      addr={address}
                      setform={setform}
                      setSelectedAddress={setSelectedAddress}
                    />
                  ) : (
                    <div>
                      <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition cursor-pointer"
                        onClick={() => setform(true)}
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="font-medium text-xl">
                Product Info
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <div className="">
                  {/* ✅ Check if buyNowProduct exists */}
                  {buyNowProduct ? (
                    <div className="flex items-center justify-between p-2 border border-gray-200 mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={buyNowProduct.image?.[0]}
                          alt={buyNowProduct.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex flex-col space-y-2 items-start">
                          <h3 className="text-lg font-semibold">
                            {buyNowProduct.name} ({buyNowProduct.color})
                          </h3>
                          <div className="flex items-center gap-4">
                            <p className="text-black font-bold">
                              ₹{buyNowProduct.price}
                            </p>
                            <p className="text-sm text-gray-600">
                              Size: {size}
                            </p>
                          </div>
                          <p>Quantity: {buyNowProduct.qty || 1} </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // ✅ Else show cart items as usual
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 border border-gray-200 mb-4"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                          <div className="flex flex-col space-y-2 items-start">
                            <h3 className="text-lg font-semibold">
                              {item.name} ({item.color})
                            </h3>
                            <div className="flex items-center gap-4">
                              <p className="text-black font-bold">
                                ₹{item.price}
                              </p>
                              <p className="text-sm text-gray-600">
                                Size: {item.size}
                              </p>
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
                              <span className="px-4 py-2">
                                {quantities[item.id] || 1}
                              </span>
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
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-medium text-xl">
                Shipping Info
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer worldwide shipping within 3-5 business days. Tracking
                will be shared after dispatch.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right - Summary Card */}
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 lg:mx-12 text-center max-w-3xl h-[500px] ">
          <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
          <div className="space-y-3 text-gray-700 text-sm checkout-target">
            <div className="flex justify-between">
              <span className="text-2xl">Subtotal</span>
              <span className="text-2xl">₹{subtotal} </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>₹{gstAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ {shipping}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>- ₹ {discount}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹ {finalTotal}</span>
            </div>
          </div>
          <Orderconfirm handlePlaceOrder={handlePlaceOrder} />
        </div>
      </div>
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center animate-fadeIn w-full max-w-md">
            {!loadingDone ? (
              <>
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <div className="w-8 h-8 border-4 border-primary border-dashed rounded-full animate-spin"></div>
                  <div className="w-8 h-8 border-4 border-secondary border-dashed rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 text-lg">Placing your order...</p>
              </>
            ) : (
              <>
                <div className="text-green-500 text-5xl mb-4">✔️</div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Congratulations!
                </h2>
                <p className="mt-2 text-gray-600">
                  Your order was placed successfully!
                </p>
                <button
                  onClick={() => navigate("/myorders")}
                  className="mt-6 w-full py-2 px-4 rounded bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Okay, Go to My Orders
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const AddressUi = ({ addr, setform, setSelectedAddress }) => {
  const isSelected = true;
  return (
    <div className="mt-4 p-2 w-full flex justify-center">
      <div
        className={`max-w-3xl w-full bg-white border rounded-lg cursor-pointer transition-all duration-200
          ${
            isSelected
              ? "border-primary shadow-lg"
              : "border-gray-300 hover:border-blue-400 hover:shadow-sm"
          }`}
      >
        <div className="p-4 sm:p-5 flex justify-between items-start">
          <div className="flex items-start space-x-4 flex-grow">
            <div
              className={`mt-1 h-5 w-5 rounded-full border-2 flex-shrink-0
                ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-gray-400 bg-white"
                }`}
            />
            <div className="text-gray-800 text-left">
              <p className="font-semibold text-base mb-1">
                {addr.fullName}{" "}
                <span className="text-gray-500 ml-2 font-normal">
                  ({addr.phone})
                </span>
              </p>
              <p className="text-sm leading-relaxed mb-1">
                {addr.street}, {addr.city}, {addr.state}, {addr.postalCode}
              </p>
              <p className="text-xs text-gray-500">{addr.country}</p>
            </div>
          </div>

          <button
            className="text-sm font-medium text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              setSelectedAddress(addr);
              setform(true);
            }}
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

const AddressForm = ({ setform, fetchAddress, selectedAddress }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedAddress) {
      setFormData(selectedAddress);
    }
  }, [selectedAddress]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = addressValidation(formData, setErrors);
    if (error) return;
    // setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id || user?.id;
      if (!userId) {
        alert("User not found in localStorage");
        return;
      }
      const res = await API.patch(`/auth/user/${userId}/address`, {
        address: formData,
      });
      console.log("Server response:", res.data);
      alert("Address added successfully!");
      setFormData({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      });
      if (setform) setform(false);
      if (fetchAddress) fetchAddress();
    } catch (err) {
      console.error("Address save failed:", err);
      alert("Failed to add address");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          {errors.street && (
            <p className="text-red-600 text-sm">{errors.street}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select State</option>
            <option value="Delhi">Delhi</option>
            <option value="Delhi/NCR">Delhi/NCR</option>
          </select>
          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          {errors.postalCode && (
            <p className="text-red-600 text-sm">{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          readOnly
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
        {errors.country && (
          <p className="text-red-600 text-sm">{errors.country}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
      >
        Save Address
      </button>
    </form>
  );
};

const Orderconfirm = ({ handlePlaceOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default COD

  return (
    <div className="my-6 text-left flex flex-col space-y-4">
      <label className="flex items-center cursor-pointer space-x-3">
        <input
          type="radio"
          name="paymentMethod"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={() => setPaymentMethod("COD")}
          className="form-radio h-5 w-5 text-primary"
        />
        <span className="text-lg font-medium text-gray-900">
          Cash on Delivery (COD)
        </span>
      </label>

      <label className="flex items-center cursor-pointer space-x-3">
        <input
          type="radio"
          name="paymentMethod"
          value="Online"
          checked={paymentMethod === "Online"}
          onChange={() => setPaymentMethod("Online")}
          className="form-radio h-5 w-5 text-primary"
        />
        <span className="text-lg font-medium text-gray-900">
          Online Payment
        </span>
      </label>
      <div className="mt-6">
        <button
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 cursor-pointer"
          onClick={() => {
            handlePlaceOrder(paymentMethod);
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

const addressValidation = (address, setErrors) => {
  const errors = [];

  if (
    !address.fullName?.trim() ||
    address.fullName.trim().length < 2 ||
    /\d|[^a-zA-Z\s]/.test(address.fullName)
  )
    errors.fullName(
      "Full Name least 2 letters, without numbers or special characters."
    );

  if (!address.phone || address.phone.trim() === "") {
    errors.phone("Phone number is required.");
  } else if (!/^\d{10}$/.test(address.phone.trim())) {
    errors.phone("Phone number must be 10 digits.");
  }

  if (!address.street || address.street.trim() === "") {
    errors.street("Street is required.");
  }

  if (!address.city || address.city.trim() === "") {
    errors.city("City is required.");
  }

  if (!address.state || address.state.trim() === "") {
    errors.state("State is required.");
  }

  if (!address.postalCode || address.postalCode.trim() === "") {
    errors.postalCode("Postal Code is required.");
  } else if (!/^\d{4,10}$/.test(address.postalCode.trim())) {
    errors.postalCode("Postal Code must be 4-10 digits.");
  }

  if (!address.country || address.country.trim() === "") {
    errors.country("Country is required.");
  }
  setErrors(errors);
  return Object.keys(errors).length ? errors : null;
};
