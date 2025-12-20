// client/app/pilot/missions/page.tsx
"use client";

import { useEffect, useState } from 'react';
import api from '../../../utils/api'; // Adjust path if needed (might be ../../../utils/api)
import { Play, CheckSquare, MapPin, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MyMissions() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fix: Force scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch Jobs assigned to ME
  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/jobs/pilot-history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMissions(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMissions(); }, []);

// ADD THIS ✅
const updateStatus = async (jobId: string, newStatus: string) => {
  try {
    const token = localStorage.getItem('token');
    // Determine the correct API endpoint based on status
    const endpoint = newStatus === 'IN_PROGRESS' ? 'start' : 'complete';

    await api.put(`/jobs/${jobId}/${endpoint}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert(`Mission ${newStatus === 'IN_PROGRESS' ? 'Started' : 'Completed'}!`);
    fetchMissions(); // Refresh the list
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Failed to update mission status.");
  }
};

  // Handle Status Updates
  const handleStartMission = (job: any) => {
    // Check if safety is cleared
    if (!job.isSafetyCleared) {
      if(confirm("⚠️ Safety Check Required!\n\nYou must complete the photo verification before starting this mission.\n\nGo to Safety Check now?")) {
        router.push(`/pilot/safety?jobId=${job._id}`);
      }
      return;
    }
    // If cleared, proceed to Start
    updateStatus(job._id, 'start');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="text-slate-400 text-sm mb-4 hover:text-white">
          ← Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <CheckCircle className="text-blue-500" /> Mission Control
        </h1>

        <div className="space-y-4">
          {loading ? <p>Loading mission data...</p> : missions.length === 0 ? (
            <div className="bg-slate-900 p-8 rounded-xl text-center border border-slate-800">
              <AlertCircle className="mx-auto h-12 w-12 text-slate-600 mb-3" />
              <p className="text-slate-400 text-lg">No active missions.</p>
              <p className="text-slate-500 text-sm">Go to the Dashboard map to accept new jobs.</p>
            </div>
          ) : (
            missions.map((job) => (
              <div key={job._id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
                
                {/* Job Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{job.cropType} Spray</h2>
                    <p className="text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin size={16} className="text-blue-500"/> {job.location.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-green-400">₹{job.budget}</div>
                    <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block mt-2 tracking-wide
                      ${job.status === 'IN_PROGRESS' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 animate-pulse' : 
                        job.status === 'COMPLETED' ? 'bg-green-600/20 text-green-400 border border-green-500/50' : 
                        'bg-slate-700 text-slate-300'}`}>
                      {job.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                {/* Progress Bar Visual */}
                <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
                  <div className={`h-full transition-all duration-500 
                    ${job.status === 'ASSIGNED' ? 'w-1/3 bg-slate-600' : 
                      job.status === 'IN_PROGRESS' ? 'w-2/3 bg-blue-500' : 
                      'w-full bg-green-500'}`}>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid gap-3">
                  {job.status === 'ASSIGNED' && (
                      <button 
                          onClick={() => handleStartMission(job)} // <--- Use new handler
                          className="w-full flex justify-center items-center gap-2 bg-blue-600 px-4 py-3 rounded-lg font-bold hover:bg-blue-500 transition"
                        >
                          {!job.isSafetyCleared && <AlertTriangle size={18} className="text-yellow-300"/>}
                          <Play size={18} /> 
                          {job.isSafetyCleared ? 'Start Mission' : 'Safety Check Required'}
                        </button>
                  )}
                  
                  {job.status === 'IN_PROGRESS' && (
                    <button 
                      onClick={() => updateStatus(job._id, 'complete')}
                      className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-4 rounded-lg font-bold text-lg transition shadow-lg shadow-green-900/20"
                    >
                      <CheckSquare size={20} /> Mark Mission Complete
                    </button>
                  )}

                  {job.status === 'COMPLETED' && (
                    <div className="w-full text-center text-green-400 font-bold flex justify-center items-center gap-2 py-3 bg-green-900/10 rounded-lg border border-green-500/30">
                      <CheckSquare size={18} /> Mission Accomplished
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

