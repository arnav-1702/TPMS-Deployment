import express from 'express';
const router = express.Router();
import { getJobById, getJobs, postJob } from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use(authMiddleware); // Protect all job routes
router.post('/post', postJob);
router.get('/getjobs',getJobs);
router.get("/getjob/:id", getJobById); 
export default router;