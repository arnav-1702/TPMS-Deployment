// src/pages/JobVerification.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react"; // ✅ added icon
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

const JobVerification = () => {
  const navigate = useNavigate();

  const [verificationRequests, setVerificationRequests] = useState([]);
  const [verifiedJobs, setVerifiedJobs] = useState([]);

  // Fetch jobs from backend
 useEffect(() => {
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔑 get token

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [verificationRes, activeRes] = await Promise.all([
        axios.get("https://tpms-live.onrender.com/job/verification", { headers }),
        axios.get("https://tpms-live.onrender.com/job/active", { headers }),
      ]);

      setVerificationRequests(verificationRes.data.jobs || []);
      setVerifiedJobs(activeRes.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  fetchJobs();
}, []);

  const goToJobPortal = (job) => {
    navigate(`/company/job/${job._id}`, { state: { job } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="px-6 py-8">
        <div className="ml-20">
          {/* Job Verification Requests */}
          <section className="mb-16">
            <h1 className="text-2xl font-bold text-black mb-8">
              Job Verification requests
            </h1>

            <div className="flex gap-6 flex-wrap">
              {verificationRequests.length > 0 ? (
                verificationRequests.map((job) => (
                  <div
                    key={job._id}
                    className="bg-[#C5C9FF80] rounded-[1.5rem] p-4 w-48 h-64 flex flex-col shadow-lg cursor-pointer"
                    onClick={() => goToJobPortal(job)}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-[1.25rem] flex items-center justify-center">
                        <img
                          src={job.companyLogo || "/assets/4th.png"}
                          alt="Job Icon"
                          className="w-10 h-10"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-[#2d336b] text-xl font-semibold mb-4 text-center">
                        {job.jobPosition}
                      </h3>
                      <div className="text-[#2d336b] font-medium flex items-center gap-2">
                        Open
                        <ArrowRight className="w-4 h-4" /> {/* ✅ replaced image */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No verification requests.</p>
              )}
            </div>
          </section>

          {/* Verified Jobs */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-8">Verified Jobs</h2>

            <div className="flex gap-6 flex-wrap">
              {verifiedJobs.length > 0 ? (
                verifiedJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-[#C5C9FF80] rounded-[1.5rem] p-4 w-48 h-64 flex flex-col shadow-lg cursor-pointer"
                    onClick={() => goToJobPortal(job)}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-[1.25rem] flex items-center justify-center">
                        <img
                          src={job.companyLogo || "/assets/4th.png"}
                          alt="Job Icon"
                          className="w-10 h-10"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-[#2d336b] text-xl font-semibold mb-4 text-center">
                        {job.jobPosition}
                      </h3>
                      <div className="text-[#2d336b] font-medium flex items-center gap-2">
                        Open
                        <ArrowRight className="w-4 h-4" /> {/* ✅ replaced image */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No verified jobs.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobVerification;
