import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // adjust if needed
  withCredentials: true,
});

export const signupCandidateAPI = (data) => API.post("/candidate/signup", data);
export const verifyOtpAPI = (data) => API.post("/candidate/verify-otp", data);
