import { useNavigate } from "react-router-dom";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import JobList from "./JobList";

const JobDashboard = () => {
  const navigate = useNavigate();

  // Sample job data (later replace with backend)
  const activeJobs = [
    { id: 1, title: "Web Developer", icon: "/assets/4th.png", status: "active" },
  ];

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
        <div className="ml-20">
          {/* Active Jobs Section */}
          <section className="mb-16">
            <h1 className="text-3xl font-bold text-black mb-8">Post Job Openings</h1>
            <JobList jobs={activeJobs} onJobClick={goToJobPortal} />

            {/* Add Card */}
            <div
              className="bg-[#C5C9FF80] rounded-3xl p-4 w-48 h-64 flex items-center justify-center shadow-lg cursor-pointer mt-6"
              onClick={() => navigate("/postjobForm")}
            >
              <div className="w-40 h-52 bg-white rounded-[2rem] flex flex-col items-center justify-center gap-4">
                <img src="/assets/plus.png" alt="Plus Icon" className="w-20 h-20" />
                <span className="text-[#2d336b] text-xl font-semibold">Add</span>
              </div>
            </div>
          </section>

          {/* Inactive Jobs Section */}
          <section>
            <h2 className="text-3xl font-bold text-black mb-8">
              Previously Posted Jobs (Inactive Jobs)
            </h2>
            <JobList jobs={inactiveJobs} onJobClick={goToJobPortal} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDashboard;
