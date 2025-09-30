// src/pages/company/CompanyJobs.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // latest first
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://tpms-live.onrender.com/company/jobs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  // Filtered + Sorted Jobs
  const filteredJobs = jobs
    .filter((job) =>
      filterType === "all" ? true : job.type.toLowerCase() === filterType.toLowerCase()
    )
    .filter((job) => job.jobPosition.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.postedDate);
      const dateB = new Date(b.postedDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      <Navbar />

      {/* Main content grows to fill available space */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#1F2937] mb-6">Your Jobs</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label>Job Type:</label>
            <select
              className="border px-3 py-1 rounded"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label>Sort by Date:</label>
            <select
              className="border px-3 py-1 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Latest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by Job Title"
              className="border px-3 py-1 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Jobs Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
            <thead>
              <tr className="bg-[#2D336B] text-white">
                <th className="text-left px-6 py-3 rounded-tl-xl">Sr. No.</th>
                <th className="text-left px-6 py-3">Job Title</th>
                <th className="text-left px-6 py-3">Type</th>
                <th className="text-left px-6 py-3">Location</th>
                <th className="text-left px-6 py-3">Posted</th>
                <th className="text-left px-6 py-3">Shortlisted</th>
                <th className="text-left px-6 py-3 rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <tr key={job._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{job.jobPosition}</td>
                    <td className="px-6 py-4">{job.type}</td>
                    <td className="px-6 py-4">{job.location}</td>
                    <td className="px-6 py-4">{new Date(job.postedDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{job.shortlistedCount || 0}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/jobs/${job._id}/candidates`}
                        className="px-4 py-2 bg-[#2D336B] text-white rounded hover:bg-[#3f4a8a] transition"
                      >
                        View Shortlisted
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
