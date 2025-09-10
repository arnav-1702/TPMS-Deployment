import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuperAdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/jobs", {
        withCredentials: true,
      });
      setJobs(res.data.jobs);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  // 🔹 Fetch all companies
  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:8000/company/all", {
        withCredentials: true,
      });
      setCompanies(res.data.companies || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch companies");
    }
  };

  // 🔹 Fetch all candidates & applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8000/candidate/all", {
        withCredentials: true,
      });
      const apps = res.data.candidates.flatMap((c) =>
        c.applications.map((app) => ({
          ...app,
          candidateId: c._id,
          candidateEmail: c.email,
        }))
      );
      setApplications(apps);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch applications");
    }
  };

  // 🔹 Approve/Reject Job
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

  // 🔹 Approve/Reject Company
  const handleCompanyApproval = async (companyId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/admin/approve-company",
        { companyId, status },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      fetchCompanies();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to approve company");
    }
  };

  // 🔹 Review Application
  const handleApplicationReview = async (candidateId, jobId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/admin/review-application",
        { candidateId, jobId, status },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      fetchApplications();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to review application");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Super Admin Dashboard
      </h1>

      {message && (
        <p className="text-center text-blue-600 font-semibold">{message}</p>
      )}

      {/* Jobs Section */}
      <div className="bg-white shadow-lg p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Jobs</h2>
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-3 mb-3 rounded flex justify-between"
          >
            <div>
              <p>
                <strong>{job.title}</strong> ({job.companyId?.companyName})
              </p>
              <p>Status: {job.isValid ? "✅ Approved" : "❌ Pending"}</p>
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

      {/* Companies Section */}
      <div className="bg-white shadow-lg p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Companies</h2>
        {companies.map((company) => (
          <div
            key={company._id}
            className="border p-3 mb-3 rounded flex justify-between"
          >
            <div>
              <p>
                <strong>{company.companyName}</strong>
              </p>
              <p>Status: {company.isApproved ? "✅ Approved" : "❌ Pending"}</p>
            </div>
            <div>
              <button
                onClick={() => handleCompanyApproval(company._id, "approved")}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleCompanyApproval(company._id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Applications Section */}
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Applications</h2>
        {applications.map((app, idx) => (
          <div
            key={idx}
            className="border p-3 mb-3 rounded flex justify-between"
          >
            <div>
              <p>
                <strong>Candidate:</strong> {app.candidateEmail}
              </p>
              <p>
                <strong>Job ID:</strong> {app.jobId}
              </p>
              <p>Status: {app.status}</p>
            </div>
            <div>
              <button
                onClick={() =>
                  handleApplicationReview(app.candidateId, app.jobId, "approved")
                }
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleApplicationReview(app.candidateId, app.jobId, "rejected")
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
