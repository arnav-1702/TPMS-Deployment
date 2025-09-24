import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function JobApplicationForm() {
  const { jobId } = useParams(); // ✅ get jobId from URL
  const [jobDetails, setJobDetails] = useState(null); // ✅ add jobDetails state
  const [formData, setFormData] = useState({
    fullName: "", // ✅ added fullName
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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/job/getjob/${jobId}`);
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
    <form onSubmit={handleSubmit} className="min-h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-[25%] bg-gradient-to-b from-indigo-700 via-indigo-600 to-indigo-500 text-white p-6 flex flex-col items-center space-y-8 overflow-hidden">
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="Registration Illustration"
          className="w-48 h-48 object-contain mt-4"
        />
        <h2 className="text-xl font-semibold text-center leading-snug">
          Apply Online for Your Dream Job
        </h2>
        <p className="text-center text-sm opacity-90 leading-relaxed px-2">
          Fill out your personal and professional information carefully to complete your application.
        </p>
        <div className="flex flex-col items-center space-y-6">
          <img
            src="/assets/wearehiring.png"
            alt="We are hiring"
            className="w-36 h-24 object-contain"
          />
          <img
            src="/assets/handshake.png"
            alt="Handshake Illustration"
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[75%] bg-white">
        <div className="flex justify-between items-center p-6 border-b border-gray-300">
          <h1 className="text-xl font-medium text-gray-800">
            {jobDetails
              ? `${jobDetails.jobPosition} | ${jobDetails.companyId?.companyName}`
              : "Loading job..."}
          </h1>
          <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 max-w-4xl">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-gray-800">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              {[["Full Name", "fullName"],
                ["Age", "age"],
                ["City of Residence", "cityOfResidence"],
                ["Home Town", "homeTown"],
                ["Years of Experience", "yearsOfExperience"],
                ["Email", "email"],
                ["Contact Number", "contactNumber"]].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Educational Background */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-gray-800">Educational Background</h2>
            <div className="grid grid-cols-2 gap-6">
              {[["10th Percentage", "tenthPercentage"],
                ["12th Percentage", "twelfthPercentage"],
                ["Bachelors Degree Name", "bachelorsDegree"],
                ["Bachelors College Name", "bachelorsCollege"],
                ["Masters Degree Name", "mastersDegree"],
                ["Masters College Name", "mastersCollege"],
                ["Bachelors CGPA", "bachelorsCGPA"],
                ["Masters CGPA", "mastersCGPA"]].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Previous/Current Company */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-gray-800">Previous/Current Company (not for freshers)</h2>
            <div className="grid grid-cols-2 gap-6">
              {[["Company Name", "companyName"],
                ["Company Location", "companyLocation"],
                ["Job Position", "jobPosition"],
                ["Years in Company", "yearsInCompany"],
                ["Salary CTC (Yearly)", "salaryCTCYearly"],
                ["Salary CTC (Monthly)", "salaryCTCMonthly"],
                ["Salary Inhand (Yearly)", "salaryInhandYearly"],
                ["Salary Inhand (Monthly)", "salaryInhandMonthly"],
                ["Are You on Notice Period", "onNoticePeriod"],
                ["Notice Period Duration", "noticePeriodDuration"]].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Describe About Your Skills in Short</label>
              <textarea
                name="skillsSummary"
                value={formData.skillsSummary}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white h-24 resize-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason For Job Change</label>
              <textarea
                name="reasonForJobChange"
                value={formData.reasonForJobChange}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white h-24 resize-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              {[["PAN India Job Location (Yes / No)", "panIndiaLocation"],
                ["Preferred Job Location", "preferredLocation"]].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resume & Salary */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6 text-gray-800">Resume Upload</h2>
            <p className="text-sm text-gray-600 mb-4">
              Upload your resume with a photograph on top right hand side corner in pdf form
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[["Expected Salary CTC (Yearly)", "expectedSalaryCTCYearly"],
                ["Expected Salary Inhand (Monthly)", "expectedSalaryInhandMonthly"]].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-500 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
