import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const DoctorTreatments = () => {
    const {user} = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const token = user?.token;

        const response = await fetch(`${API_URL}/api/treatments/doctor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setTreatments(data);
      } catch (error) {
        console.error("Treatment loading error:", error);
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
        <h1 className="text-3xl font-bold text-gray-900">My Treatments</h1>

        <p className="text-gray-500 mt-1">
          View the treatments you have provided to your patients.
        </p>
      </div>

      {/* Empty */}
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
              <div className="grid md:grid-cols-5 gap-5 items-center">
                {/* Patient */}
                <div>
                  <p className="text-sm text-gray-400">Patient</p>

                  <h2 className="font-semibold text-lg mt-1">
                    {treatment.patientName}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {treatment.patientEmail}
                  </p>
                </div>

                {/* Service */}
                <div>
                  <p className="text-sm text-gray-400">Service</p>

                  <p className="font-medium mt-1">{treatment.serviceName}</p>
                </div>

                {/* Date */}
                <div>
                  <p className="text-sm text-gray-400">Appointment</p>

                  <p className="font-medium mt-1">
                    {treatment.appointmentDate.split("T")[0]}
                  </p>

                  <p className="text-sm text-gray-500">
                    {treatment.appointmentTime}
                  </p>
                </div>

                {/* Diagnosis */}
                <div>
                  <p className="text-sm text-gray-400">Diagnosis</p>

                  <p className="font-medium mt-1">{treatment.diagnosis}</p>
                </div>

                {/* Button */}
                <div className="md:text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedTreatment(treatment)}
                    className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Treatment Details</h2>

                <p className="text-gray-500 mt-1">
                  Patient: {selectedTreatment.patientName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTreatment(null)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Patient */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-gray-400">Patient</p>

                <p className="font-medium mt-1">
                  {selectedTreatment.patientName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Email</p>

                <p className="font-medium mt-1">
                  {selectedTreatment.patientEmail}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Service</p>

                <p className="font-medium mt-1">
                  {selectedTreatment.serviceName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Appointment</p>

                <p className="font-medium mt-1">
                  {selectedTreatment.appointmentDate.split("T")[0]}
                </p>

                <p className="text-sm text-gray-500">
                  {selectedTreatment.appointmentTime}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 my-6" />

            {/* Diagnosis */}
            <div>
              <p className="text-sm text-gray-400">Diagnosis</p>

              <p className="font-medium mt-1">{selectedTreatment.diagnosis}</p>
            </div>

            {/* Treatment */}
            <div className="mt-5">
              <p className="text-sm text-gray-400">Treatment Details</p>

              <p className="text-gray-600 mt-1 leading-7">
                {selectedTreatment.treatment_details}
              </p>
            </div>

            {/* Notes */}
            {selectedTreatment.notes && (
              <div className="mt-5">
                <p className="text-sm text-gray-400">Notes</p>

                <p className="text-gray-600 mt-1">{selectedTreatment.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorTreatments;
