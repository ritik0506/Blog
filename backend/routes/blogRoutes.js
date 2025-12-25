import express from 'express';
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
} from '../controllers/blogController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Compatibility routes for existing frontend
router.get('/get-blog', getAllBlogs);
router.get('/post/:id', getBlog);

// REST-style routes
router.get('/', getAllBlogs);
router.get('/my-blogs', authMiddleware, getMyBlogs);
router.get('/:id', getBlog);
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;
