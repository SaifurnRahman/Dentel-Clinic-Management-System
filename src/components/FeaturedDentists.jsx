import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedDentists = () => {
  const navigate = useNavigate();

  // Sample static data for featured dentists
  const dentists = [
    {
      id: 1,
      name: "Dr. Dane Avery",
      specialization: "Endodontics (Root Canal)",
      experience: "48 years experience",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Dr. Allistair Jones",
      specialization: "Orthodontics (Braces)",
      experience: "69 years experience",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      name: "Dr. Maggie Blankenship",
      specialization: "Periodontics (Gum Care)",
      experience: "45 years experience",
      image: "https://images.unsplash.com/photo-1594824813571-081e6211ef5b?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Featured Dentists</h2>
          <p className="text-gray-500 text-sm">Meet our experienced and qualified dental specialists.</p>
        </div>
        {/* Navigation button to go to the Dentists page */}
        <button
          onClick={() => navigate("/dentists")}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition"
        >
          View All Dentists &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <div key={dentist.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <img src={dentist.image} alt={dentist.name} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-lg font-bold text-gray-800">{dentist.name}</h3>
              <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mt-1">
                {dentist.specialization}
              </p>
              <p className="text-sm text-gray-500 mt-2">{dentist.experience}</p>
            </div>
            <button
              onClick={() => navigate("/dentists")}
              className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDentists;