import express from 'express';
const router = express.Router();
import { postJob } from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use(authMiddleware); // Protect all job routes
router.post('/post', postJob);

export default router;