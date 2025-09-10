// Navbar.js
import React, { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";

const Navbar = () => {
  const { role, logout } = useContext(AuthContext);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-16 py-6 shadow-sm">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-20 h-12 bg-[#666565]"></div>
        </div>

        {/* Navigation - Centered */}
        <nav className="hidden md:flex space-x-12 text-2xl">
          <a href="#" className="text-[#2D336B] font-medium">
            Home
          </a>

          {/* Candidate Navbar */}
          {role === "candidate" && (
            <>
              <a href="#" className="text-[#2D336B] font-medium">
                Find a Job
              </a>
              <a href="#" className="text-[#2D336B] font-medium">
                Companies
              </a>
              <a href="#" className="text-[#2D336B] font-medium">
                About Us
              </a>
            </>
          )}

          {/* Company Navbar */}
          {role === "company" && (
            <>
              <a href="#" className="text-[#2D336B] font-medium">
                Post a Job
              </a>
              <a href="#" className="text-[#2D336B] font-medium">
                Applicants
              </a>
              <a href="#" className="text-[#2D336B] font-medium">
                About Us
              </a>
            </>
          )}
        </nav>

        {/* Avatar / Notification */}
        <div className="flex items-center space-x-6">
          {/* Candidate Notification Bell */}
          {role === "candidate" && (
            <svg
              className="w-7 h-7 text-[#2D336B]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 24c1.1 0 2-.9 2-2H10c0 
                       1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V6c0-.83-.67-1.5-1.5-1.5S10 
                       5.17 10 6v.68C7.14 7.36 5.5 
                       9.92 5.5 13v5l-1.5 1.5V20h16v-.5L18 18z" />
            </svg>
          )}

          {/* Avatar */}
          <div className="w-16 h-16 bg-[#2D336B] rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                       0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* Logout button (visible when logged in as company) */}
          {role === "company" && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;