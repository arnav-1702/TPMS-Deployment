import express from 'express';
const router = express.Router();
import { loginSuperAdmin, createAdmin } from '../controllers/superAdminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { logoutSuperAdmin } from '../controllers/superAdminController.js';


router.post('/login', loginSuperAdmin); // Public route for Super Admin login
router.post('/create-admin', authMiddleware, createAdmin); // Protected route to create admins
router.post('/logout', authMiddleware, logoutSuperAdmin);
export default router;