import express from 'express';
const router = express.Router();
import { getJobs, postJob } from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use(authMiddleware); // Protect all job routes
router.post('/post', postJob);
router.get('/getjobs',getJobs);

export default router;