import CraftSection from "@/component/client";
import ProductCard from "../component/card";
// import  from "../component/card";
import HeroBanner from "../component/herobanner";
import ImageSliderTailwind from "../component/slider1";

const shirts = [
  { id: "1", img: "/public/shirt/shirt1.jpg", name: "Shirt 1", price: 250 },
  { id: "2", img: "/public/shirt/shirt2.webp", name: "Shirt 2", price: 250 },
  { id: "3", img: "/public/shirt/shirt3.webp", name: "Shirt 3", price: 250 },
  { id: "4", img: "/public/shirt/shirt1.jpg", name: "Shirt 4", price: 250 },
  { id: "5", img: "/public/shirt/shirt2.webp", name: "Shirt 5", price: 250 },
  { id: "6", img: "/public/shirt/shirt3.webp", name: "Shirt 6", price: 250 },
  { id: "7", img: "/public/shirt/shirt1.jpg", name: "Shirt 7", price: 250 },
];
const pants = [
  { id: "1", img: "/public/pants/pant1.jpg", name: "Pant 1", price: 250 },
  { id: "2", img: "/public/pants/pant2.png", name: "Pant 2", price: 250 },
  { id: "3", img: "/public/pants/pant3.jpg", name: "Pant 3", price: 250 },
  { id: "4", img: "/public/pants/pant1.jpg", name: "Pant 4", price: 250 },
  { id: "5", img: "/public/pants/pant2.png", name: "Pant 5", price: 250 },
  { id: "6", img: "/public/pants/pant3.jpg", name: "Pant 6", price: 250 },
  { id: "7", img: "/public/pants/pant1.jpg", name: "Pant 7", price: 250 },
];

const products = [
  { id: "1", img: "/public/product1.jpg", name: "chef court", price: 250 },
  { id: "2", img: "/public/product2.jpg", name: "chef court", price: 250 },
  { id: "3", img: "/public/product1.jpg", name: "chef court", price: 250 },
  { id: "4", img: "/public/product2.jpg", name: "chef court", price: 250 },
  { id: "5", img: "/public/product1.jpg", name: "chef court", price: 250 },
  { id: "6", img: "/public/product2.jpg", name: "chef court", price: 250 },
  { id: "7", img: "/public/product2.jpg", name: "chef court", price: 250 },
];
const shoes = [
  { id: "1", img: "/public/shoes/shoes1.webp", name: "shoe 1", price: 250 },
  { id: "2", img: "/public/shoes/shoes2.jpg", name: "shoe 2", price: 250 },
  { id: "3", img: "/public/shoes/shoes3.webp", name: "shoe 3", price: 250 },
  { id: "4", img: "/public/shoes/shoes1.webp", name: "shoe 4", price: 250 },
  { id: "5", img: "/public/shoes/shoes2.jpg", name: "shoe 5", price: 250 },
  { id: "6", img: "/public/shoes/shoes3.webp", name: "shoe 6", price: 250 },
  { id: "7", img: "/public/shoes/shoes1.webp", name: "shoe 7", price: 250 },
];

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
  return (
    <>
      <div className="md:space-y-6 space-y-2 ">
        <HeroBanner />
        <ImageSliderTailwind
          products={products}
          title="Grab the best deal best"
          showNavigation={false}
          autoplay={true}
        />
        <ImageSliderTailwind
          products={shirts}
          title="Grab the best deal shirts"
          showNavigation={true}
          autoplay={false}
        />
        <ImageSliderTailwind
          products={pants}
          title="Grab the best deal pants"
          showNavigation={true}
          autoplay={false}
        />
        <section className="bg-[#F2F2F2]/60 md:py-6 py-3 px-4">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-700 border-b-4 border-primary pb-1 mx-auto text-center mb-6 w-fit">
            Discount on <span className="text-primary">products</span>
          </h2>{" "}
          <ProductCard products={banner} />
        </section>
        <CraftSection />
        <ImageSliderTailwind
          products={shoes}
          title="Grab the best deal shoes"
          showNavigation={true}
          autoplay={false}
        />
      </div>
    </>
  );
};
export default Home;
