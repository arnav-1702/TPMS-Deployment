import React from "react";
import Common from "../../../assets/commonsign.png";
import { Link } from "react-router-dom";

export const CommonSignup = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      {/* Left Side */}
      <div className="flex flex-col justify-between bg-white py-10 px-6 sm:px-12 md:px-16 lg:px-20">
        <div>
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-10">
            Choose Your Role
          </h1>

          {/* Card */}
          <div className="shadow-lg rounded-2xl p-8 max-w-lg ml-10">
            <h2 className="text-3xl font-semibold text-center mb-3">
              Make a new account
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p className="font-medium mb-3 text-2xl">Choose how to SignUp</p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link
                  to="/signupcandidate"
                  className="flex items-center hover:text-blue-600"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                  <span className="text-xl text-gray-900">Candidate</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/signupcompany"
                  className="flex items-center hover:text-blue-600"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                  <span className="text-xl text-gray-900">Company</span>
                </Link>
              </li>
            </ul>

            <p className="text-xl mt-6 text-center">
              Already have an account?{" "}
              <Link to="/commonlogin"><span className="text-green-600 cursor-pointer hover:underline">
                Login
              </span></Link>
              
            </p>
          </div>
        </div>

        {/* Left Illustration */}
        <img
          src={Common}
          alt="Candidate Illustration"
          className="w-[220px] sm:w-[280px] md:w-[320px] mx-auto mt-10"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center bg-[#2d336b] text-white px-6 sm:px-10 py-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-center">
          Hello Welcome ! <br /> Let&apos;s create your new account
        </h2>
        <p className="text-sm md:text-base lg:text-lg mb-8 text-gray-200 text-center max-w-md">
          Join us and find the dream job you are looking for.
        </p>
        <img
          src="https://c.animaapp.com/mf6p998s03ui1q/img/online-registration-and-sign-up-on-computer.png"
          alt="Online registration"
          className="w-[220px] sm:w-[280px] md:w-[350px] h-auto"
        />
      </div>
    </div>
  );
};
