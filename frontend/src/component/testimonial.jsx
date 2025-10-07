import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

// Dummy testimonials data
const testimonials = [
  {
    id: 1,
    name: "Ravi Kumar",
    company: "TechNova",
    feedback: "Amazing experience! Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sneha Singh",
    company: "Creative Minds",
    feedback: "Great service and attention to detail.",
    rating: 4,
  },
  {
    id: 3,
    name: "Aman Verma",
    company: "BuildX",
    feedback: "Reliable and fast delivery. Very impressed!",
    rating: 5,
  },
  {
    id: 4,
    name: "Meena Joshi",
    company: "Designly",
    feedback: "They exceeded expectations!",
    rating: 4,
  },
  {
    id: 5,
    name: "Divya Rani",
    company: "shazz solution",
    feedback:
      "They used a great matrial and cotton over it its own design and create a own fabric they were used them",
    rating: 2,
  },
];

export const Testimonial = () => {
  return (
    <div className="bg-[#F2F2F2] md:py-12 py-4 md:px-12 px-4 rounded-2xl flex flex-col items-center justify-center">
      <div className="text-center space-y-2 flex flex-col">
        <span className="text-gray-600">our client</span>
        <h2 className="md:text-2xl text-sm sm:text-3xl font-bold text-gray-700 border-b-4 border-primary pb-1">
          Discuss your own Design manufutere on it{" "}
          <span className="text-primary">products</span>
        </h2>
      </div>
      <div className="w-full py-10 px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={false}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="p-4 border rounded-xl shadow-sm bg-white h-full min-h-[220px] w-full flex flex-col justify-between text-center max-w-xs mx-auto">
                {/* Green stars */}
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < item.rating ? "text-secondary" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-700 italic mb-4 px-2">
                  "{item.feedback}"
                </p>

                {/* Name & Company */}
                <div className="mt-auto pt-2 border-t">
                  <p className="font-semibold text-primary">{item.name}</p>
                  <p className="text-sm font-medium text-gray-500">
                    {item.company}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
