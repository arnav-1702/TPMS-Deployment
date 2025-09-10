"use client";

import React, { useContext } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { AuthContext } from "../../../Authentication/AuthProvider"; // adjust path if needed

const Page1 = () => {
  const { role } = useContext(AuthContext);

  return (
    <div>
      {/* Candidate Page */}
      {role === "candidate" && (
        <section className="px-8 py-16 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:pr-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                Find your <span className="text-[#2D336B]">Dream</span>
                <br />
                Job
              </h1>
              <p className="text-[#666565] mb-10 text-xl max-w-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Search Bar */}
              <div className="flex items-center bg-[#FFF2F2] rounded-full shadow-lg px-4 py-2 mb-10 w-full max-w-4xl border border-gray-100">
                <div className="flex items-center flex-1">
                  <Briefcase className="text-[#666565] w-5 h-5 mr-3" />
                  <input
                    type="text"
                    placeholder="Job Title, Keywords"
                    className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-[#666565]"
                  />
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-300 mx-6"></div>

                {/* Location Input */}
                <div className="flex items-center flex-1">
                  <MapPin className="text-[#666565] w-5 h-5 mr-3" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="bg-transparent outline-none text-gray-700 w-full text-lg placeholder-[#666565]"
                  />
                </div>

                {/* Find Job Button */}
                <button className="ml-6 px-8 py-3 bg-[#7886C7] text-white rounded-xl flex items-center gap-2 hover:bg-[#2D336B] transition-colors font-medium text-lg shadow-md">
                  Find Job
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Popular Searches */}
              <div>
                <h3 className="text-xl font-semibold text-black mb-6">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Designer",
                    "Writer",
                    "Web Developer",
                    "Team Leader",
                    "Tester",
                  ].map((item) => (
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

            {/* Candidate Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-3xl">
                <img
                  src="/assets/glass.png"
                  alt="Job search illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Company Page */}
      {role === "company" && (
        <section className="px-8 py-16 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:pr-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                Find your <span className="text-[#2D336B]">Dream</span>
                <br />
                Candidate
              </h1>
              <p className="text-[#666565] mb-10 text-xl max-w-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam
                porttitor est vitae leo ullamcorper, at tristique lacus
                ultricies.
              </p>

              <button className="px-10 py-4 bg-[#7886C7] text-white rounded-xl hover:bg-[#2D336B] transition-colors font-medium text-lg shadow-md">
                Post a Job
              </button>
            </div>

            {/* Company Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-3xl">
                <img
                  src="/assets/company.png" // 👈 update with your uploaded company illustration
                  alt="Company hiring illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page1;