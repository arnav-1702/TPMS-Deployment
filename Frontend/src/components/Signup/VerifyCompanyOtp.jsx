import React, { useState } from "react";
import { verifyCompanyOtpAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const VerifyCompanyOtp = () => {
  const navigate = useNavigate();
  const company = JSON.parse(localStorage.getItem("company")) || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyCompanyOtpAPI({ email: company.email, otp });

      // ✅ Clear stored company info
      localStorage.removeItem("company");

      // ✅ Redirect to "Pending Approval" page instead of login
      navigate("/company-pending");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!company.email) return <p className="p-4">No company info found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Verify Company OTP
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-gray-600 text-sm text-center">
          Enter the OTP sent to <strong>{company.email}</strong>
        </p>

        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};
