import React from "react";
import { useForm } from "react-hook-form";
import { FaTooth } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import img from "../assets/Login-page-image.jpg";
import {
  HiOutlineMail,
  HiOutlineEyeOff,
  HiOutlineEye,
  HiKey,
} from "react-icons/hi";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-cyan-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="flex items-center justify-between gap-16 w-full max-w-6xl">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={img}
            alt="Login"
            className="h-[500px] w-full object-cover rounded-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-base-100">
          {/* Heading */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-200"
            >
              <FaTooth className="text-xl" />
            </motion.div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>

            <p className="text-base-content/60 mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
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
                  })}
                />
              </label>

              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />

                <span className="label-text">Remember me</span>
              </label>

              <a href="#" className="link link-primary text-sm">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* Register */}
          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
