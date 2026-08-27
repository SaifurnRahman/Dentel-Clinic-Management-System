import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineClock,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTooth,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-slate-950 text-slate-400">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-5 py-14"
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
                <FaTooth />
              </div>

              <h2 className="text-xl font-bold text-white">
                DentalCare
                <span className="text-sky-400"> BD</span>
              </h2>
            </Link>

            <p className="mt-4 text-sm leading-6">
              Making quality dental care simpler and more accessible
              for patients across Bangladesh.
            </p>

            <div className="mt-5 flex gap-2">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3 }}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-sky-600"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-sky-400">Home</Link>
              <Link to="/dentists" className="hover:text-sky-400">Find Dentists</Link>
              <Link to="/services" className="hover:text-sky-400">Services</Link>
              <Link to="/appointments" className="hover:text-sky-400">Book Appointment</Link>
            </div>
          </div>

          {/* Clinic Hours */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Clinic Hours
            </h3>

            <div className="flex gap-3 text-sm">
              <HiOutlineClock className="mt-1 shrink-0 text-xl text-sky-400" />

              <div className="space-y-2">
                <p>Saturday – Thursday</p>
                <p className="text-white">
                  9:00 AM – 9:00 PM
                </p>
                <p>Friday: Limited Service</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4 text-sm">
              <p className="flex gap-3">
                <HiOutlineMapPin className="shrink-0 text-xl text-sky-400" />
                Dhaka, Bangladesh
              </p>

              <p className="flex gap-3">
                <HiOutlinePhone className="shrink-0 text-xl text-sky-400" />
                +880 1XXX-XXXXXX
              </p>

              <p className="flex gap-3">
                <HiOutlineEnvelope className="shrink-0 text-xl text-sky-400" />
                support@dentalcarebd.com
              </p>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Payment Methods
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-pink-600 px-3 py-1.5 text-xs font-semibold text-white">
                bKash
              </span>

              <span className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
                Nagad
              </span>

              <span className="rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white">
                VISA
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-center text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} DentalCare BD. All rights reserved.
          </p>

          <div className="flex justify-center gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;