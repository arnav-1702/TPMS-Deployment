import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function AdminShortlistCandidates() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        setJob(jobRes.data);
        setCandidates(candidatesRes.data.candidates || []);
      } catch (err) {
        setError("Failed to load job/candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
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
        <h1 className="text-3xl font-semibold text-[#1F2937] mb-10">
          {job?.jobPosition || "Job Applicants"}
        </h1>

        {/* Candidates Grid */}
        {candidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate, index) => (
              <Link
                key={candidate._id || index}
                to={`/candidate/${candidate.candidateId}`}
              >
                <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        candidate.photo ||
                        "https://via.placeholder.com/100?text=User"
                      }
                      alt={candidate.name || "Candidate"}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#2D336B]"
                    />
                    <div>
                      <h3 className="font-semibold text-[#111827] text-lg mb-1">
                        {candidate.name || "Unknown"}
                      </h3>
                      <p className="text-sm text-[#6B7280] mb-1">
                        Experience: {candidate.yearsOfExperience || "N/A"} Years
                      </p>
                      <p className="text-sm text-[#6B7280] mb-1">
                        Email: {candidate.email}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Phone: {candidate.contactNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No applicants found for this job.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
