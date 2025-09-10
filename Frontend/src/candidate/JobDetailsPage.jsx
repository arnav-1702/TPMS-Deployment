// JobDetailsPage.jsx
import Footer from "@/components/home/Footer";
import Navbar from "../components/home/Navbar";
import React from "react";

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Job Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">Data Analyst</h2>
              <p className="text-gray-600 text-base">Hitachi</p>
              <p className="text-gray-500 mt-2 text-sm">
                Domain: Technology | Experience: Fresher | Work Type: Hybrid | Salary: Not Disclosed
              </p>
              <p className="text-gray-500 mt-1 text-sm">
                Location: Mumbai, Pune, Bangalore
              </p>
            </div>
            {/* Company Logo */}
            <div className="w-20 h-20 bg-gray-300 rounded-md shadow-sm"></div>
          </div>

          <div className="flex justify-between mt-4 text-gray-500 text-sm">
            <span>Posted: 5 days ago</span>
            <span>Openings: 20</span>
          </div>
          <br></br>
          <hr class="border border-gray-400 my-6" />

          <div className="mt-4 flex justify-end">
            <button className="px-5 py-1.5 bg-blue-600 text-white rounded-md shadow text-sm font-medium">
              Applied
            </button>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold text-2xl">
            Application Status : <span className="text-green-600">Approved</span>
          </h3>
        </div>

        {/* Job Description */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold text-xl mb-4">Job Description</h3>

          <div className="mb-4">
            <h4 className="font-semibold text-lg">Job Roles & Responsibilities:</h4>

            <div className="mt-3">
              <p className="font-medium">1. Business Intelligence:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 text-sm">
                <li>Develop, maintain, and enhance dashboards and reports using tools such as Power BI, Tableau, or Looker.</li>
                <li>Collaborate with business stakeholders to gather requirements and translate them into meaningful visualizations.</li>
                <li>Analyze datasets to provide actionable insights and support business decisions.</li>
                <li>Monitor report performance and data accuracy.</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-medium">2. Data Engineering:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 text-sm">
                <li>Assist in building and maintaining ETL/ELT data pipelines using tools such as SQL, Python, ADF, and Snowflake.</li>
                <li>Clean, transform, and load data from multiple sources into data warehouses ADLS and Snowflake.</li>
                <li>Support data modeling efforts (e.g., star/snowflake schema) to improve reporting efficiency.</li>
                <li>Document data sources, definitions, and processes.</li>
                <li>Stay informed about the latest technology trends within the industry.</li>
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-lg">Skills:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 text-sm">
              <li>Strong SQL skills and familiarity with relational databases.</li>
              <li>Basic experience in one or more BI tools (e.g., Power BI, Tableau).</li>
              <li>Familiarity with scripting languages like Python or R.</li>
              <li>Understanding of data warehousing concepts and ETL processes.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg">Key Qualities:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 text-sm">
              <li>Strong SQL skills and familiarity with relational databases.</li>
              <li>Basic experience in one or more BI tools (e.g., Power BI, Tableau).</li>
              <li>Familiarity with scripting languages like Python or R.</li>
              <li>Understanding of data warehousing concepts and ETL processes.</li>
            </ul>
          </div>
        </div>

        {/* Company Description */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold text-xl mb-4">Company Description</h3>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Since its founding in 1910, Hitachi has responded to the expectations of society and its customers through technology and innovation...
          </p>

          <h4 className="font-semibold text-lg mb-2">Career Growth and Development</h4>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Hitachi places a strong emphasis on continuous learning and professional growth for its employees...
          </p>

          <h4 className="font-semibold text-lg mb-2">Work Culture</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            Hitachi is known for its collaborative and inclusive work culture that values innovation, teamwork, and respect for diversity...
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
