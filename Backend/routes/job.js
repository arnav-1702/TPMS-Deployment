import express from "express";
const router = express.Router();

import { deleteJob, getActiveJobs, getAppliedJobs, getJobById, getJobs, getJobsForVerification, getVerificationJobs, getVerifiedJobs, postJob, toggleActiveJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import { uploadImage, uploadResume } from "../middleware/multer.js";

// Public routes
router.get("/getjobs", getJobs);
router.get("/getjob/:id", getJobById);

// Protected routes (need login)
router.post("/post", authMiddleware, uploadImage.single("companyLogo"), postJob);
router.get("/applied", authMiddleware, getAppliedJobs);
router.get("/verification", authMiddleware, getVerificationJobs);
router.get("/active", authMiddleware, getActiveJobs);

router.put("/:id", authMiddleware, toggleActiveJob);
router.delete("/delete/:id", authMiddleware, deleteJob);

router.get("/admin/job/verification", authMiddleware, getJobsForVerification);
router.get("/admin/job/verified", authMiddleware, getVerifiedJobs);
export default router;
