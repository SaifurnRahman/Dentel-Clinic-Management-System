import { NavLink, Link } from "react-router-dom";
import { HiOutlineX, HiOutlineArrowLeft } from "react-icons/hi";
import { FaTooth } from "react-icons/fa6";
import { motion } from "motion/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, navItems }) => {
  return (
    <aside
      role="dialog"
      aria-modal={sidebarOpen}
      aria-label="Side Nav"
      className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-sky-50 via-white to-cyan-50 border-r border-slate-200
          transform transition-transform duration-300 flex flex-col
          lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-200"
          >
            <FaTooth className="text-xl" />
          </motion.div>

          <h2 className="text-xl font-bold text-slate-800">
            DentalCare
            <span className="text-sky-600"> BD</span>
          </h2>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="close sidebar"
          className="lg:hidden text-2xl text-slate-500 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          <HiOutlineX />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                }`
              }
            >
              <Icon className="text-xl" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <HiOutlineArrowLeft className="text-xl" />
          <span className="font-medium">Back to Website</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
