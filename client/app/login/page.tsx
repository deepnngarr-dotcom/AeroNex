// client/app/login/page.tsx
"use client";

import { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Send credentials to backend
      const res = await api.post('/auth/login', formData);
      
      // 2. If success, save token and redirect
      login(res.data.token, res.data);
      
      // (The AuthContext handles the redirect, but we can force it here just in case)
      if (res.data.role === 'pilot') router.push('/pilot/dashboard');
      else router.push('/farmer/dashboard');

    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-slate-200">
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">Welcome Back</h2>
        <p className="text-center text-slate-500 mb-6">Login to AeroNex</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-slate-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="pilot@aeronex.in"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-slate-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-700 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to AeroNex? <Link href="/register" className="text-blue-600 font-semibold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}