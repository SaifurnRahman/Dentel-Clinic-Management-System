import React, { useState, useEffect } from "react";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("bKash");
    const [transactionId, setTransactionId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("all");

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/appointments/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setAppointments(data);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    
    const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/appointments/${selectedAppointment.appointment_id}/pay`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ paymentMethod, transactionId }),
        });

        if (response.ok) {
            alert("Payment processed and saved to database successfully!");
            
           
            setAppointments((prev) =>
                prev.map((app) =>
                    app.appointment_id === selectedAppointment.appointment_id
                        ? { ...app, payment_status: "Paid" }
                        : app
                )
            );

            setShowModal(false);
            setTransactionId("");
        } else {
            alert("Payment failed on server!");
        }
    } catch (error) {
        console.error("Payment error:", error);
    }
};

    const handleCancelAppointment = async (appointmentId) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/appointments/${appointmentId}/cancel`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Appointment cancelled successfully!");
                setAppointments((prev) => prev.filter((app) => app.appointment_id !== appointmentId));
            } else {
                alert("Failed to cancel appointment.");
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
    };

    const filteredAppointments = appointments.filter((app) => {
        const status = app.status ? app.status.toLowerCase() : "";
        if (status === "cancelled") return false;

        if (filter === "paid") return app.payment_status === "Paid";
        if (filter === "unpaid") return app.payment_status !== "Paid";
        return true;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
                    <p className="text-gray-500 text-sm">Manage your clinic visits, track payments, or cancel if needed.</p>
                </div>
                {/* Filter Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${filter === "all" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        All ({appointments.filter(a => (a.status ? a.status.toLowerCase() : "") !== "cancelled").length})
                    </button>
                    <button
                        onClick={() => setFilter("unpaid")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${filter === "unpaid" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Unpaid
                    </button>
                    <button
                        onClick={() => setFilter("paid")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${filter === "paid" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Paid
                    </button>
                </div>
            </div>

            {/* Appointments List */}
            {filteredAppointments.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 text-lg">No appointments found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAppointments.map((app) => (
                        <div
                            key={app.appointment_id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {app.service_name}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-800 mt-2">Dr. {app.doctor_name}</h3>
                                        <p className="text-sm text-gray-500">{app.specialization}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            app.payment_status === "Paid"
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                                : "bg-amber-50 text-amber-600 border border-amber-200"
                                        }`}
                                    >
                                        {app.payment_status === "Paid" ? "✓ Paid" : "⚠ Unpaid"}
                                    </span>
                                </div>

                                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Date & Time:</span>
                                        <span>{app.appointment_date} at {app.appointment_time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Reason:</span>
                                        <span className="text-gray-500 truncate">{app.reason || "General Checkup"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer / Actions */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div className="text-xs text-gray-400">
                                    Status: <span className="font-medium text-gray-700 capitalize">{app.status}</span>
                                </div>
                                <div className="flex space-x-2">
                                    {app.payment_status !== "Paid" && (
                                        <button
                                            onClick={() => {
                                                setSelectedAppointment(app);
                                                setShowModal(true);
                                            }}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:from-blue-700 hover:to-indigo-700 transition"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleCancelAppointment(app.appointment_id)}
                                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-sm font-medium transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modern Payment Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Secure Checkout</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="bg-blue-50/50 p-4 rounded-2xl mb-6 border border-blue-100">
                            <p className="text-xs text-blue-600 font-semibold uppercase">Selected Service</p>
                            <p className="text-base font-bold text-gray-800">{selectedAppointment?.service_name}</p>
                            <p className="text-sm text-gray-600">Doctor: Dr. {selectedAppointment?.doctor_name}</p>
                        </div>

                        <form onSubmit={handlePaymentSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Payment Method</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800 font-medium"
                                >
                                    <option value="bKash">bKash (Mobile Banking)</option>
                                    <option value="Nagad">Nagad (Mobile Banking)</option>
                                    <option value="Visa">Visa / MasterCard</option>
                                    <option value="Cash">Cash at Clinic Counter</option>
                                </select>
                            </div>

                            {paymentMethod !== "Cash" && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction ID (TrxID)</label>
                                    <input
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="e.g. 9H74X82K1"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
                                        required
                                    />
                                </div>
                            )}

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition"
                                >
                                    Confirm Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;