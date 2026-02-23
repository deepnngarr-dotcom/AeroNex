// client/components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Home, Plane, Tractor, LogOut, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
   
    <nav className="bg-black text-white h-20 flex items-center sticky top-0 z-50 border-b border-gray-800 shadow-2xl">
      
     
      <div className="w-[95%] max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* 1. LOGO */}
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 group">
          <span className="text-white group-hover:text-gray-300 transition">AERO</span>
          <span className="text-green-600">NEX</span>
        </Link>

        {/* 2. CENTER LINKS  */}
        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide uppercase text-gray-300">
          
          <Link href="/" className="hover:text-white transition flex items-center gap-2">
            Home
          </Link>

          <Link href="/pilots" className="hover:text-red-500 transition flex items-center gap-2 group">
            Pilots
            <span className="bg-red-600 text-white text-[10px] px-1 rounded hidden group-hover:block">NEW</span>
          </Link>

          <Link href="/farmers" className="hover:text-green-500 transition flex items-center gap-2">
            Farmers
          
          </Link>

        </div>

        {/* 3. AUTH SECTION  */}
        <div>
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-3 hover:bg-gray-900 px-4 py-2 rounded-full transition border border-gray-800">
                <div className="bg-gray-700 p-1 rounded-full">
                  <User size={16} className="text-white"/>
                </div>
                <span className="hidden md:block font-medium text-sm">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-gray-500"/>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-xl shadow-xl overflow-hidden hidden group-hover:block border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-bold truncate">{user.email}</p>
                </div>
                <Link 
                  href={user.role === 'pilot' ? '/pilot/profile' : '/farmer/profile'} 
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 font-medium"
                  >
                  My Profile
                </Link>
                 <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-gray-300 hover:text-white transition">
                Log in
              </Link>
              <Link href="/register" className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}