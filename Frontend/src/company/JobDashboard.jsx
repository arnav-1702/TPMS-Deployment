import { useNavigate } from "react-router-dom";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import JobList from "./JobList";
import { PlusCircle } from "lucide-react";

const JobDashboard = () => {
  const navigate = useNavigate();

  // Only inactive jobs remain; active jobs are handled by Add card
  const inactiveJobs = [
    { id: 2, title: "Data Analyst", icon: "/assets/4th.png", status: "inactive" },
    { id: 3, title: "Frontend Developer", icon: "/assets/4th.png", status: "inactive" },
  ];

  const goToJobPortal = (job) => {
    navigate("/job-portal", { state: { job } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Post Job Openings Section */}
          <section className="mb-16">
            <h1 className="text-3xl font-bold text-black mb-6">Post Job Openings</h1>

            <div className="flex flex-wrap gap-6">
              {/* Add Card */}
              <div
                className="bg-[#C5C9FF80] rounded-3xl p-4 w-48 h-64 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate("/postjobForm")}
              >
                <div className="w-40 h-52 bg-white rounded-[2rem] flex flex-col items-center justify-center gap-4 shadow-md">
                  <PlusCircle size={48} className="text-indigo-500" />
                  <span className="text-[#2d336b] text-xl font-semibold">Add</span>
                </div>
              </div>
            </div>
          </section>

          {/* Inactive Jobs Section */}
          <section>
            <h2 className="text-3xl font-bold text-black mb-6">
              Previously Posted Jobs
            </h2>
            <div className="flex flex-wrap gap-6">
              {inactiveJobs.map((job) => (
                <JobList key={job.id} jobs={[job]} onJobClick={goToJobPortal} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDashboard;
