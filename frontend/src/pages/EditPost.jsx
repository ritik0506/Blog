import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blog/${id}`);
      if (res.data.success) {
        const blog = res.data.blog;
        
        // Check if user is the author
        if (blog.author._id !== user?.id) {
          toast.error('You are not authorized to edit this post');
          navigate(`/post/${id}`);
          return;
        }

        setFormData({
          title: blog.title,
          content: blog.content,
          image: blog.image
        });
        setCharCount(blog.content.length);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog');
      toast.error('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

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

    setSubmitting(true);

    try {
      const res = await axios.put(`${API_URL}/api/blog/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        toast.success('Blog updated successfully! 🎉');
        setTimeout(() => navigate(`/post/${id}`), 500);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      const errorMsg = error.response?.data?.message || 'Failed to update blog';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const wordCount = formData.content.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              ✏️ Edit Blog Post
            </h1>
            <p className="text-blue-100 mt-2">Update your story</p>
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
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  🖼️ Cover Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="https://example.com/image.jpg"
                />
                
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
                  placeholder="Write your amazing content here..."
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
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      💾 Update Post
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/post/${id}`)}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
