import express from 'express';
const router = express.Router();
import { signupCompany, loginCompany, logoutCompany, updateCompany, verifyCompanyOtp, getJobCandidates, getCompanyJobs, getCandidateDetails } from '../controllers/companyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getCompanyNotifications } from '../controllers/companyController.js';
router.post('/signup', signupCompany);
router.post('/verify-otp', verifyCompanyOtp);
router.post('/login', loginCompany);
router.post('/logout', authMiddleware, logoutCompany);
router.put('/update', authMiddleware, updateCompany);
router.get('/notifications', authMiddleware, getCompanyNotifications);

router.get("/jobs", authMiddleware, getCompanyJobs);

// Get shortlisted candidates for a specific job
// GET /company/jobs/:jobId/candidates
router.get("/jobs/:jobId/candidates", authMiddleware, getJobCandidates);
router.get("/candidate/:jobId/:candidateId", authMiddleware, getCandidateDetails);
export default router;