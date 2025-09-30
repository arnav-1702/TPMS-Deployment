// src/pages/CandidateProfilePage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "@/components/home/Footer";

export default function CompanySeeCandidate() {
  const { jobId, candidateId } = useParams(); // now using both jobId and candidateId
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await axios.get(
          `https://tpms-live.onrender.com/company/candidate/${jobId}/${candidateId}`,
          { headers }
        );
        setCandidate(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load candidate details");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [jobId, candidateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Candidate not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">Candidate Details</h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 text-center">
                <div className="h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden border">
                  <img
                    src={candidate.photo || "https://via.placeholder.com/100?text=User"}
                    alt={candidate.fullName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {candidate.fullName || "Unknown"}
                </h2>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">
                  {candidate.jobPosition || "Candidate"}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1">📍 {candidate.cityOfResidence || "N/A"}</div>
                  <div className="flex items-center gap-1">👨‍💻 {candidate.yearsOfExperience || 0} Years Exp</div>
                </div>

                <div className="border-t border-gray-200 pt-4 sm:pt-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2 text-gray-400">✉</span>
                      {candidate.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2 text-gray-400">📞</span>
                      {candidate.contactNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            <Section
              title="Educational Background"
              color="purple"
              content={
                <div className="space-y-4">
                  <Info label="10th Percentage" value={`${candidate.tenthPercentage || "N/A"}%`} />
                  <Info label="12th Percentage" value={`${candidate.twelfthPercentage || "N/A"}%`} />
                  <Info
                    label="Bachelor's Degree"
                    value={`${candidate.bachelorsDegree || "N/A"} (${candidate.bachelorsCGPA || "N/A"} CGPA) - ${candidate.bachelorsCollege || "N/A"}`}
                  />
                  <Info
                    label="Master's Degree"
                    value={`${candidate.mastersDegree || "N/A"} (${candidate.mastersCGPA || "N/A"} CGPA) - ${candidate.mastersCollege || "N/A"}`}
                  />
                </div>
              }
            />

            <Section
              title="Work Experience"
              color="green"
              content={
                <div className="space-y-2">
                  <Info label="Company" value={candidate.companyName || "N/A"} />
                  <Info label="Location" value={candidate.companyLocation || "N/A"} />
                  <Info label="Years in Company" value={candidate.yearsInCompany || "N/A"} />
                </div>
              }
            />

            <Section
              title="Employment Status"
              color="orange"
              content={
                <div className="space-y-2">
                  <Info label="On Notice Period" value={candidate.onNoticePeriod || "N/A"} />
                  <Info label="Notice Period Duration" value={`${candidate.noticePeriodDuration || 0} Months`} />
                  <Info label="Pan India Location" value={candidate.panIndiaLocation || "N/A"} />
                  <Info label="Preferred Location" value={candidate.preferredLocation || "N/A"} />
                </div>
              }
            />

            <Section
              title="Skills & Expertise"
              color="indigo"
              content={
                <div>
                  <p className="text-gray-600">{candidate.skillsSummary || "N/A"}</p>
                  <p className="text-gray-500 mt-2">
                    <strong>Reason for Change: </strong> {candidate.reasonForJobChange || "N/A"}
                  </p>
                </div>
              }
            />

            <Section
              title="Salary Expectations"
              color="emerald"
              content={
                <div className="space-y-2">
                  <Info label="Expected CTC (Yearly)" value={`₹${candidate.expectedSalaryCTCYearly || "N/A"}`} />
                  <Info label="Expected In-hand (Monthly)" value={`₹${candidate.expectedSalaryInhandMonthly || "N/A"}`} />
                </div>
              }
            />

            <Section
              title="Documents"
              color="red"
              content={
                <div className="space-y-3">
                  {candidate.resume ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                      <div>
                        <div className="font-medium text-gray-900">Resume</div>
                        <div className="text-sm text-gray-500">Uploaded</div>
                      </div>
                      <a
                        href={candidate.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View / Download
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-500">No resume uploaded</p>
                  )}
                  {candidate.resume && candidate.resume.endsWith(".pdf") && (
                    <iframe
                      src={candidate.resume}
                      title="Resume Preview"
                      className="w-full h-[600px] border rounded"
                    />
                  )}
                </div>
              }
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ========== Helper Components ========== */
function Section({ title, color, content }) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h3 className={`flex items-center font-semibold ${colorClasses[color]}`}>{title}</h3>
      </div>
      <div className="p-4 sm:p-6">{content}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-sm sm:text-base text-gray-500 mb-1">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}
