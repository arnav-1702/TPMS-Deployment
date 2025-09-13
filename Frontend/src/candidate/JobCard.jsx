import React from "react";

function JobCard({ title, companyName, logo }) {
  return (
    <div className="bg-[#e9ebfd] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow w-full">
      {/* Logo Container */}
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
        <img
          src={logo || "/assets/default-logo.png"} // fallback if logo missing
          alt={`${companyName} Logo`}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#2D336B] mb-2">{title}</h3>

      {/* Company Name */}
      <p className="text-lg font-semibold text-[#2D336B] mb-4">{companyName}</p>

      {/* Open Button */}
      <button className="flex items-center justify-center mx-auto text-black font-medium hover:underline">
        Open
        <img
          src="/assets/rightArrow.png"
          alt="arrow"
          className="w-4 h-4 ml-1"
        />
      </button>
    </div>
  );
}

export default JobCard;
