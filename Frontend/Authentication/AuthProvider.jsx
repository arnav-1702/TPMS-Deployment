// src/Authentication/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { logoutCandidateAPI, logoutCompanyAPI } from "@/services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);   
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true); // prevent flicker while checking

  // Run on app start
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          withCredentials: true, // 👈 sends cookies
        });
        setRole(res.data.role);
        setUser(res.data.user);

        localStorage.setItem("role", res.data.role);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        // ❌ Invalid or missing cookie → logout
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (role, userData) => {
    setRole(role);
    setUser(userData);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      if (role === "candidate") await logoutCandidateAPI();
      if (role === "company") await logoutCompanyAPI();
    } catch (err) {
      console.error("Backend logout failed (probably no cookie):", err.message);
    }

    // clear state + storage
    setRole(null);
    setUser(null);
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  if (loading) return <div>Loading...</div>; // show spinner/splash screen

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
