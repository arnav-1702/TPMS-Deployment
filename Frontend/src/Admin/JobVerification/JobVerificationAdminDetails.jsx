import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const JobVerificationAdminDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Job ID from URL

  const { job: initialJob, type, companyId } = state || {};
  const [job, setJob] = useState(initialJob || null);
  const [loading, setLoading] = useState(!initialJob);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const handleApprove = async () => {
    try {
      setLoading(true);
      await axios.put(
        `/job/admin/approve/${job._id}`,
        {},
        { headers }
      );
      alert("Job approved successfully!");
      navigate("/job-verification");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve job");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await axios.put(
        `/job/admin/reject/${job._id}`,
        {},
        { headers }
      );
      alert("Job rejected successfully!");
      navigate("/job-verification");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/job/admin/delete/${job._id}`,
        { headers }
      );
      alert("Job deleted successfully!");
      navigate("/job-verification");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-6">
          {/* Job Details */}
          <div className="bg-white shadow rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {job.jobPosition}
                </h2>
                <p className="text-gray-600 mt-2">
                  {job.companyDetails?.companyName ||
                    job.companyName ||
                    "Unknown Company"}
                </p>
                <p className="text-gray-500">Location: {job.location}</p>
                <p className="text-gray-500">
                  Experience Required: {job.experienceRequired}
                </p>
                <p className="text-gray-500">Work Type: {job.workType}</p>
                <p className="text-gray-500">
                  Salary: {job.salaryBudget || "Not Disclosed"}
                </p>
                <p className="text-gray-500">
                  Urgency status: {job.urgencyStatus || "Not Disclosed"}
                </p>
              </div>

              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={
                    job.companyDetails?.companyName ||
                    job.companyName ||
                    "Company Logo"
                  }
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                (job.companyDetails?.companyName || job.companyName) && (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                    {(job.companyDetails?.companyName ||
                      job.companyName)[0]}
                  </div>
                )
              )}
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
              {type === "pending" ? (
                <>
                  <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete Job
                  </button>
                  <p className="text-gray-700 text-lg flex items-center">
                    Applicants:{" "}
                    <span className="ml-2 font-bold">
                      {job.openingsCount || 0}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* See Applicants button - only if job.isValid */}
          {job.isValid && (
            <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Applicants</h3>
              <button
                onClick={() =>
                  navigate(`/job-applicants/${job._id}`, {
                    state: { jobId: job._id },
                  })
                }
                className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
              >
                See Applicants
              </button>
            </div>
          )}

          {/* Additional Details */}
          {job.jobDescription && (
            <DetailCard title="Job Description" content={job.jobDescription} />
          )}
          {job.skills?.length > 0 && (
            <DetailCard
              title="Skills Required"
              content={job.skills.join(", ")}
            />
          )}
          {job.keyQualities && (
            <DetailCard title="Key Qualities" content={job.keyQualities} />
          )}
          {job.companyDetails?.description && (
            <DetailCard
              title="Company Description"
              content={job.companyDetails.description}
            />
          )}
          {job.companyDetails?.careerGrowth && (
            <DetailCard
              title="Career Growth"
              content={job.companyDetails.careerGrowth}
            />
          )}
          {job.companyDetails?.culture && (
            <DetailCard
              title="Culture"
              content={job.companyDetails.culture}
            />
          )}
          {job.companyDetails?.disclaimer && (
            <DetailCard
              title="Disclaimer"
              content={job.companyDetails.disclaimer}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DetailCard = ({ title, content }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-700 text-sm">{content}</p>
  </div>
);

export default JobVerificationAdminDetails;
