import Company from '../models/companyModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signupCompany = async (req, res) => {
  try {
    const { companyName, domain, email, password, location, noticePeriod } = req.body;
    if (!companyName || !domain || !email || !password || !location || !noticePeriod) {
      return res.status(400).json({ message: 'Company name, domain, email, password, location, and notice period are required' });
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
    if (noticePeriod <= 0) return res.status(400).json({ message: 'Notice period must be positive' });

    const existingCompany = await Company.findOne({ 'loginCredentials.email': email });
    if (existingCompany) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({ 
      companyName, 
      domain, 
      loginCredentials: { email, password: hashedPassword }, 
      location, 
      noticePeriod, 
      isApproved: false 
    });
    await company.save();

    res.status(201).json({ message: 'Company registered, awaiting approval', company });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ 'loginCredentials.email': email });
    if (!company || !company.isApproved) {
      return res.status(401).json({ message: 'Unauthorized or not approved' });
    }

    const isMatch = await bcrypt.compare(password, company.loginCredentials.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: company.loginCredentials.email, id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const logoutCompany = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyId, jobPosition, requirements, experienceRequired, salaryBudget, noticePeriod, location, urgencyStatus, noOfCandidatesRequired, competitorCompanyName } = req.body;
    const company = await Company.findById(companyId);

    if (!company || !company.isApproved) {
      return res.status(403).json({ message: 'Company not approved or not found' });
    }

    if (jobPosition) company.jobPosition = jobPosition;
    if (requirements) company.requirements = requirements;
    if (experienceRequired) company.experienceRequired = experienceRequired;
    if (salaryBudget) company.salaryBudget = salaryBudget;
    if (noticePeriod) company.noticePeriod = noticePeriod;
    if (location) company.location = location;
    if (urgencyStatus) company.urgencyStatus = urgencyStatus;
    if (noOfCandidatesRequired) company.noOfCandidatesRequired = noOfCandidatesRequired;
    if (competitorCompanyName) company.competitorCompanyName = competitorCompanyName;

    await company.save();
    res.status(200).json({ message: 'Company updated', company });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};