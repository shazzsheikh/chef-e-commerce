import React from "react";

const products = [
  {
    id: 1,
    title: "CORIANDRE",
    price: "$ 34.00",
    image: "/images/chef-img-2.jpg",
  },
  {
    id: 2,
    title: "CURRY",
    price: "$ 14.00",
    image: "/images/chef-img-3.jpg",
  },
  {
    id: 3,
    title: "AUBRAC",
    price: "$ 49.00",
    image: "/images/chef-img-2.jpg",
  },
  {
    id: 4,
    title: "BADIANE",
    price: "$ 34.00",
    image: "/images/chef-img-5.jpg",
  },
  {
    id: 5,
    title: "BADIANE",
    price: "$ 34.00",
    image: "/images/chef-img-6.jpg",
  },
];

const ProductRow = () => {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
       
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[320px] object-cover"
            />
            
            <h3 className="mt-4 text-base text-black font-light tracking-widest">
              {item.title}
            </h3>
      
            <p className="text-gray-700">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductRow;
