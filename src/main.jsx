import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);