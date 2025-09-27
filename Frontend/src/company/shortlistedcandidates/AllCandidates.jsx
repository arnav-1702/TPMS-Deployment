// src/pages/company/JobCandidates.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function AllCandidates() {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/company/jobs/${jobId}/candidates`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCandidates(res.data); // Already approved from backend
        setJobTitle(res.data[0]?.jobPosition || "Candidates");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch candidates");
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb]">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#1F2937] mb-10">
          {jobTitle || "Candidates"}
        </h1>

        {candidates.length === 0 ? (
          <p className="text-center text-gray-500">
            No approved candidates found for this job.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate) => (
              <Link
                key={
                  candidate._id ||
                  candidate.candidateId?._id ||
                  String(candidate.candidateId)
                }
                to={`/candidate/${
                  candidate.candidateId?._id || candidate.candidateId
                }`}
              >
                <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition cursor-pointer h-full min-h-[220px] flex flex-col justify-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={candidate.photo || "/assets/default-avatar.png"}
                      alt={candidate.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#2D336B]"
                    />
                    <div>
                      <h3 className="font-semibold text-[#111827] text-lg mb-1">
                        {candidate.fullName}
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
        )}
      </main>
      <Footer />
    </div>
  );
}
