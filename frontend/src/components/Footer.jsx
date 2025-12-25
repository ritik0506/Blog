const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              ✍️ BlogHub
            </h3>
            <p className="text-gray-400 text-sm">
              Share your stories, inspire the world. Join our community of passionate writers and readers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-purple-400 transition">Home</a></li>
              <li><a href="/create" className="hover:text-purple-400 transition">Write a Post</a></li>
              <li><a href="/my-posts" className="hover:text-purple-400 transition">My Posts</a></li>
              <li><a href="/profile" className="hover:text-purple-400 transition">Profile</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/?category=technology" className="hover:text-purple-400 transition">Technology</a></li>
              <li><a href="/?category=lifestyle" className="hover:text-purple-400 transition">Lifestyle</a></li>
              <li><a href="/?category=travel" className="hover:text-purple-400 transition">Travel</a></li>
              <li><a href="/?category=food" className="hover:text-purple-400 transition">Food</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600 rounded-full flex items-center justify-center transition">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-400 rounded-full flex items-center justify-center transition">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition">
                ▶️
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Subscribe to our newsletter for weekly updates
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} BlogHub. All rights reserved. Made with ❤️ by passionate developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
