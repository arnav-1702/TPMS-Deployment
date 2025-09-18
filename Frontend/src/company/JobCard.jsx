import React from "react";
import { ArrowRight } from "lucide-react"; // ✅ using lucide-react arrow

const JobCard = ({ job, onClick }) => (
  <div
    className="bg-[#C5C9FF80] rounded-[1.5rem] p-4 w-48 h-64 flex flex-col shadow-lg cursor-pointer"
    onClick={() => onClick(job)}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className="w-20 h-20 bg-white rounded-[1.25rem] flex items-center justify-center">
        <img src={job.icon} alt="Job Icon" className="w-10 h-10" />
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center">
      <h3 className="text-[#2d336b] text-lg font-semibold mb-4 text-center leading-tight break-words">
        {job.title}
      </h3>
      <div className="text-[#2d336b] font-medium flex items-center gap-2">
        {job.status === "active" ? "Open" : "Closed"}
        <ArrowRight className="w-4 h-4" /> {/* ✅ replaced image */}
      </div>
    </div>
  </div>
);

export default JobCard;
