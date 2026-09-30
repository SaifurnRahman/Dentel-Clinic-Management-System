import React, { useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlinePencilAlt,
  HiOutlinePrinter,
  HiOutlineExclamationCircle,
  HiOutlineDocumentDownload,
  HiOutlineEye,
  HiOutlinePlus,
} from "react-icons/hi";
import { FaTooth } from "react-icons/fa";

const PatientDetails = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const patient = loaderData?.data;
  const error = loaderData?.error;

  // Active Tab Management State
  const [activeTab, setActiveTab] = useState("history");

  // X-Ray Lightbox Modal State
  const [selectedImage, setSelectedImage] = useState(null);

  if (error || !patient) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
          <HiOutlineExclamationCircle className="size-12 mx-auto mb-2" />
          <h2 className="text-xl font-bold">Patient Not Found</h2>
          <p className="text-sm mt-1">
            {error || "Unable to fetch patient record."}
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/patients")}
          className="px-4 py-2 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-900 transition"
        >
          Back to Patient List
        </button>
      </div>
    );
  }

  // ডামি/মক ডেন্টাল রেকর্ড ডাটা (প্রয়োজনে আপনার DB/API থেকে ডাটা দিয়ে পরিবর্তন করবেন)
  const medicalAlerts = ["Penicillin Allergy", "Diabetes Type 2", "High BP"];

  const appointmentsHistory = [
    {
      id: 1,
      date: "2026-02-10",
      doctor: "Dr. A. Rahman",
      treatment: "Root Canal Treatment (Tooth 16)",
      status: "Completed",
      cost: "$250",
    },
    {
      id: 2,
      date: "2025-11-05",
      doctor: "Dr. S. Khan",
      treatment: "Full Mouth Scaling & Polishing",
      status: "Completed",
      cost: "$80",
    },
  ];

  const prescriptions = [
    {
      id: 101,
      date: "10 Feb 2026",
      doctor: "Dr. A. Rahman",
      medicines: "Amoxicillin 500mg, Paracetamol 500mg",
    },
    {
      id: 102,
      date: "05 Nov 2025",
      doctor: "Dr. S. Khan",
      medicines: "Mouthwash Chlorhexidine",
    },
  ];

  const xrays = [
    {
      id: 1,
      title: "Upper Molar Dental X-Ray",
      date: "10 Feb 2026",
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Panoramic Jaw OPG",
      date: "05 Nov 2025",
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 3. Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <nav className="text-xs font-medium text-zinc-500 flex items-center gap-2 mb-1">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/dashboard/patients" className="hover:text-blue-600">
              Patients
            </Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold">P-{patient.id}</span>
          </nav>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <FaTooth className="text-blue-600 size-6" /> {patient.name}
          </h1>
        </div>

        <button
          onClick={() => navigate("/dashboard/patients")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 shadow-sm transition"
        >
          <HiOutlineArrowLeft className="size-4" /> Back to Patient List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Left Sidebar (Profile Overview & Quick Actions) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Pro Pic / Avatar */}
            <div className="text-center">
              <div className="size-24 bg-blue-100 text-blue-600 font-bold text-3xl rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-blue-50">
                {patient.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-zinc-900">
                {patient.name}
              </h2>
              <span className="inline-block mt-1 px-3 py-1 bg-zinc-100 text-zinc-600 font-mono text-xs font-semibold rounded-full">
                ID: P-{patient.id}
              </span>
              <p className="text-sm text-zinc-500 mt-2">
                {patient.age ? `${patient.age} Yrs` : "Age N/A"} •{" "}
                {patient.gender || "Gender N/A"}
              </p>
            </div>

            <hr className="border-zinc-100" />

            {/* Contact Information */}
            <div className="space-y-3 text-sm">
              <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">
                Contact Info
              </h3>
              <div className="flex items-center gap-3 text-zinc-700">
                <HiOutlinePhone className="size-5 text-zinc-400 shrink-0" />
                <span>{patient.phone || "No phone number"}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <HiOutlineMail className="size-5 text-zinc-400 shrink-0" />
                <span className="truncate">
                  {patient.email || "No email provided"}
                </span>
              </div>
              <div className="flex items-start gap-3 text-zinc-700">
                <HiOutlineLocationMarker className="size-5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{patient.address || "No address provided"}</span>
              </div>
            </div>

            <hr className="border-zinc-100" />

            {/* Medical Alerts */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-red-500 tracking-wider flex items-center gap-1">
                <HiOutlineExclamationCircle className="size-4" /> Medical Alerts
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {medicalAlerts.map((alert, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 font-medium text-xs rounded-md"
                  >
                    {alert}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-zinc-100" />

            {/* Quick Action Buttons */}
            <div className="space-y-2 pt-1">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition shadow-sm">
                <HiOutlineCalendar className="size-5" /> Book Appointment
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg hover:bg-zinc-200 transition">
                  <HiOutlinePencilAlt className="size-4" /> Edit Profile
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg hover:bg-zinc-200 transition">
                  <HiOutlinePrinter className="size-4" /> Print Record
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Content Area (Tabs Navigation) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Tab Header Navigation */}
            <div className="flex border-b border-zinc-200 bg-zinc-50 overflow-x-auto">
              {[
                { id: "history", label: "Medical & Dental History" },
                { id: "appointments", label: "Appointments & Treatments" },
                { id: "prescriptions", label: "Prescriptions & X-Rays" },
                { id: "billing", label: "Billing & Invoices" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 bg-white"
                      : "border-transparent text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="p-6">
              {/* TAB 1: Medical & Dental History */}
              {activeTab === "history" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 mb-3">
                      Dental & Chronic History
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                        <span className="text-xs font-bold text-zinc-400 uppercase">
                          Ongoing Medication
                        </span>
                        <p className="text-sm font-medium text-zinc-800 mt-1">
                          Metformin 500mg (Daily)
                        </p>
                      </div>
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                        <span className="text-xs font-bold text-zinc-400 uppercase">
                          Past Surgeries
                        </span>
                        <p className="text-sm font-medium text-zinc-800 mt-1">
                          Wisdom Tooth Extraction (2023)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor's Note Block */}
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      <HiOutlinePencilAlt /> Doctor's Special Note
                    </h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      Patient experiences mild sensitivity in lower left molars.
                      Recommended sensitivity toothpaste before considering
                      further filling procedures.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: Appointments & Treatments (Timeline View) */}
              {activeTab === "appointments" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-zinc-900">
                      Treatment History
                    </h3>
                    <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                      <HiOutlinePlus /> New Record
                    </button>
                  </div>

                  {/* Timeline UI */}
                  <div className="relative border-l-2 border-zinc-200 ml-4 space-y-6">
                    {appointmentsHistory.map((item) => (
                      <div key={item.id} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 size-4 bg-blue-600 rounded-full border-4 border-white" />
                        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-blue-600">
                              {item.date}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded">
                              {item.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-zinc-900 text-sm">
                            {item.treatment}
                          </h4>
                          <p className="text-xs text-zinc-500">
                            Attended by: {item.doctor}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Prescriptions & Documents */}
              {activeTab === "prescriptions" && (
                <div className="space-y-6">
                  {/* Prescriptions */}
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 mb-3">
                      Issued Prescriptions
                    </h3>
                    <div className="space-y-2">
                      {prescriptions.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-xl border border-zinc-100"
                        >
                          <div>
                            <p className="text-sm font-bold text-zinc-800">
                              {p.medicines}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {p.date} • {p.doctor}
                            </p>
                          </div>
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Download Rx"
                          >
                            <HiOutlineDocumentDownload className="size-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dental X-Rays Lightbox Grid */}
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 mb-3">
                      X-Rays & Dental Records
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {xrays.map((xray) => (
                        <div
                          key={xray.id}
                          onClick={() => setSelectedImage(xray.url)}
                          className="group relative cursor-pointer rounded-xl overflow-hidden border border-zinc-200 bg-zinc-900 aspect-video"
                        >
                          <img
                            src={xray.url}
                            alt={xray.title}
                            className="w-full h-full object-cover group-hover:opacity-75 transition duration-300"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <HiOutlineEye className="text-white size-8 bg-black/50 p-1.5 rounded-full" />
                          </div>
                          <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs truncate">
                            {xray.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Billing & Invoices */}
              {activeTab === "billing" && (
                <div className="space-y-6">
                  {/* Financial Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl text-center">
                      <span className="text-xs font-semibold text-zinc-500">
                        Total Billed
                      </span>
                      <p className="text-xl font-bold text-zinc-900 mt-1">
                        $330
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                      <span className="text-xs font-semibold text-green-700">
                        Paid Amount
                      </span>
                      <p className="text-xl font-bold text-green-800 mt-1">
                        $330
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-center">
                      <span className="text-xs font-semibold text-red-700">
                        Due Amount
                      </span>
                      <p className="text-xl font-bold text-red-800 mt-1">$0</p>
                    </div>
                  </div>

                  {/* Invoice Table */}
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-zinc-100 text-xs text-zinc-600 uppercase">
                        <tr>
                          <th className="px-4 py-3">Inv ID</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3 text-center">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        <tr>
                          <td className="px-4 py-3 font-mono text-xs">
                            #INV-8821
                          </td>
                          <td className="px-4 py-3">10 Feb 2026</td>
                          <td className="px-4 py-3 font-semibold text-zinc-900">
                            $250
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button className="text-xs text-blue-600 font-semibold hover:underline">
                              Print PDF
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Actionable Modal for X-Rays */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 text-sm"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Enlarged X-Ray"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
