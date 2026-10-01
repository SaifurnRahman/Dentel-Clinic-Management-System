import React, { useState } from "react";

const MyProfile = () => {
    // স্ট্যাটিক বা ডামি প্রোফাইল ডাটা
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

  
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    // সেভ করার হ্যান্ডলার (সাকসেস মেসেজ দেখাবে)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        
        // ৩ সেকেন্ড পর মেসেজ মিলিয়ে দেওয়া
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                        <p className="text-gray-500 text-sm">View and edit your personal information (Static Demo).</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* Success Alert */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                        {successMessage}
                    </div>
                )}

                {/* Profile Form / View */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none ${
                                    isEditing ? "bg-gray-50 focus:ring-2 focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
                                }`}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none ${
                                    isEditing ? "bg-gray-50 focus:ring-2 focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
                                }`}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none ${
                                    isEditing ? "bg-gray-50 focus:ring-2 focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
                                }`}
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none ${
                                    isEditing ? "bg-gray-50 focus:ring-2 focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Save Button (Only visible when editing) */}
                    {isEditing && (
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MyProfile;