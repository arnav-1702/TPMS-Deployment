import mongoose from 'mongoose';
   import Admin from '../models/adminModel.js';
   import bcrypt from 'bcryptjs';
   import dotenv from 'dotenv';

   dotenv.config({ path: '../.env' });

   const seedAdmins = async () => {
     try {
       console.log('MONGO_URL:', process.env.MONGO_URL); // Debug log to check variable
       await mongoose.connect(process.env.MONGO_URL);
       const hashedPassword = await bcrypt.hash('admin@123', 10);

       const admins = [
         { email: 'admintpms@gmail.com', password: hashedPassword },
       ];

       await Admin.insertMany(admins);
       console.log('Admins seeded successfully');
       process.exit(0);
     } catch (error) {
       console.error('Seeding error:', error.message);
       process.exit(1);
     }
   };

   seedAdmins();