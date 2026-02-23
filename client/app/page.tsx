// client/app/page.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, Leaf, Plane, ShieldCheck, FileText, 
  Activity, Scale, Building2, Coins, CheckCircle, Eye,
  BarChart3, Users, Zap, TrendingUp, MapPin, IndianRupee,
  Clock, Droplets, Smartphone, Server, Radio, Award, Phone,
  ChevronRight, Star, AlertTriangle, CloudRain, Cpu,
  Drone
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  {/*} =========================================
       LOGGED IN STATE FOR PILOTS AND FARMERS      
   =========================================*/}
  if (user?.role === 'pilot') {
     
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
           <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome Back, Captain {user.name}</h1>
              <Link href="/pilot/dashboard" className="bg-blue-600 px-8 py-3 rounded-lg font-bold">Go to Dashboard</Link>
           </div>
        </div>
     );
  }

  if (user?.role === 'farmer') {
    
      return (
        <div className="min-h-screen bg-green-50 text-slate-900 flex items-center justify-center">
           <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Namaste, {user.name}</h1>
              <Link href="/farmer/dashboard" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold">Go to Farm Dashboard</Link>
           </div>
        </div>
     );
  }

  {/* =========================================================
                GUEST STATE: THE LANDING PAGE
  =========================================================  */}
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* -------------------------------
          SECTION 1: HERO SLIDER
      ----------------------------- */}
      <div className="relative w-full h-[85vh] overflow-hidden bg-slate-900">
         {/* Background Image */}
         <div 
           className="absolute inset-0 bg-cover bg-center opacity-60"
           style={{ backgroundImage: "url('/images/farmdrone.webp')" }}
         ></div>
         <div className="absolute inset-0  bg-gradient-to-t from-slate-950 via-transparent to-slate-900/50"></div>

         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 font-bold tracking-widest uppercase mb-8 animate-fade-in">
               <Drone size={16} /> Drone-Powered Agriculture
            </div>
            <h1 className="md:text-8xl font-black mb-6  text-transparent bg-clip-text bg-gradient-to-b from-white to-darkgreen-300 ">
                  Connecting Farmers <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-blue-400">
                   with Expert Drone Pilots
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl leading-relaxed">
               AeroNex aims to connects India's 3 Crore Farmers with 3,000+ Certified Drone Pilots in India.
               Experience precision spraying that saves 30% cost and 90% water.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
               <Link href="/register?role=farmer" className="group bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition transform hover:-translate-y-1 shadow-2xl shadow-green-900/50 flex items-center justify-center gap-3">
                  <Leaf size={24}/> I Need a Drone Service
                  <ArrowRight className="group-hover:translate-x-1 transition"/>
               </Link>
               <Link href="/register?role=pilot" className="group bg-white text-slate-900 hover:bg-blue-50 px-10 py-5 rounded-2xl font-bold text-xl transition transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3">
                  <Drone size={24}/> I am a Drone Pilot 
                  <ArrowRight className="group-hover:translate-x-1 transition"/>
               </Link>
            </div>
         </div>
      </div>

      {/* -----------------------------------------------------
          SECTION 2: REAL WORLD IMPACT (The Numbers)
      ----------------------------------------------------- */}
      <div className="bg-slate-50 py-20 border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
               <div className="p-4">
                  <div className="text-4xl font-black text-blue-600 mb-2">3,000+</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Certified Pilots with Kisan Drone training in India</div>
               </div>
               <div className="p-4">
                  <div className="text-4xl font-black text-green-600 mb-2">3 Crore</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Farmers Demand Drone Services</div>
               </div>
               <div className="p-4">
                  <div className="text-4xl font-black text-orange-600 mb-2">₹600</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Avg Cost / Acre</div>
               </div>
               <div className="p-4">
                  <div className="text-4xl font-black text-purple-600 mb-2">10-20 min</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Speed / 10 Acres <br></br>(Depends upon wind and drone model)</div>
               </div>
            </div>
         </div>
      </div>

      {/* ---------------------------
          SECTION 3: FOR FARMERS
      ------------------------------- */}
      <div className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                <div className="md:w-1/2">
                  <span className="text-green-600 font-bold tracking-widest text-sm uppercase mb-2 block">For Every Farmer</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    No Tech Skills Needed! <br/><span className="text-4xl md:text-5xl font-black text-green-600 mb-6 leading-tight">Just Book Drone Spraying Service.</span>
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                     Whether you own 2 acres or 200, manual spraying is hurting your profit. 
                     Labor is expensive and hard to find. Drones are ready instantly.
                  </p>
                  
                <div className="space-y-6">
                     <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                        <Droplets className="text-green-600 shrink-0" size={28}/>
                     <div>
                           <h4 className="font-bold text-lg">Save Expensive Chemicals</h4>
                           <p className="text-slate-600 text-sm">ULV technology uses microscopic droplets that stick to plants, stopping wastage.</p>
                      </div>
                     </div>
                     <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                        <Clock className="text-green-600 shrink-0" size={28}/>
                        <div>
                           <h4 className="font-bold text-lg">Beat the Weather</h4>
                           <p className="text-slate-600 text-sm">Finish spraying before the rains come. A drone covers 25 acres/day compared to 2 acres manually.</p>
                         </div>
                      </div>
                  </div>
               </div>
               <div className="md:w-1/2 relative">
                  <div className="absolute -inset-4 bg-green-200 rounded-3xl transform rotate-3"></div>
                  <img 
                     src="/images/farmer.webp" 
                     alt="Farmer in Field" 
                     className="relative rounded-2xl shadow-2xl z-10"
                  />
                  {/* Floating Card */}
                  <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl z-20 border border-slate-100 max-w-xs hidden md:block">
                     <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="text-green-500" size={26}/>
                        <span className="font-bold text-slate-800">Verified Service</span>
                     </div>
                     <p className="text-xs text-slate-500">"I saved ₹15,000 on labor this season using AeroNex." - Ram Singh, Bhatona</p>
                  </div>
                 </div>
              </div>
         </div>
      </div>

      {/* -----------------------------------------------------
          SECTION 4: The Technology
      ----------------------------------------------------- */}
      <div className="w-full h-[600px] relative bg-fixed bg-center bg-cover" style={{backgroundImage: "url('/images/spray.webp')"}}>
         <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white px-6">
               <h2 className="text-5xl font-black mb-6">World Class Technology</h2>
               <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                  We support DJI Agras T40, T20, and Indian-made DGCA approved drones. 
                  RTK positioning ensures we never miss a spot or spray outside your boundary.
               </p>
               <div className="flex justify-center gap-8">
                  <div className="text-center">
                     <div className="text-4xl font-bold text-blue-400">400ft</div>
                     <div className="text-sm uppercase tracking-wide opacity-70">Max Altitude</div>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-green-400">10L - 30L</div>
                     <div className="text-sm uppercase tracking-wide opacity-70">Payload Capacity</div>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-yellow-400">IP67</div>
                     <div className="text-sm uppercase tracking-wide opacity-70">Waterproof</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* -----------------------------------------------------
          SECTION 5: OPERATIONAL TRANSPARENCY 
      ----------------------------------------------------- */}
      <div className="py-32 bg-slate-50 ">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Transparency First</span>
               <h2 className="text-4xl font-black mt-2 text-slate-900">How The Platform Works</h2>
               <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                  We have removed the middlemen. Our algorithm connects the nearest available pilot to the farm, 
                  ensuring fair pricing and instant service.
               </p>
            </div>

            {/* PROCESS DIAGRAM */}
            <div className="grid md:grid-cols-5 gap-4 relative">
               {/* Connector Line */}
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 transform -translate-y-1/2 z-0"></div>

               {/* Step 1 */}
               <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center hover:scale-105 transition duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4 font-bold text-xl">1</div>
                  <h4 className="font-bold text-slate-900 mb-2">Book</h4>
                  <p className="text-xs text-slate-500">Farmer posts job with location & crop details. Pays ₹500 Token.</p>
               </div>

               {/* Step 2 */}
               <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center hover:scale-105 transition duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4 font-bold text-xl">2</div>
                  <h4 className="font-bold text-slate-900 mb-2">Match</h4>
                  <p className="text-xs text-slate-500">Algorithm alerts verified pilots within 50km radius.</p>
               </div>

               {/* Step 3 */}
               <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center hover:scale-105 transition duration-300">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mx-auto mb-4 font-bold text-xl">3</div>
                  <h4 className="font-bold text-slate-900 mb-2">Verify</h4>
                  <p className="text-xs text-slate-500">Pilot arrives. Uploads 'Safety Check' photos. Farmer approves start.</p>
               </div>

               {/* Step 4 */}
               <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center hover:scale-105 transition duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4 font-bold text-xl">4</div>
                  <h4 className="font-bold text-slate-900 mb-2">Spray</h4>
                  <p className="text-xs text-slate-500">Drone performs autonomous flight. Live status updates on app.</p>
               </div>

               {/* Step 5 */}
               <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center hover:scale-105 transition duration-300">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mx-auto mb-4 font-bold text-xl">5</div>
                  <h4 className="font-bold text-slate-900 mb-2">Pay</h4>
                  <p className="text-xs text-slate-500">Job complete. Balance deducted from farmer, credited to Pilot Wallet.</p>
               </div>
               {/* End of Process  */}
            </div>
         </div>
      </div>

      <div className="relative pt-159 pb-32 overflow-hidden">
         {/* Background Image */}
         <div 
           className="absolute inset-0 bg-cover bg-center opacity-100"
           style={{ backgroundImage: "url('/images/spray_booking.webp')" }}
         ></div>
      </div>
      {/* -----------------------------------------------------
          SECTION 6: FOR DRONE PILOTS (The Career Path)
      ----------------------------------------------------- */}
      <div className="py-32 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
               <div className="md:w-1/2 relative">
                  <div className="absolute -inset-4 bg-blue-500 rounded-3xl opacity-20 transform -rotate-3"></div>
                  <img 
                     src="/images/dronepilot.webp" 
                     alt="Drone Pilot" 
                     className="relative rounded-2xl shadow-2xl z-10"
                  />
               </div>
               <div className="md:w-1/2">
                  <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-2 block">For Certified Pilots</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                     More Than Just a Gig. <br/>It's a Career.
                  </h2>
                  <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                     AeroNex is the only platform that tracks your <strong>Flight Hours</strong> and builds your digital resume. 
                     Move from Rookie to Ace and unlock higher paying jobs.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="text-sm text-slate-400 mb-1">Fresher (0-50 hrs)</div>
                        <div className="font-bold text-white">Standard Jobs</div>
                     </div>
                     <div className="bg-slate-800 p-4 rounded-xl border border-blue-500">
                        <div className="text-sm text-blue-400 mb-1">Experienced (100+ hrs)</div>
                        <div className="font-bold text-white">Priority Access + 5% Bonus</div>
                     </div>
                  </div>

                  <Link href="/register?role=pilot" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-white transition">
                     View Pilot Requirements <ArrowRight size={18}/>
                  </Link>
               </div>
            </div>
         </div>
      </div>

      {/* -----------------------------------------------------
          SECTION 7: TRUST & COMPLIANCE FOOTER
      ----------------------------------------------------- */}
      <div className="py-24 bg-white border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12">
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">A</div>
                     <span className="font-bold text-xl tracking-tight">AeroNex Pvt Ltd.</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed max-w-sm mb-6">
                     India's first fully compliant Drone-as-a-Service platform. 
                     We are dedicated to the Ministry of Civil Aviation's vision of making India a global drone hub by 2030.
                  </p>
                  <div className="flex gap-4">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" className="h-10 opacity-50 grayscale hover:grayscale-0 transition"/>
                     
                     <div className="h-10 w-24 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200">Digital Sky</div>
                  </div>
               </div>

               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                     <li className="hover:text-blue-600 cursor-pointer">Find a Pilot</li>
                     <li className="hover:text-blue-600 cursor-pointer">Register as Pilot</li>
                     <li className="hover:text-blue-600 cursor-pointer">Live Map</li>
                     <li className="hover:text-blue-600 cursor-pointer">Pricing Calculator</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Legal & Support</h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                     <li className="hover:text-blue-600 cursor-pointer">Drone Rules 2021</li>
                     <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
                     <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
                     <li className="hover:text-blue-600 cursor-pointer flex items-center gap-2"><Phone size={14}/> 1800-AERO-HELP</li>
                  </ul>
               </div>
            </div>
            
            <div className="border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
               <p>© 2025 AeroNex India. All rights reserved.</p>
               <p>Made with ❤️ for Indian Agriculture</p>
            </div>
         </div>
      </div>

    </div>
  );
}