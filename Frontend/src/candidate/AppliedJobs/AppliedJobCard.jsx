import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function AppliedJobCard({ application }) {
  const navigate = useNavigate();

  if (!application || !application.job) {
    return null; // or a skeleton loader
  }

  const { job, status } = application;

  return (
    <div
      className="bg-[#C5C9FF80] rounded-[1.5rem] p-4 w-48 h-64 flex flex-col shadow-lg cursor-pointer"
      onClick={() => navigate(`/applied-job/${job._id}`, { state: { job, status } })}
    >
      {/* Logo Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-20 h-20 bg-white rounded-[1.25rem] flex items-center justify-center">
          <img
            src={job.companyLogo || "/assets/default-logo.png"}
            alt={`${job.companyName || "Company"} Logo`}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Job Info + Status */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-[#2d336b] text-lg font-semibold leading-tight break-words mb-1">
          {job.jobPosition}
        </h3>
        <p className="text-sm text-[#2d336b] font-medium mb-2">
          {job.companyName}
        </p>

        <p
          className={`text-xs font-medium mb-2 px-2 py-1 rounded ${
            status === "approved"
              ? "bg-green-200 text-green-800"
              : status === "rejected"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {status}
        </p>

        {/* Open Row */}
        <div className="text-[#2d336b] font-medium flex items-center gap-2">
          Open
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default AppliedJobCard;
