import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title must not exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;