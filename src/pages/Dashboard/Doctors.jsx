import React, { useState, useEffect } from 'react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

//   const API_URL = "https://dental-clinic-management-sql.vercel.app" || "http://localhost:5000";
    //  const API_URL = "http://localhost:5000";

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch doctors");
        }
        
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-lg">Loading doctors...</div>;
  }


const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete doctor");
        }

        
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
        alert("Doctor deleted successfully!");
    } catch (error) {
        console.error("Error deleting doctor:", error);
        alert(error.message);
    }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Doctors List</h2>

      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between">
              <div>
                
                {doctor.image_url && (
                  <img 
                    src={doctor.image_url} 
                    alt={doctor.name} 
                    className="w-full h-48 object-cover rounded-md mb-4" 
                  />
                )}
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                <p className="text-gray-600 text-sm mt-1">Experience: {doctor.experience} years</p>
                <p className="text-gray-600 text-sm">Phone: {doctor.phone}</p>
                <p className="text-gray-600 text-sm">Email: {doctor.email}</p>
                {doctor.rating && (
                  <p className="text-amber-500 text-sm font-semibold mt-1">Rating: ⭐ {doctor.rating}</p>
                )}
              </div>

              
              <div className="flex justify-between mt-4 pt-3 border-t">
                <button className="bg-amber-500 text-white px-4 py-1.5 rounded text-sm hover:bg-amber-600 transition">
                  Update
                </button>
                <button onClick={()=> handleDelete(doctor.id)} className="bg-red-500 text-white px-4 py-1.5 rounded text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;