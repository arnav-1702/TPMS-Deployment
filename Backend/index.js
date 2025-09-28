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
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
if (process.env.NODE_ENV === 'production') {
  // Look for the 'dist' folder created by Vite
  app.use(express.static(path.join(__dirname, '../Frontend/dist'))); // <-- CHANGED from 'build' to 'dist'

  app.get('*', (req, res) => {
    // Point to the index.html inside the 'dist' folder
    res.sendFile(path.resolve(__dirname, '../Frontend', 'dist', 'index.html')); // <-- CHANGED from 'build' to 'dist'
  });
}

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

