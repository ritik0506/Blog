import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: '', color: 'bg-gray-200' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-orange-500' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-8 text-center">
          <div className="text-6xl mb-3">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Join BlogHub
          </h2>
          <p className="text-purple-100">Start sharing your stories today</p>
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                👤 Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                placeholder="John Doe"
                required
                minLength="2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                placeholder="Create a strong password"
                required
                minLength="8"
              />
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Password Strength:</span>
                    <span className={`font-semibold ${
                      passwordStrength.strength === 100 ? 'text-green-600' :
                      passwordStrength.strength >= 75 ? 'text-yellow-600' :
                      passwordStrength.strength >= 50 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🔒 Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
                placeholder="Confirm your password"
                required
                minLength="8"
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">❌ Passwords do not match</p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-green-500 text-sm mt-1">✓ Passwords match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Create Account
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-800 font-semibold underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
