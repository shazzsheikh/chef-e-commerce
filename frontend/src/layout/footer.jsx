"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#323232] text-white py-10 md:mt-6">
      <div className="w-[85vw] mx-auto flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">E-commerce</h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Best products at the best prices. <br />
            Shop with us and enjoy amazing offers!
          </p>

          <p className="text-xl mt-6">
            Website created by{" "}
            <Link
              to="https://www.linkedin.com/in/shahanshah0021/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F5DC] hover:underline"
            >
              SHAHANSHAH
            </Link>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 justify-between gap-3">
          {/* Company */}
          <div className="w-full sm:w-auto">
            <div className="flex justify-between items-center sm:block">
              <h3 className="text-lg font-semibold mb-3">The Company</h3>
              <button
                onClick={() => toggleSection("company")}
                className="sm:hidden"
              >
                {openSection === "company" ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>
            <ul
              className={`space-y-2 text-sm ${
                openSection === "company" ? "block" : "hidden sm:block"
              }`}
            >
              <li>
                <Link to="/home/ourstory" className="hover:underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="home/termsofuse" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/#" className="hover:underline">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Orders & Support */}
          <div className="w-full sm:w-auto">
            <div className="flex justify-between items-center sm:block">
              <h3 className="text-lg font-semibold mb-3">Orders & Support</h3>
              <button
                onClick={() => toggleSection("support")}
                className="sm:hidden"
              >
                {openSection === "support" ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>
            <ul
              className={`space-y-2 text-sm ${
                openSection === "support" ? "block" : "hidden sm:block"
              }`}
            >
              <li>
                <Link to="home/contactus" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/Wholesale" className="hover:underline">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/Reward-points" className="hover:underline">
                  Rewards
                </Link>
              </li>
              <li>
                <Link
                  to="/frequently-asked-questions"
                  className="hover:underline"
                >
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-auto">
            <div className="flex justify-between items-center sm:block">
              <h3 className="text-lg font-semibold mb-3">Social Media</h3>
              <button
                onClick={() => toggleSection("social")}
                className="sm:hidden"
              >
                {openSection === "social" ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>
            <ul
              className={`space-y-2 text-sm ${
                openSection === "social" ? "block" : "hidden sm:block"
              }`}
            >
              <li>
                <Link
                  to="https://www.instagram.com/anmolcraftandcreation/"
                  className="hover:underline"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/anmolcraftandcreation/"
                  className="hover:underline"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/Sohilkhan0021"
                  className="hover:underline"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/in/sohil-khan-14b071227"
                  className="hover:underline"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-white text-sm">
        © {new Date().getFullYear()} fiber and Creation. All rights reserved.
      </div>
    </footer>
  );
}
