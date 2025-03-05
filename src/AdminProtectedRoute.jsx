import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Components/Services/Auth";

const AdminProtectedRoute = () => {
  const user = Auth.getAuthData(); 
  // If the user is not authenticated, redirect to logins
  
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }
  if (user?.typeOfUser !== "Admin") {
    return <Navigate to="/dashboard" replace />; 
  }
  
  return <Outlet />;
};

export default AdminProtectedRoute;