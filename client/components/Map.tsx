// client/components/Map.tsx
"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../utils/api';
import { useRouter } from 'next/navigation';

// Fix for default Leaflet markers in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Green Icon for Jobs
const jobIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map Controller to handle Zoom Animations ---
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 }); // Smooth animation
  }, [center, zoom, map]);
  return null;
}

// --- MAIN COMPONENT

export default function Map({ zoomTrigger }: { zoomTrigger?: number }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [viewState, setViewState] = useState({ center: [20.59, 78.96] as [number, number], zoom: 5 }); // Default India View
  const router = useRouter();

  // 1. Get Pilot's Location on Load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userLoc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(userLoc);
        setViewState({ center: userLoc, zoom: 13 }); // Zoom in on user initially
        fetchNearbyJobs(userLoc[0], userLoc[1], 20000); // 20km default radius
      });
    }
  }, []);


  // 2. Fetch Jobs Function
  const fetchNearbyJobs = async (lat: number, lng: number, dist: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/jobs/nearby?lat=${lat}&lng=${lng}&dist=${dist}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
      console.log(`Scanned ${dist/1000}km radius. Found ${res.data.length} jobs.`);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // 3. LISTEN FOR ZOOM TRIGGER (This is the Magic Part 🪄)
  useEffect(() => {
    if (zoomTrigger && zoomTrigger > 0 && position) {
      console.log("🔍 Wide Scan Triggered!");
      // Zoom out slightly to show context
      setViewState({ center: position, zoom: 10 });
      // Search HUGE radius (500km) to find distant jobs
      fetchNearbyJobs(position[0], position[1], 50000);
    }
  }, [zoomTrigger, position]);


  // 4. Handle Accept Job
  const handleAcceptJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!confirm("Are you sure you want to accept this mission?")) return;

      await api.put(`/jobs/${jobId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Mission Accepted! Go to 'My Missions' to start.");
      setJobs((prevJobs) => prevJobs.filter(job => job._id !== jobId)); // Remove from map
      router.push('/pilot/missions'); // Redirect to missions page
      
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to accept job");
    }
  };

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 relative z-0">
      <MapContainer 
        center={viewState.center} 
        zoom={viewState.zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Animated Map Mover */}
        <MapController center={viewState.center} zoom={viewState.zoom} />

        {/* Pilot Marker (Blue) */}
        {position && (
          <Marker position={position} icon={icon}>
            <Popup>
              <div className="font-bold text-blue-600">You are here</div>
            </Popup>
          </Marker>
        )}

        {/* Job Markers (Green) */}
        {jobs.map((job) => (
          <Marker 
            key={job._id} 
            position={[job.location.coordinates[1], job.location.coordinates[0]]} 
            icon={jobIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg text-green-700">{job.cropType} Spray</h3>
                <p className="text-gray-600 my-1">
                  💰 <span className="font-bold text-black">₹{job.budget}</span> • 
                  📏 {job.areaAcres} Acres
                </p>
                <p className="text-xs text-gray-500 mb-3">{job.location.address}</p>
                
                <button 
                  onClick={() => handleAcceptJob(job._id)}
                  className="w-full bg-blue-600 text-white text-sm py-2 rounded font-bold hover:bg-blue-700 transition"
                >
                  ACCEPT MISSION
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}