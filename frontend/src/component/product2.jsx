import React from "react";

const aprons = [
  {
    id: 1,
    title: "BIB APRONS",
    image: "/images/chef-img-10.webp", 
  },
  {
    id: 2,
    title: "WAIST APRONS",
    image: "/images/chef-img-11.webp", 
  },
];

const Aprons = () => {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aprons.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[350px] object-cover"
            />
            <h3 className="mt-4 text-lg text-black tracking-widest">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Aprons;
