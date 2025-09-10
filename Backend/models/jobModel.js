import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  jobPosition: { type: String, required: true },
  domain: { type: String }, // new
  experienceRequired: { type: String },
  workType: { type: String }, // new
  salaryBudget: { type: Number },
  location: { type: String },
  openings: { type: Number, default: 1 }, // new
  jobDescription: { type: String }, // new
  skills: { type: [String] }, // new
  keyQualities: { type: [String] }, // new
  isValid: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false }
});

export default mongoose.model('Job', JobSchema);
