import React, { useState } from "react";

export const PostJob = () => {
  const [form, setForm] = useState({
    companyName: "",
    domain: "",
    jobPosition: "",
    experienceRequired: "",
    jobDescription: "",
    salary: "",
    workType: "",
    skillsRequired: "",
    location: "",
    noticePeriodRequired: "",
    numberOfCandidates: "",
    urgencyStatus: "",
    concernedPerson: "",
    email: "",
    phoneNumber: "",
    competitiveCompanies: "",
    keyQualities: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Data:", form);
    // you can call your API here
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center items-start px-8 sm:px-12 md:px-16 lg:px-20 bg-[#2d336b] text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <p className="text-base md:text-lg mb-8 text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit
        </p>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="illustration"
          className="w-[250px] sm:w-[300px] md:w-[350px] h-auto"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-start px-6 sm:px-10 md:px-16 py-10 bg-white overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Post a Job Opening</h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" onSubmit={handleSubmit}>
          <input id="companyName" type="text" placeholder="Company Name" value={form.companyName} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="domain" type="text" placeholder="Domain" value={form.domain} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <input id="jobPosition" type="text" placeholder="Job Position" value={form.jobPosition} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="experienceRequired" type="text" placeholder="Experience Required" value={form.experienceRequired} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <textarea id="jobDescription" placeholder="Job Description" value={form.jobDescription} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full col-span-2 h-28" />

          <input id="salary" type="text" placeholder="Salary" value={form.salary} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="workType" type="text" placeholder="Work Type" value={form.workType} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <input id="skillsRequired" type="text" placeholder="Skills Required" value={form.skillsRequired} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="location" type="text" placeholder="Location" value={form.location} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <input id="noticePeriodRequired" type="text" placeholder="Notice Period Required" value={form.noticePeriodRequired} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="numberOfCandidates" type="text" placeholder="Number of Candidates Required" value={form.numberOfCandidates} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <input id="urgencyStatus" type="text" placeholder="Urgency Status" value={form.urgencyStatus} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="concernedPerson" type="text" placeholder="Concerned Person" value={form.concernedPerson} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <input id="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
          <input id="phoneNumber" type="text" placeholder="Phone number" value={form.phoneNumber} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />

          <input id="competitiveCompanies" type="text" placeholder="Competitive Companies" value={form.competitiveCompanies} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full col-span-2" />

          <textarea id="keyQualities" placeholder="Key Qualities" value={form.keyQualities} onChange={handleChange} className="border border-gray-400 rounded-md px-3 py-2 w-full col-span-2 h-20" />

          <button type="submit" className="col-span-2 mt-4 w-full sm:w-40 py-2 bg-[#a9b5df] text-black rounded-md shadow-md hover:bg-[#9aa5d0] transition-colors">
            Send for Validation
          </button>
        </form>
      </div>
    </div>
  );
};
