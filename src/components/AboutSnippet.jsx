import React from "react";
import { useNavigate } from "react-router-dom";

const AboutSnippet = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            About DentalCare BD
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-4">
            Providing Trusted Dental Care with a Gentle Touch.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            We are dedicated to delivering top-notch dental healthcare services across Bangladesh. Our expert team combines advanced medical technology with compassionate care to ensure a comfortable and healthy smile for every patient.
          </p>
          {/* Navigation button to go to the About Us page */}
          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition text-sm shadow-sm"
          >
            Learn More About Us
          </button>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
            alt="Dental Clinic Interior"
            className="rounded-3xl shadow-lg w-full object-cover h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;