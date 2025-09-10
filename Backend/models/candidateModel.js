import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String }, // null for Google accounts
    positionAppliedFor: { type: String },
    experience: { type: String },
    expectedCTC: { type: Number },
    expectedInHandSalary: { type: Number },
    location: { type: String },
    isProfileComplete: { type: Boolean, default: false },
    skills: { type: [String], default: [] },
    noticePeriod: { type: Number },
    resume: { type: String },
    educationalBackground: { type: String },
    reasonForJobChange: { type: String },
    concernPersonNumber: { type: String },
    previousCompany: { type: String },
    dateOfBirth: { type: Date },
    isExperienced: { type: Boolean },

    // Auth-related fields
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    role: { type: String, default: 'candidate' }, // <-- Added role

    applications: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        appliedDate: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// TTL index: auto-delete unverified accounts when otpExpiry passes.
CandidateSchema.index(
  { otpExpiry: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { isVerified: false } }
);

export default mongoose.model('Candidate', CandidateSchema);
