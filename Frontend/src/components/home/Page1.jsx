"use client";

import React, { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";

// Import React Icons
import { MdWorkOutline } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

// ✅ Import images (if stored in src/assets/)
import CandidateImg from "../../../assets/page1.png";
import CompanyImg from "../../../assets/page1company.jpg";

const Page1 = () => {
  const { role } = useContext(AuthContext);

  // Candidate Page
  const renderCandidatePage = () => (
    <section className="px-8 py-16 lg:px-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Text Section */}
        <div className="lg:pr-8">
          <h1 className="text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
            Find your <span className="text-[#2D336B]">Dream</span>
            <br />
            Job
          </h1>
          <p className="text-[#A9B5DF] mb-10 text-xl max-w-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-[#FFF2F2] rounded-full shadow-lg px-6 py-2 border border-gray-200 flex-wrap gap-y-4">
            {/* Job Title / Keywords */}
            <div className="flex items-center flex-[1.5] min-w-[200px]">
              <MdWorkOutline className="text-gray-500 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Job Title, Keywords"
                className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-gray-500"
              />
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-400 mx-6 hidden lg:block"></div>

            {/* Location */}
            <div className="flex items-center flex-1">
              <GoLocation className="text-gray-500 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-gray-500"
              />
              <IoIosArrowDown className="w-5 h-5 text-gray-500 ml-2" />
            </div>

            {/* Find Job Button */}
            <button className="ml-6 px-6 py-3 bg-[#7886C7] text-white rounded-full flex items-center gap-2 hover:bg-indigo-600 transition-colors font-medium text-base shadow-md">
              Find Job
              <FiSearch className="w-4 h-4" />
            </button>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="mt-8 text-3xl font-semibold text-black mb-6">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Designer", "Writer", "Web Developer", "Team Leader", "Tester"].map((item) => (
                <span
                  key={item}
                  className="px-6 py-3 bg-[#A9B5DF] text-[#2D336B] rounded-full text-sm font-medium hover:bg-[#7886C7] hover:text-white cursor-pointer transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-4xl">
            <img
              src={CandidateImg}
              alt="Job search illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );

  // Company Page
  const renderCompanyPage = () => (
    <section className="px-6 py-16 lg:px-16 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Text Section */}
        <h1
          className="text-5xl lg:text-6xl font-bold mb-6 leading-snug"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Find your{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #2D336B, #7886C7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dream Candidate
          </span>
        </h1>

        <p className="text-[#A9B5DF] mb-10 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Nam porttitor est vitae leo ullamcorper,
          at tristique lacus ultricies. Vivamus porta, nibh vel convallis gravida, sapien
          lorem convallis erat, nec.
        </p>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={CompanyImg}
            alt="Hiring illustration"
            className="w-full max-w-2xl h-auto"
          />
        </div>
      </div>
    </section>
  );

  // Default to candidate page if not logged in
  return <div>{role === "company" ? renderCompanyPage() : renderCandidatePage()}</div>;
};

export default Page1;