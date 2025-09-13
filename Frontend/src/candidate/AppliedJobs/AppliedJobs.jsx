import React, { useEffect, useState } from "react";
import axios from "axios";
import AppliedJobCard from "./AppliedJobCard";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const candidate = JSON.parse(localStorage.getItem("candidate"));
      if (!candidate?._id) return;

      const res = await axios.get(
        "http://localhost:8000/candidate/appliedjobs",
        { withCredentials: true }
      );

      console.log("Applied Jobs Response:", res.data); // 👈 log response
      setJobs(res.data.appliedJobs || []);
    } catch (err) {
      console.error("Failed to fetch applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAppliedJobs();
}, []);


  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (jobs.length === 0) return <p className="p-6 text-center">No applied jobs yet.</p>;

  return (
    <div className="min-h-screen bg-white">
        <Navbar></Navbar>
      <main className="px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Applied Jobs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
  {jobs.map((application) => (
    <AppliedJobCard key={application.job._id} application={application} />
  ))}
</div>

      </main>
<Footer></Footer>
    </div>
  );
};

export default AppliedJobs;
