import mongoose from 'mongoose';
import SuperAdmin from '../models/superAdminModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const seedSuperAdmin = async () => {
  try {
    console.log('MONGO_URL:', process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD;

    // ✅ check by the same email
    const existingSuperAdmin = await SuperAdmin.findOne({ email });
    if (existingSuperAdmin) {
      console.log('Super Admin already exists');
      process.exit(0);
    }

    // ✅ hash password from env
    const hashedPassword = await bcrypt.hash(password, 10);

    await SuperAdmin.create({ email, password: hashedPassword });

    console.log('Super Admin seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedSuperAdmin();
