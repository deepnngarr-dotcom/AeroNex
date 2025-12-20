// client/app/pilot/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MapPin, CheckCircle, Shield, AlertTriangle } from 'lucide-react';

// Load Map ONLY on client side
const Map = dynamic(() => import('../../../components/Map'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-slate-900 animate-pulse rounded-xl"></div> // Optional loading skeleton
});

export default function PilotDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // STATE TO TRIGGER MAP ZOOM
  const [zoomTrigger, setZoomTrigger] = useState(0); 

  if (!user) return <div className="p-10 text-white">Loading cockpit...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <span className="text-blue-500">Drone</span>Pilot Dashboard 
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden md:block">ID: {user.email}</span>
          <button onClick={logout} className="text-xs bg-red-900/30 text-red-400 px-3 py-1 rounded hover:bg-red-900/50 border border-red-900">
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {user.name}</h2>
            <p className="text-slate-400 mt-1">Ready for your next mission?</p>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-400 text-sm font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Online
          </div>
        </div>

        {/* === ACTION CONTROL PANEL === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Button 1: Find Jobs (Triggers Zoom) */}
          <button 
            onClick={() => {
              // 1. Scroll to map
              document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
              // 2. Trigger Zoom logic
              setZoomTrigger(prev => prev + 1);
            }}
            className="flex flex-col items-center justify-center h-32 bg-blue-600 rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-900/20 group"
          >
            <MapPin size={32} className="mb-2 text-white group-hover:animate-bounce" />
            <span className="font-bold text-white">Find Jobs</span>
            <span className="text-xs text-blue-200">Scan 500km Radius</span>
          </button>
          
          {/* Button 2: My Missions */}
          <button 
            onClick={() => router.push('/pilot/missions')}
            className="flex flex-col items-center justify-center h-32 bg-slate-800 rounded-xl hover:bg-slate-700 transition border border-slate-700 hover:border-green-500 group"
          >
            <CheckCircle size={32} className="mb-2 text-green-500 group-hover:scale-110 transition" />
            <span className="font-bold text-white">My Missions</span>
            <span className="text-xs text-slate-400">Start / Complete</span>
          </button>

          {/* Button 3: Safety Check */}
          <button 
             onClick={() => router.push('/pilot/safety')}
             className="flex flex-col items-center justify-center h-32 bg-slate-800 rounded-xl hover:bg-slate-700 transition border border-slate-700 hover:border-yellow-500 group"
          >
            <Shield size={32} className="mb-2 text-yellow-500 group-hover:rotate-12 transition" />
            <span className="font-bold text-white">Safety Check</span>
            <span className="text-xs text-slate-400">Pre-Flight List</span>
          </button>
          
        </div>

        {/* === LIVE MAP SECTION === */}
        <div id="map-section" className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg text-white flex items-center gap-2">
               <MapPin size={18} className="text-blue-500"/> Live Job Radar
             </h3>
             <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Auto-refresh active</span>
           </div>
           
           {/* PASS THE TRIGGER PROP HERE */}
           <Map zoomTrigger={zoomTrigger} />
        </div>

      </div>
    </div>
  );
}