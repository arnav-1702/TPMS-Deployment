// src/pages/JobVerification.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

const JobVerificationAdmin = () => {
  const navigate = useNavigate();
  const [pendingJobs, setPendingJobs] = useState([]);
  const [verifiedJobs, setVerifiedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Admin not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [pendingRes, verifiedRes] = await Promise.allSettled([
          axios.get("http://localhost:8000/job/admin/job/verification", { headers }),
          axios.get("http://localhost:8000/job/admin/job/verified", { headers }),
        ]);

        if (pendingRes.status === "fulfilled") {
          setPendingJobs(pendingRes.value.data.pendingJobs || []);
        } else {
          setPendingJobs([]);
          console.error("Error fetching pending jobs:", pendingRes.reason.response?.data?.message || pendingRes.reason);
        }

        if (verifiedRes.status === "fulfilled") {
          setVerifiedJobs(verifiedRes.value.data.jobs || []);
        } else {
          setVerifiedJobs([]);
          console.error("Error fetching verified jobs:", verifiedRes.reason.response?.data?.message || verifiedRes.reason);
        }

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const goToJobDetails = (job, type) => {
    navigate(`/job/${job._id}`, { state: { job, type } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading jobs...</p>
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
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="px-6 py-8">
        <div className="ml-20">
          {/* Pending Jobs */}
          <section className="mb-16">
            <h1 className="text-2xl font-bold text-black mb-8">Pending Job Requests</h1>
            <div className="flex gap-6 flex-wrap">
              {pendingJobs.length > 0 ? (
                pendingJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-[#C5C9FF80] rounded-[1.5rem] p-6 w-48 h-56 flex flex-col shadow-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => goToJobDetails(job, "pending")}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#2d336b] font-bold text-xl">
                        {job.jobPosition ? job.jobPosition[0] : "J"}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-[#2d336b] text-lg font-semibold mb-4 text-center">
                        {job.jobPosition || "Unknown Job"}
                      </h3>
                      <div className="text-[#2d336b] font-medium flex items-center gap-2">
                        Open
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No pending jobs.</p>
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
                    className="bg-[#C5C9FF80] rounded-[1.5rem] p-6 w-48 h-56 flex flex-col shadow-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => goToJobDetails(job, "verified")}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#2d336b] font-bold text-xl">
                        {job.jobPosition ? job.jobPosition[0] : "J"}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-[#2d336b] text-lg font-semibold mb-4 text-center">
                        {job.jobPosition || "Unknown Job"}
                      </h3>
                      <div className="text-[#2d336b] font-medium flex items-center gap-2">
                        Open
                        <ArrowRight className="w-4 h-4" />
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

export default JobVerificationAdmin;
