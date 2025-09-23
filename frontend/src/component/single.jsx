import React from "react";

const MensApparel = () => {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <div className="w-full">
          <img
            src="/images/chef-img-8.webp"
            alt="Men's Apparel"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl text-black font-semibold tracking-widest mb-4">
            MEN&apos;S APPAREL
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Clement Design is happy to introduce you to the new level of quality
            and excellence you should expect when purchasing your next chef
            jacket. Our apparel is manufactured alongside chefs, and tailored to
            the professionals who want to look and feel as good as they perform
            while they are in the kitchen. Every jacket is built to last,
            offering stain resistance and longevity.
          </p>
          <button className="border border-black text-black px-6 py-2 hover:bg-black hover:text-white transition">
            SHOP MEN
          </button>
        </div>
      </div>
    </section>
  );
};

export default MensApparel;
