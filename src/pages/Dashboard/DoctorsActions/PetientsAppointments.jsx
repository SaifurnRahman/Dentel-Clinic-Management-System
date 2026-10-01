import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const petientsAppointments = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentDetails, setTreatmentDetails] = useState("");
  const [notes, setNotes] = useState("");
  const {user} = useAuth();
  console.log(user);

  const token = user?.token

  // -----------------------------
  // Doctor-এর appointments load
  // -----------------------------
  const loadAppointments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/appointments/myPatients/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // -----------------------------
  // Add Treatment
  // -----------------------------
  const handleAddTreatment = async (e) => {
    e.preventDefault();

    if (!diagnosis || !treatmentDetails) {
      alert("Please fill in required fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/treatments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appointment_id: selectedAppointment.appointment_id,
          diagnosis,
          treatment_details: treatmentDetails,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Treatment added successfully!");

      setSelectedAppointment(null);
      setDiagnosis("");
      setTreatmentDetails("");
      setNotes("");

      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>

        <p className="text-gray-500 mt-1">
          Manage your appointments and patient treatments.
        </p>
      </div>

      {/* Appointment List */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              {/* Appointment information */}
              <div className="grid md:grid-cols-5 gap-5 items-center">
                <div>
                  <p className="text-sm text-gray-400">Patient</p>

                  <h2 className="font-semibold text-lg mt-1">
                    {appointment.patient_name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {appointment.patient_email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Phone</p>

                  <p className="font-medium mt-1">
                    {appointment.patient_phone || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Service</p>

                  <p className="font-medium mt-1">{appointment.service_name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Date & Time</p>

                  <p className="font-medium mt-1">
                    {appointment.appointment_date}
                  </p>

                  <p className="text-sm text-gray-500">
                    {appointment.appointment_time}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm text-center">
                    {appointment.status}
                  </span>

                  <button
                    type="button"
                    disabled={
                      appointment.status === "completed" ||
                      appointment.status === "cancelled"
                    }
                    onClick={() => setSelectedAppointment(appointment)}
                    className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Treatment
                  </button>
                </div>
              </div>

              {/* Treatment Form */}
              {selectedAppointment?.appointment_id ===
                appointment.appointment_id && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-xl font-semibold">Add Treatment</h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Patient: {appointment.patient_name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedAppointment(null)}
                      className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddTreatment} className="space-y-5">
                    {/* Diagnosis */}
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Diagnosis
                        </span>
                      </label>

                      <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Enter diagnosis"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    {/* Treatment Details */}
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Treatment Details
                        </span>
                      </label>

                      <textarea
                        value={treatmentDetails}
                        onChange={(e) => setTreatmentDetails(e.target.value)}
                        placeholder="Describe the treatment"
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Notes</span>
                      </label>

                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional notes"
                        className="textarea textarea-bordered w-full"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedAppointment(null)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                      >
                        Save Treatment
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default petientsAppointments;
