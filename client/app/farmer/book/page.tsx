// client/app/farmer/book/page.tsx
"use client";

import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useRouter } from 'next/navigation';

export default function BookSpray() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const [formData, setFormData] = useState({
    cropType: '',
    areaAcres: '',
    budget: '',
    address: '',
    hasVehicleAccess: true
  });

  // 1. Auto-Detect Location on Load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!location) {
      alert("Please allow location access to book a drone.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // 2. Send Data to Backend
      await api.post('/jobs', {
        ...formData,
        areaAcres: Number(formData.areaAcres),
        budget: Number(formData.budget),
        latitude: location.lat,
        longitude: location.lng
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Job Posted! Pilots nearby have been notified.");
      router.push('/farmer/dashboard'); // Go back to home

    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border border-green-100">
        <h1 className="text-2xl font-bold text-green-800 mb-6">New Spray Request</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Crop Name</label>
            <input 
              type="text" 
              placeholder="e.g. Wheat, Sugarcane"
              className="w-full p-3 border rounded mt-1 bg-gray-50 text-gray-900"
              onChange={e => setFormData({...formData, cropType: e.target.value})}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">Area (Acres)</label>
              <input 
                type="number" 
                placeholder="10"
                className="w-full p-3 border rounded mt-1 bg-gray-50 text-gray-900"
                onChange={e => setFormData({...formData, areaAcres: e.target.value})}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700">Budget (₹)</label>
              <input 
                type="number" 
                placeholder="5000"
                className="w-full p-3 border rounded mt-1 bg-gray-50 text-gray-900"
                onChange={e => setFormData({...formData, budget: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Farm Address / Landmark</label>
            <textarea 
              placeholder="Near Landmark, Village Name..."
              className="w-full p-3 border rounded mt-1 bg-gray-50 h-24 text-gray-900"
              onChange={e => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded border border-blue-100">
            <input 
              type="checkbox" 
              checked={formData.hasVehicleAccess}
              onChange={e => setFormData({...formData, hasVehicleAccess: e.target.checked})}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-sm text-blue-800">Can a Car/Van reach the field?</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
          >
            {loading ? 'Broadcasting...' : 'Broadcast Job 📡'}
          </button>
        </form>
      </div>
    </div>
  );
}