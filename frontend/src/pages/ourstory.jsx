"use client";

export default function OurStory() {
  return (
    <>
      {/* Section 1: Intro */}
      <section className="bg-[#3e402d] text-white md:py-20 py-12">
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
      <section className="bg-[#F2F2F2]/60 md:py-16 py-10">
        <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-primary">
              Crafted for chefs. <br /> Designed for <br /> everyday excellence.
            </h2>
          </div>
          <div className="mt-6 md:mt-12">
            <div className="w-35 h-[2px] bg-[#a67c52] mb-6"></div>
            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] md:leading-[2.5]">
              City Fab began with a simple idea — to bring premium quality,
              functional, and stylish chef wear to culinary professionals and
              passionate home cooks alike. What started as a personal
              frustration with generic, uncomfortable uniforms became a journey
              to redefine kitchen apparel through craftsmanship, comfort, and
              character.
            </p>
            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] md:leading-[2.5] mt-4">
              From tailored chef coats to durable aprons and breathable
              workwear, every piece is made to empower you in the heat of the
              kitchen — with confidence, performance, and style in every stitch.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Philosophy */}
      <section className="bg-[#F2F2F2]/60 md:py-16 py-8">
        <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-primary">
              Function meets form. <br />
              Style with <br /> substance.
            </h2>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              At <span className="font-semibold text-primary">City Fab</span>,
              we believe that what you wear in the kitchen should work as hard
              as you do — without compromising on comfort or identity.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              Our apparel is built for movement, heat, and hustle — blending
              premium fabrics with thoughtful design to serve real chefs and
              food lovers across the globe.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              Every detail matters — reinforced stitching, breathable panels,
              functional pockets, and sleek silhouettes — all developed in
              collaboration with culinary professionals who know what it takes.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              When you wear <span className="font-semibold text-primary">City Fab</span>,
              you’re not just putting on a uniform. You’re stepping into a brand
              that values your craft, your story, and your kitchen culture.
            </p>
          </div>

          {/* Replace image with your own */}
          <div className="flex justify-center md:justify-center">
            <img
              src="/images/chef-img-2.jpg" // <-- Replace with your chef apparel image
              alt="City Fab Image"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
