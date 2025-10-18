import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react"; // example icon

const ProductCard = ({ products }) => {
  return (
    <section className="w-full px-2 md:px-8 lg:px-16">
      {/* Mobile Slider */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8 w-full">
        {products.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ item }) => {
  return (
    <div className="relative group bg-white shadow-sm overflow-hidden flex flex-col cursor-pointer">
      <div className="w-full h-[350px] sm:h-[400px] relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-4">
          <p className="text-3xl font-bold mb-2">50% OFF</p>
          <p className="mb-4">Limited time offer!</p>
          <button className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
            Shop Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
