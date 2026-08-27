import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import aboutHeroImg from "../assets/aboutHeroImg.jpg";
import aboutServiceImg from "../assets/aboutServiceImg.jpg";
import {
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiArrowRight,
} from "react-icons/hi";
import { HiOutlineCalendarDays } from "react-icons/hi2";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-sky-100 via-white to-cyan-100">
      {/* ================= HERO ================= */}
      <section className="min-h-[80vh] flex items-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <img
              src={aboutHeroImg}
              alt="Dental Clinic"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-3xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <p className="text-primary font-semibold mb-3">
              ABOUT DENTALCARE BD
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              Your Smile, <span className="text-primary">Our Priority</span>
            </h1>

            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-8">
              We are dedicated to providing reliable, comfortable, and
              convenient dental care with experienced dentists and modern
              technology.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              DentalCare BD makes it easier for patients to find dentists, book
              appointments, manage treatment information, and stay connected
              with their dental care.
            </p>

            <Link
              to="/appointments"
              className="btn gap-2 rounded-lg bg-sky-600 mt-7 px-6 cursor-pointer text-white shadow-xl shadow-sky-200"
            >
              <HiOutlineCalendarDays className="text-xl" />
              Book Appointment
              <HiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="bg-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-2">WHO WE ARE</p>

          <h2 className="text-[22px] md:text-4xl font-bold text-gray-800">
            Caring for Your Dental Health
          </h2>

          <p className="mt-6 text-gray-600 leading-8 text-base sm:text-lg">
            DentalCare BD is a modern dental clinic management platform designed
            to make dental care simple and accessible. Our goal is to connect
            patients with professional dental services while making appointment
            management easier and more convenient.
          </p>

          <p className="mt-4 text-gray-600 leading-8">
            From finding the right dentist to managing appointments and
            treatment records, we aim to provide a smooth digital experience for
            both patients and dental professionals.
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">WHY CHOOSE US</p>

            <h2 className="text-xl md:text-4xl font-bold text-gray-800">
              Why Choose DentalCare BD?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center px-5">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiOutlineUserGroup size={32} />
              </div>

              <h3 className="text-xl font-bold mt-5">Experienced Dentists</h3>

              <p className="text-gray-600 mt-3 leading-7">
                Connect with experienced dental professionals for your different
                dental needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center px-5">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiOutlineShieldCheck size={32} />
              </div>

              <h3 className="text-xl font-bold mt-5">Quality Care</h3>

              <p className="text-gray-600 mt-3 leading-7">
                We focus on providing reliable and quality dental care for every
                patient.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center px-5">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiOutlineCalendar size={32} />
              </div>

              <h3 className="text-xl font-bold mt-5">Easy Appointment</h3>

              <p className="text-gray-600 mt-3 leading-7">
                Book and manage your dental appointments quickly and
                conveniently.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center px-5">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiOutlineHeart size={32} />
              </div>

              <h3 className="text-xl font-bold mt-5">Patient Care</h3>

              <p className="text-gray-600 mt-3 leading-7">
                We care about creating a comfortable and friendly patient
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR DENTAL CARE ================= */}
      <section className="bg-white px-4 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold mb-2">OUR DENTAL CARE</p>

            <h2 className="text-xl md:text-4xl font-bold text-gray-800">
              Comprehensive Dental Services
            </h2>

            <p className="mt-5 text-gray-600 leading-8">
              We provide a variety of dental care services designed to help
              patients maintain healthy teeth and gums.
            </p>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle
                  className="text-primary shrink-0"
                  size={22}
                />
                <span>Dental Cleaning</span>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle
                  className="text-primary shrink-0"
                  size={22}
                />
                <span>Root Canal Treatment</span>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle
                  className="text-primary shrink-0"
                  size={22}
                />
                <span>Dental Braces</span>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle
                  className="text-primary shrink-0"
                  size={22}
                />
                <span>Teeth Whitening</span>
              </div>
            </div>

            <button className="btn btn-outline btn-neutral text-lg font-medium hover:bg-sky-500 mt-8 h-10 w-44 cursor-pointer">
              View Services
              <HiArrowRight size={20} />
            </button>
          </div>

          <div>
            <img
              src={aboutServiceImg}
              alt="Dental Care"
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">OUR PURPOSE</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Mission & Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>

              <p className="mt-4 text-gray-600 leading-8">
                To provide accessible, reliable, and quality dental care while
                ensuring a comfortable and convenient experience for every
                patient.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>

              <p className="mt-4 text-gray-600 leading-8">
                To become a trusted dental care platform by combining modern
                technology with professional dental services and
                patient-centered care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-sky-600 text-primary-content px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Take Care of Your Smile?
          </h2>

          <p className="mt-4 opacity-90 text-base sm:text-lg">
            Book an appointment with one of our dentists and take the next step
            toward better dental care.
          </p>

          <Link
            to="/appointments"
            className="btn bg-white text-primary border-none mt-7 px-7 cursor-pointer hover:bg-gray-100"
          >
            <HiOutlineCalendarDays className="text-xl" />
            Book Appointment
            <HiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
