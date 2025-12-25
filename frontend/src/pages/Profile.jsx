import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalPosts: 0, totalWords: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blog`);
      if (res.data.success) {
        const myBlogs = res.data.blogs.filter((blog) => blog.author._id === user.id);
        const totalWords = myBlogs.reduce((acc, blog) => 
          acc + blog.content.split(/\s+/).length, 0
        );
        setStats({
          totalPosts: myBlogs.length,
          totalWords,
          totalViews: myBlogs.length * Math.floor(Math.random() * 100) // Mock views
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-16 mb-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                {getInitials(user?.name)}
              </div>
            </div>

            {/* User Info */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{user?.name}</h1>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                📧 {user?.email}
              </p>
              <p className="text-gray-500 mt-2">
                👤 Member since {memberSince}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                to="/my-posts"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition"
              >
                📝 My Posts
              </Link>
              <Link
                to="/create"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition"
              >
                ✍️ Write New Post
              </Link>
            </div>

            {/* Bio Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">✨ About Me</h3>
              <p className="text-gray-700">
                I'm a passionate writer sharing my thoughts and stories on BlogHub. 
                Follow my journey as I explore new ideas and connect with readers around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Posts</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : (
                  <p className="text-4xl font-bold text-gray-800">{stats.totalPosts}</p>
                )}
              </div>
              <div className="text-5xl">📚</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Words</p>
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : (
                  <p className="text-4xl font-bold text-gray-800">{stats.totalWords.toLocaleString()}</p>
                )}
              </div>
              <div className="text-5xl">✍️</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Est. Views</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
                ) : (
                  <p className="text-4xl font-bold text-gray-800">{stats.totalViews}+</p>
                )}
              </div>
              <div className="text-5xl">👁️</div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            ⚙️ Account Details
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="text-gray-600 font-medium">Full Name</p>
                <p className="text-lg text-gray-800 font-semibold">{user?.name}</p>
              </div>
              <span className="text-2xl">👤</span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="text-gray-600 font-medium">Email Address</p>
                <p className="text-lg text-gray-800 font-semibold">{user?.email}</p>
              </div>
              <span className="text-2xl">📧</span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="text-gray-600 font-medium">Account Status</p>
                <p className="text-lg">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Active
                  </span>
                </p>
              </div>
              <span className="text-2xl">🟢</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">Member Since</p>
                <p className="text-lg text-gray-800 font-semibold">{memberSince}</p>
              </div>
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
