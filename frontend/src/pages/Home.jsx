import ProductCard from "../component/card";
// import  from "../component/card";
import HeroBanner from "../component/herobanner";
import ImageSliderTailwind from "../component/slider1";

const Home = () => {
  return (
    <>
      <div className="md:space-y-6 space-y-2">
        <HeroBanner />
        <ImageSliderTailwind />
        <section className="bg-[#fdf6ec]/80 md:py-6 py-3 px-4">
          <h2 className="text-5xl sm:text-3xl font-bold text-center mb-4 mt-2 primary-color">
            Our Products
          </h2>{" "}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            <ProductCard />
          </div>{" "}
        </section>
      </div>
    </>
  );
};
export default Home;
