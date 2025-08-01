import SuperAdmin from '../models/superAdminModel.js';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) return res.status(401).json({ message: 'Unauthorized' });

    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email, id: superAdmin._id, role: 'superadmin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createAdmin = async (req, res) => {
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

    const superAdmin = await SuperAdmin.findOne({ email: req.user.email });
    superAdmin.createdAdmins.push({ adminId: admin._id });
    superAdmin.actions.push({ type: 'adminCreation', entityId: admin._id });
    await superAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const logoutSuperAdmin = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Super Admin logged out successfully' });
};
