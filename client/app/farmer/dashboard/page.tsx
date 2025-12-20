// client/app/farmer/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '../../../utils/api';
import { 
  PlusCircle, History, User, CheckCircle, Clock, 
  Sprout, MapPin, IndianRupee, Droplets, LayoutDashboard, Tractor,
  CalendarDays 
} from 'lucide-react';

export default function FarmerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    cropType: '',
    areaAcres: '',
    budget: '',
    address: '',
    scheduledDate: '', // <--- New State
    hasVehicleAccess: false
  });
  const [submitting, setSubmitting] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    totalAcres: 0,
    activeJobs: 0,
    totalSpent: 0
  });

  // Fetch Jobs on Load
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/jobs/my-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
      
      const totalAcres = res.data.reduce((acc: number, job: any) => acc + (job.areaAcres || 0), 0);
      const active = res.data.filter((job: any) => job.status !== 'COMPLETED' && job.status !== 'CANCELLED').length;
      const spent = res.data.reduce((acc: number, job: any) => acc + (job.budget || 0), 0);
      
      setStats({ totalAcres, activeJobs: active, totalSpent: spent });

    } catch (error) {
      console.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  // Handle Quick Booking
  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await api.post('/jobs', {
        ...formData,
        latitude: 28.5, 
        longitude: 77.5,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("✅ Request Posted Successfully!");
      // Reset form including date
      setFormData({ cropType: '', areaAcres: '', budget: '', address: '', scheduledDate: '', hasVehicleAccess: false });
      fetchJobs(); 
    } catch (error) {
      alert("Error posting job");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <div className="p-10 flex justify-center text-green-800">Loading Farm Data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-green-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-green-100 p-2 rounded-lg">
                <Tractor className="text-green-700" size={24} />
             </div>
             <div>
                <h1 className="text-xl font-bold text-slate-800">Farm Command Center</h1>
                <p className="text-xs text-slate-500">Welcome back, {user.name}</p>
             </div>
          </div>
          <div className="flex gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs text-slate-400 font-bold uppercase">Location</span>
                <span className="font-bold text-slate-700">Uttar Pradesh, IN</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        
        {/* 2. STATISTICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                 <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Total Coverage</p>
                 <h2 className="text-4xl font-black text-slate-800 mt-2">{stats.totalAcres} <span className="text-lg text-slate-400 font-medium">Acres</span></h2>
              </div>
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                 <Sprout className="text-green-600" size={32}/>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                 <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Active Missions</p>
                 <h2 className="text-4xl font-black text-slate-800 mt-2">{stats.activeJobs} <span className="text-lg text-slate-400 font-medium">Ongoing</span></h2>
              </div>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                 <Droplets className="text-blue-600" size={32}/>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                 <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Total Invested</p>
                 <h2 className="text-4xl font-black text-slate-800 mt-2">₹{stats.totalSpent}</h2>
              </div>
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                 <IndianRupee className="text-orange-600" size={32}/>
              </div>
           </div>
        </div>

        {/* 3. MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* === LEFT COLUMN: THE BIG BOOKING FORM === */}
           <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden sticky top-36">
                 <div className="bg-green-600 p-6 text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                       <PlusCircle size={24}/> New Spray Request
                    </h2>
                    <p className="text-green-100 text-sm mt-1">Book a drone pilot in seconds.</p>
                 </div>
                 
                 <form onSubmit={handleBook} className="p-6 space-y-5">
                    
                    {/* Crop Type */}
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Crop Details</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Wheat, Sugarcane"
                         className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-slate-900"
                         value={formData.cropType}
                         onChange={e => setFormData({...formData, cropType: e.target.value})}
                         required
                       />
                    </div>

                    {/* Schedule Date (NEW) */}
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Schedule Date</label>
                       <input 
                         type="date" 
                         min={new Date().toISOString().split('T')[0]} // Prevent past dates
                         className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-slate-900"
                         value={formData.scheduledDate}
                         onChange={e => setFormData({...formData, scheduledDate: e.target.value})}
                         required
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       {/* Area */}
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Area (Acres)</label>
                          <input 
                            type="number" 
                            placeholder="0.0"
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-slate-900"
                            value={formData.areaAcres}
                            onChange={e => setFormData({...formData, areaAcres: e.target.value})}
                            required
                          />
                       </div>
                       {/* Budget */}
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Offer (₹)</label>
                          <input 
                            type="number" 
                            placeholder="₹500"
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-slate-900"
                            value={formData.budget}
                            onChange={e => setFormData({...formData, budget: e.target.value})}
                            required
                          />
                       </div>
                    </div>

                    {/* Address */}
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Farm Location</label>
                       <textarea 
                         placeholder="Enter landmark or village name..."
                         className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-slate-900 h-24 resize-none"
                         value={formData.address}
                         onChange={e => setFormData({...formData, address: e.target.value})}
                         required
                       />
                    </div>

                    {/* Vehicle Access */}
                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                       <input 
                         type="checkbox" 
                         className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                         checked={formData.hasVehicleAccess}
                         onChange={e => setFormData({...formData, hasVehicleAccess: e.target.checked})}
                       />
                       <span className="text-slate-700 font-medium text-sm">Vehicle Accessible Road?</span>
                    </label>

                    {/* Submit */}
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-95 flex justify-center items-center gap-2"
                    >
                       {submitting ? 'Broadcasting...' : 'Broadcast Request 📡'}
                    </button>
                 </form>
              </div>
           </div>

           {/* === RIGHT COLUMN: ORDER HISTORY === */}
           <div className="lg:col-span-2 space-y-6">
              
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <History className="text-slate-400"/> Recent Activity
                 </h2>
                 <button className="text-sm text-green-600 font-bold hover:underline">View All</button>
              </div>

              {loading ? (
                 <div className="p-10 text-center text-slate-400">Loading history...</div>
              ) : jobs.length === 0 ? (
                 <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <LayoutDashboard className="text-slate-400" size={32}/>
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">No Orders Yet</h3>
                    <p className="text-slate-500">Use the form on the left to create your first booking.</p>
                 </div>
              ) : (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {jobs.map((job) => (
                       <div key={job._id} className="p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                             
                             {/* Job Info */}
                             <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                   ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 
                                     job.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600 animate-pulse' : 
                                     'bg-orange-100 text-orange-600'}`}>
                                   {job.status === 'COMPLETED' ? <CheckCircle size={20}/> : 
                                    job.status === 'IN_PROGRESS' ? <Droplets size={20}/> : 
                                    <Clock size={20}/>}
                                </div>
                                <div>
                                   <h3 className="font-bold text-lg text-slate-800">{job.cropType} Spray</h3>
                                   <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location.address || 'Loc'}</span>
                                      {job.scheduledDate && (
                                         <span className="flex items-center gap-1 font-medium text-slate-700 bg-slate-100 px-2 rounded">
                                            <CalendarDays size={12}/> {new Date(job.scheduledDate).toLocaleDateString()}
                                         </span>
                                      )}
                                   </div>
                                </div>
                             </div>

                             {/* Status & Pilot Info */}
                             <div className="text-right">
                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2
                                   ${job.status === 'ASSIGNED' ? 'bg-green-100 text-green-700' : 
                                     job.status === 'OPEN' ? 'bg-yellow-100 text-yellow-700' : 
                                     'bg-slate-100 text-slate-600'}`}>
                                   {job.status.replace('_', ' ')}
                                </div>
                                
                                {job.assignedPilot ? (
                                   <div className="flex items-center justify-end gap-2 text-sm text-slate-600">
                                      <User size={14}/>
                                      <span className="font-medium">{job.assignedPilot.name}</span>
                                   </div>
                                ) : (
                                   <p className="text-xs text-slate-400 animate-pulse">Searching...</p>
                                )}
                             </div>

                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}