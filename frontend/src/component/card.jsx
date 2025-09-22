import React from "react";
import { Heart, Star } from "lucide-react";

const items = [
  {
    id: 1,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 2,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 3,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 4,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 5,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 6,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 7,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
  {
    id: 8,
    image: "./public/product2.jpg",
    title: "Wireless Earbuds, IPX8",
    description:
      "Organic Cotton, fairtrade certified all good what going on it all you rare rthe lkjklfj",
    price: 89.0,
    rating: 4,
  },
];
const ProductCard = () => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative bg-white rounded-2xl transition flex flex-col border border-gray-200 overflow-hidden"
        >
          {/* Wishlist Heart */}
          <button className="absolute top-3 right-3 text-white hover:text-red-500 cursor-pointer">
            <Heart size={20} />
          </button>

          {/* Product Image */}
          <div className="mb-3 w-full overflow-hidden rounded-sm h-48">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="px-2 pb-2 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-1">
              <h3 className="md:text-base text-sm font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <span className="md:text-xl text-sm font-bold text-gray-800">
                ₹ {item.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 mb-2">{item.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < item.rating
                      ? "text-green-500 fill-green-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Button */}
            <button className="btn-card mt-auto">Add to Cart</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
