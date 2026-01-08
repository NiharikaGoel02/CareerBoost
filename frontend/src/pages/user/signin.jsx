import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const Signin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useUser();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/user/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        navigate('/user/dashboard');
      } else {
        setError(result.error || 'Signin failed.');
      }
    } catch (err) {
      setError('Signin failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="w-full max-w-md bg-white/80 rounded-3xl shadow-xl border border-white/30 backdrop-blur-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80" />
          </div>
          {error && <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded text-center">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-full py-3 px-6 shadow hover:bg-gray-50 transition font-semibold text-gray-700">
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5 0-.7-.1-1.3-.1-2V20z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.3 5.1 29.4 3 24 3c-7.1 0-13.1 3.7-16.7 9.3z" fill="#FF3D00"/><path d="M24 45c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.7 36.7 26.9 38 24 38c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.9 41.2 15.4 45 24 45z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.7c-1.1 3.1-3.6 5.7-6.7 7.3l6.5 5.3C41.7 38.1 45 31.7 45 24c0-.7-.1-1.3-.1-2V20z" fill="#1976D2"/></g></svg>
          Login with Google
        </button>
        <div className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <button className="text-blue-600 hover:underline font-semibold" onClick={() => navigate('/user/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
