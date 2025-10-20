import React, { useState } from "react";
import { signupCandidateAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const SignUpCandidate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signupCandidateAPI({
        name: form.fullName,
        email: form.email,
        password: form.password,
      });

      // store candidate info in localStorage
      localStorage.setItem(
        "candidate",
        JSON.stringify({ name: form.fullName, email: form.email })
      );

      // Directly navigate to login or dashboard instead of verify-otp
      navigate("/candidate-login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      <div className="flex flex-col justify-center items-start px-8 sm:px-12 md:px-16 lg:px-20 bg-white py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Sign Up as a Candidate
        </h1>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label
              htmlFor="fullName"
              className="block text-base md:text-lg font-medium text-gray-800 mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"
            />
          </div>

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
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base md:text-lg font-medium text-gray-800 mb-2"
            >
              Create Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base md:text-lg font-medium text-gray-800 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full sm:w-40 py-2 bg-[#a9b5df] text-black rounded-md shadow-md hover:bg-[#9aa5d0] transition-colors"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#2d336b] text-white px-6 sm:px-10 py-10">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center">
          Hello Welcome ! <br /> Let&apos;s create your new account
        </h2>
        <p className="text-base md:text-lg mb-8 text-gray-200 text-center">
          Join us and find the dream job you are looking for.
        </p>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="Online registration"
          className="w-[250px] sm:w-[300px] md:w-[400px] h-auto"
        />
      </div>
    </div>
  );
};