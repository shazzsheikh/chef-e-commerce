import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useNavigate } from "react-router-dom"; // React Router alternative to useRouter
import { Heart } from "lucide-react";
// import your wishlist context if needed
// import { useWishlist } from "@/context/WishlistContext";

export default function ImageSliderTailwind({
  title,
  products,
  autoplay,
  showNavigation,
}) {
  const navigate = useNavigate();
  // const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [liked, setLiked] = useState({});

  //   const toggleLike = (p) => {
  //     setLiked((prev) => ({
  //       ...prev,
  //       [p.id]: !prev[p.id],
  //     }));

  //     // Wishlist logic (commented for now)
  //     // if (liked[p.id]) {
  //     //   removeFromWishlist(p.id);
  //     // } else {
  //     //   addToWishlist({
  //     //     id: p.id,
  //     //     img: p.img,
  //     //     title: `Product ${p.id}`,
  //     //     price: p.price,
  //     //   });
  //     // }
  //   };

  return (
    <section className="w-full bg-[#F2F2F2]/60 md:py-4 py-3">
      <div className="mx-auto text-center md:px-6 px-3 relative">
        <div className="flex justify-between items-center mb-2 ">
          <h2 className="md:text-2xl text-sm sm:text-3xl font-bold text-gray-700 border-b-4 border-primary pb-1">
            {title} <span className="text-primary">products</span>
          </h2>
          <Link to="/products">
            <button className="btn-border text-sm sm:text-base font-medium text-primary ">
              View All
            </button>
          </Link>
        </div>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          loop
          autoplay={
            autoplay ? { delay: 2000, disableOnInteraction: false } : false
          }
          navigation={showNavigation}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 12 },
            480: { slidesPerView: 2, spaceBetween: 14 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className={`mySwiper relative`}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <div
                className="bg-white rounded-lg shadow overflow-hidden mt-4 cursor-pointer relative"
                onClick={() => navigate(`/items/${p.id}`)}
              >
                <div className="relative w-full h-40 sm:h-52 md:h-60 lg:h-64">
                  <img
                    src={p.img}
                    alt={`Product ${p.id}`}
                    className="object-cover w-full h-full"
                  />
                  {/* Like Button */}
                  <div
                    className="absolute top-2 right-2 p-1 sm:p-2 cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(p);
                    }}
                  >
                    {liked[p.id] ? (
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white" />
                    ) : (
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                <div className="p-2 sm:p-3 text-left">
                  <p className="uppercase text-[9px] sm:text-xs tracking-wide text-gray-500">
                    FB Collection
                  </p>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">
                    {p.name || `Product ${p.id}`}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    ₹ {p.price} INR
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
