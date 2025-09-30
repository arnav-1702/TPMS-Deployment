import React, { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import axios from "axios";
import JobCard from "../../candidate/JobCard.jsx";

const categories = [
  {
    title: "Software Engineer",
    img: "https://img.icons8.com/ios/100/code.png",
    description: "Develop, test, and maintain web and mobile applications.",
  },
  {
    title: "Designer",
    img: "https://img.icons8.com/ios/100/design.png",
    description: "Create visually compelling UI/UX designs for apps and websites.",
  },
  {
    title: "Consultant",
    img: "https://img.icons8.com/ios/100/businessman.png",
    description: "Provide expert advice to improve business processes and strategies.",
  },
  {
    title: "Construction",
    img: "https://img.icons8.com/ios/100/construction-worker.png",
    description: "Manage construction projects and ensure timely completion.",
  },
];

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer, TechCorp",
    content:
      "Using this platform, I found my dream job in just two weeks. Highly recommend to all job seekers!",
  },
  {
    name: "Michael Smith",
    role: "UI/UX Designer, DesignHub",
    content:
      "The premium services helped me polish my portfolio and get noticed by top companies.",
  },
  {
    name: "Ravi Patel",
    role: "Project Consultant, BizSolutions",
    content:
      "The job recommendations matched my skills perfectly. Great experience overall.",
  },
];

const Page2 = () => {
  const { role } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://tpms-live.onrender.com/job/getjobs"); // change URL if needed
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {/* ================= Search by Category ================= */}
      <section className="px-6 sm:px-8 lg:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D336B] mb-2">
                {role === "company" ? "Job Openings" : "Recently Added Jobs"}
              </h2>
              <p className="text-[#8A8FB9] text-base sm:text-lg">
                Explore job opportunities tailored for you
              </p>
            </div>
            <button
              className="text-[#8A8FB9] hover:text-[#2D336B] transition-colors font-medium flex items-center gap-2"
              aria-label="See more jobs"
            >
              <span>{role === "company" ? "All Jobs" : "See More"}</span>
              <img
                src="https://img.icons8.com/ios-filled/50/chevron-right.png"
                alt="arrow"
                className="w-4 h-4"
              />
            </button>
          </div>

          {/* Jobs Grid */}
          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {jobs.slice(0, 4).map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id}
                  title={job.jobPosition}
                  companyName={job.companyId?.companyName || job.companyName}
                  logo={job.companyLogo}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-8 py-8 lg:px-16 bg-[#FFF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-16">
            <img
              src="https://img.icons8.com/ios-filled/50/quote-left.png"
              alt="Quote Icon"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h2 className="text-4xl font-bold text-center text-[#2D336B]">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`rounded-md overflow-hidden transition-shadow ${
                  role === "company"
                    ? "bg-[#F9F9FF] border border-[#D6D6F6] shadow-md hover:shadow-lg"
                    : "shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="bg-[#FFF2F2] p-8">
                  <p className="text-[#2D336B] text-lg leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
                <div className="bg-[#E6E4FA] p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2D336B] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-black text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#2D336B]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mb-16">
            <button className="w-12 h-12 rounded-full bg-[#2D336B] text-white flex items-center justify-center hover:bg-[#7886C7] transition-colors shadow-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-[#2D336B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#2D336B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#A9B5DF]"></div>
            </div>
            <button className="w-12 h-12 rounded-full bg-[#2D336B] text-white flex items-center justify-center hover:bg-[#7886C7] transition-colors shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page2;
