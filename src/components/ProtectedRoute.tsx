import React from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "@/stores/AuthStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  
const token = AuthStore((s) => s.token);

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the child component(s)
  return <>{children}</>;
};

export default ProtectedRoute;
