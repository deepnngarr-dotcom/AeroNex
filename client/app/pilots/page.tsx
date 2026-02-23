// client/app/pilots/page.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Globe, TrendingUp, Smartphone, DollarSign, Shield, Award, CheckCircle } from 'lucide-react';

export default function ForPilots() {
  const { user } = useAuth();

  // === SCENARIO 1: FARMER VIEWING PILOT PAGE ===
  // "Build Trust in the Service Provider"
  if (user?.role === 'farmer') {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <div className="relative pt-20 pb-32 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-bold uppercase tracking-widest mb-8">
              <Shield size={14} /> Safety First
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
              Expert Pilots, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Professional Service.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              You aren't just hiring a drone. You are hiring a DGCA-certified professional. 
              Our pilots pass strict background checks and safety training.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/farmer/book" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition shadow-xl shadow-blue-600/20">
                Book a Verified Pilot <ArrowRight size={20}/>
              </Link>
            </div>
          </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-16">Your Farm is in Safe Hands</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">DGCA Certified</h3>
                <p className="text-slate-600">Every pilot on AeroNex holds a valid Remote Pilot Certificate issued by the Govt of India.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Pre-Flight Safety</h3>
                <p className="text-slate-600">Pilots must upload live photos of propellers and batteries before the system lets them fly.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Insurance & Security</h3>
                <p className="text-slate-600">Our pilots follow strict flight paths. No damage to crops, no unauthorized surveillance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === SCENARIO 2: DEFAULT / PILOT VIEW ===
  const destination = user ? '/pilot/dashboard' : '/register?role=pilot';
  const buttonText = user ? 'Go to Dashboard' : 'Start Earning Now';

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: "url('/images/drone_storage.webp')" }}
        ></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
            <Globe size={14} /> Join India's Largest Drone Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Turn Your Drone Skills <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Into a Business.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop searching for clients. AeroNex sends nearby spraying jobs directly to your phone. 
            Accept missions, fly, and get paid instantly.
          </p>

          <div className="flex justify-center gap-4">
            <Link href={destination} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition shadow-lg shadow-blue-900/20">
              {buttonText} <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-slate-900/50 py-24 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Fly with AeroNex?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition duration-300">
              <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Jobs on Autopilot</h3>
              <p className="text-slate-400">No more cold calling. Open the app, see the map, and accept jobs within 50km.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-green-500/50 transition duration-300">
              <div className="w-14 h-14 bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-400">
                <DollarSign size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Payouts</h3>
              <p className="text-slate-400">Get paid directly to your wallet as soon as the mission is marked complete.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition duration-300">
              <div className="w-14 h-14 bg-yellow-900/30 rounded-xl flex items-center justify-center mb-6 text-yellow-400">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Build Your Profile</h3>
              <p className="text-slate-400">Track flight hours and earn badges. Higher rated pilots get priority.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}