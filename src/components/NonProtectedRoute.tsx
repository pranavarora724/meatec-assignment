import React from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "@/stores/AuthStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const NonProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  
const token = AuthStore((s) => s.token);

  if (token) {
    // If no token, redirect to login
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise render the child component(s)
  return <>{children}</>;
};

export default NonProtectedRoute;
