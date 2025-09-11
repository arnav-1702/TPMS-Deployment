import React, { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AuthContext } from "../../../Authentication/AuthProvider";

const categories = [
  { title: "Software Engineer", img: "https://img.icons8.com/ios/100/code.png", description: "Develop, test, and maintain web and mobile applications." },
  { title: "Designer", img: "https://img.icons8.com/ios/100/design.png", description: "Create visually compelling UI/UX designs for apps and websites." },
  { title: "Consultant", img: "https://img.icons8.com/ios/100/businessman.png", description: "Provide expert advice to improve business processes and strategies." },
  { title: "Construction", img: "https://img.icons8.com/ios/100/construction-worker.png", description: "Manage construction projects and ensure timely completion." },
];

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer, TechCorp",
    content: "Using this platform, I found my dream job in just two weeks. Highly recommend to all job seekers!"
  },
  {
    name: "Michael Smith",
    role: "UI/UX Designer, DesignHub",
    content: "The premium services helped me polish my portfolio and get noticed by top companies."
  },
  {
    name: "Ravi Patel",
    role: "Project Consultant, BizSolutions",
    content: "The job recommendations matched my skills perfectly. Great experience overall."
  }
];

const Page2 = () => {
  const { role } = useContext(AuthContext);

  return (
    <div>
      {/* ================= Search by Category ================= */}
      <section className="px-8 py-20 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#2D336B] mb-2">
                {role === "company" ? "Job Openings" : "Recently Added Jobs"}
              </h2>
              <p className="text-[#8A8FB9] text-lg">
                Search your career opportunity with our categories
              </p>
            </div>
            <button
              className="text-[#8A8FB9] hover:text-[#2D336B] transition-colors font-medium flex items-center gap-2"
              aria-label="See more jobs"
            >
              <span>{role === "company" ? "All Categories" : "See More"}</span>
              <img
                src="https://img.icons8.com/ios-filled/50/chevron-right.png"
                alt="arrow"
                className="w-4 h-4"
              />
            </button>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((item, index) => (
              <div
                key={index}
                className={`p-8 text-center transition-all duration-300 cursor-pointer hover:scale-105 rounded-3xl ${
                  role === "company"
                    ? "bg-[#F9F9FF] border border-[#D6D6F6] shadow-md hover:shadow-lg"
                    : "bg-[#E7E7FB] hover:shadow-xl"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden ${
                    role === "company" ? "bg-[#F3F3FF]" : "bg-white shadow-sm"
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#2D336B] mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-[#7886C7] mb-4">{item.description}</p>

                {/* Apply / Note */}
                {role === "candidate" && (
                  <button className="mt-2 mx-auto text-white font-medium flex items-center gap-2 bg-[#2D336B] hover:bg-[#7886C7] px-4 py-2 rounded-lg transition-colors">
                    Apply
                    <img
                      src="https://img.icons8.com/ios-filled/50/chevron-right.png"
                      alt="arrow"
                      className="w-4 h-4 object-contain"
                    />
                  </button>
                )}
                {role === "company" && (
                  <p className="text-sm text-[#7886C7] mt-2">View Applicants</p>
                )}
                {role === "admin" && (
                  <p className="text-sm text-red-500 mt-2">Admin Viewing</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Premium Services ================= */}
      <section className="px-8 py-20 bg-white -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 bg-transparent relative w-full">
            <div className="flex-shrink-0">
              <img
                src="/assets/page1acclerate.png"
                alt="Premium Icon"
                className="w-36 h-36 object-contain"
              />
            </div>
            <div>
              <h3 className="font-[Poppins] font-medium text-5xl font-extrabold leading-[150%] text-[#2D336B] mb-3">
                Accelerate your job search with premium services
              </h3>
              <p className="font-[Poppins] font-normal text-[22px] leading-[150%] text-[#7886C7]">
                Services to help you get hired faster: CV optimization, recruiter
                visibility, personalized job recommendations, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Testimonials ================= */}
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
                    <p className="font-semibold text-black text-lg">{testimonial.name}</p>
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
