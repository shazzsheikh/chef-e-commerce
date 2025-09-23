import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Craft & Creation?",
    answer: "Craft & Creation is an online marketplace for unique handmade and crafted items.",
  },
  {
    question: "How can I place an order?",
    answer: "You can easily place an order by adding items to your cart and checking out securely.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to many countries worldwide. Shipping cost depends on your location.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact us anytime through our support page or email support@craftncreate.com.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
   
      <div>
        <h2 className="text-3xl text-black font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 shadow-sm transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="font-medium text-lg text-black">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-6 h-6 text-gray-600" />
                ) : (
                  <Plus className="w-6 h-6 text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-3 text-black">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="/images/chef-img-2.jpg"
          alt="FAQ Illustration"
          className=" shadow-lg object-cover w-[600px] h-[500px]"
        />
      </div>
    </section>
  );
}
