import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedServices = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, title: "Root Canal Treatment", description: "Save infected teeth with painless root canal therapy.", icon: "🦷" },
    { id: 2, title: "Teeth Whitening", description: "Brighten your smile with professional cosmetic whitening.", icon: "✨" },
    { id: 3, title: "Braces & Orthodontics", description: "Align your teeth perfectly with modern braces options.", icon: "😁" }
  ];

  return (
    <section className="py-12 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Our Dental Services</h2>
            <p className="text-gray-500 text-sm">Comprehensive dental care tailored for your family.</p>
          </div>
          {/* Navigation button to go to the Services page */}
          <button
            onClick={() => navigate("/services")}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition"
          >
            All Services &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{service.description}</p>
              <button
                onClick={() => navigate("/services")}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Learn More &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;