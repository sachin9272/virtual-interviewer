"use client";
import { MockInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useState, useEffect } from 'react';
import InterviewItemCard from './InterviewItemCard';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { 
  Clock, 
  Calendar, 
  Users, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronDown,
  Loader2,
  FileText,
  Star,
  PlayCircle,
  BarChart3
} from 'lucide-react';

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  useEffect(() => {
    filterAndSortInterviews();
  }, [interviewList, searchTerm, sortBy, filterBy]);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id));
      
      setInterviewList(result);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortInterviews = () => {
    let filtered = [...interviewList];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(interview =>
        interview.jobPosition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.jobDesc?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      // Add your filter logic here based on your schema
      // Example: filtered = filtered.filter(interview => interview.category === filterBy);
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'position':
        filtered.sort((a, b) => (a.jobPosition || '').localeCompare(b.jobPosition || ''));
        break;
      default:
        break;
    }

    setFilteredList(filtered);
  };

  const getStats = () => {
    const total = interviewList.length;
    const thisWeek = interviewList.filter(interview => {
      const interviewDate = new Date(interview.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return interviewDate >= weekAgo;
    }).length;

    return { total, thisWeek };
  };

  const stats = getStats();

  // Loading State
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl animate-pulse"></div>
            <div className="h-6 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/50 rounded-2xl p-6 border border-gray-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
                <div className="w-20 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading your interviews...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-indigo-800 bg-clip-text text-transparent">
              Interview History
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{stats.total} total</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>{stats.thisWeek} this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-blue-500 font-medium">Total Sessions</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-4 border border-green-100">
            <div className="text-2xl font-bold text-green-600">{stats.thisWeek}</div>
            <div className="text-xs text-green-500 font-medium">This Week</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by position or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="position">By Position</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="general">General</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Interview List */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? 'No interviews found' : 'No interviews yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Start your AI interview journey by creating your first mock interview'
              }
            </p>
            {!searchTerm && (
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Create Your First Interview
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((interview, index) => (
              <div
                key={interview.id || index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-blue-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {/* Enhanced InterviewItemCard with interview data */}
                <InterviewItemCard 
                  interview={interview}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination or Load More (if needed) */}
      {filteredList.length > 0 && (
        <div className="flex justify-center pt-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 border border-white/50 shadow-lg">
            <span className="text-gray-600 font-medium">
              Showing {filteredList.length} of {interviewList.length} interviews
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default InterviewList;