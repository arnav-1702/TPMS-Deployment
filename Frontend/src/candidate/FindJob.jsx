// src/candidate/FindJob.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobCard from "./JobCard";
import Footer from "../components/home/Footer.jsx";
import Navbar from "../components/home/Navbar.jsx";

// React Icons
import { FiSearch, FiMapPin } from "react-icons/fi";

export default function FindJob() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [domains, setDomains] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    company: "All Companies",
    domain: "All Domains",
    date: "Anytime",
  });

  const navigate = useNavigate();

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/job/getjobs", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setJobs(response.data);
        setFilteredJobs(response.data);

        // Extract companies & domains for dropdowns
        const uniqueCompanies = [
          ...new Set(
            response.data.map((j) => j.companyId?.companyName).filter(Boolean)
          ),
        ];
        const uniqueDomains = [
          ...new Set(response.data.map((j) => j.domain).filter(Boolean)),
        ];
        setCompanies(uniqueCompanies);
        setDomains(uniqueDomains);
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
      }
    };
    fetchJobs();
  }, []);

  // Handle job card click
  const handleCardClick = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      navigate(`/findajob/${jobId}`, { state: { companyId: job.companyId?._id } });
    }
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = jobs;

    // Search by job title
    if (filters.search.trim()) {
      filtered = filtered.filter((j) =>
        j.jobPosition?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by location
    if (filters.location.trim()) {
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by company
    if (filters.company !== "All Companies") {
      filtered = filtered.filter((j) => j.companyId?.companyName === filters.company);
    }

    // Filter by domain
    if (filters.domain !== "All Domains") {
      filtered = filtered.filter((j) => j.domain === filters.domain);
    }

    // Filter by posted date
    if (filters.date !== "Anytime") {
      const now = new Date();
      let cutoff = null;

      if (filters.date === "Last 24 hours") {
        cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      } else if (filters.date === "Last 7 days") {
        cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (filters.date === "Last 30 days") {
        cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      if (cutoff) {
        filtered = filtered.filter((j) => new Date(j.postedDate) >= cutoff);
      }
    }

    setFilteredJobs(filtered);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      company: "All Companies",
      domain: "All Domains",
      date: "Anytime",
    });
    setFilteredJobs(jobs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="px-3 py-15 text-center mx-auto">
        <div className="lg:pr-8">
          <h1 className="text-6xl lg:text-8xl font-bold text-black mb-6 leading-tight">
            Find your <span className="text-[#2D336B]">Dream Job</span>
          </h1>
          <p className="text-[#2D336B] mb-10 text-2xl max-w-lg leading-relaxed mx-auto text-center">
            Browse and filter jobs by company, domain, location, or keywords.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#FFF2F2] rounded-full shadow-lg px-6 py-2 border border-gray-200 max-w-4xl mx-auto mb-16">
          {/* Job Title / Keywords */}
          <div className="flex items-center flex-[1.5] min-w-[200px]">
            <FiSearch className="w-5 h-5 mr-3 text-gray-500" />
            <input
              type="text"
              placeholder="Job Title, Keywords"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-gray-500"
            />
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-400 mx-6"></div>

          {/* Location */}
          <div className="flex items-center flex-1">
            <FiMapPin className="w-5 h-5 mr-3 text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="bg-transparent outline-none text-gray-700 w-full text-base placeholder-gray-500"
            />
          </div>

          {/* Find Job Button */}
          <button
            onClick={applyFilters}
            className="ml-6 px-6 py-3 bg-[#7886C7] text-white rounded-full flex items-center gap-2 hover:bg-indigo-600 transition-colors font-medium text-base shadow-md"
          >
            Find Job <FiSearch className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 mb-10">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {/* Company Filter */}
          <select
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option>All Companies</option>
            {companies.map((c, idx) => (
              <option key={idx}>{c}</option>
            ))}
          </select>

          {/* Domain Filter */}
          <select
            value={filters.domain}
            onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option>All Domains</option>
            {domains.map((d, idx) => (
              <option key={idx}>{d}</option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option>Anytime</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>

          {/* Buttons */}
          <button
            onClick={applyFilters}
            className="px-6 py-2 bg-[#7886C7] text-white rounded-md shadow hover:bg-indigo-600"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-[#9CA3DB] text-white rounded-md shadow hover:bg-indigo-700"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Job Cards */}
      <section className="px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8  mb-16">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => handleCardClick(job._id)}
                className="cursor-pointer"
              >
                <JobCard
                  title={job.jobPosition}
                  companyName={job.companyId?.companyName || "Unknown Company"}
                  logo={
                    job.companyLogo ||
                    job.companyId?.companyLogo ||
                    "/assets/default-logo.png"
                  }
                />
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">No jobs found</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
