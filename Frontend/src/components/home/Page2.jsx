import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";

const Page2 = () => {
  return (
    <div>
      {/* ================= Search by Category ================= */}
<section className="px-8 py-20 lg:px-16 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-4xl font-bold text-[#2D336B] mb-3">
          Search by Category
        </h2>
        <p className="text-[#8A8FB9] text-lg">
          Search your career opportunity with our categories
        </p>
      </div>
      <button className="text-[#8A8FB9] hover:text-[#2D336B] transition-colors font-medium flex items-center gap-2">
        All categories <span className="text-lg">→</span>
      </button>
    </div>

    {/* Category Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: "Software Engineer", img: "/assets/js.png" },
        { title: "Designer", img: "/assets/2nd.png" },
        { title: "Consultant", img: "/assets/3rd.png" },
        { title: "Construction", img: "/assets/4th.png" },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-[#E7E7FB] rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
        >
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm overflow-hidden">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-semibold text-[#2D336B] mb-4 text-lg">
            {item.title}
          </h3>
          <button className="mt-2 mx-auto text-black font-medium flex items-center gap-2 hover:underline">
            Apply
            <img
              src="/assets/rightArrow.png"
              alt="arrow"
              className="w-4 h-4 object-contain"
            />
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= Premium Services ================= */}
<section className="px-8 py-20 bg-white -mt-20">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center gap-6 bg-transparent relative overflow-visible w-full">
      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src="/assets/premium.png"
          alt="Premium Icon"
          className="w-36 h-36 object-contain"
        />
      </div>

      {/* Text content */}
      <div>
        <h3 className="font-[Poppins] font-medium text-[41px] leading-[150%] text-[#2D336B] mb-3">
          Accelerate your job search with premium services
        </h3>
        <p className="font-[Poppins] font-normal text-[22px] leading-[150%] text-[#7886C7]">
          Services to help you get hired, faster: from preparing your CV, getting recruiter attention,
          finding the right jobs, and more!
        </p>
      </div>
    </div>
  </div>
</section>

{/* ================= Testimonials ================= */}
<section className="px-8 py-20 lg:px-16 bg-[#FFF]">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <div className="flex justify-center items-center gap-4 mb-16">
      <img
        src="/assets/image.png"
        alt="Quote Icon"
        className="w-8 h-8 md:w-10 md:h-10"
      />
      <h2 className="text-4xl font-bold text-center text-[#2D336B]">
        What Our Client Says
      </h2>
    </div>

    {/* Testimonial Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="shadow-lg hover:shadow-xl transition-shadow rounded-md overflow-hidden"
        >
          {/* Top section (quote) */}
          <div className="bg-[#FFF2F2] p-8">
            <img
              src="/assets/image.png"
              alt="Quote Icon"
              className="w-10 h-10 mb-6"
            />
            <p className="text-[#2D336B] text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              turpis sit amet lectus facilisis luctus.
            </p>
          </div>

          {/* Bottom section (profile) */}
          <div className="bg-[#E6E4FA] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2D336B] rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-black text-lg">John Doe</p>
              <p className="text-sm text-[#2D336B]">CEO, Example Corp</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Navigation Dots & Arrows */}
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
  )
}

export default Page2