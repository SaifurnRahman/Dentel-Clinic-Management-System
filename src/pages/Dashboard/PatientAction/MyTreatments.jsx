import { useEffect, useState } from "react";

const MyTreatments = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/treatments/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTreatments(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTreatments();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Treatment History</h1>

        <p className="text-gray-500 mt-1">
          View your previous dental treatments.
        </p>
      </div>

      {/* No treatment */}
      {treatments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <p className="text-gray-500">No treatment records found.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {treatments.map((treatment) => (
            <div
              key={treatment.treatment_id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {treatment.diagnosis}
                  </h2>

                  <p className="text-sky-600 font-medium mt-1">
                    {treatment.doctor_name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {treatment.specialization}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Date: {treatment.appointment_date}</p>

                  <p className="mt-1">Time: {treatment.appointment_time}</p>
                </div>
              </div>

              {/* Service */}
              <div className="mt-5">
                <p className="text-sm text-gray-400">Service</p>

                <p className="font-medium text-gray-700 mt-1">
                  {treatment.service_name}
                </p>
              </div>

              {/* Treatment */}
              <div className="mt-5">
                <p className="text-sm text-gray-400">Treatment Details</p>

                <p className="text-gray-600 mt-1 leading-7">
                  {treatment.treatment_details}
                </p>
              </div>

              {/* Notes */}
              {treatment.notes && (
                <div className="mt-5">
                  <p className="text-sm text-gray-400">Notes</p>

                  <p className="text-gray-600 mt-1">{treatment.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTreatments;
