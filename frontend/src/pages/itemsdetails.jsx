import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const ItemDetails = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex justify-center items-start space-x-3 pt-4 overflow-hidden ">
          <div className="hidden md:block w-25 h-22 bg-gray-200 rounded-lg overflow-hidden">
            {/* Thumbnail images can go here */}
            <img
              src="/pants/pant1.jpg"
              alt="Thumbnail"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <img
            src="/pants/pant1.jpg"
            alt="Product"
            className="w-full h-96 object-cover rounded-lg md:p-0 p-2"
          />
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">Product Title</h1>
          <p className="text-gray-700 mb-4">
            This is a detailed description of the product. It includes all the
            features and specifications that the customer might want to know.
          </p>
          <p className="text-2xl font-semibold text-primary mb-4">$99.99</p>
          <div className="mb-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-medium text-2xl">
                  Product details
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2 ">
                <AccordionTrigger className="font-medium text-2xl">
                  Offer info
                </AccordionTrigger>
                <AccordionContent>
                  We offer worldwide shipping within 5-7 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-medium text-2xl">
                  Shipping info
                </AccordionTrigger>
                <AccordionContent>
                  We offer worldwide shipping within 5-7 business days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex space-x-2">
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
              Add to Cart
            </button>
            <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition">
              buy now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
