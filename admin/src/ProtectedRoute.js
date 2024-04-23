
import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const { authenticated } = useAuth();

  return authenticated ? component : <Navigate to="/" />;
};

export default ProtectedRoute;