import Admin from "../models/adminModel.js";
import Company from "../models/companyModel.js";
import Job from "../models/jobModel.js";
import Candidate from "../models/candidateModel.js";
import Notification from "../models/notificationModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import JobApplicationSchema from "../models/JobApplicationSchema.js";

dotenv.config();

export const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email, id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const approveCompany = async (req, res) => {
//   try {
//     const { companyId, status } = req.body;
//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const company = await Company.findById(companyId);
//     if (!company) return res.status(404).json({ message: "Company not found" });

//     company.isApproved = status === "approved";
//     await company.save();

//     // Notification to company
//     await Notification.create({
//       recipientId: company._id,
//       recipientModel: "Company",
//       message: `Your company has been ${status} by the admin.`,
//     });

//     if (req.user.role !== "superadmin") {
//       const admin = await Admin.findOne({ email: req.user.email });
//       if (!admin) return res.status(404).json({ message: "Admin not found" });

//       admin.actions.push({
//         type: "companyApproval",
//         entityId: companyId,
//         status,
//         actionDate: new Date(),
//       });
//       await admin.save();
//     }

//     res.status(200).json({ message: "Company approval updated", company });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const validateJob = async (req, res) => {
  try {
    const { jobId, status } = req.body;

    // Step 1: Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Step 2: Find job
    const job = await Job.findById(jobId).populate("companyId");
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Step 3: Check for duplicate validation
    if (job.isValid && status === "approved") {
      return res.status(400).json({ message: "Job is already approved" });
    }
    if (!job.isValid && status === "rejected") {
      return res.status(400).json({ message: "Job is already rejected" });
    }

    // Step 4: Update job status
    job.isValid = status === "approved";
    job.isPublished = status === "approved";
    await job.save();

    // Step 5: Notify the company
    await Notification.create({
      recipientId: job.companyId._id,
      recipientModel: "Company",
      message: `Your job "${job.title || "posting"}" has been ${status} by the admin.`,
    });

    // Step 6: Log action if not superadmin
    if (req.user.role !== "superadmin") {
      const admin = await Admin.findOne({ email: req.user.email });
      if (!admin) return res.status(404).json({ message: "Admin not found" });

      admin.actions.push({
        type: "jobValidation",
        entityId: jobId,
        status,
        actionDate: new Date(),
      });
      await admin.save();
    }

    // Step 7: Respond
    res.status(200).json({ message: `Job ${status} successfully`, job });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const reviewApplication = async (req, res) => {
  try {
    const { candidateId, jobId, status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    const application = candidate.applications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await candidate.save();

    // Notify candidate
    await Notification.create({
      recipientId: candidate._id,
      recipientModel: "Candidate",
      message: `Your application for job ID ${jobId} has been ${status}.`,
    });
    console.log(`Notification sent to ${status} ${recipientModel}: ${message}`);


    if (req.user.role !== "superadmin") {
      const admin = await Admin.findOne({ email: req.user.email });
      if (!admin) return res.status(404).json({ message: "Admin not found" });

      admin.actions.push({
        type: "applicationReview",
        entityId: candidateId,
        status,
        actionDate: new Date(),
      });
      await admin.save();
    }

    res.status(200).json({ message: "Application review updated", candidate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("companyId", "companyName");
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({
      message:
        req.user.role === "superadmin"
          ? "Jobs retrieved successfully by Super Admin"
          : "Jobs retrieved successfully",
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTotalCandidates = async (req, res) => {
  try {
    // Count all candidates in the database
    const totalCandidates = await Candidate.countDocuments();

    res.status(200).json({
      message: "Total candidates retrieved successfully",
      totalCandidates,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching total candidates",
      error: error.message,
    });
  }
};
export const getTotalCompanies = async (req, res) => {
  try {
    // Count all candidates in the database
    
    const totalCompanies = await Company.countDocuments();

    res.status(200).json({
      message: "Total candidates retrieved successfully",
      totalCompanies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching total candidates",
      error: error.message,
    });
  }
};



export const getMonthlyJobPostings = async (req, res) => {
  try {
    // Aggregate jobs by month
    const jobsByMonth = await Job.aggregate([
      {
        $group: {
          _id: { $month: "$signupDate" }, // or "$createdAt" if you have timestamps
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } }, // Sort by month
    ]);

    // Transform to frontend-friendly format
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const chartData = months.map((month, idx) => {
      const monthData = jobsByMonth.find((m) => m._id === idx + 1);
      return { month, value: monthData ? monthData.count : 0 };
    });

    res.status(200).json({ message: "Monthly job postings retrieved", chartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMonthlyJobApplications = async (req, res) => {
  try {
    // Fetch all candidates with their applications
    const candidates = await Candidate.find({}, "applications");

    // Initialize months
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const chartData = months.map(month => ({ month, value: 0 }));

    // Count applications per month
    candidates.forEach(candidate => {
      candidate.applications.forEach(app => {
        const date = new Date(app.appliedAt || app.createdAt || Date.now());
        const monthIndex = date.getMonth();
        chartData[monthIndex].value += 1;
      });
    });

    res.status(200).json({ chartData });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getActiveJobs = async (req, res) => {
  try {
    let jobs = [];

    if (req.user.role === "admin") {
      // Admin sees ALL active jobs
      jobs = await Job.find({ isValid: true, isPublished: true })
        .populate("companyId", "companyName companyLogo")
        .sort({ postedDate: -1 });
    } else if (req.user.role === "company") {
      // Company sees only their own jobs
      const companyId = new mongoose.Types.ObjectId(req.user.id);
      jobs = await Job.find({ companyId, isValid: true, isPublished: true })
        .populate("companyId", "companyName companyLogo")
        .sort({ postedDate: -1 });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// controllers/companyController.js


// ✅ Get all companies pending approval
export const getPendingCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isApproved: false })
      .select("companyName companyDomain companyLogo signupDate isVerified");

    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "No pending companies found" });
    }

    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all approved companies
export const getApprovedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isApproved: true })
      .select("companyName companyDomain companyLogo signupDate isVerified");

    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "No approved companies found" });
    }

    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company approved successfully", company });
  } catch (error) {
    res.status(500).json({ message: "Error approving company", error: error.message });
  }
};

// Reject company (delete permanently)
export const rejectCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company rejected and deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting company", error: error.message });
  }
};

// Disapprove company (set back to not approved)
export const disapproveCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company disapproved successfully", company });
  } catch (error) {
    res.status(500).json({ message: "Error disapproving company", error: error.message });
  }
};




// ✅ Get job details by ID
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate("companyId", "companyName companyLogo");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get candidates who applied for a job
export const getCandidatesByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    const jobApplication = await JobApplicationSchema.findOne({ jobId }).populate("candidates.candidateId", "fullName email");
    if (!jobApplication) {
      return res.status(404).json({ message: "No applications found for this job" });
    }

    res.status(200).json({ success: true, candidates: jobApplication.candidates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
