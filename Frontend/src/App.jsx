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


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/superadminlogin" element={<SuperAdminLogin/>} />
          <Route path="/superadmindashboard" element={<SuperAdminDashboard/>} />
          <Route path="/signupcandidate" element={<SignUpCandidate/>} />
          <Route path="/logincandidate" element={<LoginCandidate/>} />
          <Route path="/signupcompany" element={<SignUpCompany/>} />
          <Route path="/logincompany" element={<LoginCompany/>} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/companyid/jobid/jobdetails" element={<JobDetailsPage />} />
          <Route path="/commonsignup" element={<CommonSignup />} />
          <Route path="/commonlogin" element={<CommonLogin />} />
          <Route path="/verify-company-otp" element={<VerifyCompanyOtp />} />
          <Route path="/company-pending" element={<CompanyPendingApproval />} />
          <Route path="/findajob" element={<FindJob/>} />
          <Route path="/postjob" element={<PostJob/>} />
          <Route path="/job-detail/:id" element={<JobDetailsPage/>} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;