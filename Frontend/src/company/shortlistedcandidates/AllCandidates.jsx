import { useParams, Link } from "react-router-dom";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function AllCandidates() {
  const { jobId } = useParams();

  // In real app: fetch job + candidates by jobId
  const job = {
    id: jobId,
    title: "Data Analyst",
    candidates: Array(9).fill({
      id: "c1",
      name: "Sarah Johnson",
      experience: "5 Years",
      email: "xxx@gmail.com",
      phone: "1234567897",
      avatar: "/assets/sarahjohnson.png",
    }),
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#1F2937] mb-10">
          {job.title}
        </h1>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {job.candidates.map((candidate, index) => (
            <Link key={index} to={`/candidate/${candidate.id || index}`}>
              <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="flex items-center space-x-4">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#2D336B]"
                  />
                  <div>
                    <h3 className="font-semibold text-[#111827] text-lg mb-1">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] mb-1">
                      Experience: {candidate.experience}
                    </p>
                    <p className="text-sm text-[#6B7280] mb-1">
                      Email: {candidate.email}
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      Phone: {candidate.phone}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
