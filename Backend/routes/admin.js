import express from 'express';
const router = express.Router();
import { loginAdmin, approveCompany, validateJob, reviewApplication, logoutAdmin, getAllJobs } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/login', loginAdmin); // Public route for admin login
router.use(authMiddleware); // Protect subsequent routes
router.post('/approve-company', approveCompany);
router.post('/validate-job', validateJob);
router.post('/review-application', reviewApplication);
router.post('/logout', logoutAdmin);
router.get('/get-all-jobs', getAllJobs); // New route to fetch all jobs

export default router;