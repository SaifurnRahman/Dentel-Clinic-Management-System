import React from "react";
import { HiOutlineLogout, HiOutlineMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Topbar = ({ setSidebarOpen, navItems }) => {
  // get page title and show in topbar
  const getPageTitle = (pathname) => {
    const match = navItems?.find(
      (item) => pathname === item.path || pathname.startsWith(item.path + "/")
    );
    return match ? match.name : "Dashboard";
  };
  const location = useLocation();

  return (
    <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="open sidebar"
          className="lg:hidden text-2xl text-slate-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          <HiOutlineMenuAlt2 />
        </button>
        <h2 className="text-lg font-semibold text-slate-800">
          {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
            DR
          </div>
          <p className="hidden sm:block text-sm font-medium text-slate-700 whitespace-nowrap">
            Dr. Rahman
          </p>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg shrink-0">
          <HiOutlineLogout className="text-lg" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
