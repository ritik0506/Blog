import Blog from '../model/blogModel.js';

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get single blog by ID
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide title and content' 
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      image: image || undefined, // Use default if not provided
      author: req.user.id
    });

    // Populate author details
    await blog.populate('author', 'name email');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this blog' 
      });
    }

    const { title, content, image } = req.body;

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (image !== undefined) blog.image = image;

    await blog.save();
    await blog.populate('author', 'name email');

    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to delete this blog' 
      });
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
