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
        </Routes>
      </div>
      
    </div>
  );
}

export default App;