import Blog from '../models/Blog.js';

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username email');

    return res.json({ success: true, products: blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get single blog
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    return res.json({ success: true, post: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.userId,
      authorName: req.username
    });

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      post: blog
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this blog' });
    }

    const { title, content } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    return res.json({
      success: true,
      message: 'Blog updated successfully',
      post: blog
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();

    return res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's blogs
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId }).sort({ createdAt: -1 });
    return res.json({ success: true, products: blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
