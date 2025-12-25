import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
          404
        </div>
        
        <div className="text-8xl mb-6">🔍</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            🏠 Back to Home
          </Link>
          
          <Link
            to="/create"
            className="inline-block bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition border-2 border-gray-200"
          >
            ✍️ Create Post
          </Link>
        </div>
        
        <div className="mt-12 text-gray-500">
          <p>Lost? Here are some helpful links:</p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Link to="/" className="text-purple-600 hover:text-purple-800 underline">
              Home
            </Link>
            <span>•</span>
            <Link to="/my-posts" className="text-purple-600 hover:text-purple-800 underline">
              My Posts
            </Link>
            <span>•</span>
            <Link to="/profile" className="text-purple-600 hover:text-purple-800 underline">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
