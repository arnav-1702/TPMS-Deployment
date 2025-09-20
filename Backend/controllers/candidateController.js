import Candidate from "../models/candidateModel.js";
import Job from "../models/jobModel.js";
import Notification from "../models/notificationModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
// import Job from "../models/jobModel.js";
dotenv.config();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ================= AUTH ================= //

// Signup with OTP
export const signupCandidate = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 3 * 60 * 1000); // 10 min

    // We send the email first. Note: SMTP can still accept then bounce later.
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      });
    } catch (err) {
      // Immediate SMTP failure (bad domain, connectivity, bad creds, etc.)
      return res
        .status(400)
        .json({ message: "Could not send OTP. Invalid or unreachable email." });
    }

    // Save candidate (unverified). If the address is fake and bounces later,
    // the TTL index will auto-delete this doc after otpExpiry.
    await Candidate.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
      authProvider: "local",
      role: "candidate",
    });

    res
      .status(201)
      .json({
        message: "OTP sent to email. Please verify to activate account.",
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    if (!candidate.otp || !candidate.otpExpiry) {
      return res
        .status(400)
        .json({ message: "No OTP pending for this account." });
    }

    if (candidate.otp !== otp || candidate.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    candidate.isVerified = true;
    candidate.otp = null;
    candidate.otpExpiry = null;
    await candidate.save();

    await Notification.create({
      recipientId: candidate._id,
      recipientModel: "Candidate",
      message: "Welcome to the recruitment platform!",
      role: "candidate",
    });

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) return res.status(401).json({ message: "Unauthorized" });

    if (!candidate.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // ✅ include role inside JWT payload
    const token = jwt.sign(
      { email, id: candidate._id, role: candidate.role || "candidate" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ send as HttpOnly cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    // ✅ also send role in JSON response
    res.status(200).json({
      message: "Login successful",
      token,
      candidate: {
        _id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        role: candidate.role || "candidate", // always included
        isProfileComplete: candidate.isProfileComplete,
        applications: candidate.applications,
        // add other fields as needed
      },
    });
    console.log("Login successful:", {
  status: 200,
  token,
  role: candidate.role || "candidate",
});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Google Signin
export const googleSignin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let candidate = await Candidate.findOne({ email });
    if (!candidate) {
      candidate = await Candidate.create({
        name,
        email,
        password: null,
        isVerified: true,
        authProvider: "google",
      });
    }

    const jwtToken = jwt.sign(
      { id: candidate._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", jwtToken, { httpOnly: true, maxAge: 3600000 });
    res
      .status(200)
      .json({
        message: "Google sign-in successful",
        token: jwtToken,
        candidate,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Google login failed", error: error.message });
  }
};

// Logout
export const logoutCandidate = async (req, res) => {
  try {
   res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= PROFILE ================= //

export const completeCandidateProfile = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const updateData = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { ...updateData, isProfileComplete: true },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Notification.create({
      recipientId: candidateId,
      recipientModel: "Candidate",
      message: "Your profile is now complete! You can start applying for jobs.",
    });

    res
      .status(200)
      .json({ message: "Profile completed", candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCandidateProfile = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const updateData = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      updateData,
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Notification.create({
      recipientId: candidateId,
      recipientModel: "Candidate",
      message: "Your profile has been updated.",
      type: "profile",
    });

    res
      .status(200)
      .json({ message: "Profile updated", candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= JOB ================= //

export const applyJob = async (req, res) => {
  try {
    const { candidateId, jobId } = req.body;

    const candidate = await Candidate.findById(candidateId);
    const job = await Job.findById(jobId);

    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    if (!job || !job.isPublished)
      return res.status(403).json({ message: "Invalid job or not published" });

    // ✅ Removed isProfileComplete check

    const alreadyApplied = candidate.applications.some(
      (app) => app.jobId.toString() === jobId
    );
    if (alreadyApplied) {
      return res.status(409).json({ message: "Already applied for this job" });
    }

    candidate.applications.push({ jobId, status: "pending" });
    await candidate.save();

    await Notification.create({
      recipientId: candidateId,
      recipientModel: "Candidate",
      message: `You have applied for the job: "${job?.jobPosition}". Awaiting review.`,
      type: "application",
    });

    res
      .status(200)
      .json({ message: "Job applied, awaiting review", candidate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ================= NOTIFICATIONS ================= //

export const getCandidateNotifications = async (req, res) => {
  try {
    const candidateId = req.user.id;

    const notifications = await Notification.find({
      recipientId: new mongoose.Types.ObjectId(candidateId),
      recipientModel: "Candidate",
    }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};

// Get all applied jobs for a candidate
// Get all applied jobs for a candidate
// Get all applied jobs for a candidate
export const getAppliedJobs = async (req, res) => {
  try {
    const candidateId = req.user.id;

    const candidate = await Candidate.findById(candidateId).populate({
      path: "applications.jobId", // populate job details
      match: { active: true, isPublished: true, isValid: true }, // ✅ active + published + valid
      select: `
        companyName companyLogo jobPosition domain experienceRequired workType salaryBudget 
        location isPublished isValid jobDescription skills keyQualities postedDate openings companyId
      `,
      populate: {
        path: "companyId",
        select: "companyName description careerGrowth culture", // include company details
      },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Filter out null jobs (inactive/unpublished/invalid removed by match)
    const appliedJobs = candidate.applications
      .filter(app => app.jobId !== null)
      .map(app => ({
        job: app.jobId,
        status: app.status,
      }));

    res.status(200).json({ appliedJobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
