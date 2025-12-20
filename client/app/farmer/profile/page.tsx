// client/app/farmer/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import { User, Sprout, Save, MapPin, Phone, Mail, Tractor } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FarmerProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '', // Using as Address/Location for now
    farmSize: ''
  });

  // Load existing data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '', // Read only
        phone: user.phone || '',
        bio: user.bio || '', 
        farmSize: user.farmSize || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await api.put('/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg({ type: 'success', text: '✅ Profile Updated Successfully' });
      // Refresh page data or context if needed, but local state is fine for now
    } catch (error) {
      setMsg({ type: 'error', text: '❌ Update Failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
           <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800">
             <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600 mr-2">←</button>
             My Account
           </h1>
           <div className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase">
             Farmer Account
           </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          
          {/* Hero Banner inside Profile */}
          <div className="bg-green-600 h-32 relative">
             <div className="absolute -bottom-10 left-8">
                <div className="w-24 h-24 bg-white rounded-full p-2 shadow-lg">
                   <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <User size={40} />
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            <h2 className="text-2xl font-bold text-slate-900">{formData.name}</h2>
            <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
               <Mail size={14}/> {formData.email}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              
              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <div className="relative">
                       <User size={18} className="absolute left-3 top-3.5 text-slate-400"/>
                       <input 
                         type="text" 
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <div className="relative">
                       <Phone size={18} className="absolute left-3 top-3.5 text-slate-400"/>
                       <input 
                         type="text" 
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                         placeholder="+91"
                       />
                    </div>
                 </div>
              </div>

              {/* Farm Details */}
              <div className="border-t border-slate-100 pt-6">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800">
                    <Tractor size={20} className="text-green-600"/> Farm Details
                 </h3>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Total Farm Size (Acres)</label>
                       <div className="relative">
                          <Sprout size={18} className="absolute left-3 top-3.5 text-slate-400"/>
                          <input 
                            type="number" 
                            value={formData.farmSize}
                            onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                            className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                            placeholder="e.g. 50"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Primary Location / Address</label>
                       <div className="relative">
                          <MapPin size={18} className="absolute left-3 top-3.5 text-slate-400"/>
                          <input 
                            type="text" 
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                            placeholder="Village, District, State"
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Feedback Message */}
              {msg.text && (
                <div className={`p-4 rounded-xl text-center font-bold ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {msg.text}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-95 flex justify-center items-center gap-2"
              >
                 {loading ? 'Saving...' : <><Save size={20} /> Save Changes</>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}