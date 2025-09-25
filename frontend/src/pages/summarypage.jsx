import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 md:py-12 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8 text-center">
        {/* Left - Product Info Accordion */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
            Order Details
          </h2>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="space-y-4"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-medium text-xl">
                Address Details
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Your selected items with full description and SKU.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="font-medium text-xl">
                Offer Info
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                All available offers, coupons, and discounts applied.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-medium text-xl">
                Shipping Info
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer worldwide shipping within 5-7 business days. Tracking
                will be shared after dispatch.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right - Summary Card */}
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 lg:mx-12 text-center max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
          <div className="space-y-3 text-gray-700 text-sm checkout-target">
            <div className="flex justify-between">
              <span className="text-2xl">Subtotal</span>
              <span className="text-2xl">₹ 888</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>₹ 88</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ 50</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>- ₹ 100</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹ 926</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
