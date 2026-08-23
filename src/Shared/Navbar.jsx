import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineCalendarDays,
  HiOutlineUser,
} from "react-icons/hi2";
import { FaTooth } from "react-icons/fa6";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Dentists", path: "/dentists" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-sky-100 bg-white/90 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-200"
          >
            <FaTooth className="text-xl" />
          </motion.div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              DentalCare
              <span className="text-sky-600"> BD</span>
            </h2>

            <p className="text-[10px] tracking-wide text-slate-400">
              Smile with confidence
            </p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-sky-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute bottom-0 left-0 h-0.5 w-full rounded bg-sky-600"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-sky-50"
          >
            <HiOutlineUser />
            Login
          </Link>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/appointments"
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200"
            >
              <HiOutlineCalendarDays className="text-lg" />
              Book Appointment
            </Link>
          </motion.div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-2xl text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-sky-50 bg-white lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <Link
                to="/appointments"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 font-semibold text-white"
              >
                <HiOutlineCalendarDays />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;