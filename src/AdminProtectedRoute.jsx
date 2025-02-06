// AdminProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Components/Services/Auth"; // adjust the import path as needed

const AdminProtectedRoute = () => {
  const user = Auth.getAuthData(); // Get authentication data
  // If the user is not authenticated, redirect to login
  
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }
  // If the user is authenticated but not an admin, redirect to a different page (e.g., dashboard)
  if (user.typeOfUser !== "admin") {
    return <Navigate to="/dashboard" replace />; // If not an admin, redirect to dashboard
  }
  // If authenticated and is admin, allow access
  return <Outlet />;
};

export default AdminProtectedRoute;







