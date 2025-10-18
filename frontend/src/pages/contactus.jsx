import React, { useState } from "react";
import { Phone } from "lucide-react";
import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Your message has been sent!");
        setForm({ name: "", email: "", phone: "", country: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting form.");
    }
  };

  return (
    <>
      {/* Contact Info */}
      <section className="bg-[#f7f0e9] py-16">
        <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-[#2e2f1e]">
                Contact
              </h2>
              <div className="w-24 md:w-36 h-[2px] bg-[#a67c52] mx-auto"></div>
            </div>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mb-6">
              Have a question about a private dining experience, pop-up event,
              or collaboration? We’d love to hear from you. <br />
              <span className="font-medium">
                Mon - Sat 9:00 AM - 6:00 PM (IST)
              </span>
            </p>

            <div className="mb-6">
              <p className="uppercase text-xs tracking-widest text-gray-600">
                Email
              </p>
              <p className="text-[#2e2f1e] text-base md:text-lg">
                hello@chefclought.com
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-600 mb-1 mt-6">
                  Calling from India
                </p>
                <p className="flex items-center gap-2 text-[#2e2f1e] text-base md:text-lg mt-6">
                  <Phone size={18} /> +91 8302346860
                </p>
              </div>
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-600 mb-1 mt-6">
                  Calling from Outside India
                </p>
                <p className="flex items-center gap-2 text-[#2e2f1e] text-base md:text-lg mt-6">
                  <Phone size={18} /> +91 8302346860
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-black text-xl md:text-2xl">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaGithub />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[600px]">
            <img
              src="/images/chef-contact.jpg"
              alt="Contact Chef Clought"
              className="w-full h-full object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#f7f0e9] py-16">
        <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-[#2e2f1e]">
                Let’s connect
              </h2>
              <div className="w-24 md:w-36 h-[2px] bg-[#a67c52]"></div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {["name", "email", "phone", "country"].map((field) => (
                <div key={field}>
                  <label className="block text-[#2e2f1e] text-base md:text-lg mb-2 capitalize">
                    {field === "email"
                      ? "Email Address"
                      : field === "phone"
                      ? "Phone Number"
                      : field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[#2e2f1e] text-base md:text-lg mb-2">
                  Tell us more about your request
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 bg-[#2e2f1e] text-white px-6 py-3 cursor-pointer hover:bg-[#4a4b2e] transition"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="flex justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg">
              <img
                src="/images/chef-avatar.jpg"
                alt="Chef Clought - Let's Connect"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
