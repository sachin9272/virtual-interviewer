import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { 
  Play, 
  MessageSquare, 
  Calendar, 
  Briefcase, 
  Clock, 
  Star,
  TrendingUp,
  User,
  ChevronRight,
  Award,
  Target,
  Zap
} from "lucide-react";

const InterviewItemCard = ({ interview, index }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1d';
    if (diffDays < 7) return `${diffDays}d`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w`;
    return `${Math.ceil(diffDays / 30)}m`;
  };

  // Get experience level color
  const getExperienceColor = (years) => {
    if (years <= 2) return 'from-green-500 to-emerald-500';
    if (years <= 5) return 'from-blue-500 to-cyan-500';
    if (years <= 10) return 'from-purple-500 to-indigo-500';
    return 'from-orange-500 to-red-500';
  };

  // Get experience level text
  const getExperienceLevel = (years) => {
    if (years <= 2) return 'Junior';
    if (years <= 5) return 'Mid';
    if (years <= 10) return 'Senior';
    return 'Expert';
  };

  // Mock data for enhanced features
  const mockScore = Math.floor(Math.random() * 40) + 60;
  const mockDuration = Math.floor(Math.random() * 20) + 10;
  const mockQuestions = Math.floor(Math.random() * 10) + 5;

  return (
    <div 
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-white/60 hover:border-blue-200/60 shadow-md hover:shadow-xl transition-all duration-400 transform hover:scale-[1.02] overflow-hidden cursor-pointer h-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-purple-50/20 to-pink-50/40 opacity-0 group-hover:opacity-100 transition-all duration-400"></div>
      
      {/* Status Indicator */}
      <div className="absolute top-3 right-3 flex items-center space-x-1">
        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-gray-500">Active</span>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Briefcase className="w-3 h-3 text-white" />
            </div>
            <span className={`px-2 py-0.5 bg-gradient-to-r ${getExperienceColor(interview.jobExperience)} text-white text-xs font-semibold rounded-full`}>
              {getExperienceLevel(interview.jobExperience)}
            </span>
          </div>
          
          <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent line-clamp-2 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 leading-tight">
            {interview?.jobPosition}
          </h2>
          
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{interview?.jobExperience}Y</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{getTimeAgo(interview.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Stats Section - Horizontal Layout */}
        <div className="flex gap-2">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-2 border border-blue-200/50 flex-1 group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-3 h-3 text-blue-600" />
              <div className="text-center">
                <div className="text-sm font-bold text-blue-800">{mockScore}%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-2 border border-purple-200/50 flex-1 group-hover:scale-105 transition-transform duration-300 delay-75">
            <div className="flex items-center justify-center space-x-1">
              <Clock className="w-3 h-3 text-purple-600" />
              <div className="text-center">
                <div className="text-sm font-bold text-purple-800">{mockDuration}m</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-2 border border-green-200/50 flex-1 group-hover:scale-105 transition-transform duration-300 delay-150">
            <div className="flex items-center justify-center space-x-1">
              <Target className="w-3 h-3 text-green-600" />
              <div className="text-center">
                <div className="text-sm font-bold text-green-800">{mockQuestions}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section - Compact */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-100">
          <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
            {interview?.jobDesc || "AI-powered mock interview session for technical and behavioral assessment."}
          </p>
        </div>

        {/* Date Info - Compact */}
        <div className="flex items-center justify-between text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2">
          <span>{formatDate(interview.createdAt)}</span>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Ready</span>
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onFeedbackPress}
            className="flex-1 group/btn bg-white/80 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 font-medium rounded-xl transition-all duration-300 text-xs h-8"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Feedback
          </Button>
          
          <Button 
            size="sm"
            onClick={onStart}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group/btn text-xs h-8"
          >
            <Play className="w-3 h-3 mr-1 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            Start
          </Button>
        </div>

        {/* Performance Indicator - Compact */}
        <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <div className="flex items-center space-x-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-2 py-1 border border-green-200">
            <TrendingUp className="w-2 h-2 text-green-600" />
            <span className="text-xs font-medium text-green-700">High Performance</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-400 ${
        isHovered 
          ? 'bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
          : ''
      }`}></div>
    </div>
  );
};

export default InterviewItemCard;