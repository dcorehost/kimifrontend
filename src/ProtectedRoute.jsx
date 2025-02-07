import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Components/Services/Auth";

const ProtectedRoute = () => {
  const user = Auth.getAuthData(); // Get user authentication data

   if (user?.typeOfUser !== "User") {
      return <Navigate to="/admin/dashboard" replace />; // If not an admin, redirect to dashboard
    }

  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
