// src/candidate/JobDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { HiArrowLeft } from "react-icons/hi"; // ✅ correct import

const JobDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://tpms-live.onrender.com/job/getjob/${id}`, {
          withCredentials: true,
        });
        setJob(response.data);

        // ✅ check candidate applications from localStorage
        const candidate = JSON.parse(localStorage.getItem("candidate"));
        if (candidate && Array.isArray(candidate.applications)) {
          const alreadyApplied = candidate.applications.some(
            (app) => app.jobId === id
          );
          setHasApplied(alreadyApplied);
        }
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

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!job) return <p className="p-6">Loading...</p>;

  const displayField = (field) => (field ? field : "N/A");
  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString() : "N/A");

  const skillsArray = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === "string"
    ? job.skills.split(",").map((s) => s.trim())
    : [];

  const keyQualitiesArray = Array.isArray(job.keyQualities)
    ? job.keyQualities
    : typeof job.keyQualities === "string"
    ? job.keyQualities.split(",").map((q) => q.trim())
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* ✅ Back Button */}
        <button
          onClick={() => navigate("/findajob")}
          className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <HiArrowLeft className="text-lg" />
          Back to Jobs
        </button>

        {/* Job Header */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{displayField(job.jobPosition)}</h2>
              <p className="text-gray-600 text-base mt-1">
                {job.companyId?.companyName || displayField(job.companyName)}
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

            {/* Company Logo & Apply Button */}
            <div className="flex flex-col items-center mt-4 md:mt-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt="Company Logo"
                  className="h-20 w-20 object-contain rounded-md shadow"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500 text-xs">Logo</span>
                </div>
              )}

              {hasApplied ? (
                <button
                  disabled
                  className="mt-4 bg-gray-400 text-white px-5 py-2 rounded-md shadow cursor-not-allowed"
                >
                  Already Applied
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/job/${id}/apply`, {
                      state: { companyId: job?.companyId?._id },
                    })
                  }
                  className="mt-4 bg-indigo-500 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-600 transition"
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <p className="text-gray-700 text-sm whitespace-pre-line">{displayField(job.jobDescription)}</p>
        </div>

        {/* Skills */}
        {skillsArray.length > 0 && (
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {skillsArray.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Qualities */}
        {keyQualitiesArray.length > 0 && (
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Key Qualities</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {keyQualitiesArray.map((quality, idx) => (
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
