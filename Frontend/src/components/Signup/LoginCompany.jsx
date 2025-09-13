import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCompanyAPI } from "../../services/api"; // ✅ make sure this is added in services/api.js
import { AuthContext } from "../../../Authentication/AuthProvider"

export const LoginCompany = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginCompanyAPI({ email, password });

      // ✅ Save company info in localStorage
      localStorage.setItem("company", JSON.stringify(res.data.company));

      alert("Login successful!");
      
      login("company", res.data.company)
      navigate("/"); // or navigate("/company-dashboard") if you have one
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      {/* Left Side - Card */}
      <div className="flex flex-col justify-center items-center bg-white py-10 px-6 sm:px-10 lg:px-20">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Login as Company
          </h1>
          <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">
            Welcome Back!
          </h2>

          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* Error */}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-base md:text-lg font-medium text-gray-800 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-base md:text-lg font-medium text-gray-800 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#a9b5df] text-black rounded-md hover:bg-[#9aa5d0] transition-colors"
            >
              {loading ? "Logging in..." : "Login as Company"}
            </button>
          </form>

          {/* Extra link */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/signupcompany"
              className="text-[#2d336b] font-semibold hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Welcome */}
      <div className="flex flex-col justify-center items-center bg-[#2d336b] text-white px-6 sm:px-10 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Login Into Your Company Account <br /> and Manage Your Hiring
        </h2>
        <p className="text-base md:text-lg mb-8 text-gray-200 text-center">
          Post jobs, review candidates, and hire the best talent.
        </p>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="Login illustration"
          className="w-[250px] sm:w-[300px] md:w-[350px] h-auto"
        />
      </div>
    </div>
  );
};
