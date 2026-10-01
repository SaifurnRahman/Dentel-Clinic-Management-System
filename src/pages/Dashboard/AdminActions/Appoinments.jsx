import { useEffect, useState } from "react";

const Appointments = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAppointments(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading appointments...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="text-gray-500 mt-1">Manage all patient appointments.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Doctor</th>
                <th className="px-6 py-4 text-left">Service</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointment_id} className="border-t">
                  <td className="px-6 py-4">A-{appointment.appointment_id}</td>

                  <td className="px-6 py-4 font-medium">
                    {appointment.patient_name}
                  </td>

                  <td className="px-6 py-4">{appointment.doctor_name}</td>

                  <td className="px-6 py-4">{appointment.service_name}</td>

                  <td className="px-6 py-4">{appointment.appointment_date}</td>

                  <td className="px-6 py-4">{appointment.appointment_time}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm">
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
