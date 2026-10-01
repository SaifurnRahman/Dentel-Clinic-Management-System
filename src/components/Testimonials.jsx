import React from "react";

const Testimonials = () => {
  // Sample feedback and success stories from happy patients
  const reviews = [
    {
      id: 1,
      name: "Tanvir Ahmed",
      role: "Regular Patient",
      rating: 5,
      comment: "I had a completely painless root canal treatment here. Dr. Dane Avery and the clinical staff are extremely professional and caring!",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      name: "Sabrina Sultana",
      role: "Cosmetic Patient",
      rating: 5,
      comment: "Amazing experience with teeth whitening! My smile looks brighter than ever. Highly recommend DentalCare BD to everyone.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      name: "Rahim Chowdhury",
      role: "Braces Patient",
      rating: 5,
      comment: "The online booking process was seamless, and the clinic environment is spotless and modern. Very happy with my overall treatment.",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Patient Testimonials
        </span>
        <h2 className="text-3xl font-bold text-gray-800 mt-3 mb-3">
          What Our Happy Patients Say
        </h2>
        <p className="text-gray-500 text-sm">
          Read real success stories and feedback from patients who trusted us with their dental health.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              {/* Star Ratings Representation */}
              <div className="flex text-amber-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              
              {/* Review Comment / Feedback */}
              <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                "{review.comment}"
              </p>
            </div>

            {/* Patient Profile Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{review.name}</h4>
                <p className="text-xs text-gray-400">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;