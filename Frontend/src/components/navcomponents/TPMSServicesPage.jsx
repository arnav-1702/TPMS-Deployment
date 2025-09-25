import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function TPMSServicesPage() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <Navbar/>

      {/* Main Content */}
      <main className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl font-bold text-[#000000] mb-6">Our Services</h1>

              <p className="text-[#000000] text-lg leading-relaxed mb-8">
                At Talent Pool Manpower Services, we offer tailored HR and recruitment services designed to support both
                job seekers and employers. Whether you're a candidate searching for your next opportunity or a company
                looking to hire top talent, we make the process simple and efficient.
              </p>

              {/* For Candidates Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#000000]">For Candidates</h2>
                <p className="text-[#000000] leading-relaxed">
                  We help job seekers take control of their career journey with easy-to-use tools and personalized
                  support.
                </p>

                <ul className="space-y-4">
  <li className="flex items-start gap-2">
    <span className="text-black text-xl">•</span>
    <div>
      <h3 className="font-semibold text-[#000000] mb-1">
        Browse Job Postings
      </h3>
      <p className="text-[#000000]">
        Explore the latest openings across various industries.
      </p>
    </div>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-black text-xl">•</span>
    <div>
      <h3 className="font-semibold text-[#000000] mb-1">
        Apply for Jobs
      </h3>
      <p className="text-[#000000]">
        Submit your application directly through our platform.
      </p>
    </div>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-black text-xl">•</span>
    <div>
      <h3 className="font-semibold text-[#000000] mb-1">
        Track Your Application Status
      </h3>
      <p className="text-[#000000]">
        Stay updated on every step of your application process.
      </p>
    </div>
  </li>
</ul>

              </div>

              {/* For Companies Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#000000]">For Companies</h2>
                <p className="text-[#000000] leading-relaxed">
                  We assist organizations in finding the right talent quickly and effectively.
                </p>

                <ul className="space-y-4">
  <li className="flex items-start gap-2">
    <span className="text-black text-xl">•</span>
    <div>
      <h3 className="font-semibold text-[#000000] mb-1">
        Register & Post Job Openings
      </h3>
      <p className="text-[#000000]">
        Share your vacancies with our growing talent pool.
      </p>
    </div>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-black text-xl">•</span>
    <div>
      <h3 className="font-semibold text-[#000000] mb-1">
        View Shortlisted Candidates
      </h3>
      <p className="text-[#000000]">
        Access pre-screened profiles that match your job requirements.
      </p>
    </div>
  </li>
</ul>

              </div>
            </div>

            {/* Right Illustrations */}
            <div className="space-y-8">
              <div className="flex justify-center">
                <img
                  src="/assets/service1.png"
                  alt="Mobile app interface showing job application tracking with user profiles and notifications"
                  className="max-w-md w-full h-auto"
                />
              </div>

              <div className="flex justify-center">
                <img
                  src="/assets/service2.png"
                  alt="Hands working on laptop with colorful geometric shapes representing digital work environment"
                  className="max-w-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  )
}