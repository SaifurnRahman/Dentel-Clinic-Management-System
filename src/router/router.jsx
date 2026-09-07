import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Faq from "../pages/Faq";
import About from "../pages/About";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddDoctor from "../pages/Dashboard/AddDoctor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/faq',
        Component: Faq,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
    ],
  },


  // Dashboard Layout
  {
    path: "/dashboard",
    Component: DashboardLayout,

    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "addDoctor",
        Component: AddDoctor,
      },
      // {
      //   path: "doctors",
      //   Component: Doctors,
      // },
    ],
  },
]);