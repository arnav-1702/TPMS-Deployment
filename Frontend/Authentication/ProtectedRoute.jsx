import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useContext(AuthContext);

  // Fallback to localStorage if role is missing in context
  let storedRole = localStorage.getItem("role");
  if (!storedRole || storedRole === "undefined") storedRole = null;

  const effectiveRole = role || storedRole;

  if (!effectiveRole) {
    // No role → redirect to login
    return <Navigate to="/commonlogin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(effectiveRole)) {
    // Role exists but is not allowed → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
