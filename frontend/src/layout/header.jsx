import React from "react";
import { ShoppingCart, Heart, Search, MapPin, Menu } from "lucide-react";
import { FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const Header = () => {
  return (
    <header className="">
      <div className="flex md:flex-row flex-col justify-between items-center md:px-8 px-4 py-1 green-bg text-white text-sm">
        <div className="hidden md:flex">
          <span className="mr-2 mt-1">
            <FaPhoneAlt />
          </span>

          <span>8750934211</span>
        </div>
        <div className="">
          <span>Get 50% off on items </span>
        </div>
        <div className="md:flex hidden ">
          <span className="mr-1 mt-1">
            <MdLocationOn />
          </span>
          <span>Delhi</span>
        </div>
      </div>
      <nav className="primary-color md:px-8 px-2 pt-2 flex md:flex-row items-center justify-between">
        {/* 🔸 Logo */}
        <div className="h-8 w-12 rounded-full overflow-hidden">
          <img
            src="logo.png"
            alt="Logo"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 🔸 Search Input */}
        <div className="w-full md:w-auto mt-2 md:mt-0 md:flex md:items-center hidden">
          <div className="relative text-gray-600 w-full md:w-[400px]">
            <input
              className="appearance-none border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-full text-sm focus:outline-none "
              type="text"
              name="search"
              placeholder="Search............"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <Search className="h-4 w-4 primary-color cursor-pointer" />
            </button>
          </div>
        </div>

        {/* 🔸 Icons */}
        <div className="flex items-center md:px-2 py-1 md:space-x-6 mt-2 md:mt-0">
          {/* Mobile Menu Icon */}
          <button className="md:hidden block">
            <Menu className="w-6 h-6" />
          </button>

          {/* Cart Icon */}
          <button className="relative cursor-pointer md:block hidden">
            <ShoppingCart className="w-6 h-6" />
          </button>

          {/* Login */}
          <button className="ml-2 cursor-pointer md:block hidden">Login</button>
        </div>
      </nav>
      {/* Mobile Search Input */}
      <div className="w-full mt-2 px-2 items-center md:hidden block">
        <div className="relative text-gray-600 w-full">
          <input
            className="appearance-none border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-full text-sm focus:outline-none "
            type="text"
            name="search"
            placeholder="Search............"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <Search className="h-4 w-4 primary-color cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
