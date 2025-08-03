// routes/notificationRoutes.js
import express from 'express';
import Notification from '../models/notificationModel.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/notify', authMiddleware(['company', 'candidate']), async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipientId: req.user.id,
      recipientModel: req.user.role === 'company' ? 'Company' : 'Candidate'
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
});

export default router;


// to be deleted