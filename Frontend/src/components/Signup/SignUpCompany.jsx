import React, { useState } from "react";
import { signupCompanyAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const SignUpCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyDomain: "",
    description: "",
    culture: "",
    careerGrowth: "",
    disclaimer: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await signupCompanyAPI(formData);

      // store email for OTP verification
      localStorage.setItem("company", JSON.stringify({ email: formData.email }));

      alert(res.data.message);
      navigate("/verify-company-otp");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-[3fr_2fr] overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-start mb-10 md:justify-center items-start px-6 sm:px-12 md:px-20 bg-white pt-16 md:pt-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 md:mt-10">
          Sign Up as a Company
        </h1>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {/* Company Name + Domain */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyName" className="block text-base font-medium text-gray-800 mb-2">
                Company Name
              </label>
              <input id="companyName" type="text" value={formData.companyName} onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-3 py-2" />
            </div>
            <div>
              <label htmlFor="companyDomain" className="block text-base font-medium text-gray-800 mb-2">
                Company Domain
              </label>
              <input id="companyDomain" type="text" value={formData.companyDomain} onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-3 py-2" />
            </div>
          </div>

          {/* Company Description */}
          <div>
            <label htmlFor="description" className="block text-base font-medium text-gray-800 mb-2">
              Company Description
            </label>
            <textarea id="description" rows="3" value={formData.description} onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"></textarea>
          </div>

          {/* Work Culture */}
          <div>
            <label htmlFor="culture" className="block text-base font-medium text-gray-800 mb-2">
              Company Work Culture
            </label>
            <textarea id="culture" rows="2" value={formData.culture} onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"></textarea>
          </div>

          {/* Career Growth */}
          <div>
            <label htmlFor="careerGrowth" className="block text-base font-medium text-gray-800 mb-2">
              Career Growth and Development
            </label>
            <textarea id="careerGrowth" rows="2" value={formData.careerGrowth} onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"></textarea>
          </div>

          {/* Legal Disclaimer */}
          <div>
            <label htmlFor="disclaimer" className="block text-base font-medium text-gray-800 mb-2">
              Legal Disclaimer
            </label>
            <textarea id="disclaimer" rows="2" value={formData.disclaimer} onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"></textarea>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-800 mb-2">
              Email
            </label>
            <input id="email" type="email" value={formData.email} onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2" />
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-800 mb-2">
                Create Password
              </label>
              <input id="password" type="password" value={formData.password} onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-3 py-2" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-800 mb-2">
                Confirm Password
              </label>
              <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-3 py-2" />
            </div>
          </div>

          {/* Button */}
          <div className="flex flex-col md:flex-row items-center gap-4 ">
            <button type="submit"
              className="w-full md:w-44 py-2 bg-[#a9b5df] text-black rounded-md hover:bg-[#9aa5d0] transition-colors">
              Create Account
            </button>
            <p className="text-base">
              Already have an account?{" "}
              <a href="/commonlogin" className="text-green-600 hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center bg-[#2d336b] text-white px-6 sm:px-12 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-center md:text-left">
          Hello Welcome ! <br /> Let’s create your new account
        </h2>
        <p className="text-lg md:text-xl mb-10 text-gray-200 text-center md:text-left">
          Join us and find the dream job you are looking for.
        </p>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="Signup illustration"
          className="max-w-full h-auto mb-8"
        />
        <p className="text-base md:text-lg text-gray-300 text-center md:text-left leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};
