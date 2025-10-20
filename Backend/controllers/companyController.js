import Company from "../models/companyModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Notification from "../models/notificationModel.js";
import Job from "../models/jobModel.js"; 
import JobApplicationSchema from "../models/JobApplicationSchema.js";
dotenv.config();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Signup (send OTP)
// export const signupCompany = async (req, res) => {
//   try {
//     const {
//       companyName,
//       companyDomain,
//       description,
//       culture,
//       careerGrowth,
//       disclaimer,
//       email,
//       password,
//     } = req.body;

//     if (!companyName || !companyDomain || !email || !password) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Company name, domain, email, and password are required",
//         });
//     }

//     if (!validateEmail(email)) {
//       return res.status(400).json({ message: "Invalid email address" });
//     }

//     const existingCompany = await Company.findOne({
//       "loginCredentials.email": email,
//     });
//     if (existingCompany) {
//       return res.status(400).json({ message: "Company already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = generateOTP();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

//     // Send OTP email
//     try {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "Verify your company email",
//         text: Your OTP is ${otp}. It will expire in 10 minutes.,
//       });
//     } catch (err) {
//       return res
//         .status(400)
//         .json({
//           message: "Could not send OTP. Invalid or unreachable email.",
//         });
//     }

//     await Company.create({
//       companyName,
//       companyDomain,
//       description,
//       culture,
//       careerGrowth,
//       disclaimer,
//       loginCredentials: {
//         email,
//         password: hashedPassword,
//       },
//       otp,
//       otpExpiry,
//       isVerified: false,
//       isApproved: false,
//     });

//     res.status(201).json({
//       message: "OTP sent to company email. Please verify to activate account.",
//       company: { companyName, email },
//     });
//   } catch (error) {
//      console.error("SignupCompany Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
export const signupCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyDomain,
      description,
      culture,
      careerGrowth,
      disclaimer,
      email,
      password,
    } = req.body;

    if (!companyName || !companyDomain || !email || !password) {
      return res.status(400).json({
        message: "Company name, domain, email, and password are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const existingCompany = await Company.findOne({
      "loginCredentials.email": email,
    });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Direct registration (no OTP)
    await Company.create({
      companyName,
      companyDomain,
      description,
      culture,
      careerGrowth,
      disclaimer,
      loginCredentials: {
        email,
        password: hashedPassword,
      },
      isVerified: true,  // Automatically verified
      isApproved: false, // Still needs admin approval
    });

    res.status(201).json({
      message: "Company registered successfully. Waiting for admin approval.",
      company: { companyName, email },
    });
  } catch (error) {
    console.error("SignupCompany Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Verify OTP
export const verifyCompanyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const company = await Company.findOne({
      "loginCredentials.email": email,
    });

    if (!company) return res.status(404).json({ message: "Company not found" });

    if (!company.otp || !company.otpExpiry) {
      return res
        .status(400)
        .json({ message: "No OTP pending for this account." });
    }

    if (company.otp !== otp || company.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    company.isVerified = true;
    company.otp = null;
    company.otpExpiry = null;
    await company.save();

    res
      .status(200)
      .json({ message: "Email verified successfully. Awaiting admin approval." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Company
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({
      "loginCredentials.email": email,
    });

    if (!company) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!company.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    if (!company.isApproved) {
      return res.status(403).json({ message: "Company not yet approved by admin." });
    }

    const isMatch = await bcrypt.compare(
      password,
      company.loginCredentials.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ include role in token
    const token = jwt.sign(
      { email: company.loginCredentials.email, id: company._id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ set HttpOnly cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    // ✅ return role and company details
    res.status(200).json({
      message: "Login successful",
      token,
      company: {
        _id: company._id,
        companyName: company.companyName,
        email: company.loginCredentials.email,
        role: "company",
        isApproved: company.isApproved,
        signupDate: company.signupDate,
      },
    });

    // 🔍 Debug log (server-side)
    console.log("Company logged in:", {
      id: company._id,
      email: company.loginCredentials.email,
      role: "company",
      status: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Logout Company
export const logoutCompany = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Company
export const updateCompany = async (req, res) => {
  try {
    const {
      companyId,
      jobPosition,
      requirements,
      experienceRequired,
      salaryBudget,
      noticePeriod,
      location,
      urgencyStatus,
      noOfCandidatesRequired,
      competitorCompanyName,
    } = req.body;

    const company = await Company.findById(companyId);

    if (!company || !company.isApproved) {
      return res
        .status(403)
        .json({ message: "Company not approved or not found" });
    }

    if (jobPosition) company.jobPosition = jobPosition;
    if (requirements) company.requirements = requirements;
    if (experienceRequired) company.experienceRequired = experienceRequired;
    if (salaryBudget) company.salaryBudget = salaryBudget;
    if (noticePeriod) company.noticePeriod = noticePeriod;
    if (location) company.location = location;
    if (urgencyStatus) company.urgencyStatus = urgencyStatus;
    if (noOfCandidatesRequired)
      company.noOfCandidatesRequired = noOfCandidatesRequired;
    if (competitorCompanyName)
      company.competitorCompanyName = competitorCompanyName;

    await company.save();

    res.status(200).json({ message: "Company updated", company });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Company Notifications
export const getCompanyNotifications = async (req, res) => {
  try {
    // Read token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token and decode user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const companyId = decoded.id;

    // Fetch notifications for the authenticated company
    const notifications = await Notification.find({
      recipientId: companyId,
      recipientModel: "Company", // Ensure schema consistency
    }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.log("here something problem");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPendingCompanies = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ isApproved: false });
    res.status(200).json({
      message: "Pending companies retrieved successfully",
      totalPendingCompanies: pendingCompanies.length,
      pendingCompanies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching pending companies",
      error: error.message,
    });
  }
};

export const getPendingJobs = async (req, res) => {
  try {
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




export const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user._id || req.user.id;
    console.log("Fetching jobs for companyId:", companyId);

    const jobs = await Job.find({ companyId }).sort({ postedDate: -1 });

    const jobsWithShortlist = await Promise.all(
      jobs.map(async (job) => {
        const jobApp = await JobApplicationSchema.findOne({ jobId: job._id });
        const shortlistedCount = jobApp?.candidates?.filter(c => c.status === "approved").length || 0;
        return {
          _id: job._id,
          jobPosition: job.jobPosition,
          type: job.type || job.workType,
          location: job.location,
          postedDate: job.postedDate,
          shortlistedCount,
        };
      })
    );

    res.status(200).json(jobsWithShortlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};

// GET shortlisted candidates for a specific job
export const getJobCandidates = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Get the job application and only include approved candidates
    const jobApp = await JobApplicationSchema.findOne({ jobId })
      .populate({
        path: "candidates.candidateId",
        select: "fullName email contactNumber yearsOfExperience",
      });

    if (!jobApp) {
      return res.status(404).json({ message: "No candidates found" });
    }

    // Filter only approved candidates
    const approvedCandidates = jobApp.candidates.filter(c => c.status === "approved");

    res.status(200).json(approvedCandidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch candidates", error: err.message });
  }
};




// export const getCandidateDetails = async (req, res) => {
//   try {
//     const { candidateId } = req.params; // this is the candidateId from URL

//     // Find the JobApplication that contains this candidate
//     const jobApp = await JobApplicationSchema.findOne({
//       "candidates.candidateId": candidateId,
//     });

//     if (!jobApp) {
//       return res.status(404).json({ message: "Candidate not found in any job application" });
//     }

//     // Extract the candidate object from candidates array
//     const candidate = jobApp.candidates.find(
//       (c) => String(c.candidateId) === String(candidateId)
//     );

//     if (!candidate) {
//       return res.status(404).json({ message: "Candidate not found in job application" });
//     }

//     // Only return candidate object
//     res.status(200).json(candidate);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



export const getCandidateDetails = async (req, res) => {
  try {
    const { jobId, candidateId } = req.params;
    console.log("JobId", jobId);
    console.log("candidateId", candidateId);

    // Find the job application first
    const jobApp = await JobApplicationSchema.findOne({ jobId });

    if (!jobApp) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Search for candidate in the candidates array with status approved
    const candidate = jobApp.candidates.find(
      (c) => String(c.candidateId) === String(candidateId) && c.status === "approved"
    );

    if (!candidate) {
      return res.status(404).json({ message: "Approved candidate not found for this job" });
    }

    // Return candidate details
    res.status(200).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};