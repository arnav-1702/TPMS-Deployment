import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function JobApplicationForm() {
  const { jobId } = useParams(); // ✅ get jobId from URL
  const [jobDetails, setJobDetails] = useState(null); // ✅ add jobDetails state
  const [formData, setFormData] = useState({
    age: "",
    cityOfResidence: "",
    homeTown: "",
    yearsOfExperience: "",
    email: "",
    contactNumber: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    bachelorsDegree: "",
    bachelorsCollege: "",
    mastersDegree: "",
    mastersCollege: "",
    bachelorsCGPA: "",
    mastersCGPA: "",
    companyName: "",
    companyLocation: "",
    jobPosition: "",
    yearsInCompany: "",
    salaryCTCYearly: "",
    salaryCTCMonthly: "",
    salaryInhandYearly: "",
    salaryInhandMonthly: "",
    onNoticePeriod: "",
    noticePeriodDuration: "",
    skillsSummary: "",
    reasonForJobChange: "",
    panIndiaLocation: "",
    preferredLocation: "",
    expectedSalaryCTCYearly: "",
    expectedSalaryInhandMonthly: "",
    photo: null,
    resume: null,
  });

  // ✅ Fetch job details from backend
  useEffect(() => {
  const fetchJob = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/job/getjob/${jobId}`);
      console.log("Fetched job details:", res.data); // 👈 check this
      setJobDetails(res.data);
    } catch (err) {
      console.error("Failed to fetch job details", err);
    }
  };
  if (jobId) fetchJob();
}, [jobId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to apply for this job.");
        return;
      }

      await axios.post(
        `http://localhost:8000/candidateapplication/job/${jobId}/apply`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit application");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#fefeff] flex">
      {/* Left Sidebar */}
      <div className="w-[20%] bg-[#2d336b] flex-none text-white p-6 flex flex-col overflow-hidden">
        <div className="w-24 h-8 bg-[#d9d9d9] mb-8"></div>
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-light mb-4 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/running.png"
              alt="Professional illustration"
              className="w-40 h-40"
            />
          </div>
          <div>
            <p className="text-sm opacity-90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/wearehiring.png"
              alt="We are hiring banner"
              className="w-40 h-28"
            />
          </div>
          <div>
            <p className="text-sm opacity-90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/handshake.png"
              alt="Business meeting illustration"
              className="w-40 h-40"
            />
          </div>
          <div>
            <p className="text-sm opacity-90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[80%] bg-white">
        <div className="flex justify-between items-center p-6 border-b border-[#d9d9d9]">
          <h1 className="text-xl font-medium text-[#000000]">
  {jobDetails
    ? `${jobDetails.jobPosition} | ${jobDetails.companyId?.companyName}`
    : "Loading job..."}
</h1>
          <div className="w-10 h-10 bg-[#2d336b] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 max-w-4xl">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-[#000000]">
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                ["Age", "age"],
                ["City of Residence", "cityOfResidence"],
                ["Home Town", "homeTown"],
                ["Years of Experience", "yearsOfExperience"],
                ["Email", "email"],
                ["Contact Number", "contactNumber"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Educational Background */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-[#000000]">
              Educational Background
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                ["10th Percentage", "tenthPercentage"],
                ["12th Percentage", "twelfthPercentage"],
                ["Bachelors Degree Name", "bachelorsDegree"],
                ["Bachelors College Name", "bachelorsCollege"],
                ["Masters Degree Name", "mastersDegree"],
                ["Masters College Name", "mastersCollege"],
                ["Bachelors CGPA", "bachelorsCGPA"],
                ["Masters CGPA", "mastersCGPA"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-[#000000]">
              Previous/Current Company (not for freshers)
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                ["Company Name", "companyName"],
                ["Company Location", "companyLocation"],
                ["Job Position", "jobPosition"],
                ["Years in Company", "yearsInCompany"],
                ["Salary CTC (Yearly)", "salaryCTCYearly"],
                ["Salary CTC (Monthly)", "salaryCTCMonthly"],
                ["Salary Inhand (Yearly)", "salaryInhandYearly"],
                ["Salary Inhand (Monthly)", "salaryInhandMonthly"],
                ["Are You on Notice Period", "onNoticePeriod"],
                ["Notice Period Duration", "noticePeriodDuration"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Describe About Your Skills in Short
              </label>
              <textarea
                name="skillsSummary"
                value={formData.skillsSummary}
                onChange={handleChange}
                className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white h-24 resize-none"
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Reason For Job Change
              </label>
              <textarea
                name="reasonForJobChange"
                value={formData.reasonForJobChange}
                onChange={handleChange}
                className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white h-24 resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              {[
                ["PAN India Job Location (Yes / No)", "panIndiaLocation"],
                ["Preferred Job Location", "preferredLocation"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resume & Salary */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-[#000000]">
              Resume Upload
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Upload your resume with a photograph on top right hand side corner
              in pdf form
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                ["Expected Salary CTC (Yearly)", "expectedSalaryCTCYearly"],
                ["Expected Salary Inhand (Monthly)", "expectedSalaryInhandMonthly"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Upload Photo
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                className="w-full p-3 border border-[#d9d9d9] rounded-md bg-white"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-[#7886c7] text-white px-8 py-3 rounded-md font-medium hover:bg-[#6b7bc0] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
