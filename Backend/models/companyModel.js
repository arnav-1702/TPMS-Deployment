import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  domain: { type: String, required: true },
  jobPosition: { type: String },
  requirements: { type: String },
  experienceRequired: { type: String },
  salaryBudget: { type: Number },
  noticePeriod: { type: Number },
  location: { type: String },
  urgencyStatus: { type: String },
  noOfCandidatesRequired: { type: Number },
  competitorCompanyName: { type: String },
  isApproved: { type: Boolean, default: false },
  signupDate: { type: Date, default: Date.now },
  loginCredentials: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
});

export default mongoose.model('Company', CompanySchema);