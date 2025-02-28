import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Auth from "./Components/Services/Auth";

const RedirectToDashboard = () => {
  const user = Auth.getAuthData();

  if (user?.token) {
    if (user?.typeOfUser === "Admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Navigate to="/" replace />;
};

export default RedirectToDashboard;
