import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [pendingCompanies, setPendingCompanies] = useState(0);
  const [pendingJobs, setPendingJobs] = useState(0);
  const [jobChartData, setJobChartData] = useState([]);
  const [applicationsChartData, setApplicationsChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          candidatesRes,
          companiesRes,
          pendingCompaniesRes,
          pendingJobsRes,
          monthlyJobsRes,
          monthlyApplicationsRes,
        ] = await Promise.all([
          axios.get("/admin/gettotalcandidates", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/admin/gettotalcompanies", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/admin/getpendingcompanies", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/admin/getpendingjobs", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/admin/monthlyjobpostings", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/admin/monthlyjobapplications", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        setTotalCandidates(candidatesRes.data.totalCandidates);
        setTotalCompanies(companiesRes.data.totalCompanies);
        setPendingCompanies(pendingCompaniesRes.data.totalPendingCompanies);
        setPendingJobs(pendingJobsRes.data.totalPendingJobs);
        setJobChartData(monthlyJobsRes.data.chartData);
        setApplicationsChartData(monthlyApplicationsRes.data.chartData);
      } catch (err) {
        console.error("Failed to fetch data:", err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  const maxJobValue = Math.max(...jobChartData.map((d) => d.value), 1);

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const menuItems = [
    { label: "Home", path: "/admin/dashboard" },
    { label: "Active Jobs", path: "/admin/active-jobs" },
    { label: "Shortlist Applicants", path: "/shortlist-applicants" },
    { label: "Company Verification", path: "/admin/company-verification" },
    { label: "Job Verification", path: "/job-verification" },
    { label: "Logout", path: "/logout", isLogout: true },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("/admin/logout", null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("role");
      navigate("/adminlogin");
    } catch (err) {
      console.error("Logout failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#ebfaff]">
      {/* Sidebar */}
      <div className="w-full md:w-64 h-20 md:h-screen bg-white shadow-sm flex flex-col justify-between">
        <div className="p-6">
          <div className="w-20 h-16 rounded bg-gray-600" />
        </div>
        <nav className="flex-1 flex flex-col px-6 space-y-2 md:space-y-6">
          {menuItems.map((item, idx) =>
            item.isLogout ? (
              <div
                key={idx}
                onClick={handleLogout}
                className="py-2 px-4 text-base font-medium hover:bg-gray-100 rounded-md cursor-pointer text-[#2d336b]"
              >
                {item.label}
              </div>
            ) : (
              <Link key={idx} to={item.path}>
                <div className="py-2 px-4 text-base font-medium hover:bg-gray-100 rounded-md text-[#2d336b]">
                  {item.label}
                </div>
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            Welcome Back, Admin!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: totalCompanies, label: "Registered Companies" },
              { value: pendingCompanies, label: "Pending Company Verifications" },
              { value: totalCandidates, label: "Registered Candidates" },
              { value: pendingJobs, label: "Pending Job Verifications" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex flex-col justify-center"
              >
                <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-black">
                  {item.value}
                </div>
                <div className="text-sm md:text-base text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Bar Chart: Monthly Job Postings */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex flex-col">
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-black">
              Monthly New Job Postings
            </h3>
            <div className="relative flex-1">
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs md:text-sm text-gray-600">
                <span>{Math.ceil(maxJobValue)}</span>
                <span>{Math.ceil(maxJobValue * 0.66)}</span>
                <span>{Math.ceil(maxJobValue * 0.33)}</span>
                <span>0</span>
              </div>
              <div className="ml-6 h-48 md:h-64 flex items-end justify-between gap-1">
                {jobChartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-1 md:gap-2">
                    <div
                      className="w-3 md:w-4 rounded-t"
                      style={{
                        backgroundColor: "#2d336b",
                        height: `${(data.value / maxJobValue) * 100}%`,
                      }}
                    />
                    <span className="text-xs md:text-sm text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 flex items-center justify-center">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
              <PieChart width={160} height={160}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={35}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          {/* Line Chart: Monthly Job Applications */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 flex items-center justify-center">
            <div className="w-full">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-black">
                Monthly Job Applications
              </h3>
              <LineChart
                width={300}
                height={200}
                data={applicationsChartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis dataKey="month" tick={{ fill: "#666565" }} />
                <YAxis tick={{ fill: "#666565" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2d336b" strokeWidth={2} />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
