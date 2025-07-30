import Candidate from '../models/candidateModel.js';
import Job from '../models/jobModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Signup
export const signupCandidate = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const candidate = new Candidate({
      name,
      email,
      password: hashedPassword,
      isProfileComplete: false
    });

    await candidate.save();

    const token = jwt.sign({ email, id: candidate._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(201).json({ message: 'Candidate registered', token, candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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

// Complete profile (initial full form submission)
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

    res.status(200).json({ message: 'Profile completed', candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update profile (partial updates anytime)
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

    res.status(200).json({ message: 'Job applied, awaiting review', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
