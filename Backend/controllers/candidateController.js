import Candidate from '../models/candidateModel.js';
import Job from '../models/jobModel.js';
import Notification from '../models/notificationModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Signup
export const signupCandidate = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create candidate
    const newCandidate = await Candidate.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Create welcome notification (optional)
    await Notification.create({
      recipientId: newCandidate._id,
      recipientModel: "Candidate",
      message: "Welcome to the recruitment platform!",
    });

    res.status(201).json({ message: "Candidate registered successfully", candidate: newCandidate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Login
export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) return res.status(401).json({ message: 'Unauthorized' });

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email, id: candidate._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Login successful', token, candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout
export const logoutCandidate = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Complete profile
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
      return res.status(404).json({ message: 'Candidate not found' });
    }

    await Notification.create({
  recipientId: candidateId,                 // ✅ Correct field name
  recipientModel: 'Candidate',              // ✅ Required to support polymorphic ref
  message: 'Your profile is now complete! You can start applying for jobs.',
});

    res.status(200).json({ message: 'Profile completed', candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update profile
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
      return res.status(404).json({ message: 'Candidate not found' });
    }

    await Notification.create({
      recipientId: candidateId,                 // ✅ Correct field name
  recipientModel: 'Candidate',
      message: 'Your profile has been updated.',
      type: 'profile'
    });

    res.status(200).json({ message: 'Profile updated', candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const { candidateId, jobId } = req.body;

    const candidate = await Candidate.findById(candidateId);
    const job = await Job.findById(jobId);

    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    if (!job || !job.isPublished) return res.status(403).json({ message: 'Invalid job or not published' });

    if (!candidate.isProfileComplete) {
      return res.status(400).json({ message: 'Please complete your profile before applying' });
    }

    const alreadyApplied = candidate.applications.some(app => app.jobId.toString() === jobId);
    if (alreadyApplied) {
      return res.status(409).json({ message: 'Already applied for this job' });
    }

    candidate.applications.push({ jobId, status: 'pending' });
    await candidate.save();

    await Notification.create({
      recipientId: candidateId,                 // ✅ Correct field name
  recipientModel: 'Candidate',
      message: `You have applied for the job: "${job?.jobPosition}". Awaiting review.`,
      type: 'application'
    });

    res.status(200).json({ message: 'Job applied, awaiting review', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const getCandidateNotifications = async (req, res) => {
  try {
    const candidateId = req.user.id;
    console.log("Fetching notifications for candidate:", candidateId);

    const notifications = await Notification.find({
      recipientId: new mongoose.Types.ObjectId(candidateId),
      recipientModel: "Candidate"
    }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error in getCandidateNotifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

