import React from "react";
import { Routes, Route } from "react-router-dom";

import SuperAdminLogin from "./superAdmin.jsx/SuperAdminLogin";
import SuperAdminDashboard from "./superAdmin.jsx/SuperAdminDashboard";
import { SignUpCandidate } from "./components/Signup/SignUpCandidate";
import { LoginCandidate } from "./components/Signup/LoginCandidate";
import { SignUpCompany } from "./components/Signup/SignUpCompany";
import { LoginCompany } from "./components/Signup/LoginCompany";
import { Home } from "./components/home/Home.jsx";
import { VerifyOtp } from "./components/Signup/VerifyOtp.jsx";
import JobDetailsPage from "./candidate/JobDetailsPage";
import { CommonSignup } from "./components/Signup/CommonSignup";
import { CommonLogin } from "./components/Signup/CommonLogin";
import { VerifyCompanyOtp } from "./components/Signup/VerifyCompanyOtp";
import { CompanyPendingApproval } from "./components/Signup/CompanyPendingApproval";
import JobCards from "./candidate/JobCards";
import JobCard from "./candidate/JobCard";
import { PostJob } from "./company/PostJob";
import FindJob from "./candidate/FindJob";

import ProtectedRoute from "../Authentication/ProtectedRoute";
import AppliedJobs from "./candidate/AppliedJobs/AppliedJobs";
import AppliedJobDetails from "./candidate/AppliedJobs/AppliedJobDetails";
import JobApplicationForm from "./candidate/JobApplicationForm";
import JobDashboard from "./company/JobDashboard";
import AdminLogin from "./Admin/AdminLogin";
import JobVerification from "./company/jobverification/JobVerification";
import CompanyJobDetailsPage from "./company/jobverification/CompanyJobDetailsPage";
import ShortlistedCandidates from "./company/shortlistedcandidates/ShortlistedCandidates";
import AllCandidates from "./company/shortlistedcandidates/AllCandidates";
import AdminDashboard from "./Admin/AdminDashboard";
import ActiveJob from "./Admin/ActiveJobs/ActiveJob";
import CompanyVerification from "./Admin/CompanyVerification/CompanyVerification";
import CompanyVerificationDetails from "./Admin/CompanyVerification/CompanyVerificationDetails";
import JobVerificationAdmin from "./Admin/JobVerification/JobVerificationAdmin";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superadminlogin" element={<SuperAdminLogin />} />

          {/* 🔐 Protected superadmin route */}
          <Route
            path="/superadmindashboard"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/signupcandidate" element={<SignUpCandidate />} />
          <Route path="/logincandidate" element={<LoginCandidate />} />
          <Route path="/signupcompany" element={<SignUpCompany />} />
          <Route path="/logincompany" element={<LoginCompany />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/commonsignup" element={<CommonSignup />} />
          <Route path="/commonlogin" element={<CommonLogin />} />
          <Route path="/verify-company-otp" element={<VerifyCompanyOtp />} />
          <Route path="/company-pending" element={<CompanyPendingApproval />} />

          {/* 🔐 Candidate only */}
          <Route
            path="/findajob"
            element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <FindJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-detail/:id"
            element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <JobDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* 🔐 Company only */}
          <Route
            path="/company/job/:id"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CompanyJobDetailsPage></CompanyJobDetailsPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/postjobform"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobverification"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobVerification/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appliedjobs"
            element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />

          <Route path="/applied-job/:id" element={<AppliedJobDetails />} />
          <Route
            path="/job/:jobId/apply"
            element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <JobApplicationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postajob"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobDashboard></JobDashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminlogin"
            element={
              
                <AdminLogin></AdminLogin>
              
            }
          />

          <Route
            path="/company/shortlistcandidate"
            element={
              
                <ShortlistedCandidates></ShortlistedCandidates>
              
            }
          />
          <Route path="/jobs/:jobId/candidates" element={<AllCandidates />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/active-jobs"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ActiveJob></ActiveJob>
              </ProtectedRoute>
            }
          />
          {/* /admin/active-jobs */}
          
           <Route
            path="/admin/company-verification"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CompanyVerification></CompanyVerification>
              </ProtectedRoute>
            }
          />
          <Route path="/company/:id" element={<CompanyVerificationDetails />} />
          <Route
            path="/job-verification"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <JobVerificationAdmin></JobVerificationAdmin>
              </ProtectedRoute>
            }
          />
          
          
        </Routes>

        
      </div>
    </div>
  );
}

export default App;
