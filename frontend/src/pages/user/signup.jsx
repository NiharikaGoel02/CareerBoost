import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { signup, user } = useUser();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/user/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const result = await signup(form);
      if (result.success) {
        setSuccess('Signup successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/user/dashboard'), 1500);
      } else {
        setError(result.error || 'Signup failed.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="w-full max-w-md bg-white/80 rounded-3xl shadow-xl border border-white/30 backdrop-blur-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80" />
          </div>
          {error && <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded text-center">{error}</div>}
          {success && <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded text-center">{success}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button className="text-blue-600 hover:underline font-semibold" onClick={() => navigate('/user/signin')}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
