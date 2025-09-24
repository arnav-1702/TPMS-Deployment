import express from "express";
const router = express.Router();

import { approveJob, deleteJob, deleteJobAdmin, getActiveJobs, getAppliedJobs, getJobByAdminId, getJobById, getJobs, getJobsForVerification, getVerificationJobs, getVerifiedJobs, postJob, rejectJob, toggleActiveJob } from "../controllers/jobController.js";
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
router.get("/admin/getjob/:id", authMiddleware, getJobByAdminId);

router.put("/admin/approve/:id", authMiddleware, approveJob);

// Reject a pending job
router.put("/admin/reject/:id", authMiddleware, rejectJob);

// Delete a job
router.delete("/admin/delete/:id", authMiddleware, deleteJobAdmin);

export default router;
