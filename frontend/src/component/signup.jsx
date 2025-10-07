import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      console.log("✅ Submitted successfully:", res.data);
      alert("Login successfully!");
      setEmail("");
      setPassword("");
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (onSuccess) onSuccess(user);
    } catch (error) {
      console.error(
        "❌ Submission failed:",
        error.response?.data || error.message
      );
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full  p-6 bg-white rounded-2xl shadow-lg">
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
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900"
          >
            Create account
          </button>
        </form>
      </div>
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password check pehle karo
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const { confirmPassword, ...dataToSend } = formData;
    try {
      const response = await API.post("/auth", dataToSend);
      console.log("✅ Submitted successfully:", response.data);
      alert("Account created successfully!");
      setFormData({
        name: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
      });

      setactivetab("login");
    } catch (error) {
      console.error(
        "❌ Submission failed:",
        error.response?.data || error.message
      );
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="mt-1 text-sm text-gray-500 text-center">
          Enter your details to create your account
        </p>

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
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900 transition"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
