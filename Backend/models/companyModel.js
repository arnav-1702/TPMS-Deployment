import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyDomain: { type: String, required: true },
  description: { type: String },
  culture: { type: String },
  careerGrowth: { type: String },
  disclaimer: { type: String },

  loginCredentials: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },

  // New fields for signup + verification
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false }, // ✅ verify by OTP
  isApproved: { type: Boolean, default: false }, // ✅ approved by admin

  role: { type: String, default: "company" },
  signupDate: { type: Date, default: Date.now },
});

export default mongoose.model("Company", CompanySchema);
