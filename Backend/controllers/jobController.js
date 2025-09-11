import Job from "../models/jobModel.js";
import Company from "../models/companyModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      companyId,
      jobPosition,
      domain,
      experienceRequired,
      workType,
      salaryBudget,
      location,
      openings,
      jobDescription,
      skills,
      keyQualities,
    } = req.body;

    // 1. Check if required fields are present
    if (!companyId || !jobPosition || !location) {
      return res.status(400).json({ message: "companyId, jobPosition, and location are required" });
    }

    // 2. Verify company exists and is approved
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (!company.isApproved) {
      return res.status(403).json({ message: "Company is not approved to post jobs" });
    }

    // 3. Create job
    const job = new Job({
      companyId,
      jobPosition: jobPosition.trim(),
      domain: domain?.trim(),
      experienceRequired,
      workType,
      salaryBudget,
      location: location.trim(),
      openings: openings || 1,
      jobDescription: jobDescription?.trim(),
      skills: skills || [],
      keyQualities: keyQualities || [],
    });

    // 4. Save job
    await job.save();

    res.status(201).json({
      message: "Job posted successfully (awaiting admin validation)",
      job,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all jobs (only published & valid ones for candidates)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isValid: true, isPublished: true })
      .populate("companyId", "companyName logo email")
      .sort({ postedDate: -1 });

    // Don’t block frontend, just return empty list
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

