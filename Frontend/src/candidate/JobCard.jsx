import React from "react";

const JobCard = ({ image, title, buttonText, href }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64">
      <img src={image} alt={title} className="h-12 w-12 mb-4 object-contain" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {buttonText && (
        <a
          href={href}
          className="px-4 py-2 text-sm bg-[#2D336B] text-white rounded-lg hover:bg-[#1f244d] transition"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
};

export default JobCard;
