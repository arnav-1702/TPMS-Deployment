import Admin from '../models/adminModel.js';
import Company from '../models/companyModel.js';
import Job from '../models/jobModel.js';
import Candidate from '../models/candidateModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered', admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Unauthorized' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email, id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const approveCompany = async (req, res) => {
  try {
    const { companyId, status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Check if user is Super Admin
    if (req.user.role === 'superadmin') {
      const company = await Company.findById(companyId);
      if (!company) return res.status(404).json({ message: 'Company not found' });

      company.isApproved = status === 'approved';
      await company.save();
      res.status(200).json({ message: 'Company approval updated by Super Admin', company });
      return;
    }

    // Regular admin check
    const admin = await Admin.findOne({ email: req.user.email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    company.isApproved = status === 'approved';
    await company.save();
    admin.actions.push({ type: 'companyApproval', entityId: companyId, status, actionDate: new Date() });
    await admin.save();

    res.status(200).json({ message: 'Company approval updated', company });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const validateJob = async (req, res) => {
  try {
    const { jobId, status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (req.user.role === 'superadmin') {
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ message: 'Job not found' });

      job.isValid = status === 'approved';
      job.isPublished = status === 'approved';
      await job.save();
      res.status(200).json({ message: 'Job validation updated by Super Admin', job });
      return;
    }

    const admin = await Admin.findOne({ email: req.user.email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.isValid = status === 'approved';
    job.isPublished = status === 'approved';
    await job.save();
    admin.actions.push({ type: 'jobValidation', entityId: jobId, status, actionDate: new Date() });
    await admin.save();

    res.status(200).json({ message: 'Job validation updated', job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const reviewApplication = async (req, res) => {
  try {
    const { candidateId, jobId, status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (req.user.role === 'superadmin') {
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

      const application = candidate.applications.find(app => app.jobId.toString() === jobId);
      if (!application) return res.status(404).json({ message: 'Application not found' });

      application.status = status;
      await candidate.save();
      res.status(200).json({ message: 'Application review updated by Super Admin', candidate });
      return;
    }

    const admin = await Admin.findOne({ email: req.user.email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const application = candidate.applications.find(app => app.jobId.toString() === jobId);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = status;
    await candidate.save();
    admin.actions.push({ type: 'applicationReview', entityId: candidateId, status, actionDate: new Date() });
    await admin.save();

    res.status(200).json({ message: 'Application review updated', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    if (req.user.role === 'superadmin') {
      const jobs = await Job.find().populate('companyId', 'companyName');
      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found" });
      }
      res.status(200).json({ message: "Jobs retrieved successfully by Super Admin", jobs });
      return;
    }

    const admin = await Admin.findOne({ email: req.user.email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const jobs = await Job.find().populate('companyId', 'companyName');
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json({ message: "Jobs retrieved successfully", jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};