import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineCalendar,
} from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
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

  // close sidebar during change root
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navItems={navItems}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar — sticky */}
        <Topbar setSidebarOpen={setSidebarOpen} navItems={navItems} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
