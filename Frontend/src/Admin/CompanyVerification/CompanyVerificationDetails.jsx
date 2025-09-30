// src/pages/CompanyVerificationDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const CompanyVerificationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState(state?.company || null);
  const [loading, setLoading] = useState(!state?.company);

  const type = state?.type || "pending"; // "pending" or "verified"
  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!company && id) {
    const fetchCompanyDetails = async () => {
      try {
        const url = `https://tpms-live.onrender.com/admin/company/verification/${id}`; // same as pending API
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCompany(res.data.company || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  } else {
    setLoading(false);
  }
}, [company, id, token]);


  const approveCompany = async () => {
    try {
      await axios.put(
        `https://tpms-live.onrender.com/admin/company/approve/${company._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      alert("Company approved successfully!");
      navigate("/company-verification");
    } catch (err) {
      alert("Failed to approve company.");
    }
  };

  const rejectCompany = async () => {
    try {
      await axios.delete(
        `https://tpms-live.onrender.com/admin/company/reject/${company._id}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      alert("Company rejected successfully!");
      navigate("/company-verification");
    } catch (err) {
      alert("Failed to reject company.");
    }
  };

  const disapproveCompany = async () => {
    try {
      await axios.put(
        `https://tpms-live.onrender.com/admin/company/disapprove/${company._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      alert("Company disapproved successfully!");
      navigate("/company-verification");
    } catch (err) {
      alert("Failed to disapprove company.");
    }
  };

  if (loading)
    return (
      <p className="p-6 text-gray-600 text-center">
        Loading company details...
      </p>
    );

  if (!company)
    return (
      <p className="p-6 text-red-600 text-center">No company details found.</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-6">
          {/* Main Info */}
          <div className="bg-white shadow rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {company.companyName}
                </h2>
                {company.companyDomain && (
                  <p className="text-gray-600 mt-2">
                    Domain: {company.companyDomain}
                  </p>
                )}
                {company.loginCredentials?.email && (
                  <p className="text-gray-500">
                    Email: {company.loginCredentials.email}
                  </p>
                )}
                {company.signupDate && (
                  <p className="text-gray-500">
                    Signup Date:{" "}
                    {new Date(company.signupDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {company.companyName && (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                  {company.companyName[0]}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
              {type === "pending" ? (
                <>
                  <button
                    onClick={approveCompany}
                    className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={rejectCompany}
                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={disapproveCompany}
                  className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                >
                  Disapprove
                </button>
              )}
            </div>
          </div>

          {/* Extra Details */}
          {company.description && (
            <DetailCard title="Company Description" content={company.description} />
          )}
          {company.careerGrowth && (
            <DetailCard title="Career Growth And Development" content={company.careerGrowth} />
          )}
          {company.culture && (
            <DetailCard title="Work Culture" content={company.culture} />
          )}
          {company.disclaimer && (
            <DetailCard title="Legal Disclaimer" content={company.disclaimer} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Reusable detail card
const DetailCard = ({ title, content }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-700 text-sm">{content}</p>
  </div>
);

export default CompanyVerificationDetails;
