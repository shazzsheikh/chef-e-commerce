const HeroBanner = () => {
  return (
    <section className="bg-white py-12">
      <div className="w-[85vw] mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side - Text */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-black">
            Outfit all your culinary <br /> wardrobe needs
          </h1>

          <ul className="mt-6 space-y-3 text-lg text-gray-800">
            <li className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✔</span> Textiles you trust
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✔</span> Traditional and modern designs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✔</span> Custom embroidery available
            </li>
          </ul>

          <button className="mt-8 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition">
            SHOP NOW →
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1">
          <img
            src="/images/chef-img-1.png"
            alt="Chef cooking"
            className="w-full rounded-md shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
