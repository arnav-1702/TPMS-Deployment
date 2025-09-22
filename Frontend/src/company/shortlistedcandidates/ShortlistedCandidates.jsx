import { Link } from "react-router-dom";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function ShortlistedCandidates() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      type: "Full-time",
      location: "Remote",
      posted: "5 days ago",
      shortlistedCount: 12,
      candidates: [
        { id: "c1", name: "Sarah Johnson", experience: "5 Years", email: "xxx@gmail.com", phone: "1234567897", avatar: "/assets/sarahjohnson.png" },
        { id: "c2", name: "Michael Lee", experience: "3 Years", email: "yyy@gmail.com", phone: "9876543210", avatar: "/assets/sarahjohnson.png" },
        { id: "c3", name: "Emma Watson", experience: "6 Years", email: "zzz@gmail.com", phone: "1112223334", avatar: "/assets/sarahjohnson.png" },
      ],
    },
    {
      id: 2,
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Hybrid",
      posted: "3 days ago",
      shortlistedCount: 8,
      candidates: [
        { id: "c4", name: "Sarah Johnson", experience: "5 Years", email: "xxx@gmail.com", phone: "1234567897", avatar: "/assets/sarahjohnson.png" },
        { id: "c5", name: "John Doe", experience: "4 Years", email: "abc@gmail.com", phone: "4561237890", avatar: "/assets/sarahjohnson.png" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb]">
            {/* Job Header */}
            <div className="flex justify-between items-center bg-[#2D336B] text-white rounded-t-2xl px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-sm opacity-90">
                  {job.type} • {job.location} • Posted {job.posted}
                </p>
              </div>
              <p className="text-lg font-semibold">
                Shortlisted Candidates {job.shortlistedCount}
              </p>
            </div>

            {/* Candidates Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {job.candidates.map((candidate) => (
                <Link key={candidate.id} to={`/candidate/${candidate.id}`}>
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

            {/* View All Link */}
            <div className="text-center pb-6">
              <Link
                to={`/jobs/${job.id}/candidates`}
                className="text-[#2D336B] font-medium hover:underline"
              >
                View All {job.shortlistedCount} Candidates
              </Link>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
