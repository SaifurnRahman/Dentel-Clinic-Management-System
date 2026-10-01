import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Faq from "../pages/Faq";
import About from "../pages/About";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddDoctor from "../pages/Dashboard/AdminActions/AddDoctor";
import Doctors from "../pages/Dashboard/AdminActions/Doctors";
import EditDoctor from "../pages/Dashboard/AdminActions/EditDoctor";
import Patients from "../pages/Dashboard/AdminActions/Patients";
import PatientDetails from "../pages/Dashboard/AdminActions/PatientDetails";
import CreateAdmin from "../pages/Dashboard/AdminActions/CreateAdmin";
import Appoinments from "../pages/Dashboard/AdminActions/Appoinments";
import PrivateRoute from "./PrivateRoute ";
import Services from "../pages/Services";
import MyAppointments from "../pages/Dashboard/PatientAction/MyAppointments";
import MyProfile from "../pages/Dashboard/PatientAction/MyProfile";
import DoctorsViews from "../pages/DoctorsView";
import DoctorViewDetails from "../pages/DocotorsViewDetails";
import TreatmentHistory from "../pages/Dashboard/PatientAction/TreatmentHistory";
import PetientsAppointments from "../pages/Dashboard/DoctorsActions/PetientsAppointments";
import DoctorTreatments from "../pages/Dashboard/DoctorsActions/DoctorTreatments";
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
        path: "/about",
        Component: About,
      },
      {
        path: "/dentists",
        Component: DoctorsViews,
      },
      {
        path: "/dentists/:id",
        Component: DoctorViewDetails,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/faq",
        Component: Faq,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },

  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "addDoctor",
        Component: AddDoctor,
      },
      {
        path: "createAdmin",
        Component: CreateAdmin,
      },
      {
        path: "doctors",
        Component: Doctors,
      },
      {
        path: "treatmentsByDoctor",
        Component: DoctorTreatments,
      },
      {
        path: "edit-doctor/:id",
        Component: EditDoctor,
      },
      {
        path: "allAppoinments",
        Component: Appoinments,
      },
      {
        path: "patients",
        Component: Patients,
      },
      {
        path: "myAppointments",
        Component: MyAppointments,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "patientsAppointments",
        Component: PetientsAppointments,
      },
      {
        path: "treatmentHistory",
        Component: TreatmentHistory,
      },
      {
        path: "patientDetails/:id",
        Component: PatientDetails,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/patients/${params.id}`
            );
            if (!res.ok) throw new Error("Patient record not found");
            const data = await res.json();
            return { data, error: null };
          } catch (err) {
            return { data: null, error: err.message };
          }
        },
      },
    ],
  },
]);
