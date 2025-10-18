import { API } from "../../api/api";
import React, { useState } from "react";
import { HiPhone } from "react-icons/hi";
import { HiEnvelopeOpen } from "react-icons/hi2";
export const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    companyname: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // form ka default reload rokega
    try {
      const response = await API.post("/getintouch", formData); // apni API url yahan use karo
      alert(response.data.message || "Sent successfully!");
      setFormData({
        name: "",
        email: "",
        phonenumber: "",
        companyname: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Server issues. Please try again later.");
    }
  };
  return (
    <div className="bg-[#F2F2F2] md:py-12 py-4 md:px-12 px-4 rounded-2xl flex items-center justify-center ">
      {/* <div className="bg-gray-50 flex items-center justify-center rounded-xl"> */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-12 flex flex-col md:flex-row  w-full gap-10">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase mb-2">
              We’re here to Design you
            </p>
            <h2 className="text-3xl font-bold leading-snug text-primary ">
              We are a manufacturer of custom clothing. <br />
              <span className="text-gray-600 font-semibold">
                Designed by you, manufactured by us.
              </span>
            </h2>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            Are you looking for top-quality Cotton matrail on it tailored to
            your needs? Reach out to us.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <HiEnvelopeOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">E-mail</p>
                <p className="font-medium">soluvent***@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <HiPhone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone number</p>
                <p className="font-medium">+123 - 456 - 7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <form
          className="md:w-1/2 bg-gray-50 p-6 rounded-2xl space-y-3 shadow-inner"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="bg-white w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-white w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="phone number"
            className="bg-white w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="company name"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            className="bg-white w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message"
            rows="4"
            className="bg-white w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {" "}
            required
          </textarea>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/60 transition cursor-pointer"
            onClick={() => {
              handleSubmit;
            }}
          >
            <span>Get a Solution</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
