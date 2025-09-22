import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // Load role + user from localStorage on refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");
    const savedAdmin = localStorage.getItem("admin");

    if (savedRole) setRole(savedRole);

    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    } else if (savedAdmin && savedAdmin !== "undefined") {
      setUser(JSON.parse(savedAdmin));
    }
  }, []);

  const login = (role, userData) => {
    setRole(role);
    setUser(userData);

    // Save in localStorage
    localStorage.setItem("role", role);
    if (userData) {
      if (role === "admin" || role === "superadmin") {
        localStorage.setItem("admin", JSON.stringify(userData));
      } else {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
