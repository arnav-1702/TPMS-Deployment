import express from 'express';
const router = express.Router();
import { loginAdmin, approveCompany, validateJob, reviewApplication, logoutAdmin, getAllJobs, getTotalCandidates, getTotalCompanies, getMonthlyJobPostings, getMonthlyJobApplications, getActiveJobs, getApprovedCompanies, disapproveCompany, rejectCompany, getJobById, getCandidatesByJobId, getCandidateProfile } from '../controllers/adminController.js';
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
router.get("/getactivejobs", getActiveJobs);
router.get("/company/verification", getPendingCompanies);
router.get("/company/verified", getApprovedCompanies);
router.put("/company/approve/:id", approveCompany);
router.delete("/company/reject/:id", rejectCompany);
router.put("/company/disapprove/:id", disapproveCompany);


// applications
router.get("/job/:jobId", getJobById);

// ✅ Get candidates for a job
router.get("/job/:jobId/candidates", getCandidatesByJobId);

router.get("/candidate/:candidateId", getCandidateProfile);
export default router;