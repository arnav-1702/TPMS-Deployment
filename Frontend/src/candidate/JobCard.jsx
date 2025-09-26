import React from "react";
import { FiArrowRight } from "react-icons/fi"; // ⬅️ arrow icon
import { useNavigate } from "react-router-dom";

function JobCard({ id, title, companyName, logo }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all w-[85%] h-72 border border-gray-100">
      {/* Logo Container */}
      <div className="w-16 h-16 bg-[#f5f7ff] overflow-hidden flex items-center justify-center mx-auto mb-6 shadow-sm rounded-lg">
        <img
          src={logo || "/assets/default-logo.png"} // fallback if logo missing
          alt={`${companyName} Logo`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#2D336B] mb-2">{title}</h3>

      {/* Company Name */}
      <p className="text-base font-medium text-gray-600 mb-6">{companyName}</p>

      {/* Open Button */}
      <button
        onClick={() => navigate(`/findajob/${id}`)}
        className="flex items-center justify-center mx-auto text-[#2D336B] font-semibold hover:text-indigo-600 transition-colors"
      >
        Open
        <FiArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}

export default JobCard;
