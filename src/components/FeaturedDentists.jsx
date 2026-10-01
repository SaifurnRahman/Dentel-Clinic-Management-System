import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedDentists = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch doctors data from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`); 
        const data = await response.json();
        if (response.ok) {
          setDentists(data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Slice the array to show only the first 3 or 4 doctors on the home page
  const displayedDentists = dentists.slice(0, 3);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Featured Dentists</h2>
          <p className="text-gray-500 text-sm">Meet our experienced and qualified dental specialists.</p>
        </div>
        {/* Header navigation button */}
        <button
          onClick={() => navigate("/dentists")}
          className="text-blue-400 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition"
        >
          View All &rarr;
        </button>
      </div>

      {/* Dentists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedDentists.map((dentist) => (
          <div key={dentist.id || dentist.doctor_id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <img 
                src={dentist.image_url} 
                alt={dentist.name} 
                className="w-full h-48 object-cover rounded-xl mb-4" 
              />
              <h3 className="text-lg font-bold text-gray-800">{dentist.name}</h3>
              <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mt-1">
                {dentist.specialization || "General Dentistry"}
              </p>
              <p className="text-sm text-gray-500 mt-2">{dentist.experience ? `${dentist.experience} years experience` : "Experienced specialist"}</p>
            </div>
            <button
              onClick={() => navigate("/services")}
              className="mt-6 w-full py-2.5 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Bottom "View More" Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/dentists")}
          className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl text-sm transition shadow-sm"
        >
          View More Dentists
        </button>
      </div>
    </section>
  );
};

export default FeaturedDentists;