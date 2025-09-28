// src/admin/AdminFindJob.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/home/Navbar.jsx";
import Footer from "../../components/home/Footer.jsx";

export default function ActiveJob() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [domains, setDomains] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    domain: "All Domains",
    salary: "Any Salary",
    experience: "Any Experience",
  });

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "/admin/getactivejobs",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // ✅ Fix: access jobs array correctly
        const jobsData = response.data.jobs || [];
        setJobs(jobsData);
        setFilteredJobs(jobsData);

        const uniqueDomains = [
          ...new Set(jobsData.map((j) => j.domain).filter(Boolean)),
        ];
        setDomains(uniqueDomains);
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error.response?.data || error.message
        );
      }
    };
    fetchJobs();
  }, []);

  // Apply filters
  const applyFilters = () => {
    let filtered = jobs;

    if (filters.search.trim()) {
      filtered = filtered.filter((j) =>
        j.jobPosition?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.location.trim()) {
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.domain !== "All Domains") {
      filtered = filtered.filter((j) => j.domain === filters.domain);
    }
    setFilteredJobs(filtered);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      domain: "All Domains",
      salary: "Any Salary",
      experience: "Any Experience",
    });
    setFilteredJobs(jobs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Title */}
      <section className="px-6 py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Search Active Jobs on Website
        </h1>
      </section>

      {/* Search Bar */}
      <section className="px-6 mb-6">
        <div className="flex items-center bg-[#FBECEC] rounded-full shadow-md px-6 py-3 border max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Job Title, Keywords"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
          <div className="w-px h-6 bg-gray-300 mx-4"></div>
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
          <button
            onClick={applyFilters}
            className="ml-4 px-5 py-2 bg-[#7886C7] text-white rounded-full hover:bg-indigo-600 transition"
          >
            Find Job
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-10">
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Domain Filter */}
          <select
            value={filters.domain}
            onChange={(e) =>
              setFilters({ ...filters, domain: e.target.value })
            }
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option>All Domains</option>
            {domains.map((d, idx) => (
              <option key={idx}>{d}</option>
            ))}
          </select>

          {/* Salary Filter (dummy for now) */}
          <select
            value={filters.salary}
            onChange={(e) =>
              setFilters({ ...filters, salary: e.target.value })
            }
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option>Any Salary</option>
            <option>0-5 LPA</option>
            <option>5-10 LPA</option>
            <option>10+ LPA</option>
          </select>

          {/* Experience Filter (dummy for now) */}
          <select
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option>Any Experience</option>
            <option>Fresher</option>
            <option>1-3 Years</option>
            <option>3+ Years</option>
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

      {/* Job Listings */}
      <section className="px-8">
        <h2 className="text-xl font-semibold mb-6">Job Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#F2F2FF] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <img
                  src={
                    job.companyLogo ||
                    job.companyId?.companyLogo ||
                    "/assets/default-logo.png"
                  }
                  alt={job.companyId?.companyName || "Logo"}
                  className="w-14 h-14 mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {job.jobPosition}
                </h3>
                <p className="text-gray-600">
                  {job.companyId?.companyName || "Unknown Company"}
                </p>
                <span
                  className={`mt-3 px-3 py-1 text-sm rounded-full ${
                    job.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.active ? "Active" : "Inactive"}
                </span>
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
