"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, Bot, Users, Zap, Shield, Play, Star, Check, Menu, X } from 'lucide-react';

export default function AIInterviewerLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "HR Director",
      company: "TechCorp",
      text: "Our hiring process is 70% faster with AI interviews. Candidates love the convenience!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Recruitment Lead",
      company: "StartupHub",
      text: "The AI provides consistent, unbiased screening. It's revolutionized our talent acquisition.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Talent Manager",
      company: "GlobalTech",
      text: "24/7 availability means we never miss great candidates from different time zones.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced natural language processing conducts human-like conversations and evaluates responses intelligently."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Seamless Experience",
      description: "Intuitive interface for both recruiters and candidates with real-time feedback and scoring."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Reduce hiring time by 80% with instant screening and automated candidate ranking."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bias-Free Evaluation",
      description: "Ensure fair and consistent evaluation based purely on skills and qualifications."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">AI Interviewer</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-blue-300 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-300 transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-blue-300 transition-colors">Testimonials</a>
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-900/95 backdrop-blur-lg px-6 py-4 space-y-4">
            <a href="#features" className="block hover:text-blue-300 transition-colors">Features</a>
            <a href="#how-it-works" className="block hover:text-blue-300 transition-colors">How it Works</a>
            <a href="#testimonials" className="block hover:text-blue-300 transition-colors">Testimonials</a>
            <button 
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full font-semibold transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Revolutionize
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Hiring with AI
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Transform your recruitment process with our intelligent virtual interviewer. 
                  Screen candidates 24/7, eliminate bias, and find the perfect talent faster than ever.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>No setup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Interactive Demo Preview */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Interviewer</h3>
                      <p className="text-sm text-gray-400">Online now</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-500/20 p-4 rounded-2xl rounded-bl-sm">
                      <p className="text-sm">"Hello! I'm excited to learn about your experience. Can you tell me about your most challenging project?"</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl rounded-br-sm ml-8">
                      <p className="text-sm">"I led a team of 5 developers to build a real-time analytics platform..."</p>
                    </div>
                    <div className="bg-blue-500/20 p-4 rounded-2xl rounded-bl-sm">
                      <p className="text-sm">"That sounds impressive! What technologies did you use?"</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Interviewer</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge AI technology to deliver the most efficient and fair hiring experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16">
            Trusted by <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl lg:text-2xl mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-400">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of companies already using AI to find the perfect candidates faster and more efficiently.
            </p>
            <button 
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-12 py-4 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Get Started Now</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">AI Interviewer</span>
          </div>
          <p className="text-gray-400">© 2025 AI Interviewer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}