import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const categories = [
  {
    name: "About Us",
    faqs: [
      {
        q: "What is Anmol Craft and Creation?",
        a: "We are a craft-based brand connecting artisans with customers worldwide.",
      },
      {
        q: "Is Anmol Craft and Creation an Indian company?",
        a: "Yes, we are based in India and work with local artisans.",
      },
      {
        q: "Where is your office located?",
        a: "Our office is located in Delhi, India.",
      },
      {
        q: "Where do you source products from?",
        a: "All products are sourced directly from skilled Indian artisans.",
      },
    ],
  },
  {
    name: "How to Order",
    faqs: [
      {
        q: "How do I place an order?",
        a: "Simply browse our website, add items to your cart, and checkout securely.",
      },
      {
        q: "Do I need an account to order?",
        a: "No, but creating an account helps you track your orders easily.",
      },
    ],
  },
  {
    name: "Shipping & Delivery",
    faqs: [
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship worldwide with reliable courier partners.",
      },
      {
        q: "How long does delivery take?",
        a: "Within India: 5–7 days. International: 10–15 days.",
      },
    ],
  },
  {
    name: "Payment",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept credit/debit cards, UPI, PayPal, and net banking.",
      },
    ],
  },
  {
    name: "Return, Exchanges & Refunds",
    faqs: [
      {
        q: "What is your return policy?",
        a: "You can request a return within 7 days of delivery if unused.",
      },
    ],
  },
  {
    name: "Discounts & Promotions",
    faqs: [
      {
        q: "Do you offer discounts?",
        a: "Yes, we offer seasonal sales and first-time buyer discounts.",
      },
    ],
  },
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("About Us");
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <>
      <section className="bg-[#3e402d] text-white md:py-20 py-12">
        <div className="w-[85%] mx-auto">
          <div className="max-w-full md:max-w-[50%]">
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
              Frequently Asked <br /> Questions
            </h2>
            <hr className="w-[100px] border-t-2 border-[#a67c52] mb-6 " />
          </div>
        </div>
      </section>

      <section className="bg-[#F2F2F2]/60 md:py-16 py-8">
        <div className="w-[90%] md:w-[75%] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#2e2f1e] mb-4">
            How can we help?
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-8">
            If you can't find the answer to your questions below – please give
            us a call! <br />
            The best time to reach us is{" "}
            <span className="font-medium">
              Mon-Sat 9:00 am to 6:00 pm (Indian Standard Time)
            </span>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 relative">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`cursor-pointer text-base sm:text-lg ${
                    activeCategory === cat.name
                      ? "font-bold underline text-[#2e2f1e]"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setOpenFAQ(null);
                  }}
                >
                  {activeCategory === cat.name && (
                    <span className="absolute right-0 md:-right-6 mt-1 text-[#a67c52]">
                      ➤
                    </span>
                  )}
                  {cat.name}
                </div>
              ))}
            </div>

            <div className="hidden md:block border-l border-gray-400"></div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 uppercase">
                {activeCategory}
              </h3>
              <div className="space-y-4">
                {categories
                  .find((c) => c.name === activeCategory)
                  ?.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === index ? null : index)
                        }
                        className="flex justify-between items-center w-full text-left text-base sm:text-lg text-[#2e2f1e] font-medium"
                      >
                        {faq.q}
                        {openFAQ === index ? (
                          <FaMinus className="text-[#a67c52] cursor-pointer" />
                        ) : (
                          <FaPlus className="text-[#a67c52] cursor-pointer" />
                        )}
                      </button>
                      {openFAQ === index && (
                        <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
