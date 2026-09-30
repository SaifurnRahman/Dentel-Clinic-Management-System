import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiImage,
  FiFileText,
  FiUploadCloud,
  FiArrowLeft,
} from "react-icons/fi";
import { HiKey, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      setLoading(true);
console.log(data);
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to make admin");
      }
      // Success Toast
      toast.success("Admin added successfully!");

      reset();
    } catch (error) {
      // Error Toast
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Create New Admin</h1>

        <Link
          to="/dashboard/admins"
          className="btn btn-outline btn-sm sm:btn-md"
        >
          <FiArrowLeft />
          Back to Admins
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Right - Admin Information */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6">
              <h2 className="mb-1 text-lg font-semibold">Admin Information</h2>

              <p className="mb-6 text-sm text-base-content/60">
                Enter the admin's professional information.
              </p>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Admin Name</span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiUser className="text-base-content/50" />
                    <input
                      type="text"
                      placeholder="Dr. John Doe"
                      className="grow"
                      {...register("name", {
                        required: "Admin name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                    />
                  </label>

                  {errors.name && (
                    <p className="mt-1 text-sm text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Phone</span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiPhone className="text-base-content/50" />
                    <input
                      type="tel"
                      placeholder="01712345678"
                      className="grow"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^01[3-9]\d{8}$/,
                          message: "Enter a valid 11-digit mobile number",
                        },
                      })}
                    />
                  </label>

                  {errors.phone && (
                    <p className="mt-1 text-sm text-error">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiMail className="text-base-content/50" />
                    <input
                      type="email"
                      placeholder="admin@example.com"
                      className="grow"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                  </label>

                  {errors.email && (
                    <p className="mt-1 text-sm text-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Password for Admin
                    </span>
                  </label>

                  <label
                    className={`input input-bordered flex items-center gap-3 w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                  >
                    <HiKey size={20} className="text-base-content/50" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="grow"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-ghost btn-xs"
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff size={20} />
                      ) : (
                        <HiOutlineEye size={20} />
                      )}
                    </button>
                  </label>

                  {errors.password && (
                    <p className="text-error text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>

                  <div className="relative flex items-start">
                    <textarea
                      placeholder="Write a short professional description..."
                      className="textarea textarea-bordered w-full resize-none pl-10"
                      rows="4"
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 20,
                          message: "Description must be at least 20 characters",
                        },
                      })}
                    />
                    <FiFileText className="absolute left-3 top-3.5 text-base-content/50" />
                  </div>

                  {errors.description && (
                    <p className="mt-1 text-sm text-error">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-base-300 pt-6 sm:flex-row sm:justify-end">
                <Link to="/dashboard/admins" className="btn btn-outline">
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Adding Admin...
                    </>
                  ) : (
                    <>
                      <FiUser />
                      Add Admin
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
