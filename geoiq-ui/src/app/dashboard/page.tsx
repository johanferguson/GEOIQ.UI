'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  HeartIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { formatDate } from '@/lib/utils';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom LinkedIn Icon Component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Custom Reddit Icon Component  
const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

// Custom Quora Icon Component
const QuoraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.738 18.701a2.995 2.995 0 0 0 2.584-1.495l.588 1.455a3.995 3.995 0 0 1-3.172 1.615c-1.555 0-2.813-.88-3.416-2.16-.596 1.28-1.854 2.16-3.415 2.16a3.995 3.995 0 0 1-4-4c0-2.205 1.795-4 4-4 1.561 0 2.819.88 3.415 2.16.603-1.28 1.86-2.16 3.416-2.16a4.002 4.002 0 0 1 3.171 1.615l-.587 1.455a2.995 2.995 0 0 0-2.584-1.495c-1.66 0-3 1.34-3 3s1.34 3 3 3zM5.917 19.276a2.995 2.995 0 0 1-3-3c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);

// Content Section Stats - Following 60-30-10 rule
const contentStats = [
  {
    name: 'Blog Posts',
    value: '24',
    change: '+3 this week',
    changeType: 'positive' as const,
    icon: DocumentTextIcon,
    color: '#390099', // 30% color - Deep Royal Purple
    iconColor: '#390099', // Same as color for regular icons
  },
  {
    name: 'LinkedIn Posts',
    value: '18',
    change: '+5 this week',
    changeType: 'positive' as const,
    icon: LinkedInIcon,
    color: '#390099', // 30% color - Deep Royal Purple
    iconColor: '#390099', // Branded icon color
  },
  {
    name: 'Reddit Answers',
    value: '47',
    change: '+12 this week',
    changeType: 'positive' as const,
    icon: RedditIcon,
    color: '#FF0054', // 10% accent - Vivid Pink
    iconColor: '#390099', // Branded icon color
  },
  {
    name: 'Quora Answers',
    value: '31',
    change: '+8 this week',
    changeType: 'positive' as const,
    icon: QuoraIcon,
    color: '#390099', // 30% color - Deep Royal Purple
    iconColor: '#390099', // Branded icon color
  },
];

// Growth Section Stats - Following 60-30-10 rule
const growthStats = [
  {
    name: 'Mentions',
    value: '1,247',
    change: '+18% this month',
    changeType: 'positive' as const,
    icon: MagnifyingGlassIcon,
    color: '#390099', // 30% color - Deep Royal Purple
    iconColor: '#390099', // Same as color for regular icons
  },
  {
    name: 'Visibility Score',
    value: '73%',
    change: '+5% this month',
    changeType: 'positive' as const,
    icon: EyeIcon,
    color: '#390099', // 30% color - Deep Royal Purple
    iconColor: '#390099', // Same as color for regular icons
  },
  {
    name: 'Positive Sentiment',
    value: '84%',
    change: '+2% this month',
    changeType: 'positive' as const,
    icon: HeartIcon,
    color: '#FFBD00', // 10% accent - Golden Yellow
    iconColor: '#FFBD00', // Same as color for regular icons
  },
  {
    name: 'Scans Run',
    value: '156',
    change: '+23 this month',
    changeType: 'positive' as const,
    icon: ArrowTrendingUpIcon,
    color: '#390099', // 30% color - Deep Royal Purple
    iconColor: '#390099', // Same as color for regular icons
  },
];

// Dummy data for Visibility Trend Area Chart
const visibilityTrendData = [
  { month: 'Jan', visibility: 45 },
  { month: 'Feb', visibility: 52 },
  { month: 'Mar', visibility: 48 },
  { month: 'Apr', visibility: 61 },
  { month: 'May', visibility: 55 },
  { month: 'Jun', visibility: 67 },
  { month: 'Jul', visibility: 73 },
  { month: 'Aug', visibility: 78 },
  { month: 'Sep', visibility: 82 },
  { month: 'Oct', visibility: 79 },
  { month: 'Nov', visibility: 85 },
  { month: 'Dec', visibility: 91 },
];

// Dummy data for Brand Mentions Bar Chart
const brandMentionsData = [
  { platform: 'Google', mentions: 324 },
  { platform: 'ChatGPT', mentions: 187 },
  { platform: 'Claude', mentions: 156 },
  { platform: 'Gemini', mentions: 143 },
  { platform: 'Perplexity', mentions: 98 },
  { platform: 'Bing', mentions: 76 },
];

const quickActions = [
  {
    title: 'Run GEO Scan',
    description: 'Analyze your brand visibility across LLMs',
    icon: MagnifyingGlassIcon,
    href: '/scan',
    color: 'from-primary-500 to-magenta-500',
    primary: true,
  },
  {
    title: 'Generate Prompts',
    description: 'Create new AI prompts for testing',
    icon: ChatBubbleLeftRightIcon,
    href: '/prompts',
    color: 'from-pink-500 to-orange-500',
  },
  {
    title: 'View Recommendations',
    description: 'See AI-powered content suggestions',
    icon: ChartBarIcon,
    href: '/recommendations',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    title: 'Schedule Content',
    description: 'Plan your content calendar',
    icon: CalendarIcon,
    href: '/schedule',
    color: 'from-green-500 to-blue-500',
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'scan',
    title: 'Brand visibility scan completed',
    description: 'TechCorp visibility improved by 8%',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    type: 'content',
    title: 'LinkedIn post approved',
    description: 'AI-generated content ready for publishing',
    time: '4 hours ago',
    status: 'success',
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'New content recommendations',
    description: '5 new blog topics suggested',
    time: '6 hours ago',
    status: 'info',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* 60% White background for main content */}
      <div className="space-y-8 bg-white min-h-full font-roboto">
        {/* Content Section - 60% white cards with 30% #390099 accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="geoiq-card p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-normal font-roboto" style={{ color: '#9E0059' }}>{stat.name}</p>
                  <p className="text-xl font-medium mt-1 font-roboto" style={{ color: stat.color }}>{stat.value}</p>
                  <p className={`text-xs mt-1 font-roboto ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600' 
                      : stat.changeType === 'negative' 
                      ? 'text-red-600' 
                      : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: (stat.iconColor || stat.color) + '20' }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.iconColor || stat.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Section - 60% white cards with 30% #390099 accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {growthStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="geoiq-card p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-normal font-roboto" style={{ color: '#9E0059' }}>{stat.name}</p>
                  <p className="text-xl font-medium mt-1 font-roboto" style={{ color: stat.color }}>{stat.value}</p>
                  <p className={`text-xs mt-1 font-roboto ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600' 
                      : stat.changeType === 'negative' 
                      ? 'text-red-600' 
                      : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: (stat.iconColor || stat.color) + '20' }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.iconColor || stat.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visibility Trend Area Chart */}
          <div className="geoiq-card p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium font-roboto" style={{ color: '#9E0059' }}>
                Visibility Trend
              </h3>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-roboto">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF0054] to-[#FF5400]"></div>
                <span>Monthly Growth</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={visibilityTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="modernVisibilityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF0054" stopOpacity={0.3}/>
                    <stop offset="50%" stopColor="#FF5400" stopOpacity={0.15}/>
                    <stop offset="100%" stopColor="#FFBD00" stopOpacity={0.05}/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="1 3" 
                  stroke="#e1e5e9" 
                  strokeOpacity={0.6}
                  vertical={false}
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 11, 
                    fill: '#64748b', 
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400
                  }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 11, 
                    fill: '#64748b',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400
                  }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#374151',
                    fontFamily: 'Roboto, sans-serif',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(10px)'
                  }}
                  labelStyle={{ 
                    color: '#9E0059', 
                    fontWeight: 500,
                    marginBottom: '4px'
                  }}
                  formatter={(value, name) => [`${value}%`, 'Visibility Score']}
                  labelFormatter={(label) => `${label} 2024`}
                />
                <Area 
                  type="monotone" 
                  dataKey="visibility" 
                  stroke="url(#areaStrokeGradient)"
                  strokeWidth={2}
                  fill="url(#modernVisibilityGradient)"
                  filter="url(#glow)"
                  dot={{ fill: '#FF0054', strokeWidth: 2, stroke: '#fff', r: 4 }}
                  activeDot={{ r: 6, stroke: '#FF0054', strokeWidth: 2, fill: '#fff' }}
                />
                <defs>
                  <linearGradient id="areaStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF0054" />
                    <stop offset="50%" stopColor="#FF5400" />
                    <stop offset="100%" stopColor="#FFBD00" />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Brand Mentions Bar Chart */}
          <div className="geoiq-card p-6 bg-gradient-to-br from-white to-amber-50 border-0 shadow-lg shadow-amber-200/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium font-roboto" style={{ color: '#9E0059' }}>
                Brand Mentions
              </h3>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-roboto">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFBD00] to-[#FF5400]"></div>
                <span>By Platform</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={brandMentionsData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="modernMentionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFBD00" stopOpacity={0.6}/>
                    <stop offset="50%" stopColor="#FF5400" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#FF0054" stopOpacity={0.2}/>
                  </linearGradient>
                  <filter id="barGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="1 3" 
                  stroke="#e1e5e9" 
                  strokeOpacity={0.6}
                  vertical={false}
                />
                <XAxis 
                  dataKey="platform" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 11, 
                    fill: '#64748b',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400
                  }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 11, 
                    fill: '#64748b',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400
                  }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#374151',
                    fontFamily: 'Roboto, sans-serif',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(10px)'
                  }}
                  labelStyle={{ 
                    color: '#9E0059', 
                    fontWeight: 500,
                    marginBottom: '4px'
                  }}
                  formatter={(value, name) => [`${value}`, 'Mentions']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar 
                  dataKey="mentions" 
                  fill="url(#modernMentionsGradient)"
                  radius={[6, 6, 0, 0]}
                  filter="url(#barGlow)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="geoiq-card p-4 cursor-pointer group hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                {/* Action Information */}
                <div className="flex-1">
                  <p 
                    className="text-sm font-normal font-roboto"
                    style={{ color: '#9E0059' }}
                  >
                    {action.title}
                  </p>
                  
                  <p className="text-gray-600 text-xs mt-1 font-roboto">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center text-xs mt-2 font-roboto group-hover:text-primary-700 transition-colors">
                    <span className="text-primary-600">Get started</span>
                    <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Icon */}
                <div 
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ 
                    backgroundColor: '#39009920' 
                  }}
                >
                  <action.icon 
                    className="w-5 h-5"
                    style={{ color: '#390099' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 