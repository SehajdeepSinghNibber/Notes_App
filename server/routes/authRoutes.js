import express from 'express';
import { registerUser, loginUser, logoutUser, authCheck } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/authCheck', protect, authCheck);

export default router;
