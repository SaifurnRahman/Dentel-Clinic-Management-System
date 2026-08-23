import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  HiArrowRight,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { FaStar, FaTooth } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";

import dentistImg from "../assets/dentist.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      {/* Background Decorations */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-2 lg:py-20">

        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm"
          >
            <HiOutlineShieldCheck className="text-lg text-emerald-500" />
            Trusted Dental Care in Bangladesh
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-4xl font-bold leading-[1.15] text-slate-900 md:text-5xl lg:text-6xl"
          >
            A Healthier Smile
            <br />
            Starts With
            <span className="text-sky-600"> Better Care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-500"
          >
            Find trusted dentists, book appointments, make secure
            payments and manage your dental treatment from one simple
            platform.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/appointments"
                className="flex items-center gap-2 rounded-xl bg-sky-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-sky-200"
              >
                <HiOutlineCalendarDays className="text-xl" />
                Book Appointment
                <HiArrowRight />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4 }}>
              <Link
                to="/dentists"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm"
              >
                <HiOutlineUserGroup className="text-xl text-sky-600" />
                Find Dentist
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-11 flex flex-wrap gap-8"
          >
            <div>
              <div className="flex items-center gap-2">
                <FaTooth className="text-sky-500" />
                <h3 className="text-2xl font-bold text-slate-800">20+</h3>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Qualified Dentists
              </p>
            </div>

            <div className="border-l border-slate-200 pl-8">
              <h3 className="text-2xl font-bold text-slate-800">
                1,000+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Happy Patients
              </p>
            </div>

            <div className="border-l border-slate-200 pl-8">
              <div className="flex items-center gap-1">
                <h3 className="text-2xl font-bold text-slate-800">
                  4.9
                </h3>
                <FaStar className="text-amber-400" />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Patient Rating
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[40px] bg-sky-100 shadow-2xl shadow-sky-200/70">
              <img
                src={dentistImg}
                alt="Professional dentist"
                className="h-[620px] w-[530px] object-cover object-top"
              />
            </div>

            {/* Appointment Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.04 }}
              className="absolute -left-12 bottom-16 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                  <HiOutlineCheckCircle className="text-2xl text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Appointment
                  </p>
                  <p className="font-semibold text-slate-700">
                    Booking Confirmed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }}
              className="absolute -right-8 top-14 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-2.5">
                  <MdOutlinePayments className="text-2xl text-sky-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    <span className="text-pink-600">bKash</span>
                    <span className="mx-1 text-slate-300">•</span>
                    <span className="text-orange-500">Nagad</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;