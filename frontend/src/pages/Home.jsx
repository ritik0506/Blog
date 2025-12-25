import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blog`);
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="h-64 mb-8"></div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            ✨ Welcome to BlogHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing stories from talented writers around the world
          </p>
          <Link
            to="/create"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-xl"
          >
            🚀 Start Writing
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-md">
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="🔍 Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="text-gray-600">
            <span className="font-semibold text-purple-600">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? 'article' : 'articles'}
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

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📝</div>
            {searchQuery ? (
              <div>
                <p className="text-2xl text-gray-700 mb-4">No articles found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-purple-600 hover:text-purple-800 font-medium underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div>
                <p className="text-2xl text-gray-700 mb-4">No blog posts yet</p>
                <p className="text-gray-600 mb-6">Be the first to share your story!</p>
                <Link
                  to="/create"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
                >
                  Create Your First Post
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
