import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // location ডিক্লেয়ার করা হয়েছে
  const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("role");

  const roleBasedNavItems = {
    admin: [
      { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome, },
      { name: "Add Doctor", path: "/dashboard/addDoctor", icon: FiUser, },
      { name: "Create Admin", path: "/dashboard/createAdmin", icon: FiUser, },
      { name: "Doctors", path: "/dashboard/doctors", icon: HiOutlineUserGroup, },
      { name: "Patients", path: "/dashboard/patients", icon: HiOutlineUsers, },
      { name: "Appointments", path: "/dashboard/allAppoinments", icon: HiOutlineCalendar, },
    ],

    doctor: [
      { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
      { name: "Appointments", path: "/dashboard/patientsAppointments", icon: HiOutlineCalendar, },
      { name: "Patient Records", path: "/dashboard/patients", icon: HiOutlineUsers, },
      { name: "Treatment History", path: "/dashboard/mytreatments", icon: HiOutlineClipboardList},
      { name: "My Profile", path: "/dashboard/profile", icon: FiUser, },
    ],

    patient: [
      { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome, },
      { name: "Book Appointment", path: "/services", icon: HiOutlineCalendar, },
      { name: "My Appointments", path: "/dashboard/myAppointments", icon: HiOutlineCalendar, },
      { name: "Treatment History", path: "/dashboard/treatmentHistory", icon: HiOutlineClipboardList, },
      { name: "My Profile", path: "/dashboard/myProfile", icon: FiUser, },
    ],
  };

  //showing menu based on role
  const navItems = roleBasedNavItems[userRole] || [];
  console.log(navItems);

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
