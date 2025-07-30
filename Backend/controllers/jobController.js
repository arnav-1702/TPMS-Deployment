import Job from "../models/jobModel.js";
import Company from "../models/companyModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      companyId,
      jobPosition,
      requirements,
      experienceRequired,
      salaryBudget,
      location,
    } = req.body;
    const company = await Company.findById(companyId);

    if (!company || !company.isApproved) {
      return res
        .status(403)
        .json({ message: "Company not approved or not found" });
    }

    const job = new Job({
      companyId,
      jobPosition,
      requirements,
      experienceRequired,
      salaryBudget,
      location,
    });
    await job.save();
    res.status(201).json({ message: "Job posted, awaiting validation", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
