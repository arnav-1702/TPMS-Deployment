import React, { useEffect, useState } from "react";
import axios from "axios";

const JobCards = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost:8000/job/getjobs", {
      withCredentials: true, // 👈 send cookies automatically
    })
    .then((res) => setJobs(res.data))
    .catch((err) => console.error(err));
}, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-[#E7E7FB] rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
        >
          {/* Company Logo */}
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm overflow-hidden">
            <img
              src={job.companyId?.logo || "/assets/default.png"}
              alt={job.companyId?.companyName || "Company"}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Job Title */}
          <h3 className="font-semibold text-[#2D336B] mb-2 text-lg">
            {job.jobPosition}
          </h3>

          {/* Company Name */}
          <p className="text-sm text-gray-600 mb-1">
            {job.companyId?.companyName || "Unknown Company"}
          </p>

          {/* Location */}
          <p className="text-sm text-gray-500 mb-3">{job.location}</p>

          {/* Extra details */}
          <p className="text-xs text-gray-500 mb-2">
            {job.experienceRequired || "Experience not specified"}
          </p>
          <p className="text-xs text-gray-500">
            {job.workType || "Work type not specified"}
          </p>

          {/* Apply button */}
          <button className="mt-4 mx-auto text-black font-medium flex items-center gap-2 hover:underline">
            Apply
            <img
              src="/assets/rightArrow.png"
              alt="arrow"
              className="w-4 h-4 object-contain"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
