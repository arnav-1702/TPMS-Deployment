import express from "express";
const router = express.Router();

import { getJobById, getJobs, postJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadImage, uploadResume } from "../middleware/multer.js";

// Public routes
router.get("/getjobs", getJobs);
router.get("/getjob/:id", getJobById);

// Protected routes (need login)
router.post("/post", authMiddleware, uploadImage.single("companyLogo"), postJob);

export default router;
