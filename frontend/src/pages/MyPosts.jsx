import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useToast } from '../context/ToastContext';

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, published

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    if (user) {
      fetchMyBlogs();
    }
  }, [user]);

  const fetchMyBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blog`);
      if (res.data.success) {
        // Filter blogs by current user
        const myBlogs = res.data.blogs.filter((blog) => blog.author._id === user.id);
        setBlogs(myBlogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await axios.delete(`${API_URL}/api/blog/${id}`);
      if (res.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success('Post deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="h-32 mb-8"></div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            📝 My Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and edit your published articles
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-gray-800">{blogs.length}</p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Words</p>
                <p className="text-3xl font-bold text-gray-800">
                  {blogs.reduce((acc, blog) => acc + blog.content.split(/\s+/).length, 0)}
                </p>
              </div>
              <div className="text-4xl">✍️</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Read Time</p>
                <p className="text-3xl font-bold text-gray-800">
                  {blogs.length > 0 
                    ? Math.round(blogs.reduce((acc, blog) => acc + getReadingTime(blog.content), 0) / blogs.length)
                    : 0} min
                </p>
              </div>
              <div className="text-4xl">⏱️</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-8xl mb-6">✏️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No posts yet</h2>
            <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
            <Link
              to="/create"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                          ⏱️ {getReadingTime(blog.content)} min read
                        </span>
                        <span className="text-gray-500 text-sm">
                          📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-purple-600 transition">
                        <Link to={`/post/${blog._id}`}>{blog.title}</Link>
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {blog.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/post/${blog._id}`}
                        className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
                      >
                        👁️ View
                      </Link>
                      <Link
                        to={`/edit/${blog._id}`}
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white rounded-lg font-semibold transition transform hover:scale-105"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg text-white rounded-lg font-semibold transition transform hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
