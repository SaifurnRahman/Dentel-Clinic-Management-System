import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { HiOutlineSearch, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaCalendarCheck, FaStar } from "react-icons/fa6";

const DoctorsViews = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [loading, setLoading] = useState(true);

  // Load doctors
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        const data = await response.json();

        if (response.ok) {
          setDoctors(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, );

  // Unique specializations
  const specializations = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  // Search + filter
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialization =
      specialization === "All" || doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Our Dentists
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Meet Our
            <span className="text-sky-600"> Dental Experts</span>
          </h1>

          <p className="text-gray-500 mt-4">
            Explore our experienced dentists and choose the right specialist for
            your dental care.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5 mb-10">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="input input-bordered flex items-center gap-3 w-full">
              <HiOutlineSearch size={22} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search doctor or specialization..."
                className="grow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Specialization */}
            <select
              className="select select-bordered w-full"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-sky-600"></span>
          </div>
        )}

        {/* No doctors */}
        {!loading && filteredDoctors.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No doctors found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another doctor name or specialization.
            </p>
          </div>
        )}

        {/* Doctors */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="h-72 bg-sky-50 overflow-hidden">
                  <img
                    src={doctor.image_url || "/doctor-placeholder.png"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {doctor.name}
                      </h2>

                      <p className="text-sky-600 font-medium mt-1">
                        {doctor.specialization}
                      </p>
                    </div>

                    {/* Rating */}
                    {doctor.rating !== null && doctor.rating !== undefined && (
                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        <FaStar />
                        <span className="font-semibold">{doctor.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Experience */}
                  <p className="text-sm text-gray-500 mt-3">
                    {doctor.experience} years experience
                  </p>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-6 mt-4 line-clamp-3">
                    {doctor.description}
                  </p>

                  {/* Contact */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <HiOutlinePhone className="text-sky-600" />
                      {doctor.phone}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <HiOutlineMail className="text-sky-600" />
                      <span className="truncate">{doctor.email}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link
                      to={`/dentists/${doctor.id}`}
                      className="btn btn-outline border-sky-500 text-sky-600 hover:bg-sky-50"
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/services"
                      className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
                    >
                      <FaCalendarCheck />
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsViews;
