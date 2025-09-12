// src/candidate/JobDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/job/getjob/${id}`, {
          withCredentials: true,
        });
        setJob(response.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Job not found."
            : "Failed to load job details. Please try again later."
        );
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to apply.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/application/apply",
        { jobId: id, companyId: state?.companyId || job?.companyId?._id },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply. Please try again.");
    }
  };

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!job) return <p className="p-6">Loading...</p>;

  const displayField = (field) => (field ? field : "N/A");
  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString() : "N/A");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Job Header */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{displayField(job.jobPosition)}</h2>
              <p className="text-gray-600 text-base mt-1">
                {job.companyId?.companyName || "Unknown Company"}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Domain: {displayField(job.domain)} | Experience: {displayField(job.experienceRequired)} | 
                Work Type: {displayField(job.workType)} | Salary:{" "}
                {job.salaryBudget ? `₹${job.salaryBudget.toLocaleString()}` : "N/A"}
              </p>
              <p className="text-gray-500 text-sm">Location: {displayField(job.location)}</p>
              <div className="flex space-x-6 text-gray-500 text-sm mt-2">
                <span>Posted: {formatDate(job.postedDate)}</span>
                <span>Openings: {displayField(job.openings)}</span>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-0">
              {job.companyId?.logo ? (
                <img
                  src={job.companyId.logo}
                  alt="Company Logo"
                  className="h-20 w-20 object-contain rounded-md shadow"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500 text-xs">Logo</span>
                </div>
              )}
              <button
                onClick={handleApply}
                className="mt-4 bg-indigo-500 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-600 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <p className="text-gray-700 text-sm whitespace-pre-line">{displayField(job.jobDescription)}</p>
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {job.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Qualities */}
        {job.keyQualities?.length > 0 && (
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Key Qualities</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {job.keyQualities.map((quality, idx) => (
                <li key={idx}>{quality}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Company Info */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Company Description</h3>
          <p className="text-gray-700 text-sm mb-2">{displayField(job.companyId?.description)}</p>

          <h4 className="font-semibold text-lg mt-4">Career Growth and Development</h4>
          <p className="text-gray-700 text-sm mb-2">{displayField(job.companyId?.careerGrowth)}</p>

          <h4 className="font-semibold text-lg mt-4">Work Culture</h4>
          <p className="text-gray-700 text-sm">{displayField(job.companyId?.culture)}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetailsPage;
