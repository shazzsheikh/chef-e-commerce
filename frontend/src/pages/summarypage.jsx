import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { API } from "../../api/api";

export default function SummaryPage() {
  const [address, setAddress] = useState();
  const [form, setform] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
    fetchAddress();
  }, []);

  // Variable outside JSX
  const isAddressEmpty = !address || Object.keys(address).length === 0;

  return (
    <div className="bg-gray-50 md:py-12 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8 text-center">
        {/* Left - Product Info Accordion */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
            Order Details
          </h2>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
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
                All available offers, coupons, and discounts applied.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-medium text-xl">
                Shipping Info
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer worldwide shipping within 5-7 business days. Tracking
                will be shared after dispatch.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right - Summary Card */}
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 lg:mx-12 text-center max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
          <div className="space-y-3 text-gray-700 text-sm checkout-target">
            <div className="flex justify-between">
              <span className="text-2xl">Subtotal</span>
              <span className="text-2xl">₹ 888</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>₹ 88</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ 50</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>- ₹ 100</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹ 926</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              Pay Now
            </button>
          </div>
        </div>
      </div>
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
