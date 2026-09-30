import React, { useEffect, useState } from "react";
import { HiOutlineSearch, HiOutlineTrash } from "react-icons/hi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Load Patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        // Ensure you have a leading slash if API_URL doesn't end with one
        const response = await fetch(`${API_URL}/api/patients`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch patients");
        }

        setPatients(data); // Expecting an array of patient objects
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  //Remove a patient
  const removePatients = (id) => {
    toast(
      (t) => (
        <div>
          <span className="text-sm font-medium text-gray-800">
            Are you sure you want to delete?
          </span>
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmDelete(id);
              }}
              className="px-2 py-2 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-2 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      }
    );
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete patient");
      }

      setPatients(patients.filter((patient) => patient.id !== id));
      toast.success("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patients:", error);
      toast.error("Error: ", error);
    }
  };

  const filteredPatients = patients?.filter((patient) => {
    const term = searchTerm.toLocaleLowerCase();

    const matched = patient?.name?.toLocaleLowerCase().includes(term);
    return matched;
  });

  if (loading) {
    return (
      <div className="flex-1 p-8 text-center text-zinc-500">
        Loading patients list...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 text-center text-red-500 bg-red-50 border border-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  // console.log(patients);

  return (
    <div className="flex-1 px-6 space-y-4 ">
      {/* 1. Header and Actions Section */}
      <div className="flex items-center justify-between gap-6 pb-2 border-b border-zinc-200">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Patients List</h1>
          <p className="text-zinc-600 mt-1">Manage all patient records.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by Name"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border rounded-lg text-sm w-72 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Patient Table Section */}
      <div className="bg-white border border-zinc-100 rounded-xl shadow-sm overflow-hidden">
        {patients.length === 0 ? (
          <div className="p-16 text-center text-zinc-500">
            No patients registered yet. Add a new patient to see them here.
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-16 text-center text-zinc-500">
            No patients found matching "{searchTerm}"
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-600 uppercase bg-zinc-100">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">
                  #ID
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-center">
                  Details
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients?.map((patient) => (
                <tr
                  key={patient.id}
                  className="bg-white border-b border-zinc-100 hover:bg-zinc-50 transition"
                >
                  <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                    P-{patient.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-zinc-900">
                    {patient.name}
                  </td>

                  <td className="px-6 py-4 text-zinc-700">
                    {patient.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/dashboard/patientDetails/${patient?.id}`}
                      className="p-2 cursor-pointer rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                      title="Patient Details"
                    >
                      <BsBoxArrowInUpRight className="size-5" />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removePatients(patient?.id)}
                      className="p-2 cursor-pointer rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700"
                      title="Delete Patient"
                    >
                      <HiOutlineTrash className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Patients;
