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
import candidatesApplicationRoutes from './routes/applicationRoutes.js';
import authRoutes from "./routes/auth.js";

// --- Deployment Imports ---
// The 'path' module is needed for resolving file paths, and 'url' is for __dirname in ES Modules.
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// --- Deployment: __dirname configuration ---
// This is necessary to get the directory name when using ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- CORS Configuration Update ---
// The specific origin 'http://localhost:5173' is removed.
// This allows requests from the same origin when deployed.
app.use(cors({
  credentials: true
}));

// API Routes
app.use('/admin', adminRoutes);
app.use('/company', companyRoutes);
app.use('/job', jobRoutes);
app.use('/candidate', candidateRoutes);
app.use('/superadmin', superAdminRoutes);
app.use('/candidateapplication', candidatesApplicationRoutes);
app.use("/api/auth", authRoutes);

// --- Deployment: Static File Serving ---
// This code block should be placed after all your API routes.
if (process.env.NODE_ENV === 'production') {
  // 1. Serve the static files from the React (frontend) app
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // 2. For any request that doesn't match an API route,
  //    send back the React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
