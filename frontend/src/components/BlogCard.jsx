import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const readTime = calculateReadTime(blog.content);

  return (
    <Link to={`/post/${blog._id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div className="relative overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
            }}
          />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {readTime} min read
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {blog.content?.substring(0, 150)}...
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {blog.author?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{blog.author?.name || 'Anonymous'}</p>
                <p className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-purple-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              <span>Read more</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
