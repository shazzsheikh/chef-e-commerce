import { FaUserShield } from "react-icons/fa";

const Header = () => {
  const adminname = localStorage.getItem("adminname");

  return (
    <div className="w-full bg-primary py-6 px-4 shadow-md rounded-b-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-white">
        <FaUserShield className="text-4xl md:text-5xl" />
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Welcome, {adminname || "Admin"} 👋
          </h1>
          <p className="text-sm md:text-base text-white/80 mt-1">
            You are logged in as an administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
