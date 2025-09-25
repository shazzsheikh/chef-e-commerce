import CraftSection from "@/component/client";
import ProductCard from "../component/card";
// import  from "../component/card";
import HeroBanner from "../component/herobanner";
import ImageSliderTailwind from "../component/slider1";



const topproducts = [
  { id: "1", img: "/shirt/shirt1.jpg", name: "Shirt 1", price: 250 },
  { id: "5", img: "/bow/bow1.jpg", name: "Pant 5", price: 200 },
  { id: "2", img: "/pants/pant2.png", name: "Pant 2", price: 200 },
  { id: "4", img: "/bow/cap1.webp", name: "Shirt 4", price: 250 },
  { id: "3", img: "/product1.jpg", name: "Shirt 3", price: 250 },
  { id: "7", img: "/bow/bow2.jpg", name: "Shirt 7", price: 250 },
  { id: "6", img: "/bow/cap2.webp", name: "Shirt 6", price: 250 },
];
const shirts = [
  { id: "1", img: "/shirt/shirt1.jpg", name: "Shirt 1", price: 250 },
  { id: "2", img: "/shirt/shirt2.webp", name: "Shirt 2", price: 250 },
  { id: "3", img: "/shirt/shirt3.webp", name: "Shirt 3", price: 250 },
  { id: "4", img: "/shirt/shirt1.jpg", name: "Shirt 4", price: 250 },
  { id: "5", img: "/shirt/shirt2.webp", name: "Shirt 5", price: 250 },
  { id: "6", img: "/shirt/shirt3.webp", name: "Shirt 6", price: 250 },
  { id: "7", img: "/shirt/shirt1.jpg", name: "Shirt 7", price: 250 },
];
const pants = [
  { id: "1", img: "/pants/pant1.jpg", name: "Pant 1", price: 250 },
  { id: "2", img: "/pants/pant2.png", name: "Pant 2", price: 250 },
  { id: "3", img: "/pants/pant3.jpg", name: "Pant 3", price: 250 },
  { id: "4", img: "/pants/pant1.jpg", name: "Pant 4", price: 250 },
  { id: "5", img: "/pants/pant2.png", name: "Pant 5", price: 250 },
  { id: "6", img: "/pants/pant3.jpg", name: "Pant 6", price: 250 },
  { id: "7", img: "/pants/pant1.jpg", name: "Pant 7", price: 250 },
];

const products = [
  { id: "1", img: "/product1.jpg", name: "chef court", price: 250 },
  { id: "2", img: "/product2.jpg", name: "chef court", price: 250 },
  { id: "3", img: "/product1.jpg", name: "chef court", price: 250 },
  { id: "4", img: "/product2.jpg", name: "chef court", price: 250 },
  { id: "5", img: "/product1.jpg", name: "chef court", price: 250 },
  { id: "6", img: "/product2.jpg", name: "chef court", price: 250 },
  { id: "7", img: "/product2.jpg", name: "chef court", price: 250 },
];
const shoes = [
  { id: "1", img: "/shoes/shoes1.webp", name: "shoe 1", price: 250 },
  { id: "2", img: "/shoes/shoes2.jpg", name: "shoe 2", price: 250 },
  { id: "3", img: "/shoes/shoes3.webp", name: "shoe 3", price: 250 },
  { id: "4", img: "/shoes/shoes1.webp", name: "shoe 4", price: 250 },
  { id: "5", img: "/shoes/shoes2.jpg", name: "shoe 5", price: 250 },
  { id: "6", img: "/shoes/shoes3.webp", name: "shoe 6", price: 250 },
  { id: "7", img: "/shoes/shoes1.webp", name: "shoe 7", price: 250 },
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
          products={topproducts}
          title="Grab latest"
          showNavigation={false}
          autoplay={true}
        />
        <ImageSliderTailwind
          products={products}
          title="Grab the best deal best"
          showNavigation={true}
          autoplay={false}
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
