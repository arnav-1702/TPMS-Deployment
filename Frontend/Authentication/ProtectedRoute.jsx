// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useContext(AuthContext);

  // Check AuthContext first, then localStorage
  const storedRole = localStorage.getItem("role");
  const effectiveRole = role || storedRole;

  if (!effectiveRole) {
    // If no role in context or storage → redirect to home
    return <Navigate to="/commonlogin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(effectiveRole)) {
    // If role exists but not in allowed list → deny access
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
