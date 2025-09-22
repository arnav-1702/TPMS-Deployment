import express from 'express';
const router = express.Router();
import { loginAdmin, approveCompany, validateJob, reviewApplication, logoutAdmin, getAllJobs, getTotalCandidates, getTotalCompanies, getMonthlyJobPostings, getMonthlyJobApplications } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getPendingCompanies, getPendingJobs } from '../controllers/companyController.js';

router.post('/login', loginAdmin); // Public route for admin login
router.use(authMiddleware); // Protect subsequent routes
router.post('/approve-company', approveCompany);
router.post('/validate-job', validateJob);
router.post('/review-application', reviewApplication);
router.post('/logout', logoutAdmin);
router.get('/get-all-jobs', getAllJobs); // New route to fetch all jobs
router.get('/gettotalcandidates', getTotalCandidates); // New route to fetch all jobs
router.get('/gettotalcompanies', getTotalCompanies); // New route to fetch all jobs
router.get("/getpendingcompanies", getPendingCompanies);
router.get("/getpendingjobs", getPendingJobs);
router.get("/monthlyjobpostings",  getMonthlyJobPostings);
router.get("/monthlyjobapplications", getMonthlyJobApplications);

export default router;