// client/app/pilot/safety/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../../../utils/api';

export default function SafetyCheck() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId'); // We will pass the Job ID here

  // Fix scroll on load
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [photos, setPhotos] = useState({
    propellers: null,
    battery: null,
    gps: null,
    sensors: null
  });

  const [loading, setLoading] = useState(false);

  // Handle Photo Capture (Simulated Upload)
  const handleCapture = (part: string, e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Create a fake local URL just to show the preview
      const previewUrl = URL.createObjectURL(file);
      setPhotos(prev => ({ ...prev, [part]: previewUrl }));
    }
  };

  const allCleared = Object.values(photos).every(Boolean);

  const submitSafetyCheck = async () => {
    if (!jobId) {
      alert("No active mission selected. Go back to My Missions.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Tell Backend: Safety is Cleared for this Job
      await api.put(`/jobs/${jobId}/safety-clear`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Safety Checks Validated. You are cleared for takeoff.");
      router.push('/pilot/missions'); 

    } catch (error) {
      alert("Failed to sync safety data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-md mx-auto">
        <button onClick={() => router.back()} className="text-slate-400 mb-6 hover:text-white">← Cancel</button>
        
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <ShieldCheck className="text-yellow-500" /> Pre-Flight Cam
        </h1>
        <p className="text-slate-400 mb-8 text-sm">Upload photos to verify drone integrity.</p>

        <div className="space-y-4">
          {/* Reusable Camera Item Component */}
          {['propellers', 'battery', 'gps', 'sensors'].map((part) => (
            <div key={part} className={`p-4 rounded-xl border transition flex items-center justify-between
              ${photos[part as keyof typeof photos] ? 'bg-green-900/20 border-green-500' : 'bg-slate-900 border-slate-700'}`}>
              
              <div className="flex items-center gap-4">
                {/* The "Hidden" File Input */}
                <label className="cursor-pointer">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${photos[part as keyof typeof photos] ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'}`}>
                    {photos[part as keyof typeof photos] ? <CheckCircle size={24}/> : <Camera size={24}/>}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" // Forces Rear Camera on Mobile
                    className="hidden" 
                    onChange={(e) => handleCapture(part, e)}
                  />
                </label>
                
                <div>
                  <h3 className="font-bold capitalize">{part} Check</h3>
                  <p className="text-xs text-slate-500">
                    {photos[part as keyof typeof photos] ? 'Photo Verified' : 'Tap icon to capture'}
                  </p>
                </div>
              </div>

              {/* Thumbnail Preview */}
              {photos[part as keyof typeof photos] && (
                 // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={photos[part as keyof typeof photos] as unknown as string} 
                  alt="preview" 
                  className="w-12 h-12 rounded-lg object-cover border border-green-500"
                />
              )}
            </div>
          ))}
        </div>

        <button 
          disabled={!allCleared || loading}
          onClick={submitSafetyCheck}
          className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition shadow-lg
          ${allCleared 
            ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
        >
          {loading ? 'Verifying...' : allCleared ? 'Confirm & Authorize Mission' : 'Upload All Photos'}
        </button>

      </div>
    </div>
  );
}