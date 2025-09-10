import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // adjust if needed
  withCredentials: true,
});

// ---------------- Candidate APIs ----------------
export const signupCandidateAPI = (data) =>
  API.post("/candidate/signup", data);

export const verifyOtpAPI = (data) =>
  API.post("/candidate/verify-otp", data);

export const loginCandidateAPI = (data) =>
  API.post("/candidate/login", data);

// ---------------- Company APIs ----------------
export const signupCompanyAPI = (data) =>
  API.post("/company/signup", {
    companyName: data.companyName,
    companyDomain: data.companyDomain,
    description: data.description,
    culture: data.culture,
    careerGrowth: data.careerGrowth,
    disclaimer: data.disclaimer,
    email: data.email,       // ✅ send flat
    password: data.password, // ✅ send flat
  });



export const verifyCompanyOtpAPI = (data) =>
  API.post("/company/verify-otp", data);

export const loginCompanyAPI = (data) =>
  API.post("/company/login", {
    email: data.email,
    password: data.password,
  });


  // Candidate Logout
export const logoutCandidateAPI = () =>
  API.post("/candidate/logout");

// Company Logout
export const logoutCompanyAPI = () =>
  API.post("/company/logout");
