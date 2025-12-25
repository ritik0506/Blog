import express from 'express';
import { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controller/blogController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlog);

// Protected routes (require authentication)
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

export default router;
