import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'content') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.content) {
      setError('Please provide both title and content');
      toast.error('Please provide both title and content');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/blog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        toast.success('Blog created successfully! 🎉');
        setTimeout(() => navigate(`/post/${res.data.blog._id}`), 500);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      const errorMsg = error.response?.data?.message || 'Failed to create blog';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const wordCount = formData.content.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              ✍️ Create New Blog Post
            </h1>
            <p className="text-purple-100 mt-2">Share your story with the world</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-md animate-shake">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  📝 Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter a captivating title..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Make it catchy and descriptive
                </p>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  🖼️ Cover Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Add a beautiful cover image to make your post stand out
                </p>
                
                {formData.image && (
                  <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  📄 Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="16"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition font-mono"
                  placeholder="Write your amazing content here...&#10;&#10;Pro tip: Use line breaks to organize your thoughts!"
                  required
                ></textarea>
                
                {/* Stats Bar */}
                <div className="flex items-center justify-between mt-2 text-sm">
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>
                      📊 {formData.content.split(/\s+/).filter(word => word.length > 0).length} words
                    </span>
                    <span>•</span>
                    <span>
                      ⏱️ {getReadingTime()} min read
                    </span>
                    <span>•</span>
                    <span>
                      🔤 {charCount} characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Publishing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      🚀 Publish Post
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💡 Writing Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Start with an attention-grabbing title</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Use clear paragraphs and line breaks for readability</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Choose a high-quality cover image that relates to your content</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Proofread before publishing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
