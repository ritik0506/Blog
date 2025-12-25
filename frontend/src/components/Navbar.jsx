import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">✍️</span>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 group-hover:from-yellow-200 group-hover:to-pink-200 transition-all">
              BlogHub
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs..."
                className="w-full px-4 py-2 pl-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
              />
              <span className="absolute left-3 top-2.5 text-white/70">🔍</span>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hidden md:flex items-center space-x-1 hover:bg-white/20 px-3 py-2 rounded-lg transition-all font-medium"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all font-medium backdrop-blur-sm"
                >
                  <span>✏️</span>
                  <span className="hidden md:inline">Write</span>
                </Link>
                <Link
                  to="/my-posts"
                  className="hidden md:flex items-center space-x-1 hover:bg-white/20 px-3 py-2 rounded-lg transition-all font-medium"
                >
                  <span>📚</span>
                  <span>My Posts</span>
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline font-medium">{user?.name}</span>
                    <span className="text-xs">{showUserMenu ? '▲' : '▼'}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800 animate-fadeIn">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <span>👤</span>
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/my-posts"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition md:hidden"
                      >
                        <span>📚</span>
                        <span>My Posts</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 text-red-600 transition w-full text-left"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
