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
import { Link, useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Image preview handle & Memory leak prevent
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Clean memory on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "image") {
          formData.append(key, data[key]);
        }
      });

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }
      // const token = localStorage.getItem("token");
      // const API_URL = import.meta.env.VERCEL_URL || "http://localhost:5000";
      const API_URL = "https://dental-clinic-management-system-sql.vercel.app" || "http://localhost:5000";
      console.log(formData.values);

      const response = await fetch(`${API_URL}/api/doctors`, {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add doctor");
      }

      // Success Toast
      toast.success("Doctor added successfully!");

      reset();
      setImagePreview(null);

      // navigate("/dashboard/doctors");
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
        <h1 className="text-2xl font-bold sm:text-3xl">Add New Doctor</h1>

        <Link
          to="/dashboard/doctors"
          className="btn btn-outline btn-sm sm:btn-md"
        >
          <FiArrowLeft />
          Back to Doctors
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left - Image */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6">
              <h2 className="mb-1 text-lg font-semibold">Doctor Image</h2>

              <p className="mb-5 text-sm text-base-content/60">
                Upload a professional profile image.
              </p>

              {/* Preview */}
              <div className="mb-5 flex justify-center">
                <div className="h-56 w-56 overflow-hidden rounded-2xl border-2 border-dashed border-base-300 bg-base-200">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Doctor preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-base-content/40">
                      <FiImage size={48} />
                      <p className="mt-3 text-sm">Image Preview</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload */}
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center transition hover:border-primary hover:bg-primary/10">
                <FiUploadCloud size={32} className="mb-2 text-primary" />
                <span className="font-medium">Click to upload</span>
                <span className="mt-1 text-xs text-base-content/50">
                  JPG, PNG or WEBP · Max 5MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  {...register("image", {
                    onChange: handleImageChange,
                    validate: (files) => {
                      if (!files?.[0]) {
                        return "Doctor image is required";
                      }
                      if (files[0].size > 5 * 1024 * 1024) {
                        return "Image must be less than 5MB";
                      }
                      return true;
                    },
                  })}
                />
              </label>

              {errors.image && (
                <p className="mt-2 text-sm text-error">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Right - Doctor Information */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6">
              <h2 className="mb-1 text-lg font-semibold">Doctor Information</h2>

              <p className="mb-6 text-sm text-base-content/60">
                Enter the doctor's professional information.
              </p>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Doctor Name</span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiUser className="text-base-content/50" />
                    <input
                      type="text"
                      placeholder="Dr. John Doe"
                      className="grow"
                      {...register("name", {
                        required: "Doctor name is required",
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

                {/* Specialization */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Specialization
                    </span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiBriefcase className="text-base-content/50" />
                    <input
                      type="text"
                      placeholder="Orthodontist"
                      className="grow"
                      {...register("specialization", {
                        required: "Specialization is required",
                      })}
                    />
                  </label>

                  {errors.specialization && (
                    <p className="mt-1 text-sm text-error">
                      {errors.specialization.message}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Experience (Years)
                    </span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiBriefcase className="text-base-content/50" />
                    <input
                      type="number"
                      min="0"
                      placeholder="5"
                      className="grow"
                      {...register("experience", {
                        required: "Experience is required",
                        min: {
                          value: 0,
                          message: "Experience cannot be negative",
                        },
                      })}
                    />
                  </label>

                  {errors.experience && (
                    <p className="mt-1 text-sm text-error">
                      {errors.experience.message}
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
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>

                  <label className="input input-bordered flex items-center gap-3">
                    <FiMail className="text-base-content/50" />
                    <input
                      type="email"
                      placeholder="doctor@example.com"
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
                <Link to="/dashboard/doctors" className="btn btn-outline">
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
                      Adding Doctor...
                    </>
                  ) : (
                    <>
                      <FiUser />
                      Add Doctor
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

export default AddDoctor;
