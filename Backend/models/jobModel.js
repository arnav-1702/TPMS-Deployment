import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  jobPosition: { type: String, required: true },
  requirements: { type: String },
  experienceRequired: { type: String },
  salaryBudget: { type: Number },
  location: { type: String },
  isValid: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false }
});

export default mongoose.model('Job', JobSchema);