import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // Load role + user from localStorage on refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");

    if (savedRole) setRole(savedRole);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (role, userData) => {
    setRole(role);
    setUser(userData);

    // Save in localStorage
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
