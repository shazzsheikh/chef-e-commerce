const Header = () => {
  const adminname = localStorage.getItem("adminname");
  return (
    <div className="mx-auto md:text-5xl text-2xl bg-gray-300/60 text-center my-1">
      Welcome {adminname}
    </div>
  );
};
export default Header;
