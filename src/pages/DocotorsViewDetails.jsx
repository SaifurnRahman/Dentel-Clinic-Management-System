import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaCalendarCheck, FaStar } from "react-icons/fa6";

const DoctorViewDetails = () => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors/${id}`);

        const data = await response.json();

        if (response.ok) {
          setDoctor(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Doctor not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="bg-sky-50 min-h-[450px]">
              <img
                src={doctor.image_url || "/doctor-placeholder.png"}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Information */}
            <div className="p-8 md:p-10">
              <p className="text-sky-600 font-medium">
                {doctor.specialization}
              </p>

              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {doctor.name}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-gray-500">
                  {doctor.experience} Years Experience
                </span>

                {doctor.rating !== null && (
                  <span className="flex items-center gap-1 text-amber-500">
                    <FaStar />
                    {doctor.rating}
                  </span>
                )}
              </div>

              <div className="h-px bg-gray-100 my-6" />

              <p className="text-gray-600 leading-7">{doctor.description}</p>

              <div className="mt-7 space-y-4">
                <div className="flex items-center gap-3">
                  <HiOutlinePhone size={20} className="text-sky-600" />
                  <span>{doctor.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineMail size={20} className="text-sky-600" />
                  <span>{doctor.email}</span>
                </div>
              </div>

              <Link
                to="/services"
                className="btn bg-sky-600 hover:bg-sky-700 text-white border-none mt-8"
              >
                <FaCalendarCheck />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorViewDetails;
