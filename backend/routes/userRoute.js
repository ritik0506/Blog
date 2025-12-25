import express from 'express';
import { registerUser, loginUser, logoutUser, getMe } from '../controller/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/me', auth, getMe);

export default router;
