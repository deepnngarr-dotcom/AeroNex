// client/app/farmers/page.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Sprout, Clock, ShieldCheck, Droplets, Banknote, Users, MapPin, CheckCircle } from 'lucide-react';

export default function ForFarmers() {
  const { user } = useAuth();

  // === SCENARIO 1: PILOT VIEWING FARMER PAGE ===
  // "Show me the market potential"
  if (user?.role === 'pilot') {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px]"></div>
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-sm font-bold uppercase tracking-widest mb-8">
              <Users size={14} /> Your Customer Base
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Thousands of Farmers <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                Waiting for You.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Don't worry about finding clients. We verify every farmer, validate their land size, 
              and secure the budget before you even start your engines.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/pilot/dashboard" className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition shadow-lg shadow-green-900/20">
                Check Live Demand Map <ArrowRight size={20}/>
              </Link>
            </div>
          </div>
        </div>

        {/* Why these are GOOD customers */}
        <div className="bg-slate-900/50 py-24 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Why Serve AeroNex Farmers?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <ShieldCheck size={40} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Verified & Genuine</h3>
                <p className="text-slate-400">Every job posted is verified. No fake calls, no time wasters.</p>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <Banknote size={40} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Guaranteed Payment</h3>
                <p className="text-slate-400">The budget is locked when you accept. You get paid instantly upon completion.</p>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <MapPin size={40} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Accurate Locations</h3>
                <p className="text-slate-400">Farmers use GPS pins. You fly straight to the field, no asking for directions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === SCENARIO 2: DEFAULT / GUEST / FARMER VIEW ===
  // (The original marketing page)
  const destination = user ? '/farmer/dashboard' : '/register?role=farmer';
  const buttonText = user ? 'Go to My Farm' : 'Book Your First Spray';

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-green-50 to-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-200/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-800 text-sm font-bold uppercase tracking-widest mb-8">
            <Sprout size={14} /> Smart Farming Revolution
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
            Better Harvest, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
              Less Effort.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Stop spraying manually. Book a certified drone pilot to spray 
            your fields in minutes. Save 30% on chemicals.
          </p>

          <div className="flex justify-center gap-4">
            <Link href={destination} className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition shadow-xl shadow-green-600/20 hover:-translate-y-1">
              {buttonText} <ArrowRight size={20}/>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">No smartphone experience needed • Pay after service</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-4">Why choose AeroNex?</h2>
          <p className="text-center text-slate-500 mb-16 max-w-xl mx-auto">Traditional spraying is slow and dangerous. Drones are the future.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-green-500 hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">10 Acres in 20 Minutes</h3>
              <p className="text-slate-600 leading-relaxed">Manual labor takes days. Our drones finish the job before lunch.</p>
            </div>
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-500 hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition">
                <Droplets size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Save 30% on Chemicals</h3>
              <p className="text-slate-600 leading-relaxed">Precision nozzles ensure every drop lands on the crop, not the ground.</p>
            </div>
            <div className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-yellow-500 hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600 group-hover:scale-110 transition">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Protect Your Health</h3>
              <p className="text-slate-600 leading-relaxed">Avoid breathing in toxic pesticides. Let the machine do the dangerous work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}