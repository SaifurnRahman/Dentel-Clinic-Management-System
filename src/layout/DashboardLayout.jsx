import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineCalendar,
} from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FiUser } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
  { name: "Add Doctor", path: "/dashboard/addDoctor", icon: FiUser },
  { name: "Doctors", path: "/dashboard/doctors", icon: HiOutlineUserGroup },
  { name: "Patients", path: "/dashboard/patients", icon: HiOutlineUsers },
  {
    name: "Appointments",
    path: "/dashboard/appointments",
    icon: HiOutlineCalendar,
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // location ডিক্লেয়ার করা হয়েছে

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 overflow-hidden font-sans">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navItems={navItems}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar setSidebarOpen={setSidebarOpen} navItems={navItems} />

        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
