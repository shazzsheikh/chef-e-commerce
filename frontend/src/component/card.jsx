// import React from "react";

// const ProductCard = () => {
//   return (
//     <section className="w-full px-4 md:px-8 lg:px-16 py-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white  shadow-sm overflow-hidden flex flex-col"
//           >
//             <div className="w-full h-[350px] sm:h-[400px]">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="p-4 flex flex-col flex-grow">
//               <h3 className="text-red-600 font-semibold border border-red-600 px-2 py-1 inline-block rounded-md text-sm mb-2">
//                 {item.title}
//               </h3>
//               <div className="flex items-center text-gray-600 text-sm mb-1">
//                 <svg
//                   className="w-4 h-4 text-gray-600 mr-1"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l6-6-1.5-1.5L9 11.5 6.5 9 5 10.5l4 4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Verified Review
//               </div>
//               <p className="text-xl font-bold capitalize">{item.review}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProductCard;
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
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-4">
          <p className="text-3xl font-bold mb-2">50% OFF</p>
          <p className="mb-4">Limited time offer!</p>
          <button className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
            Shop Now <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-red-600 font-semibold border border-red-600 px-2 py-1 inline-block rounded-md text-sm mb-2">
          {item.title}
        </h3>
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <svg
            className="w-4 h-4 text-gray-600 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l6-6-1.5-1.5L9 11.5 6.5 9 5 10.5l4 4z"
              clipRule="evenodd"
            />
          </svg>
          Verified Review
        </div>
        <p className="text-xl font-bold capitalize">{item.review}</p>
      </div> */}
    </div>
  );
};

export default ProductCard;
