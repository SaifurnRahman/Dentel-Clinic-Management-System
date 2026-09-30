import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditDoctor = () => {
    const { id } = useParams(); // URL থেকে ডক্টরের আইডি ধরবে
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
        description: "",
    });

    const API_URL = import.meta.env.VITE_API_URL;

    // ডক্টরের পুরোনো ডাটা ফেচ করে ফর্মে লোড করা
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${API_URL}/api/doctors`);
                const data = await response.json();
                const currentDoctor = data.find((doc) => doc.id == id);
                if (currentDoctor) {
                    setFormData(currentDoctor);
                }
            } catch (error) {
                console.error("Error fetching doctor:", error);
            }
        };
        fetchDoctor();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/doctors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update doctor");

            alert("Doctor updated successfully!");
            navigate("/dashboard/doctors"); // আপডেট শেষে ডক্টরস লিস্টে ফিরিয়ে নিয়ে যাবে
        } catch (error) {
            console.error("Error updating doctor:", error);
            alert(error.message);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Doctor Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Specialization</label>
                    <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Experience (Years)</label>
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Update Doctor
                </button>
            </form>
        </div>
    );
};

export default EditDoctor;