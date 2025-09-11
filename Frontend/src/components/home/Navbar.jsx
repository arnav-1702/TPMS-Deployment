// Navbar.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { Bell } from "lucide-react"; // ✅ Bell icon
import { logoutCandidateAPI, logoutCompanyAPI } from "../../services/api";

const Navbar = () => {
  const { role, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // now logout handles API + cleanup
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 shadow-sm bg-white">
      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="w-20 h-12 bg-[#666565]"></div>
      </div>

      {/* Middle Nav Links */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        <Link to="/" className="text-[#2D336B] hover:text-blue-600">
          Home
        </Link>

        {/* Candidate (logged in OR not) */}
        {(!role || role === "candidate") && (
          <>
            <Link to="/jobcards" className="text-[#2D336B] hover:text-blue-600">
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
            <Link to="/about" className="text-[#2D336B] hover:text-blue-600">
              About Us
            </Link>
          </>
        )}

        {/* Company (only logged in) */}
        {role === "company" && (
          <>
            <Link to="/post-job" className="text-[#2D336B] hover:text-blue-600">
              Post a Job
            </Link>
            <Link
              to="/applicants"
              className="text-[#2D336B] hover:text-blue-600"
            >
              Applicants
            </Link>
            <Link to="/about" className="text-[#2D336B] hover:text-blue-600">
              About Us
            </Link>
          </>
        )}
      </nav>

      {/* Right Side */}
      <div className="relative flex items-center space-x-4">
        {/* Not logged in */}
        {!role && (
          <Link
            to="/commonlogin"
            className="px-4 py-2 rounded-md bg-[#2D336B] text-white hover:bg-[#3f4a8a]"
          >
            Login
          </Link>
        )}

        {/* Logged in */}
        {role && (
          <>
            {/* Bell Icon for Messages/Notifications */}
            <button className="relative focus:outline-none">
              <Bell className="w-6 h-6 text-[#2D336B]" />
              {/* Notification Dot (optional) */}
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

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#E8EDFF] shadow-lg rounded-md overflow-hidden z-20">
                  {/* Header */}
                  <div className="px-4 py-3 bg-[#2D336B] text-white font-semibold">
                    {role === "company"
                      ? user?.companyName || "Company"
                      : user?.name}
                  </div>

                  {/* Menu Items */}
                  <ul className="divide-y divide-gray-200">
                    {role === "candidate" && (
                      <>
                        <li>
                          <Link
                            to="/applied-jobs"
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
                            to="/verifications"
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
                            to="/shortlisted"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            Shortlisted Candidates
                          </Link>
                        </li>
                      </>
                    )}

                    {/* Logout */}
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
      </div>
    </header>
  );
};

export default Navbar;
