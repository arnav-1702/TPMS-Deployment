import React from "react";

export const CompanyPendingApproval = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#2d336b]">
          Company Verification Pending
        </h1>
        <p className="text-gray-600 mb-6">
          Your company email has been verified successfully. 
          <br />
          Our admin team will review your application and approve it shortly.
        </p>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="Verification illustration"
          className="w-60 mx-auto mb-6"
        />
        <p className="text-gray-500 text-sm">
          You’ll receive an email once your account is approved.  
          Please check back later to log in.
        </p>
      </div>
    </div>
  );
};
