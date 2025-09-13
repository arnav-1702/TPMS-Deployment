import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  companyName: { type: String }, // new
  domain: { type: String },
  jobPosition: { type: String, required: true },
  experienceRequired: { type: String },
  jobDescription: { type: String },
  salaryBudget: { type: String }, // changed to String since form takes text
  workType: { type: String },
  skills: { type: String }, // new (plain string, not array)
  location: { type: String },
  noticePeriodRequired: { type: String }, // new
  openings: { type: String }, // new
  urgencyStatus: { type: String }, // new
  concernedPerson: { type: String }, // new
  email: { type: String }, // new
  phoneNumber: { type: String }, // new
  competitiveCompanies: { type: String }, // new
  keyQualities: { type: String }, // new
  companyLogo: { type: String }, // new → will store image URL / path

  // keep previous fields to not break old controllers
  openings: { type: Number, default: 1 },
  skills: { type: [String] },
  isValid: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false }
});

export default mongoose.model('Job', JobSchema);
