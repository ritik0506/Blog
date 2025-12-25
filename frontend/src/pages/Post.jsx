import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const toast = useToast();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API_URL}/api/blog/${id}`);
      if (res.data.success) {
        toast.success('Blog deleted successfully!');
        setTimeout(() => navigate('/'), 500);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  // Calculate reading time
  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-6 rounded-lg shadow-lg text-center">
            <p className="text-6xl mb-4">⚠️</p>
            <p className="text-xl font-semibold mb-2">{error || 'Blog not found'}</p>
            <Link to="/" className="text-purple-600 hover:text-purple-800 underline">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isAuthor = user && blog.author._id === user.id;
  const readingTime = getReadingTime(blog.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Article Card */}
        <article className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover hover:scale-110 transition duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Reading time badge */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-lg">
              ⏱️ {readingTime} min read
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {/* Author Info & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b-2 border-gray-100">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                {/* Author Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {blog.author?.name?.charAt(0).toUpperCase() || '?'}
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {blog.author?.name || 'Anonymous'}
                  </p>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <span>📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>

              {isAuthor && (
                <div className="flex space-x-3">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition font-semibold"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition font-semibold"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t-2 border-gray-100">
              <p className="text-gray-600 font-semibold mb-4">Share this article:</p>
              <div className="flex space-x-3">
                <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition transform hover:scale-110">
                  📘
                </button>
                <button className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition transform hover:scale-110">
                  🐦
                </button>
                <button className="w-12 h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition transform hover:scale-110">
                  📧
                </button>
                <button className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition transform hover:scale-110">
                  💬
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold text-lg group"
          >
            <span className="transform group-hover:-translate-x-1 transition">←</span>
            Back to all posts
          </Link>
          
          {isAuthor && (
            <Link
              to="/my-posts"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold text-lg group"
            >
              My Posts
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Article?</h3>
              <p className="text-gray-600">
                This action cannot be undone. Are you sure you want to delete this blog post?
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  handleDelete();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg text-white rounded-lg font-semibold transition transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
