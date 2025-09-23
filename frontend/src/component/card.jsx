import React from "react";

const products = [
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

const ProductCard = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white  shadow-sm overflow-hidden flex flex-col"
          >
            <div className="w-full h-[350px] sm:h-[400px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;
