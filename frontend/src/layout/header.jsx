import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart, Search, MapPin, Menu } from "lucide-react";
import { FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CartItem from "@/component/cartitem";
import { Signup } from "../component/signup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // User icon

const Header = () => {
  const { query, setQuery, filteredProducts } = useSearch();

  const location = useLocation();
  const navigate = useNavigate();
  const [opencart, setopencart] = useState(false);
  const [open, setOpen] = useState(() => location.state?.open ?? false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (location.state?.open) {
      setOpen(true);
      // Clear the state after using it
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <>
      <header className="relative">
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
        <nav className="primary-color md:px-8 px-2 pt-2 flex md:flex-row items-center justify-between my-2">
          {/* 🔸 Logo */}
          <div className="h-8 w-fit rounded-full overflow-hidden">
            {/* <img
            src="logo.png"
            alt="Logo"
            className="h-full w-full object-cover"
          /> */}
            <Link to="/" onClick={() => setQuery("")}>
              <h1 className="text-2xl text-primary font-bold">CITYFAB</h1>
            </Link>
          </div>

          {/* 🔸 Search Input */}
          <div className="w-full md:w-auto mt-2 md:mt-0 md:flex md:items-center hidden">
            <div className="relative text-gray-600 w-full md:w-[400px]">
              {/* <input
              className="appearance-none border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-full text-sm focus:outline-none "
              type="text"
              name="search"
              placeholder="Search by name..."
            /> */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="appearance-none border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-full text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <Search className="h-4 w-4 primary-color cursor-pointer" />
              </button>
            </div>
          </div>

          {/* 🔸 Icons */}
          <div className="flex items-center md:px-2 py-1 md:space-x-6 md:mt-0">
            {user ? (
              <div className="flex items-center md:gap-2">
                <FaUser className="w-4 h-4 text-gray-600" />
                <UserUI user={user} setUser={setUser} setQuery={setQuery} />
              </div>
            ) : (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <span className="ml-2 mx-4 cursor-pointer">Login</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader class={"m-0 p-0"}>
                    <DialogTitle></DialogTitle>
                    <DialogDescription
                      className={
                        "p-0 m-0 flex flex-col justify-center align-center"
                      }
                    >
                      <Signup
                        onSuccess={(userData) => {
                          localStorage.setItem(
                            "user",
                            JSON.stringify(userData)
                          );
                          setUser(userData); // 🔥 yeh important hai
                          setOpen(false); // modal close
                        }}
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
            {/* Mobile Menu Icon */}
            <Sheet open={opencart} onOpenChange={setopencart}>
              <SheetTrigger>
                <span className="relative cursor-pointer">
                  <ShoppingCart className="w-6 h-6" />
                </span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[95%] md:w-1/2">
                <SheetHeader>
                  <SheetTitle>Cart</SheetTitle>
                  <SheetDescription>
                    <div className="mt-2 max-h-[85vh] overflow-y-auto pr-1">
                      <CartItem setopencart={setopencart} />
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        {/* Mobile Search Input */}
        <div className="w-full mt-2 px-2 items-center md:hidden block">
          <div className="relative text-gray-600 w-full">
            {/* <input
              className="appearance-none border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-full text-sm focus:outline-none "
              type="text"
              name="search"
              placeholder="Search............"
            /> */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="appearance-none border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-full text-sm focus:outline-none"
            />

            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <Search className="h-4 w-4 primary-color cursor-pointer" />
            </button>
          </div>
        </div>
        {/* {query && (
          <div className="absolute z-10 top-full left-0 bg-white w-full rounded shadow max-h-[200px] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => {
                    setQuery(""); // clear input
                    navigate(`/product/${p._id}`); // or open details
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {p.name}
                </div>
              ))
            ) : (
              <p className="p-2 text-sm text-gray-500">No products found</p>
            )}
          </div>
        )} */}
      </header>
    </>
  );
};

export default Header;

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useSearch } from "@/contextapi/searchcontext";

const UserUI = ({ user, setUser, setQuery }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={" md:text-xl"}>
              {user.name.split(" ")[0]}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white shadow rounded">
              <NavigationMenuLink asChild>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => setQuery("")}
                >
                  Edit Profile
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to="/myorders"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => setQuery("")}
                >
                  Orders
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink
                className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setQuery("");
                }}
              >
                Logout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
