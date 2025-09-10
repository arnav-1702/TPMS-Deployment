// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("candidate");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setRole(decoded.role || "candidate");
        setToken(storedToken);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (userToken) => {
    localStorage.setItem("token", userToken);
    const decoded = jwtDecode(userToken);
    setRole(decoded.role || "candidate");
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setRole("candidate");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
