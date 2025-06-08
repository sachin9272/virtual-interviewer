"use client";

import React, { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Bot, Menu, X } from 'lucide-react';

const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Questions', path: '/dashboard/questions', icon: '❓' },
    { name: 'Upgrade', path: '/dashboard/upgrade', icon: '⭐' },
    { name: 'How it Works?', path: '/dashboard/how', icon: '💡' }
  ];

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-blue-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl shadow-2xl' 
        : 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 shadow-lg'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-0 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className='relative flex p-4 items-center justify-between text-white'>
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              AI Interviewer
            </h1>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className='hidden md:flex gap-2'>
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer
                ${path === item.path 
                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white font-semibold shadow-lg border border-blue-400/30' 
                  : 'hover:bg-white/10 hover:text-blue-200 hover:shadow-md'
                }`}>
                <span className="text-sm">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              {path === item.path && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              )}
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-blue-400/50 hover:ring-blue-400 transition-all duration-300"
                }
              }}
            />
          </div>
          
          {/* Mobile Menu */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/20 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <div key={index} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                ${path === item.path 
                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white font-semibold' 
                  : 'hover:bg-white/10 hover:text-blue-200'
                }`}>
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 sm:hidden">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-blue-400/50"
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
