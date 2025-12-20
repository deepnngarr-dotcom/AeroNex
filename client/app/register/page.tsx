// client/src/app/register/page.tsx
"use client";

import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer' // Default role
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      // If success, log them in immediately
      login(res.data.token, res.data); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Join AeroNex</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Full Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded mt-1 text-gray-900"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded mt-1 text-gray-900"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded mt-1 text-gray-900"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">I am a...</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer text-gray-900">
                <input 
                  type="radio" 
                  name="role" 
                  value="farmer"
                  checked={formData.role === 'farmer'}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
                Farmer
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-900">
                <input 
                  type="radio" 
                  name="role" 
                  value="pilot"
                  checked={formData.role === 'pilot'}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
                Drone Pilot
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}