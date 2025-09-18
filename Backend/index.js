import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import adminRoutes from "./routes/admin.js";
import companyRoutes from "./routes/company.js";
import jobRoutes from "./routes/job.js";
import candidateRoutes from "./routes/candidate.js";
import superAdminRoutes from './routes/superAdmin.js';
import candidatesApplicationRoutes from './routes/applicationRoutes.js'
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/admin', adminRoutes);
app.use('/company', companyRoutes);
app.use('/job', jobRoutes);
app.use('/candidate', candidateRoutes);
app.use('/superadmin', superAdminRoutes);
app.use('/candidateapplication', candidatesApplicationRoutes);

//for frontend auth
app.use("/api/auth", authRoutes);
connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});