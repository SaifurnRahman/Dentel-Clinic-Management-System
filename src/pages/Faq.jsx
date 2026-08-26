import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { faqCategories } from "../utils/faqsBlogs";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-cyan-100 p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 text-gray-600">
            Find answers to the most common questions about our dental clinic.
          </p>
        </div>

        {/* FAQ */}
        {faqCategories?.map((category) => (
          <div key={category.title} className="space-y-1">
            <h2 className="ml-5 text-xl md:text-2xl font-bold text-gray-800">{category.title}</h2>

            {category?.faqs?.map((faq) => {
              const isOpen = openIndex === faq?.index;

              return (
                <div
                  key={faq?.index}
                  className="bg-base-100 border border-base-300 rounded-xl overflow-hidden"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFaq(faq?.index)}
                    className="w-full min-h-16 px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="text-base md:text-lg font-semibold">
                      {faq.question}
                    </span>

                    <span className="text-xl md:text-2xl shrink-0 ml-4">
                      {isOpen ? <HiMinus /> : <HiPlus />}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm md:text-base text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
