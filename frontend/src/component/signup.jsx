import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // ✅ Replace with actual API call
  };
  return (
    <div>
      <Tabs
        defaultValue="account"
        className="flex flex-col items-center justify-center"
      >
        <TabsList className="">
          <TabsTrigger
            value="account"
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
          value="account"
          className="flex justify-center items-center w-full"
        >
          <SignUpForm />
        </TabsContent>

        <TabsContent
          value="password"
          className="flex justify-center items-center w-full"
        >
          <SignINForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
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

function SignINForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Submitted data:", formData);
    // TODO: send to backend
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50">
      <div className="w-full p-6 bg-white rounded-2xl shadow-lg">
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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

export default SignINForm;
