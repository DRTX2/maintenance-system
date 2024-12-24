import React from "react";
import { Navigate } from "react-router-dom";
import { getDecodedToken } from "../utils/authService";

const ProtectedRoute = ({ children }) => {
  const decodedToken = getDecodedToken();

  if (!decodedToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
