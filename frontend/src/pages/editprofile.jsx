import toast from "react-hot-toast";
import { API } from "../../api/api";
import React, { useEffect, useState } from "react";
const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "", // was username
    email: "",
    phonenumber: "", // was phone
    address: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  });
  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

  const fetchuser = async () => {
    try {
      const response = await API.get(`/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const user = response.data?.user;

      if (!user) return; // safe check

      setFormData((prev) => ({
        name: user.name || "",
        email: user.email || "",
        phonenumber: user.phonenumber || "",
        address: {
          fullName: user.address?.fullName || "",
          phone: user.address?.phone || "",
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          postalCode: user.address?.postalCode || "",
          country: user.address?.country || "India",
        },
      }));
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchuser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle nested address fields
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call here
    try {
      await API.patch(`/user/profile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-white shadow rounded-2xl p-10 md:mt-10 border border-blue-100">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            name="phonenumber"
            type="tel"
            value={formData.phonenumber}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>

        {/* Address UI */}
        <AddressUi data={formData.address} handleChange={handleChange} />

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

/* 🔹 Reusable Input Field Component */
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full bg-white border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2.5 text-gray-800 shadow-sm transition duration-200 ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

/* 🔹 Address UI Section */
const AddressUi = ({ data, handleChange }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">
        Address Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="fullName"
          value={data.fullName}
          placeholder="Enter your full name"
          onChange={handleChange}
        />

        <InputField
          label="Phone"
          name="phone"
          type="tel"
          value={data.phone}
          placeholder="Enter phone number"
          onChange={handleChange}
        />

        <InputField
          label="Street"
          name="street"
          value={data.street}
          placeholder="Street name"
          onChange={handleChange}
        />

        <InputField
          label="City"
          name="city"
          value={data.city}
          placeholder="City name"
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            name="state"
            value={data.state}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2.5 text-gray-800 shadow-sm transition duration-200"
          >
            <option value="">Select State</option>
            <option value="Delhi">Delhi</option>
            <option value="Delhi/NCR">Delhi/NCR</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

        <InputField
          label="Postal Code"
          name="postalCode"
          value={data.postalCode}
          placeholder="Postal code"
          onChange={handleChange}
        />

        <InputField
          label="Country"
          name="country"
          value={data.country}
          readOnly
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
