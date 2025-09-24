import Job from "../models/jobModel.js";
import { uploadToCloudinary } from "../middleware/multer.js";
import JobApplication from "../models/JobApplicationSchema.js";
import Candidate from "../models/candidateModel.js";
// import Job from "../models/jobModel.js";
// POST a new job
export const postJob = async (req, res) => {
  try {
    const {
      companyId,
      companyName,
      domain,
      jobPosition,
      experienceRequired,
      jobDescription,
      salaryBudget,
      workType,
      skills,
      location,
      noticePeriodRequired,
      openings,
      urgencyStatus,
      concernedPerson,
      email,
      phoneNumber,
      competitiveCompanies,
      keyQualities
    } = req.body;

    if (!companyId || !jobPosition) {
      return res.status(400).json({ message: "Company ID and job position are required" });
    }

    // Upload company logo to Cloudinary
    let companyLogo = "";
    if (req.file) {
      companyLogo = await uploadToCloudinary(req.file.buffer);
    }

    // Create job
    const job = new Job({
      companyId,
      companyName,
      domain,
      jobPosition,
      experienceRequired,
      jobDescription,
      salaryBudget,
      workType,
      skills: skills ? skills.split(",").map(s => s.trim()) : [],
      location,
      noticePeriodRequired,
      openings: openings || 1,
      urgencyStatus,
      concernedPerson,
      email,
      phoneNumber,
      competitiveCompanies,
      keyQualities,
      companyLogo,
      isPublished: true
    });

    const createdJob = await job.save();

    // Populate companyId name
    const populatedJob = await Job.findById(createdJob._id)
      .populate("companyId", "companyName")
      .select("-__v");

    res.status(201).json(populatedJob);
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// GET all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isValid: true, isPublished: true, active: true }) // ✅ added isActive
      .populate("companyId", "companyName email") // only basic fields from company
      .sort({ postedDate: -1 });

    // Map jobs to include logo at top level
    const jobsWithLogo = jobs.map(job => ({
      ...job.toObject(),
      companyLogo: job.companyLogo, // top-level logo field
    }));

    res.status(200).json(jobsWithLogo);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// GET job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate(
      "companyId",
      "companyName companyDomain description culture careerGrowth disclaimer email"
    );

    if (!job) return res.status(404).json({ message: "Job not found." });

    // Add companyLogo from job directly
    const jobWithLogo = {
      ...job.toObject(),
      companyLogo: job.companyLogo, // <-- Important
    };

    res.status(200).json(jobWithLogo);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Failed to fetch job details." });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const candidateId = req.user.id;

    // Find candidate and populate jobId inside applications
    const candidate = await Candidate.findById(candidateId)
      .populate("applications.jobId", "jobPosition companyName companyLogo domain location workType salaryBudget postedDate")
      .lean();

    if (!candidate || candidate.applications.length === 0) {
      return res.status(200).json({ message: "No applied jobs found", applications: [] });
    }

    // Sort applications by appliedDate (descending)
    const sortedApplications = candidate.applications.sort(
      (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
    );

    res.status(200).json({
      message: "Applied jobs fetched successfully",
      applications: sortedApplications,
    });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({
      message: "Failed to fetch applied jobs",
      error: error.message,
    });
  }
};

// 📌 Jobs pending verification (only for the logged-in company)
import mongoose from "mongoose";

export const getVerificationJobs = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "company") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    // 🔑 Use req.user.id, convert to ObjectId
    const companyId = new mongoose.Types.ObjectId(req.user.id);

    const jobs = await Job.find({
      companyId: companyId,
      isValid: false
    }).sort({ postedDate: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActiveJobs = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "company") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    const companyId = new mongoose.Types.ObjectId(req.user.id);

    const jobs = await Job.find({
      companyId: companyId,
      isValid: true,
      isPublished: true,
     
    }).sort({ postedDate: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





export const toggleActiveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.active = !job.active;
    await job.save();

    res.status(200).json({ message: "Job status updated", job });
  } catch (error) {
    res.status(500).json({ message: "Error toggling job status", error });
  }
};




export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // 1. Delete job
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2. Remove jobId from candidates' applications
    await Candidate.updateMany(
      { "applications.jobId": jobId },
      { $pull: { applications: { jobId: jobId } } }
    );

    res.status(200).json({ message: "Job deleted successfully and removed from candidates" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error while deleting job", error });
  }
};

// job verification for admin
export const getJobsForVerification = async (req, res) => {
  try {
    // Fetch jobs that are not yet approved/validated
    const pendingJobs = await Job.find({ isValid: false });

    res.status(200).json({
      message: "Pending jobs retrieved successfully",
      totalPendingJobs: pendingJobs.length,
      pendingJobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching pending jobs",
      error: error.message,
    });
  }
};

export const getVerifiedJobs = async (req, res) => {
  try {
    const verifiedJobs = await Job.find({ isValid: true });

    res.status(200).json({
      message: "Verified jobs retrieved successfully",
      totalVerifiedJobs: verifiedJobs.length,
      jobs: verifiedJobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching verified jobs",
      error: error.message,
    });
  }
};






export const getJobByAdminId = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Find job by ID
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Step 2: Find company by job.companyId
    let companyDetails = null;
    if (job.companyId) {
      companyDetails = await Company.findById(job.companyId).select(
        "companyName companyDomain description culture careerGrowth disclaimer companyLogo"
      );
    }

    // Step 3: Merge job + company details
    const jobWithCompany = {
      ...job.toObject(),
      companyDetails: companyDetails ? companyDetails.toObject() : null,
    };

    res.status(200).json(jobWithCompany);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Failed to fetch job details" });
  }
};




export const approveJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.isValid = true; // mark as approved
    await job.save();

    // Optionally populate company info in response
    const populatedJob = await Job.findById(id)
      .populate("companyId", "companyName companyDomain description culture careerGrowth disclaimer");

    res.status(200).json({ message: "Job approved successfully", job: populatedJob });
  } catch (error) {
    console.error("Error approving job:", error);
    res.status(500).json({ message: "Failed to approve job", error: error.message });
  }
};

// Reject a job (mark as invalid)
export const rejectJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.isValid = false; // mark as rejected
    await job.save();

    res.status(200).json({ message: "Job rejected successfully", job });
  } catch (error) {
    console.error("Error rejecting job:", error);
    res.status(500).json({ message: "Failed to reject job", error: error.message });
  }
};

// Delete a job (also remove from candidates' applications)
export const deleteJobAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Remove job from candidates' applications
    await Candidate.updateMany(
      { "applications.jobId": id },
      { $pull: { applications: { jobId: id } } }
    );

    res.status(200).json({ message: "Job deleted successfully and removed from candidates" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};