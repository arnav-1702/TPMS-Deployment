// src/pages/AdminShortlistCandidates.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Loader from "@/components/home/Loader";

export default function AdminShortlistCandidates() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch job details
        const jobRes = await axios.get(
          `http://localhost:8000/admin/job/${jobId}`,
          { headers }
        );

        // Fetch candidates for this job
        const candidatesRes = await axios.get(
          `http://localhost:8000/admin/job/${jobId}/candidates`,
          { headers }
        );

        const list = candidatesRes.data.candidates || [];
        setJob(jobRes.data);
        setCandidates(list);
        setFilteredCandidates(list);
      } catch (err) {
        setError("Failed to load job/candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  // Filtering logic
  useEffect(() => {
    let list = [...candidates];

    if (search) {
      list = list.filter(
        (c) =>
          c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          c.email?.toLowerCase().includes(search.toLowerCase()) ||
          c.cityOfResidence?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minExp) {
      list = list.filter((c) => (c.yearsOfExperience || 0) >= parseInt(minExp));
    }

    if (maxExp) {
      list = list.filter((c) => (c.yearsOfExperience || 0) <= parseInt(maxExp));
    }

    setFilteredCandidates(list);
  }, [search, minExp, maxExp, candidates]);

  if (loading) {
    return <Loader></Loader>
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#1F2937] mb-6">
          {job?.jobPosition || "Job Applicants"}
        </h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by name, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
          />
          <input
            type="number"
            placeholder="Min Exp"
            value={minExp}
            onChange={(e) => setMinExp(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-28"
          />
          <input
            type="number"
            placeholder="Max Exp"
            value={maxExp}
            onChange={(e) => setMaxExp(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-28"
          />
          <button
            onClick={() => {
              setSearch("");
              setMinExp("");
              setMaxExp("");
              setFilteredCandidates(candidates);
            }}
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Candidates Table */}
        {filteredCandidates.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Sr No</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Photo</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Age</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">City</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Experience</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Education</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Expected Salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCandidates.map((candidate, index) => (
                  <tr key={candidate._id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={candidate.photo || "https://via.placeholder.com/100?text=User"}
                        alt={candidate.fullName || "Candidate"}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{candidate.fullName || "Unknown"}</td>
                    <td className="px-4 py-3 text-gray-600">{candidate.age || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-600">{candidate.cityOfResidence || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-600">{candidate.yearsOfExperience || "0"} yrs</td>
                    <td className="px-4 py-3 text-gray-600">
                      {candidate.bachelorsDegree} ({candidate.bachelorsCollege})
                      <br />
                      {candidate.mastersDegree !== "na" && `${candidate.mastersDegree} (${candidate.mastersCollege})`}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      ₹{candidate.expectedSalaryCTCYearly?.toLocaleString() || "N/A"}/year
                    </td>
                    <td className="px-4 py-3 text-gray-600">{candidate.email}</td>
                    <td className="px-4 py-3 text-gray-600">{candidate.contactNumber}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/admin/candidate/${candidate._id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        See Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No applicants found for this job.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
