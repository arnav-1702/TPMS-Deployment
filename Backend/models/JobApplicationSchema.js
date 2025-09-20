import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },

  candidates: [
    {
      candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },

      // Personal Info
      age: Number,
      cityOfResidence: String,
      homeTown: String,
      yearsOfExperience: Number,
      email: String,
      contactNumber: String,

      // Education
      tenthPercentage: Number,
      twelfthPercentage: Number,
      bachelorsDegree: String,
      bachelorsCollege: String,
      mastersDegree: String,
      mastersCollege: String,
      bachelorsCGPA: String,
      mastersCGPA: String,

      // Work
      companyName: String,
      companyLocation: String,
      jobPosition: String,
      yearsInCompany: Number,
      salaryCTCYearly: Number,
      salaryCTCMonthly: Number,
      salaryInhandYearly: Number,
      salaryInhandMonthly: Number,
      onNoticePeriod: String,
      noticePeriodDuration: String,

      // Extras
      skillsSummary: String,
      reasonForJobChange: String,
      panIndiaLocation: String,
      preferredLocation: String,

      // Expected Salary
      expectedSalaryCTCYearly: Number,
      expectedSalaryInhandMonthly: Number,

      // Files
      photo: String,
      resume: String,

      // Application status
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    }
  ]
}, { timestamps: true });

export default mongoose.model("JobApplication", JobApplicationSchema);
