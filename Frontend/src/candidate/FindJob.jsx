// src/candidate/FindJob.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobCard from "./JobCard";
import Footer from "../components/home/Footer.jsx";
import Navbar from "../components/home/Navbar.jsx";

export default function FindJob() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/job/getjobs", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log("Fetched jobs:", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
      }
    };
    fetchJobs();
  }, []);

  const handleCardClick = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      console.log("Navigating to job ID:", jobId, "Job:", job);
      navigate(`/job-detail/${jobId}`, { state: { companyId: job.companyId?._id } });
    } else {
      console.error("Job not found in list:", jobId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-3 py-15 text-center mx-auto">
        <div className="lg:pr-8">
          <h1 className="text-6xl lg:text-8xl font-bold text-black mb-6 leading-tight">
            Find your <span className="text-[#2D336B]">Dream Job</span>
          </h1>
          <p className="text-[#2D336B] mb-10 text-2xl max-w-lg leading-relaxed mx-auto text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#FFF2F2] rounded-full shadow-lg px-6 py-2 border border-gray-200 max-w-4xl mx-auto mb-16">
          {/* Job Title / Keywords */}
          <div className="flex items-center flex-[1.5] min-w-[200px]">
            <img src="/assets/search.png" alt="Job" className="w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Job Title, Keywords"
              className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-gray-500"
            />
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-400 mx-6"></div>

          {/* Location */}
          <div className="flex items-center flex-1">
            <img src="/assets/location.png" alt="Location" className="w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Location"
              className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-gray-500"
            />
            <img src="/assets/dropdown.png" alt="Dropdown" className="w-5 h-5 ml-2" />
          </div>

          {/* Find Job Button */}
          <button className="ml-6 px-6 py-3 bg-[#7886C7] text-white rounded-full flex items-center gap-2 hover:bg-indigo-600 transition-colors font-medium text-base shadow-md">
            Find Job
            <img src="/assets/searchinbutton.png" alt="Search" className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Job Cards */}
      <section className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => handleCardClick(job._id)}
                className="cursor-pointer"
              >
                <JobCard
                  title={job.jobPosition}
                  companyName={job.companyId?.companyName || "Unknown Company"}
                  // Pass companyLogo to JobCard
                  logo={job.companyLogo || job.companyId?.companyLogo || "/assets/default-logo.png"}
                />
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">No jobs available or login required</div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
