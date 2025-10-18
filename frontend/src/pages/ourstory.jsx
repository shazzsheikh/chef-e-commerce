"use client";

export default function OurStory() {
  return (
    <>
      {/* Section 1: Intro */}
      <section className="bg-[#3e402d] text-white py-20">
        <div className="w-[85%] mx-auto">
          <div className="max-w-full md:max-w-[50%]">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
              Our Story
            </h2>
            <hr className="w-[100px] border-t-2 border-white mb-6" />
          </div>
        </div>
      </section>

      {/* Section 2: Brand Overview */}
      <section className="bg-[#F2F2F2]/60 py-16">
        <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-[#2e2f1e]">
              A culinary vision. <br /> A platform for <br /> real food craft.
            </h2>
          </div>
          <div className="mt-6 md:mt-12">
            <div className="w-35 h-[2px] bg-[#a67c52] mb-6"></div>
            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] md:leading-[2.5]">
              Chef Clought was born out of a passion for elevating everyday food
              into extraordinary experiences. What started as a personal journey
              in the kitchen has grown into a movement celebrating authentic,
              sustainable, and globally-inspired culinary artistry. We aim to
              bring people closer to real ingredients, timeless techniques, and
              stories behind every dish. Whether it’s through curated recipes,
              handcrafted spice blends, or immersive food events — our mission
              is to make food more meaningful, mindful, and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Philosophy */}
      <section className="bg-[#F2F2F2]/60 py-16">
        <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#2e2f1e]">
              Guided by purpose. <br />
              Let’s cook with <br /> intention.
            </h2>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              At <span className="font-semibold">Chef Clought</span>, we believe
              that food is more than fuel — it’s a language of love, culture,
              and creativity. We bring together age-old traditions with bold,
              modern ideas to inspire meaningful cooking.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              Our work connects farmers, artisans, chefs, and conscious eaters.
              From locally-sourced ingredients to ethical practices, we believe
              every choice in the kitchen matters — for our health, our
              communities, and our planet.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              Every recipe, every product, and every story we share is rooted in
              a deep respect for food culture — and a desire to make it
              accessible to all who seek quality and authenticity.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              By joining <span className="font-semibold">Chef Clought</span>,
              you're not just exploring good food — you're becoming part of a
              movement to cook consciously, celebrate diversity, and nourish the
              world, one plate at a time.
            </p>
          </div>

          {/* Replace image with your own */}
          <div className="flex justify-center md:justify-center">
            <img
              src="/images/chef-clought.jpg" // <-- Replace with your chef image
              alt="Chef Clought Image"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
