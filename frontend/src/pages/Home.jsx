import ProductCard from "../component/card";
// import  from "../component/card";
import HeroBanner from "../component/herobanner";
import ImageSliderTailwind from "../component/slider1";
import Single from "../component/single";
import Single2 from "../component/single2"
import Swiper from "../component/swiper";
import Product2 from "../component/product2"
import NewArrivals from "../component/newArrival";
import FAQ from "../component/faqs"

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
            <ProductCard />
            <Single />
            <Single2 />
           <Swiper />
           <Product2/>
           <NewArrivals/>
           <FAQ/>
        </section>
      </div>
    </>
  );
};
export default Home;
