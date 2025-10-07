import CraftSection from "@/component/client";
import ProductCard from "../component/card";
// import  from "../component/card";
import HeroBanner from "../component/herobanner";
import ImageSliderTailwind from "../component/slider1";
import { useEffect, useState } from "react";
import { API } from "../../api/api.js";
import { GetInTouch } from "../component/get_in_touch";
import { Testimonial } from "@/component/testimonial";

const banner = [
  {
    id: 1,
    image: "/images/chef-img-2.jpg",
    title: "ChefsCloset Basic Bib Apron",
    review: "lovely",
  },
  {
    id: 2,
    image: "/images/chef-img-5.jpg",
    title: "ChefsCloset Elmwood Cotton Cross Back Apron",
    review: "Very Pretty",
  },
  {
    id: 3,
    image: "/images/che-img-4.jpg",
    title: "ChefsCloset Elmwood Towel Ring Cotton Cross Back Apron",
    review: "A+++++",
  },
];
const Home = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/products/publicshowproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="md:space-y-6 space-y-2">
        <HeroBanner />
        {products.all && (
          <ImageSliderTailwind
            products={products.all}
            title="Grab latest"
            showNavigation={false}
            autoplay={true}
          />
        )}
        {products["chef-coat"] && (
          <ImageSliderTailwind
            products={products["chef-coat"]}
            title="Grab the best deal best"
            showNavigation={true}
            autoplay={false}
          />
        )}
        {products.shirt && (
          <ImageSliderTailwind
            products={products.shirt}
            title="Grab the best deal shirts"
            showNavigation={true}
            autoplay={false}
          />
        )}
        {products.pant && (
          <ImageSliderTailwind
            products={products.pant}
            title="Grab the best deal pants"
            showNavigation={true}
            autoplay={false}
          />
        )}

        <section className="bg-[#F2F2F2]/60 md:py-6 py-3 px-4">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-700 border-b-4 border-primary pb-1 mx-auto text-center mb-6 w-fit">
            Discount on <span className="text-primary">products</span>
          </h2>{" "}
          <ProductCard products={banner} />
        </section>
        <CraftSection />
        {products.shoes && (
          <ImageSliderTailwind
            products={products.shoes}
            title="Grab the best deal shoes"
            showNavigation={true}
            autoplay={false}
          />
        )}
        <GetInTouch />
        <Testimonial />
      </div>
    </>
  );
};
export default Home;
