'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  DocumentTextIcon,
  BuildingOfficeIcon,
  CpuChipIcon,
  CloudIcon,
  LinkIcon,
  PlusIcon,
  TagIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  RefreshIcon,
  HeartIcon,
  EyeIcon,
  ShareIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Simplified, lighter animation variants for better performance
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0 }
};

const cardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.02
    }
  }
};

// Use correct brands from other pages
const BRANDS = {
  'geoiq': {
    name: 'TechVision Solutions',
    icon: 'building',
    color: '#390099',
    description: 'Intelligent business solutions and analytics'
  },
  'techvision': {
    name: 'TechVision AI',
    icon: 'cpu',
    color: '#390099',
    description: 'AI-powered business solutions and automation'
  },
  'cloudflow': {
    name: 'CloudFlow Pro',
    icon: 'cloud',
    color: '#390099',
    description: 'Cloud infrastructure and workflow optimization'
  },
  'databridge': {
    name: 'DataBridge Connect',
    icon: 'link',
    color: '#390099',
    description: 'Data integration and connectivity solutions'
  }
};

// Icon mapping
const iconMap = {
  building: BuildingOfficeIcon,
  cpu: CpuChipIcon,
  cloud: CloudIcon,
  link: LinkIcon
};

// Content type options for filtering - Remove "All Content", show only specific types
const CONTENT_TYPES = [
  { id: 'blog', name: 'Blog Posts', icon: DocumentTextIcon, count: 3 },
  { id: 'linkedin', name: 'LinkedIn Posts', icon: ShareIcon, count: 3 },
  { id: 'reddit', name: 'Reddit Questions', icon: QuestionMarkCircleIcon, count: 3 },
  { id: 'quora', name: 'Quora Questions', icon: QuestionMarkCircleIcon, count: 3 }
];

// Mock suggested content data with correct brand names
const generateSuggestedContent = (brandKey: string) => {
  const brand = BRANDS[brandKey as keyof typeof BRANDS];
  
  return {
    blogPosts: [
      {
        id: `blog-${brandKey}-1`,
        topic: `How ${brand.name} is Revolutionizing Industry Standards`,
        description: `An in-depth analysis of ${brand.name}'s innovative approach to solving complex industry challenges through cutting-edge technology and strategic partnerships.`,
        tags: ['Innovation', 'Technology', 'Industry Trends', 'Leadership'],
        estimatedReadTime: '8 min read',
        potentialViews: '12.5K',
        seoScore: 92,
        difficulty: 'Medium'
      },
      {
        id: `blog-${brandKey}-2`,
        topic: `The Future of Business: ${brand.name}'s Strategic Vision`,
        description: `Explore how ${brand.name} is positioning itself for the future, including upcoming product launches, market expansion, and technological advancements.`,
        tags: ['Strategy', 'Future Tech', 'Business Growth', 'Market Analysis'],
        estimatedReadTime: '12 min read',
        potentialViews: '18.3K',
        seoScore: 88,
        difficulty: 'High'
      },
      {
        id: `blog-${brandKey}-3`,
        topic: `${brand.name} Success Stories: Client Case Studies`,
        description: `Real-world examples of how ${brand.name} has helped businesses achieve their goals, featuring detailed case studies and measurable results.`,
        tags: ['Case Studies', 'Success Stories', 'ROI', 'Client Results'],
        estimatedReadTime: '6 min read',
        potentialViews: '9.2K',
        seoScore: 85,
        difficulty: 'Low'
      }
    ],
    linkedinPosts: [
      {
        id: `linkedin-${brandKey}-1`,
        topic: `${brand.name} Thought Leadership`,
        description: `Share insights about industry trends and how ${brand.name} is leading the way in innovation. Perfect for establishing thought leadership.`,
        tags: ['Thought Leadership', 'Industry Insights', 'Innovation'],
        estimatedEngagement: '245 reactions',
        bestTimeToPost: 'Tuesday 10:00 AM',
        audienceReach: '5.2K'
      },
      {
        id: `linkedin-${brandKey}-2`,
        topic: `Behind the Scenes at ${brand.name}`,
        description: `Give followers a peek into company culture, team achievements, and workplace highlights. Great for employer branding and recruitment.`,
        tags: ['Company Culture', 'Team', 'Behind the Scenes'],
        estimatedEngagement: '189 reactions',
        bestTimeToPost: 'Wednesday 2:00 PM',
        audienceReach: '3.8K'
      },
      {
        id: `linkedin-${brandKey}-3`,
        topic: `${brand.name} Product Innovation Update`,
        description: `Announce new features, improvements, or upcoming releases. Keep your audience informed about product developments.`,
        tags: ['Product Updates', 'Innovation', 'New Features'],
        estimatedEngagement: '312 reactions',
        bestTimeToPost: 'Thursday 9:00 AM',
        audienceReach: '7.1K'
      }
    ],
    redditQuestions: [
      {
        id: `reddit-${brandKey}-1`,
        question: `What are the best practices for implementing ${brand.name.toLowerCase()} solutions?`,
        description: `A technical discussion about implementation strategies, common challenges, and best practices when working with ${brand.name} technologies.`,
        tags: ['Implementation', 'Best Practices', 'Technical'],
        subreddit: 'r/technology',
        estimatedUpvotes: '1.2K',
        difficulty: 'Expert'
      },
      {
        id: `reddit-${brandKey}-2`,
        question: `Has anyone tried ${brand.name} for their business? What was your experience?`,
        description: `Community discussion about real user experiences, pros and cons, and practical insights from actual ${brand.name} users.`,
        tags: ['User Experience', 'Reviews', 'Community'],
        subreddit: 'r/entrepreneur',
        estimatedUpvotes: '856',
        difficulty: 'Beginner'
      },
      {
        id: `reddit-${brandKey}-3`,
        question: `${brand.name} vs competitors - which should I choose?`,
        description: `Comparative analysis helping users understand the advantages of ${brand.name} over alternatives in the market.`,
        tags: ['Comparison', 'Competitive Analysis', 'Decision Making'],
        subreddit: 'r/business',
        estimatedUpvotes: '2.1K',
        difficulty: 'Intermediate'
      }
    ],
    quoraQuestions: [
      {
        id: `quora-${brandKey}-1`,
        question: `How does ${brand.name} compare to other solutions in the market?`,
        description: `Detailed comparison highlighting unique features, benefits, and competitive advantages of ${brand.name} solutions.`,
        tags: ['Comparison', 'Market Analysis', 'Competitive Advantage'],
        views: '45.2K',
        followers: '1.8K',
        difficulty: 'Intermediate'
      },
      {
        id: `quora-${brandKey}-2`,
        question: `What are the key benefits of using ${brand.name} for business growth?`,
        description: `Comprehensive answer about how ${brand.name} contributes to business success, including ROI, efficiency gains, and strategic advantages.`,
        tags: ['Business Growth', 'ROI', 'Benefits'],
        views: '32.7K',
        followers: '2.3K',
        difficulty: 'Beginner'
      },
      {
        id: `quora-${brandKey}-3`,
        question: `What technical expertise is needed to implement ${brand.name}?`,
        description: `Technical guide covering required skills, resources, and implementation complexity for ${brand.name} solutions.`,
        tags: ['Technical Requirements', 'Implementation', 'Skills'],
        views: '28.9K',
        followers: '1.4K',
        difficulty: 'Advanced'
      }
    ]
  };
};

// Optimized ContentCard with minimal animations
const ContentCard = ({ children, className = '', onClick = () => {} }: { 
  children: React.ReactNode, 
  className?: string,
  onClick?: () => void 
}) => (
  <div
    className={`geoiq-card p-4 md:p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#390099]/10 text-[#390099] border border-[#390099]/20"
      >
        <TagIcon className="w-3 h-3 mr-1" />
        {tag}
      </span>
    ))}
  </div>
);

// Simplified ActionButton with minimal animations
const ActionButton = ({ 
  children, 
  variant = 'primary', 
  icon: Icon, 
  onClick = () => {},
  className = ''
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ComponentType<{ className: string }>;
  onClick?: () => void;
  className?: string;
}) => {
  const baseClasses = "inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors duration-150 font-roboto";
  const variantClasses = variant === 'primary' 
    ? "bg-white border border-gray-300 text-[#390099] hover:bg-gray-50 hover:border-[#390099] shadow-sm"
    : "bg-white border border-gray-300 text-[#390099] hover:bg-gray-50 hover:border-[#390099]";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default function SuggestedContentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('geoiq');
  const [activeContentType, setActiveContentType] = useState('blog');
  const [loading, setLoading] = useState(true);
  const [suggestedContent, setSuggestedContent] = useState<any>(null);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    loadSuggestedContent();
  }, [activeTab]);

  const loadSuggestedContent = () => {
    setLoading(true);
    // Simulate API call with shorter delay for better performance
    setTimeout(() => {
      setSuggestedContent(generateSuggestedContent(activeTab));
      setLoading(false);
    }, 100);
  };

  const handleRegenerateContent = async () => {
    setRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSuggestedContent(generateSuggestedContent(activeTab));
    setRegenerating(false);
  };

  const handleViewContent = (content: any, type: string) => {
    // Use replace instead of push for better performance
    const params = new URLSearchParams({
      type: type,
      id: content.id,
      brand: activeTab
    });
    router.push(`/content/view?${params.toString()}`);
  };

  const handleUseContent = (type: string, id: string) => {
    console.log(`Using ${type} content:`, id);
    // Handle content usage logic here
  };

  const getFilteredContent = () => {
    if (!suggestedContent) return {};
    
    switch (activeContentType) {
      case 'blog':
        return { blogPosts: suggestedContent.blogPosts };
      case 'linkedin':
        return { linkedinPosts: suggestedContent.linkedinPosts };
      case 'reddit':
        return { redditQuestions: suggestedContent.redditQuestions };
      case 'quora':
        return { quoraQuestions: suggestedContent.quoraQuestions };
      default:
        return { blogPosts: suggestedContent.blogPosts };
    }
  };

  if (loading && !suggestedContent) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="loading-spinner loading-spinner-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  const currentBrand = BRANDS[activeTab as keyof typeof BRANDS];
  const filteredContent = getFilteredContent();

  return (
    <DashboardLayout>
      {/* Responsive container */}
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="space-y-4 md:space-y-6 bg-white min-h-full font-roboto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Page Header - responsive design */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#39009920' }}>
                  <DocumentTextIcon className="w-5 h-5 text-[#390099]" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-medium text-gray-900 font-roboto">
                    Suggested Content
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 font-roboto">
                    AI-powered content recommendations to boost your brand visibility
                  </p>
                </div>
              </div>

              {/* Regenerate Button - responsive */}
              <button
                onClick={handleRegenerateContent}
                disabled={regenerating}
                className="flex items-center space-x-2 bg-white border border-gray-300 text-[#390099] px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-[#390099] transition-colors duration-150 font-roboto disabled:opacity-50"
              >
                <SparklesIcon className={`w-4 h-4 ${regenerating ? 'animate-pulse' : ''}`} />
                <span className="hidden sm:inline">{regenerating ? 'Generating...' : 'Regenerate Content'}</span>
                <span className="sm:hidden">{regenerating ? 'Generating...' : 'Regenerate'}</span>
              </button>
            </div>

            {/* Brand Navigation Tabs - responsive */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-4 md:space-x-8 min-w-max">
                {Object.entries(BRANDS).map(([key, brand]) => {
                  const IconComponent = iconMap[brand.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors font-roboto whitespace-nowrap ${
                        activeTab === key
                          ? 'border-[#390099] text-[#390099]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{brand.name}</span>
                      <span className="sm:hidden">{brand.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Type Filter Tabs - responsive */}
            <div className="border-b border-gray-100">
              <div className="flex items-center space-x-1 p-1 bg-gray-50 rounded-lg overflow-x-auto">
                {CONTENT_TYPES.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveContentType(type.id)}
                      className={`flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 rounded-md text-sm font-medium transition-colors duration-150 font-roboto whitespace-nowrap ${
                        activeContentType === type.id
                          ? 'bg-white text-[#390099] shadow-sm border border-gray-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{type.name}</span>
                      <span className="sm:hidden">{type.name.split(' ')[0]}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeContentType === type.id 
                          ? 'bg-[#390099]/10 text-[#390099]' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {type.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Sections - responsive grid */}
            <AnimatePresence mode="wait">
              {suggestedContent && (
                <motion.div
                  key={`${activeTab}-${activeContentType}`}
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="space-y-6 md:space-y-8"
                >
                  {/* Blog Posts Section */}
                  {activeContentType === 'blog' && filteredContent.blogPosts && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <DocumentTextIcon className="w-5 h-5 text-[#390099]" />
                          <span className="hidden sm:inline">Blog Post Ideas</span>
                          <span className="sm:hidden">Blog Posts</span>
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.blogPosts.length}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredContent.blogPosts.map((post: any) => (
                          <ContentCard key={post.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 font-roboto mb-2 line-clamp-2">
                                  {post.topic}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto line-clamp-3">
                                  {post.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span className="font-roboto">{post.estimatedReadTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ArrowTrendingUpIcon className="w-3 h-3" />
                                  <span className="font-roboto">SEO {post.seoScore}%</span>
                                </div>
                              </div>

                              <TagList tags={post.tags.slice(0, 3)} />
                              
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <span className={`text-xs px-2 py-1 rounded-full font-roboto ${
                                  post.difficulty === 'Low' ? 'bg-green-100 text-green-700' :
                                  post.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {post.difficulty}
                                </span>
                                
                                <div className="flex items-center gap-2">
                                  <ActionButton
                                    variant="secondary"
                                    icon={EyeIcon}
                                    onClick={() => handleViewContent(post, 'blog')}
                                  >
                                    <span className="hidden sm:inline">View</span>
                                  </ActionButton>
                                  <ActionButton
                                    icon={DocumentTextIcon}
                                    onClick={() => handleUseContent('blog', post.id)}
                                  >
                                    <span className="hidden sm:inline">Use Topic</span>
                                    <span className="sm:hidden">Use</span>
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LinkedIn Posts Section */}
                  {activeContentType === 'linkedin' && filteredContent.linkedinPosts && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <ShareIcon className="w-5 h-5 text-[#390099]" />
                          <span className="hidden sm:inline">LinkedIn Post Ideas</span>
                          <span className="sm:hidden">LinkedIn Posts</span>
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.linkedinPosts.length}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredContent.linkedinPosts.map((post: any) => (
                          <ContentCard key={post.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 font-roboto mb-2 line-clamp-2">
                                  {post.topic}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto line-clamp-3">
                                  {post.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <HeartIcon className="w-3 h-3" />
                                  <span className="font-roboto">{post.estimatedEngagement}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span className="font-roboto hidden md:inline">{post.bestTimeToPost}</span>
                                  <span className="font-roboto md:hidden">Tue 10AM</span>
                                </div>
                              </div>

                              <TagList tags={post.tags.slice(0, 3)} />
                              
                              <div className="pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 justify-end">
                                  <ActionButton
                                    variant="secondary"
                                    icon={EyeIcon}
                                    onClick={() => handleViewContent(post, 'linkedin')}
                                  >
                                    <span className="hidden sm:inline">View</span>
                                  </ActionButton>
                                  <ActionButton
                                    icon={ShareIcon}
                                    onClick={() => handleUseContent('linkedin', post.id)}
                                  >
                                    <span className="hidden sm:inline">Use Post</span>
                                    <span className="sm:hidden">Use</span>
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reddit Questions Section */}
                  {activeContentType === 'reddit' && filteredContent.redditQuestions && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <QuestionMarkCircleIcon className="w-5 h-5 text-[#390099]" />
                          <span className="hidden sm:inline">Reddit Questions</span>
                          <span className="sm:hidden">Reddit</span>
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.redditQuestions.length}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredContent.redditQuestions.map((question: any) => (
                          <ContentCard key={question.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 font-roboto mb-2 line-clamp-2">
                                  {question.question}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto line-clamp-3">
                                  {question.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                                  <span className="font-roboto">{question.subreddit}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ArrowTrendingUpIcon className="w-3 h-3" />
                                  <span className="font-roboto">{question.estimatedUpvotes}</span>
                                </div>
                              </div>

                              <TagList tags={question.tags.slice(0, 3)} />
                              
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <span className={`text-xs px-2 py-1 rounded-full font-roboto ${
                                  question.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                  question.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {question.difficulty}
                                </span>
                                
                                <div className="flex items-center gap-2">
                                  <ActionButton
                                    variant="secondary"
                                    icon={EyeIcon}
                                    onClick={() => handleViewContent(question, 'reddit')}
                                  >
                                    <span className="hidden sm:inline">View</span>
                                  </ActionButton>
                                  <ActionButton
                                    icon={ChatBubbleLeftRightIcon}
                                    onClick={() => handleUseContent('reddit', question.id)}
                                  >
                                    <span className="hidden sm:inline">Answer</span>
                                    <span className="sm:hidden">Use</span>
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quora Questions Section */}
                  {activeContentType === 'quora' && filteredContent.quoraQuestions && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <QuestionMarkCircleIcon className="w-5 h-5 text-[#FF0054]" />
                          <span className="hidden sm:inline">Quora Questions</span>
                          <span className="sm:hidden">Quora</span>
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.quoraQuestions.length}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredContent.quoraQuestions.map((question: any) => (
                          <ContentCard key={question.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 font-roboto mb-2 line-clamp-2">
                                  {question.question}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto line-clamp-3">
                                  {question.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <HeartIcon className="w-3 h-3" />
                                  <span className="font-roboto">{question.followers} followers</span>
                                </div>
                              </div>

                              <TagList tags={question.tags.slice(0, 3)} />
                              
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <span className={`text-xs px-2 py-1 rounded-full font-roboto ${
                                  question.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                  question.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-purple-100 text-purple-700'
                                }`}>
                                  {question.difficulty}
                                </span>
                                
                                <div className="flex items-center gap-2">
                                  <ActionButton
                                    variant="secondary"
                                    icon={EyeIcon}
                                    onClick={() => handleViewContent(question, 'quora')}
                                  >
                                    <span className="hidden sm:inline">View</span>
                                  </ActionButton>
                                  <ActionButton
                                    icon={ChatBubbleLeftRightIcon}
                                    onClick={() => handleUseContent('quora', question.id)}
                                  >
                                    <span className="hidden sm:inline">Answer</span>
                                    <span className="sm:hidden">Use</span>
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 