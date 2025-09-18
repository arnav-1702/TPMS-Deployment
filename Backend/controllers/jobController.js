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
    const jobs = await Job.find({ isValid: true, isPublished: true })
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
      "companyName description culture careerGrowth email"
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

export const getVerificationJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isValid: false }).sort({ postedDate: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Verified & active jobs
export const getActiveJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isValid: true, isPublished: true, active: true })
      .sort({ postedDate: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};