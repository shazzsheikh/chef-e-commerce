import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API } from "../../api/api";
import ForgetPassword from "./forgetpassword";
import Loader from "./Loader";
import toast from "react-hot-toast";

export const Signup = ({ onSuccess }) => {
  const [activetab, setactivetab] = useState("login");
  return (
    <div>
      <Tabs
        value={activetab}
        onValueChange={(val) => setactivetab(val)} // tab switch handler
        className="flex flex-col items-center justify-center"
      >
        <TabsList className="">
          <TabsTrigger
            value="login"
            className="text-2xl font-bold text-gray-600"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="text-2xl font-bold text-gray-600"
          >
            Signup
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="login"
          className="flex justify-center items-center w-full max-h-[90vh] overflow-y-auto"
        >
          <Login onSuccess={onSuccess} />
        </TabsContent>

        <TabsContent
          value="password"
          className="flex justify-center items-center w-full max-h-[90vh] overflow-y-auto"
        >
          <SignINForm setactivetab={setactivetab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPassword, setForgetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatelogin(email, password, setErrors);
    if (error) return;
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      toast.success("Login successfully!");
      setEmail("");
      setPassword("");
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const cartData = localStorage.getItem("cart");
      if (cartData && JSON.parse(cartData).length > 0) {
        const usercart = JSON.parse(cartData).map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
        })); // convert string to objec
        try {
          const res = await API.post(
            "/cart/setitems",
            { items: usercart }, // Payload
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Send data successfully", res);
          localStorage.removeItem("cart");
        } catch (err) {
          console.error("Error sending cart data:", err);
        }
      }
      if (onSuccess) onSuccess(user);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (forgetPassword) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="w-full  p-6  bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <ForgetPassword setForgetPassword={setForgetPassword} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full  p-6  bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="mt-1 text-sm text-gray-500 text-center">
          Enter your email below to create your account
        </p>

        {/* Social buttons */}
        <div className="flex gap-2 mt-6">
          <button className="flex items-center justify-center w-1/2 px-3 py-2 border rounded-lg hover:bg-gray-100">
            <FaGithub className="mr-2" /> GitHub
          </button>
          <button className="flex items-center justify-center w-1/2 px-3 py-2 border rounded-lg hover:bg-gray-100">
            <FaGoogle className="mr-2 text-red-500" /> Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-2 text-sm text-gray-400">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Form */}
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900 cursor-pointer"
              >
                Login
              </button>
            </form>
            <div className="flex justify-center">
              <button
                className="mt-4 text-sm text-gray-500 hover:underline hover:text-primary cursor-pointer"
                onClick={() => setForgetPassword(true)}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        )}
      </div>
      {/* {forgetPassword && <ForgetPassword />} */}
    </div>
  );
}

function SignINForm({ setactivetab }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatesignup(formData, setErrors);
    if (error) return;
    setLoading(true);
    const { confirmPassword, ...dataToSend } = formData;
    try {
      await API.post("/auth", dataToSend);
      toast.success("Account Created successful! Please login.");
      setFormData({
        name: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
      });

      setactivetab("login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="mt-1 text-sm text-gray-500 text-center">
          Enter your details to create your account
        </p>

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Divya Bharti"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="1234567890"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
              {errors.phonenumber && (
                <p className="text-red-600 text-sm">{errors.phonenumber}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900 transition"
            >
              Create account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const validatelogin = (email, password, setErrors) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }
  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  setErrors(errors);
  return Object.keys(errors).length ? errors : null;
};
const validatesignup = (formData, setErrors) => {
  const errors = {};
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    errors.name = "Name cannot contain numbers or special characters";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(formData.phonenumber)) {
    errors.phonenumber = "Phone number must be 10 digits";
  }
  if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  setErrors(errors);
  return Object.keys(errors).length ? errors : null;
};
