// src/pages/CompanyVerification.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

const CompanyVerification = () => {
  const navigate = useNavigate();

  const [verificationRequests, setVerificationRequests] = useState([]);
  const [verifiedCompanies, setVerifiedCompanies] = useState([]);

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [verificationRes, verifiedRes] = await Promise.allSettled([
          axios.get("/admin/company/verification", { headers }),
          axios.get("/admin/company/verified", { headers }),
        ]);

        if (verificationRes.status === "fulfilled") {
          setVerificationRequests(verificationRes.value.data.pendingCompanies || []);
        } else {
          setVerificationRequests([]);
        }

        if (verifiedRes.status === "fulfilled") {
          setVerifiedCompanies(verifiedRes.value.data.companies || []);
        } else {
          setVerifiedCompanies([]);
        }
      } catch (error) {
        console.error("Unexpected error fetching companies:", error.message);
      }
    };

    fetchCompanies();
  }, []);

  const goToCompanyDetails = (company, type) => {
    navigate(`/company/${company._id}`, { state: { company, type } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="px-6 py-8">
        <div className="ml-20">
          {/* Pending Company Requests */}
          <section className="mb-16">
            <h1 className="text-2xl font-bold text-black mb-8">
              Pending Company Requests
            </h1>

            <div className="flex gap-6 flex-wrap">
              {verificationRequests.length > 0 ? (
                verificationRequests.map((company) => (
                  <div
                    key={company._id}
                    className="bg-[#C5C9FF80] rounded-[1.5rem] p-6 w-48 h-56 flex flex-col shadow-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => goToCompanyDetails(company, "pending")}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#2d336b] font-bold text-xl">
                        {company.companyName ? company.companyName[0] : "C"}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-[#2d336b] text-lg font-semibold mb-4 text-center">
                        {company.companyName || "Unknown Company"}
                      </h3>
                      <div className="text-[#2d336b] font-medium flex items-center gap-2">
                        Open
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No pending requests.</p>
              )}
            </div>
          </section>

          {/* Verified Companies */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-8">
              Verified Companies
            </h2>

            <div className="flex gap-6 flex-wrap">
              {verifiedCompanies.length > 0 ? (
                verifiedCompanies.map((company) => (
                  <div
                    key={company._id}
                    className="bg-[#C5C9FF80] rounded-[1.5rem] p-6 w-48 h-56 flex flex-col shadow-md cursor-pointer hover:shadow-lg transition"
                    onClick={() => goToCompanyDetails(company, "verified")}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#2d336b] font-bold text-xl">
                        {company.companyName ? company.companyName[0] : "C"}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-[#2d336b] text-lg font-semibold mb-4 text-center">
                        {company.companyName || "Unknown Company"}
                      </h3>
                      <div className="text-[#2d336b] font-medium flex items-center gap-2">
                        Open
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No verified companies.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyVerification;
