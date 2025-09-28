import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";

export const PostJob = () => {
  const navigate = useNavigate();
  const { role, user } = useContext(AuthContext);

  // Initialize form state
  const [form, setForm] = useState({
    companyId: "",          // Will be set from user
    companyName: "",        // Will be set from user
    domain: "",
    jobPosition: "",
    experienceRequired: "",
    jobDescription: "",
    salaryBudget: "",
    workType: "",
    skills: "",
    location: "",
    noticePeriodRequired: "",
    openings: "",
    urgencyStatus: "",
    concernedPerson: "",
    email: "",
    phoneNumber: "",
    competitiveCompanies: "",
    keyQualities: "",
    companyLogo: null,
  });

  // Auto-fill companyId and companyName when component mounts
  useEffect(() => {
    if (role === "company" && user) {
      setForm((prev) => ({
        ...prev,
        companyId: user._id,
        companyName: user.companyName,
        email: user.email, // optional: pre-fill company email
      }));
    }
  }, [role, user]);

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({ ...form, companyLogo: e.target.files[0] });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields
    if (!form.companyId || !form.jobPosition) {
      alert("Company ID or Job Position missing!");
      return;
    }

    const data = new FormData();
    for (let key in form) {
      data.append(key, form[key]);
    }

    try {
      const response = await axios.post(
        "/job/post",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // include cookies for auth
        }
      );

      if (response.status === 201) {
        alert("Job posted successfully!");
        navigate("/"); // redirect after posting
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while posting the job."
      );
    }
  };

  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 w-full shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition";

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-between items-start px-6 md:px-10 py-8 md:py-12 bg-[#2d336b] text-white">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-6">
            Post Jobs Quickly & Hire the Best Talent
          </h2>
          <p className="text-base md:text-lg text-gray-200">
            Fill your job openings efficiently and track candidates in one place.
          </p>
        </div>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="illustration"
          className="w-[280px] md:w-[350px] h-auto self-center mt-8"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col px-6 md:px-10 py-8 md:py-12 bg-white overflow-y-auto shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Post a Job Opening
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          onSubmit={handleSubmit}
        >
          {/* Company Logo */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-medium">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg shadow-sm"
            />
          </div>

          {/* Row 1 */}
          <input
            id="companyName"
            placeholder="Company Name"
            value={form.companyName}
            disabled
            className={`${inputClass} bg-gray-100`}
          />
          <input
            id="domain"
            placeholder="Domain"
            value={form.domain}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Row 2 */}
          <input
            id="jobPosition"
            placeholder="Job Position"
            value={form.jobPosition}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            id="experienceRequired"
            placeholder="Experience Required"
            value={form.experienceRequired}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Job Description */}
          <textarea
            id="jobDescription"
            placeholder="Job Description"
            value={form.jobDescription}
            onChange={handleChange}
            className={`${inputClass} col-span-1 md:col-span-2 h-28`}
          />

          {/* Row 3 */}
          <input
            id="salaryBudget"
            placeholder="Salary"
            value={form.salaryBudget}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            id="workType"
            placeholder="Work Type"
            value={form.workType}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Row 4 */}
          <input
            id="skills"
            placeholder="Skills Required"
            value={form.skills}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            id="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Row 5 */}
          <input
            id="noticePeriodRequired"
            placeholder="Notice Period Required"
            value={form.noticePeriodRequired}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            id="openings"
            placeholder="Number of Candidates Required"
            value={form.openings}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Row 6 */}
          <input
            id="urgencyStatus"
            placeholder="Urgency Status"
            value={form.urgencyStatus}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            id="concernedPerson"
            placeholder="Concerned Person"
            value={form.concernedPerson}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Row 7 */}
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            id="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Competitive Companies */}
          <input
            id="competitiveCompanies"
            placeholder="Competitive Companies"
            value={form.competitiveCompanies}
            onChange={handleChange}
            className={`${inputClass} col-span-1 md:col-span-2`}
          />

          {/* Key Qualities */}
          <textarea
            id="keyQualities"
            placeholder="Key Qualities"
            value={form.keyQualities}
            onChange={handleChange}
            className={`${inputClass} col-span-1 md:col-span-2 h-24`}
          />

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-[#2d336b] text-white font-semibold rounded-md shadow-md hover:bg-[#1f2454] transition-colors"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
