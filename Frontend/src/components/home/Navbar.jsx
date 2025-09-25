// Navbar.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { Bell, Menu, X } from "lucide-react"; 
import { logoutCandidateAPI, logoutCompanyAPI } from "../../services/api";

const Navbar = () => {
  const { role, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (role === "company") {
        await logoutCompanyAPI();
      } else if (role === "candidate") {
        await logoutCandidateAPI();
      }

      localStorage.removeItem("token");
      localStorage.removeItem("candidateId");
      localStorage.removeItem("role");

      logout();
      alert("You have been logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
      navigate("/commonlogin");
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 shadow-sm bg-white relative">
      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="w-20 h-12 bg-[#666565]"></div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        {/* Candidate (logged in OR not) */}
        {(!role || role === "candidate") && (
          <>
            <Link to="/findajob" className="text-[#2D336B] hover:text-blue-600">
              Find a Job
            </Link>
            {!role && (
              <Link
                to="/signupcompany"
                className="text-[#2D336B] hover:text-blue-600"
              >
                For Employers
              </Link>
            )}
          </>
        )}

        {/* Company */}
        {role === "company" && (
          <>
            <Link to="/postajob" className="text-[#2D336B] hover:text-blue-600">
              Post a Job
            </Link>
            <Link to="/applicants" className="text-[#2D336B] hover:text-blue-600">
              Applicants
            </Link>
          </>
        )}

        {/* Admin */}
        {role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="text-[#2D336B] hover:text-blue-600"
          >
            Home
          </Link>
        )}

        {/* Always visible */}
        <Link to="/services" className="text-[#2D336B] hover:text-blue-600">
          Services
        </Link>
        <Link to="/about" className="text-[#2D336B] hover:text-blue-600">
          About Us
        </Link>
      </nav>

      {/* Right Side */}
      <div className="relative flex items-center space-x-4">
        {!role && (
          <Link
            to="/commonlogin"
            className="px-4 py-2 rounded-md bg-[#2D336B] text-white hover:bg-[#3f4a8a]"
          >
            Login
          </Link>
        )}

        {role && (
          <>
            {/* Bell Icon */}
            <button className="relative focus:outline-none">
              <Bell className="w-6 h-6 text-[#2D336B]" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-12 h-12 bg-[#2D336B] rounded-full flex items-center justify-center text-white text-lg">
                  {user?.name?.[0] || "A"}
                </div>
                <span className="hidden sm:inline text-[#2D336B] font-medium">
                  {user?.name || "User"}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#E8EDFF] shadow-lg rounded-md overflow-hidden z-20">
                  <div className="px-4 py-3 bg-[#2D336B] text-white font-semibold">
                    {role === "company"
                      ? user?.companyName || "Company"
                      : user?.name}
                  </div>

                  <ul className="divide-y divide-gray-200">
                    {role === "candidate" && (
                      <>
                        <li>
                          <Link
                            to="/appliedjobs"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Applied Jobs
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/contact"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Contact Us
                          </Link>
                        </li>
                      </>
                    )}

                    {role === "company" && (
                      <>
                        <li>
                          <span className="block px-4 py-3 font-medium text-gray-700">
                            Admin: {user?.name}
                          </span>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/jobverification"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Job Verifications
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/contact"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/company/shortlistcandidate"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Shortlisted Candidates
                          </Link>
                        </li>
                      </>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#2D336B]"
          onClick={() => setMobileNav(!mobileNav)}
        >
          {mobileNav ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {mobileNav && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-20">
          <ul className="flex flex-col space-y-4 px-6 py-4 text-lg font-medium">
            {/* Candidate */}
            {(!role || role === "candidate") && (
              <>
                <li>
                  <Link to="/findajob" onClick={() => setMobileNav(false)}>
                    Find a Job
                  </Link>
                </li>
                {!role && (
                  <li>
                    <Link
                      to="/signupcompany"
                      onClick={() => setMobileNav(false)}
                    >
                      For Employers
                    </Link>
                  </li>
                )}
              </>
            )}

            {/* Company */}
            {role === "company" && (
              <>
                <li>
                  <Link to="/postajob" onClick={() => setMobileNav(false)}>
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/applicants" onClick={() => setMobileNav(false)}>
                    Applicants
                  </Link>
                </li>
              </>
            )}

            {/* Admin */}
            {role === "admin" && (
              <li>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileNav(false)}
                >
                  Home
                </Link>
              </li>
            )}

            {/* Always visible */}
            <li>
              <Link to="/services" onClick={() => setMobileNav(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileNav(false)}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
