"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    id: 1,
    name: "OSLO",
    price: "$9.95",
    image: "/images/chef-img-2.jpg",
  },
  {
    id: 2,
    name: "OSLO",
    price: "$9.95",
    image: "/images/chef-img-3.jpg",
  },
  {
    id: 3,
    name: "ELYSEE",
    price: "$159.00",
    image: "/images/chef-img-5.jpg",
  },
  {
    id: 4,
    name: "EXTASE",
    price: "$104.00",
    image: "/images/chef-img-6.jpg",
  },
  {
    id: 5,
    name: "GENOVA COOK ART",
    price: "$175.00",
    image: "/images/chef-img-7.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-12">
      <h2 className="text-2xl font-semibold text-center text-black mb-8 tracking-widest">
        NEW ARRIVALS
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col items-center text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-contain"
              />
              <h3 className="mt-4 text-lg text-black tracking-widest">{product.name}</h3>
              <p className="mt-2 text-gray-700">{product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
