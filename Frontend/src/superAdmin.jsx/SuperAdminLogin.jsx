import React, { useState } from "react";
import axios from "axios";

export default function SuperAdminLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  // 🔹 Dashboard data
  const [jobs, setJobs] = useState([]);

  // ================= LOGIN / LOGOUT =================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/superadmin/login",
        loginData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setIsLoggedIn(true);
      fetchJobs();
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/superadmin/logout",
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setIsLoggedIn(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Logout failed");
    }
  };

  // ================= ADMIN CREATION =================
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/superadmin/create-admin",
        adminData,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setAdminData({ email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Admin creation failed");
    }
  };

  // ================= DASHBOARD DATA =================
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/get-all-jobs", {
        withCredentials: true,
      });
      setJobs(res.data.jobs || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  // ================= ACTIONS =================
  const handleJobValidation = async (jobId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/admin/validate-job",
        { jobId, status },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      fetchJobs();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to validate job");
    }
  };

  // ================= UI =================
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        // ----------- LOGIN FORM -----------
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Super Admin Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          {message && <p className="mt-2 text-center text-red-600">{message}</p>}
        </form>
      ) : (
        // ----------- DASHBOARD -----------
        <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Super Admin Dashboard
          </h2>

          {/* Create Admin */}
          <form onSubmit={handleCreateAdmin} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Create Admin</h3>
            <input
              type="email"
              placeholder="Admin Email"
              value={adminData.email}
              onChange={(e) =>
                setAdminData({ ...adminData, email: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={adminData.password}
              onChange={(e) =>
                setAdminData({ ...adminData, password: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Create Admin
            </button>
          </form>

          {/* Jobs Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Jobs</h3>
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border p-3 mb-3 rounded flex justify-between"
              >
                <div>
                  <p>
                    {job.title} ({job.companyId?.companyName})
                  </p>
                  <p>Status: {job.isValid ? "✅ Approved" : "❌ Not Approved"}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleJobValidation(job._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleJobValidation(job._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </div>
      )}
    </div>
  );
}
