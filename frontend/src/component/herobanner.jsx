const HeroBanner = () => {
  return (
    <section
      className="bg-black md:py-12 py-4"
      style={{
        backgroundImage: "url('/images/chef-img-1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover", // image covers right half only
      }}
    >
      <div className="w-[85vw] max-w-7xl mx-auto flex flex-col md:flex-row items-start md:gap-10 gap-5">
        {/* Left Side - Text */}
        <div className="flex-1 max-w-lg text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            Outfit all your culinary <br /> wardrobe needs
          </h1>

          <ul className="mt-6 space-y-3 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✔</span> Textiles you
              trust
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✔</span> Traditional and
              modern designs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✔</span> Custom
              embroidery available
            </li>
          </ul>

          <button className="mt-8 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
            SHOP NOW →
          </button>
        </div>

        {/* Right side empty, background image is on section */}
      </div>
    </section>
  );
};

export default HeroBanner;
