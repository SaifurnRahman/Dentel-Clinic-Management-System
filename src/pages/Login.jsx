import React from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { FaTooth } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import img from "../assets/loginPageImg.png";
import {
  HiOutlineMail,
  HiOutlineEyeOff,
  HiOutlineEye,
  HiKey
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const {email, password} = data;
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      ;
     const resdata = await response.json();
     if (response.ok) {
       login(resdata);
       navigate(from, { replace: true });
     }else{
      toast.error(resdata?.message)
     };
  };

  return (
    <div className="h-full bg-gradient-to-br from-sky-100 via-white to-cyan-100 flex items-center justify-center px-4 py-8">
      {/* Main Container */}
      <div className="flex items-center justify-between gap-16 w-full max-w-6xl">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block lg:w-1/2"
        >
          <img
            src={img}
            alt="Login"
            className="h-[500px] w-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
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
            <button type="submit" className="btn btn-primary w-full bg-sky-600">
              Login
            </button>
          </form>

          {/* Go for Register */}
          <p className="text-sm md:text-base">
            Don't have an account?
            <Link to="/register" className="ml-1 link link-primary font-semibold">
              Create account
            </Link>
          </p>
          <div className="divider">Or Continue With</div>
          <div className="flex justify-center gap-x-5 md:gap-x-7 items-center">
            <button className="btn hover:none cursor-pointer p-5">
            <FcGoogle size={40} />

            </button>
            <button className="btn hover:none cursor-pointer p-5">

            <BsFacebook size={38} color="blue" type="button"/>
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
