"use client";

import React, { useState } from 'react';
import { Plus, Zap, Users, TrendingUp, Clock, Star } from 'lucide-react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

const Dashboard = () => {
  const [stats] = useState([
    { label: 'Total Interviews', value: '24', icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Avg Duration', value: '12m', icon: <Clock className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Rating', value: '4.8', icon: <Star className="w-6 h-6" />, color: 'from-yellow-500 to-orange-500' }
  ]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden'>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className='relative z-10 p-6 lg:p-10'>
        {/* Top Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent'>
                Dashboard
              </h1>
              <p className='text-gray-600 text-lg mt-1'>Create and manage your AI-powered mock interviews</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-blue-200/50 hover:transform hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  </div>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Interview Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 space-y-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Quick Start</h2>
              <p className="text-gray-600">Launch a new AI interview session</p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className="md:col-span-1">
              <AddNewInterview />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  📝
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Practice Mode</h3>
                <p className="text-gray-600 text-sm">Improve your skills with practice interviews</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">View detailed performance insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interview List */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                📋
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Interviews</h2>
                <p className="text-gray-600">Manage and review your interview sessions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full px-4 py-2 border border-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Live</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
            <InterviewList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
