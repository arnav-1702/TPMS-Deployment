import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";
import { applyForJob } from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/job/:jobId/apply",
  authMiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  applyForJob
);

export default router;
