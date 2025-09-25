// src/pages/CandidateProfilePage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "@/components/home/Footer";

export default function CandidateProfilePage() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/admin/candidate/${candidateId}`,
          { headers }
        );
        setCandidate(res.data);
      } catch (err) {
        setError("Failed to load candidate details");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

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
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Candidate Details
        </h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition-colors font-medium">
            <span>✓</span>
            <span>Approve</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition-colors">
            <span className="text-white font-medium">✕</span>
            <span className="text-white font-medium">Reject</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= Left Sidebar ================= */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 text-center">
                {/* Profile Image */}
                <div className="h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden border">
                  <img
                    src={
                      candidate.photo ||
                      "https://via.placeholder.com/100?text=User"
                    }
                    alt={candidate.fullName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Name & Title */}
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {candidate.fullName || "Unknown"}
                </h2>
                <p className="text-gray-500 mb-4">
                  {candidate.jobPosition || "Candidate"}
                </p>

                {/* Location + Experience */}
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    📍 {candidate.cityOfResidence}
                  </div>
                  <div className="flex items-center gap-1">
                    👨‍💻 {candidate.yearsOfExperience} Years Exp
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-gray-200 pt-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-3 text-gray-400">✉</span>
                      {candidate.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-3 text-gray-400">📞</span>
                      {candidate.contactNumber}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-blue-50 rounded-lg p-2">
                      <div className="text-xl font-bold text-blue-600">
                        {candidate.age}
                      </div>
                      <div className="text-xs text-gray-500">Age</div>
                    </div>
                    <div className="text-center bg-green-50 rounded-lg p-2">
                      <div className="text-xl font-bold text-green-600">
                        {candidate.yearsOfExperience}
                      </div>
                      <div className="text-xs text-gray-500">Years Exp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Right Content ================= */}
          <div className="lg:col-span-2 space-y-6">
            <Section
              title="Educational Background"
              color="purple"
              content={
                <div className="space-y-4">
                  <Info label="10th Percentage" value={`${candidate.tenthPercentage}%`} />
                  <Info label="12th Percentage" value={`${candidate.twelfthPercentage}%`} />
                  <Info
                    label="Bachelor's Degree"
                    value={`${candidate.bachelorsDegree} (${candidate.bachelorsCGPA} CGPA) - ${candidate.bachelorsCollege}`}
                  />
                  <Info
                    label="Master's Degree"
                    value={`${candidate.mastersDegree} (${candidate.mastersCGPA} CGPA) - ${candidate.mastersCollege}`}
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
                  <Info label="On Notice Period" value={candidate.onNoticePeriod} />
                  <Info label="Notice Period Duration" value={candidate.noticePeriodDuration + " Months"} />
                  <Info label="Pan India Location" value={candidate.panIndiaLocation} />
                  <Info label="Preferred Location" value={candidate.preferredLocation} />
                </div>
              }
            />

            <Section
              title="Skills & Expertise"
              color="indigo"
              content={
                <div>
                  <p className="text-gray-600">{candidate.skillsSummary}</p>
                  <p className="text-gray-500 mt-2">
                    <strong>Reason for Change: </strong> {candidate.reasonForJobChange}
                  </p>
                </div>
              }
            />

            <Section
              title="Salary Expectations"
              color="emerald"
              content={
                <div className="space-y-2">
                  <Info label="Expected CTC (Yearly)" value={`₹${candidate.expectedSalaryCTCYearly}`} />
                  <Info
                    label="Expected In-hand (Monthly)"
                    value={`₹${candidate.expectedSalaryInhandMonthly}`}
                  />
                </div>
              }
            />

            <Section
              title="Documents"
              color="red"
              content={
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                    Download
                  </a>
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
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className={`flex items-center font-semibold ${colorClasses[color]}`}>
          {title}
        </h3>
      </div>
      <div className="p-6">{content}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}
