import express from "express";
const router = express.Router();

import { deleteJob, getActiveJobs, getAppliedJobs, getJobById, getJobs, getVerificationJobs, postJob, toggleActiveJob } from "../controllers/jobController.js";
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
export default router;
