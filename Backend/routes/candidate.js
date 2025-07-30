import express from 'express';
import {
  signupCandidate,
  loginCandidate,
  logoutCandidate,
  applyJob,
  completeCandidateProfile,
  updateCandidateProfile
} from '../controllers/candidateController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/signup', signupCandidate);
router.post('/login', loginCandidate);

// Protected Routes (require auth token)
router.post('/logout', authMiddleware, logoutCandidate);
router.post('/apply', authMiddleware, applyJob);
router.put('/complete-profile/:candidateId', authMiddleware, completeCandidateProfile);
router.put('/update-profile/:candidateId', authMiddleware, updateCandidateProfile);

export default router;
