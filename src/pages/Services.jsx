import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaCalendarCheck } from "react-icons/fa6";
import { SPECIALIZATIONS } from "../utils/specializations";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Services = () => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [selectedService, setSelectedService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);

  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Service select
  const handleServiceSelect = async (service) => {
    setSelectedService(service);
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setSlots([]);

    setLoadingDoctors(true);

    try {
      const response = await fetch(`${API_URL}/api/doctors`);
      const data = await response.json();

      const filteredDoctors = data.filter(
        (doctor) =>
          doctor.specialization?.toLowerCase() === service.name.toLowerCase()
      );

      setDoctors(filteredDoctors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Date + Doctor select করলে slots load হবে
  const loadSlots = async () => {
    if (!selectedDoctor || !selectedDate) return;

    setLoadingSlots(true);

    try {
      const response = await fetch(
        `${API_URL}/api/appointments/available-slots?doctor_id=${selectedDoctor.id}&date=${selectedDate}`
      );

      const data = await response.json();
console.log(data);
      setSlots(data);
      setSelectedTime("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, [selectedDoctor, selectedDate]);

  // Booking
  const handleBooking = async () => {
    if (!selectedTime) {
      toast.warning("Please select a time");
      return;
    }

    const token = user?.token;
    console.log(token);

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor_id: selectedDoctor.id,
          service_name: selectedService.name,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          reason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.success(data.message);
        return;
      }

      toast.success("Appointment booked successfully!");

      // Refresh slots
      loadSlots();

      setSelectedTime("");
      setReason("");
    } catch (error) {
      console.error(error);
      toast.wrong("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Dental Services
          </h1>

          <p className="text-gray-500 mt-3">
            Select a service and book an appointment with a dentist.
          </p>
        </div>

        {/* Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALIZATIONS.map((service) => {
            const Icon = service.icon;

            const active = selectedService?.id === service.id;

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                className={`bg-white p-6 rounded-2xl border shadow-sm cursor-pointer transition
                  ${
                    active
                      ? "border-sky-500 ring-2 ring-sky-100"
                      : "border-gray-100 hover:border-sky-200"
                  }
                `}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Icon size={28} />
                </div>

                <h2 className="text-xl font-bold mt-5">{service.name}</h2>

                <p className="text-gray-500 text-sm leading-6 mt-2">
                  {service.description}
                </p>

                <button
                  type="button"
                  className="mt-5 w-full py-3 rounded-xl bg-sky-600 text-white hover:bg-sky-700"
                >
                  Select Service
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Booking Section */}
        {selectedService && (
          <div className="mt-12 bg-white rounded-2xl border border-sky-100 shadow-sm p-6 md:p-8">
            <div className="mb-8">
              <p className="text-sm text-sky-600 font-medium">
                Selected Service
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {selectedService.name}
              </h2>
            </div>

            {/* Doctor */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Doctor</h3>

              {loadingDoctors ? (
                <p className="text-gray-500">Loading doctors...</p>
              ) : doctors.length === 0 ? (
                <div className="bg-gray-50 p-5 rounded-xl text-gray-500">
                  No doctor available for this service.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      type="button"
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`text-left p-5 rounded-xl border transition
                        ${
                          selectedDoctor?.id === doctor.id
                            ? "border-sky-500 bg-sky-50"
                            : "border-gray-200 hover:border-sky-300"
                        }
                      `}
                    >
                      <h4 className="font-semibold text-lg">{doctor.name}</h4>

                      <p className="text-sm text-gray-500 mt-1">
                        {doctor.specialization}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Experience: {doctor.experience} years
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            {selectedDoctor && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Select Date</h3>

                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input input-bordered w-full max-w-sm"
                />
              </div>
            )}

            {/* Slots */}
            {selectedDoctor && selectedDate && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Available Time Slots
                </h3>

                {loadingSlots ? (
                  <p className="text-gray-500">Loading available slots...</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {slots?.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available} //disabled if slot not available
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3 rounded-xl border text-sm font-medium transition
                          ${
                            !slot.available
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : selectedTime === slot.time
                              ? "bg-sky-600 text-white border-sky-600"
                              : "bg-white border-gray-200 hover:border-sky-400 hover:text-sky-600"
                          }
                        `}
                      >
                        {slot?.time?.slice(0, 5)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reason + Book */}
            {selectedTime && (
              <div className="mt-8 max-w-2xl">
                <label className="label">
                  <span className="label-text font-medium">
                    Reason for Visit
                  </span>
                </label>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Example: Tooth pain, regular checkup..."
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />

                <button
                  type="button"
                  onClick={handleBooking}
                  className="mt-5 btn bg-sky-600 hover:bg-sky-700 text-white border-none px-8"
                >
                  <FaCalendarCheck />
                  Confirm Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
