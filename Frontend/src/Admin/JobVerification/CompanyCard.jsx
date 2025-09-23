// src/components/CompanyCard.jsx
import { ArrowRight } from "lucide-react";

const CompanyCard = ({ company, onClick }) => {
  // Handle both company and job objects
  const companyName = company.companyName || company.companyId?.companyName || "Unknown Company";
  const displayLetter = companyName[0]?.toUpperCase() || "C";

  return (
    <div
      onClick={onClick}
      className="bg-[#C5C9FF80] rounded-[1.5rem] p-6 w-48 h-56 flex flex-col shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#2d336b] font-bold text-xl">
          {displayLetter}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-[#2d336b] text-lg font-semibold mb-4 text-center">
          {companyName}
        </h3>
        <div className="text-[#2d336b] font-medium flex items-center gap-2">
          Open
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;