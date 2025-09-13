import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const AppliedJobDetails = () => {
  const { state } = useLocation(); // ✅ job + status passed from AppliedJobCard
  const navigate = useNavigate();

  if (!state || !state.job) {
    return <p className="p-6 text-red-600">No job details found.</p>;
  }

  const { job, status } = state;

  const displayField = (field) => (field ? field : "N/A");
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  // Ensure skills and keyQualities are arrays
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
        {/* Job Header */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {displayField(job.jobPosition)}
              </h2>
              <p className="text-gray-600 text-base mt-1">
                {job.companyName || job.companyId?.companyName}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Domain: {displayField(job.domain)} | Experience:{" "}
                {displayField(job.experienceRequired)} | Work Type:{" "}
                {displayField(job.workType)} | Salary:{" "}
                {job.salaryBudget ? `₹${job.salaryBudget.toLocaleString()}` : "N/A"}
              </p>
              <p className="text-gray-500 text-sm">
                Location: {displayField(job.location)}
              </p>
              <div className="flex space-x-6 text-gray-500 text-sm mt-2">
                <span>Posted: {formatDate(job.postedDate)}</span>
                <span>Openings: {displayField(job.openings)}</span>
              </div>

              {/* Status */}
              <p className="mt-3 text-sm font-medium">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    status === "approved"
                      ? "bg-green-200 text-green-800"
                      : status === "rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {status}
                </span>
              </p>
            </div>

            {/* Company Logo */}
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
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {displayField(job.jobDescription)}
          </p>
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
          <p className="text-gray-700 text-sm mb-2">
            {displayField(job.companyId?.description)}
          </p>

          <h4 className="font-semibold text-lg mt-4">
            Career Growth and Development
          </h4>
          <p className="text-gray-700 text-sm mb-2">
            {displayField(job.companyId?.careerGrowth)}
          </p>

          <h4 className="font-semibold text-lg mt-4">Work Culture</h4>
          <p className="text-gray-700 text-sm">
            {displayField(job.companyId?.culture)}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-200 text-gray-700 px-5 py-2 rounded-md shadow hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default AppliedJobDetails;
