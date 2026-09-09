import React, { useState } from "react";
import { useForm } from "react-hook-form";
import registerImg from "../assets/register.jpg";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiKey,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaTooth } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const API_URL = "https://dental-clinic-management-system-sql.vercel.app" || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/patients/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setServerError(result.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setServerError("Server connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-sky-100 via-white to-cyan-100 flex items-center justify-center px-4 py-8">
      <div className="flex items-center justify-between gap-16 w-full max-w-6xl">
        {/* ================= IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block lg:w-1/2"
        >
          <img
            src={registerImg}
            alt="Dental Clinic"
            className="h-[500px] w-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* ================= FORM ================= */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:max-w-md p-6 md:p-8 bg-base-100 rounded-2xl shadow-xl border border-sky-100"
          >
            {/* Heading */}
            <div className="mb-8 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-200"
              >
                <FaTooth className="text-xl" />
              </motion.div>
              <h1 className="text-3xl font-bold">Welcome</h1>

              <p className="text-base-content/60 mt-2">
                Create your DentalCare BD account
              </p>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="alert alert-error text-sm mb-4 py-2 text-white">
                <span>{serverError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* ================= NAME ================= */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>

                <label
                  className={`input input-bordered flex items-center gap-3 w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                >
                  <HiOutlineUser size={20} className="text-base-content/50" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="grow"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                </label>

                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* ================= EMAIL ================= */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>

                <label
                  className={`input input-bordered flex items-center gap-3 w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                >
                  <HiOutlineMail size={20} className="text-base-content/50" />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="grow"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </label>

                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* ================= PASSWORD ================= */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
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

              {/* ================= REGISTER BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-3 bg-sky-600 border-0 text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* ================= LOGIN ================= */}
            <p className="text-sm md:text-base mt-4">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 link link-primary font-semibold"
              >
                Login
              </Link>
            </p>
            <div className="divider">Or Continue With</div>
            <div className="flex justify-center gap-x-5 md:gap-x-7 items-center">
              <button className="btn hover:none cursor-pointer p-5">
                <FcGoogle size={40} />
              </button>
              <button className="btn hover:none cursor-pointer p-5">
                <BsFacebook size={38} color="blue" type="button" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
