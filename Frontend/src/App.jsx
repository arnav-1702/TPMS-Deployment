import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SuperAdminLogin from './superAdmin.jsx/SuperAdminLogin';
import SuperAdminDashboard from './superAdmin.jsx/SuperAdminDashboard';
import { SignUpCandidate } from './components/Signup/SignUpCandidate';
import { LoginCandidate } from './components/Signup/LoginCandidate';
import { SignUpCompany } from './components/Signup/SignUpCompany';
import { LoginCompany } from './components/Signup/LoginCompany';
import { Home } from './components/home/Home.jsx';
import { VerifyOtp } from './components/Signup/VerifyOtp.jsx';
import JobDetailsPage from './candidate/JobDetailsPage';
import { CommonSignup } from './components/Signup/CommonSignup';
import { CommonLogin } from './components/Signup/CommonLogin';
import { VerifyCompanyOtp } from './components/Signup/VerifyCompanyOtp';
import { CompanyPendingApproval } from './components/Signup/CompanyPendingApproval';
import JobCards from './candidate/JobCards';
import JobCard from './candidate/JobCard';
import { PostJob } from './company/PostJob';
import FindJob from './candidate/FindJob';

import ProtectedRoute from '../Authentication/ProtectedRoute';

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
            path="/postjob"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <PostJob />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
