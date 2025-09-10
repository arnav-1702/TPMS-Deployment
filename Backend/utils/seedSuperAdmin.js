import mongoose from 'mongoose';
import SuperAdmin from '../models/superAdminModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const seedSuperAdmin = async () => {
  try {
    console.log('MONGO_URL:', process.env.MONGO_URL); // Debug log to confirm env is loaded
    await mongoose.connect(process.env.MONGO_URL);

    const existingSuperAdmin = await SuperAdmin.findOne({ email: 'superadmin@xai.com' });
    if (existingSuperAdmin) {
      console.log('Super Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('superadmin123', 10);
    const superAdmin = {
      email: 'superadmin@123.com',
      password: hashedPassword
    };

    await SuperAdmin.create(superAdmin);
    console.log('Super Admin seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedSuperAdmin();
