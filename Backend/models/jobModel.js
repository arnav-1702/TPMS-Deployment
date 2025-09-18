import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  companyName: { type: String }, 
  domain: { type: String },
  jobPosition: { type: String, required: true },
  experienceRequired: { type: String },
  jobDescription: { type: String },
  salaryBudget: { type: String },
  workType: { type: String },
 skills: { type: [String], default: [] },
  location: { type: String },
  noticePeriodRequired: { type: String },
  openings: { type: String },
  urgencyStatus: { type: String },
  concernedPerson: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  competitiveCompanies: { type: String },
  keyQualities: { type: String },
  companyLogo: { type: String },

  // ✅ Important: keep consistent field types (avoid duplicate keys)
  openingsCount: { type: Number, default: 1 },   // renamed to avoid conflict
  skillsArray: { type: [String], default: [] },  // renamed to avoid conflict

  isValid: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },

  // ✅ New field
  active: { type: Boolean, default: true } // company can activate/deactivate job
});

export default mongoose.model('Job', JobSchema);
