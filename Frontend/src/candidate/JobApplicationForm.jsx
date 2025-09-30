import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function JobApplicationForm() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [step, setStep] = useState(1); // ✅ step control
  const [formData, setFormData] = useState({
    fullName: "",
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
    fresher: "No",
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
        const res = await axios.get(`https://tpms-live.onrender.com/job/getjob/${jobId}`);
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

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
        `https://tpms-live.onrender.com/candidateapplication/job/${jobId}/apply`,
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
      </div>

      {/* Main Content */}
      <div className="w-[75%] bg-white">
        <div className="flex justify-between items-center p-6 border-b border-gray-300">
          <h1 className="text-xl font-medium text-gray-800">
            {jobDetails
              ? `${jobDetails.jobPosition} | ${jobDetails.companyId?.companyName}`
              : "Loading job..."}
          </h1>
        </div>

        <div className="p-8 max-w-4xl">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div>
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
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-500 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Educational Background */}
          {step === 2 && (
            <div>
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
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-500 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Employment Information */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-medium mb-6 text-gray-800">Previous/Current Company</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Are You a Fresher?</label>
                <select
                  name="fresher"
                  value={formData.fresher}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {formData.fresher === "No" && (
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
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Summary</label>
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

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-500 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Job Preferences & Resume Upload */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-medium mb-6 text-gray-800">Job Preferences & Uploads</h2>

              <div className="grid grid-cols-2 gap-6">
                {[["PAN India Job Location (Yes / No)", "panIndiaLocation"],
                  ["Preferred Job Location", "preferredLocation"],
                  ["Expected Salary CTC (Yearly)", "expectedSalaryCTCYearly"],
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

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-500 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </form>
  );
}
