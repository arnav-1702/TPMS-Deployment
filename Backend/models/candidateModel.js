import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  positionAppliedFor: { type: String },
  experience: { type: String },
  expectedCTC: { type: Number },
  expectedInHandSalary: { type: Number },
  location: { type: String },
  isProfileComplete: { type: Boolean, default: false },
  skills: { type: [String] },
  noticePeriod: { type: Number },
  resume: { type: String },
  educationalBackground: { type: String },
  reasonForJobChange: { type: String },
  concernPersonNumber: { type: String },
  previousCompany: { type: String },
  dateOfBirth: { type: Date },
  isExperienced: { type: Boolean },
  applications: [{
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    appliedDate: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Candidate', CandidateSchema);
