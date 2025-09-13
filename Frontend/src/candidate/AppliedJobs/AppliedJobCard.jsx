import Navbar from "@/components/home/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
function AppliedJobCard({ application }) {
  const navigate = useNavigate();

  // ✅ safely destructure
  if (!application || !application.job) {
    return null; // or a skeleton loader
  }

  const { job, status } = application;

  return (
    
    <div className="bg-[#e9ebfd] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow w-full">
      {/* Logo */}
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
        <img
          src={job.companyLogo || "/assets/default-logo.png"}
          alt={`${job.companyName || "Company"} Logo`}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Job Info */}
      <h3 className="text-lg font-semibold text-[#2D336B] mb-2">{job.jobPosition}</h3>
      <p className="text-lg font-semibold text-[#2D336B] mb-2">{job.companyName}</p>

      {/* Status */}
      <p className="text-sm font-medium mb-4">
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

      {/* Open */}
      
<button
  onClick={() =>
    navigate(`/applied-job/${job._id}`, { state: { job, status } })
  }
  className="flex items-center justify-center mx-auto text-[#2D336B] font-medium hover:underline"
>
  Open
  <ArrowRight className="w-4 h-4 ml-2" />
</button>
    </div>
  );
}

export default AppliedJobCard;
