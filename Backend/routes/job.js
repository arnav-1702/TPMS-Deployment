import express from "express";
const router = express.Router();

import { getActiveJobs, getAppliedJobs, getJobById, getJobs, getVerificationJobs, postJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import { uploadImage, uploadResume } from "../middleware/multer.js";

// Public routes
router.get("/getjobs", getJobs);
router.get("/getjob/:id", getJobById);

// Protected routes (need login)
router.post("/post", authMiddleware, uploadImage.single("companyLogo"), postJob);
router.get("/applied", authMiddleware, getAppliedJobs);
router.get("/verification", getVerificationJobs); // pending verification
router.get("/active", getActiveJobs);
export default router;
