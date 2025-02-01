import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Components/Services/Auth";

const ProtectedRoute = () => {
  const user = Auth.getAuthData(); // Get user authentication data

  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
