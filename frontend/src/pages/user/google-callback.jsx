import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');
    
    if (token) {
      localStorage.setItem('token', token);
      if (user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      // Force a page reload to update the UserContext
      window.location.href = '/user/dashboard';
    } else {
      navigate('/user/signin');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <div className="text-lg text-gray-700 font-semibold">Signing you in with Google...</div>
      </div>
    </div>
  );
};

export default GoogleCallback; 