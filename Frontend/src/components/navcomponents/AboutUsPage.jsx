import React from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';


export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <Navbar/>
      

      {/* Main Content */}
      <main className="px-8 py-12">
        
        <div className="max-w-6xl mx-auto">
      
          {/* About Us Section */}
          <div className="flex items-start justify-between mb-16 gap-12">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#000000] mb-6">About Us</h1>
              <h2 className="text-xl font-semibold text-[#000000] mb-6">About Talent Pool Manpower Services</h2>

              <div className="space-y-4 text-[#000000] leading-relaxed">
                <p>
                  Founded in 2022 by Nilesh Pandit, Talent Pool Manpower Services is a trusted HR and recruitment
                  partner for businesses across industries. With over 8 years of experience in the human resources
                  domain, Nilesh established the company with a clear vision—to bridge the gap between skilled
                  professionals and the right career opportunities.
                </p>
                <p>
                  At Talent Pool, we believe that people are the true strength of any organization. Our approach is
                  human-centric, transparent, and tailored to ensure the right match between talent and employer.
                </p>
              </div>
            </div>

            {/* About Image */}
            <div className="flex-shrink-0">
              <img 
                src="/assets/about.png" 
                alt="About Talent Pool Manpower Services" 
                className="w-80 h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Founder's Note Section */}
         <div className="flex items-start gap-8 mb-16">
            <div className="flex-shrink-0">
              <img 
                src="/assets/ceo.png" 
                alt="Nilesh Pandit, Founder" 
                className="w-80 h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="flex-1 pt-2">
              <h3 className="text-2xl font-bold text-[#000000] mb-6">Founder's Note</h3>
              <blockquote className="text-[#000000] text-lg leading-relaxed mb-6 font-normal">
                "My journey in HR taught me that people are the true strength of any organisation. Through Talentpool,
                my mission is to connect skilled professionals with the right opportunities, empowering both individuals
                and businesses to grow together."
              </blockquote>
              <cite className="text-[#000000] font-semibold text-base">— Nilesh Pandit, Founder</cite>
            </div>
          </div>

          {/* Mission and Vision */}
          <div className="space-y-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#000000] ">Our Mission</h3>
              <p className="text-[#000000] leading-relaxed">
                To connect talented individuals with the right job opportunities while helping organizations build
                high-performing teams.
              </p>
              <p className="text-[#000000] leading-relaxed">
                Our Vision <br/>
                 To become a leading HR partner known for trust, efficiency, and people-first solutions.
              </p>
            </div>

              
          </div>

          {/* Why Choose Talent Pool */}
         <div>
            <h3 className="text-2xl font-bold text-[#000000] mb-6">Why Choose Talent Pool?</h3>
            <ul className="space-y-1 text-[#000000]">
              <li className="flex items-center">
                <span className="mr-3">•</span>
                8+ years of HR expertise
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                Customized recruitment solutions
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                Dedicated support for both candidates and companies
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                Transparent and efficient processes
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}