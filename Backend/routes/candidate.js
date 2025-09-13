import express from 'express';
import {
  signupCandidate,
  verifyOtp,
  loginCandidate,
  googleSignin,
  logoutCandidate,
  applyJob,
  completeCandidateProfile,
  updateCandidateProfile,
  getCandidateNotifications,
  getAppliedJobs
} from '../controllers/candidateController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔓 Public Routes
router.post('/signup', signupCandidate);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginCandidate);
// router.post('/google-signin', googleSignin);

// 🔒 Protected Routes (require JWT token)
router.post('/logout', authMiddleware, logoutCandidate);
router.post('/apply', authMiddleware, applyJob);
router.put('/complete-profile/:candidateId', authMiddleware, completeCandidateProfile);
router.put('/update-profile/:candidateId', authMiddleware, updateCandidateProfile);
router.get('/notifications', authMiddleware, getCandidateNotifications);
router.get('/appliedjobs',authMiddleware,getAppliedJobs)
export default router;
