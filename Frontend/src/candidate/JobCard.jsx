import React from "react";
function JobCard({ title, icon, companyName }) {
  return (
    <div className="bg-[#e9ebfd] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow w-full">
      {/* Icon Container */}
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>
      {/* Title */}
      <h3 className="text-lg font-semibold text-[#2D336B] mb-2">{title}</h3>
      {/* Company Name */}
      <p className="text-lg font-semibold text-[#2D336B] mb-4">{companyName}</p>
      {/* Open Button */}
      <button className="flex items-center justify-center mx-auto text-black font-medium hover:underline">
        Open
        <img
          src="/assets/rightArrow.png" // <-- replace with your arrow image
          alt="arrow"
          className="w-4 h-4 ml-1"
        />
      </button>
    </div>
  );
}
export default JobCard;