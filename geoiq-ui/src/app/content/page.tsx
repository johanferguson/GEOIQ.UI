'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

const cardVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
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

const ContentCard = ({ children, className = '', onClick = () => {} }: { 
  children: React.ReactNode, 
  className?: string,
  onClick?: () => void 
}) => (
  <motion.div
    variants={cardVariants}
    className={`geoiq-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${className}`}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    {children}
  </motion.div>
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
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-roboto";
  const variantClasses = variant === 'primary' 
    ? "bg-white border border-gray-300 text-[#390099] hover:bg-gray-50 hover:border-[#390099] shadow-sm"
    : "bg-white border border-gray-300 text-[#390099] hover:bg-gray-50 hover:border-[#390099]";

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
};

// ViewModal Component for viewing and editing content
const ViewModal = ({ 
  content, 
  isEditing, 
  onClose, 
  onEdit, 
  onSave, 
  onUse 
}: {
  content: any;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: () => void;
  onUse: () => void;
}) => {
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  if (!content) return null;

  const getContentTitle = () => {
    switch (content.type) {
      case 'blog': return content.topic;
      case 'linkedin': return content.topic;
      case 'reddit': return content.question;
      case 'quora': return content.question;
      default: return 'Content';
    }
  };

  const getFullContent = () => {
    const title = getContentTitle();
    const description = content.description;
    
    // Generate full content based on type
    switch (content.type) {
      case 'blog':
        return `# ${title}

${description}

## Introduction

In today's rapidly evolving business landscape, ${content.tags[0].toLowerCase()} has become a critical factor for success. This comprehensive guide explores how organizations can leverage innovative approaches to drive growth and efficiency.

## Key Benefits

${content.tags.map((tag: string, index: number) => `${index + 1}. **${tag}**: Detailed explanation of how this aspect contributes to overall success.`).join('\n')}

## Implementation Strategy

To successfully implement these solutions, organizations should consider the following approach:

1. **Assessment Phase**: Evaluate current capabilities and identify areas for improvement
2. **Planning Phase**: Develop a comprehensive roadmap with clear milestones
3. **Execution Phase**: Deploy solutions with proper change management
4. **Optimization Phase**: Continuously monitor and refine processes

## Conclusion

By following these best practices and leveraging the right tools, organizations can achieve significant improvements in their operations and competitive positioning.

---
*Estimated read time: ${content.estimatedReadTime || '8 min read'}*`;

      case 'linkedin':
        return `${title}

${description}

Key insights:
${content.tags.map((tag: string) => `• ${tag}`).join('\n')}

What are your thoughts on this approach? Share your experiences in the comments below.

#Innovation #Technology #Business #Growth`;

      case 'reddit':
      case 'quora':
        return `**Question:** ${title}

**Detailed Answer:**

${description}

Based on my experience and research, here are the key points to consider:

${content.tags.map((tag: string, index: number) => `**${index + 1}. ${tag}**
This is particularly important because it directly impacts the overall effectiveness of your approach.`).join('\n\n')}

**Conclusion:**
The best approach depends on your specific requirements, but following these guidelines will help you make an informed decision.

*Tags: ${content.tags.join(', ')}*`;

      default:
        return description;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#390099]/10">
              {content.type === 'blog' && <DocumentTextIcon className="w-5 h-5 text-[#390099]" />}
              {content.type === 'linkedin' && <ShareIcon className="w-5 h-5 text-[#390099]" />}
              {(content.type === 'reddit' || content.type === 'quora') && <QuestionMarkCircleIcon className="w-5 h-5 text-[#390099]" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 font-roboto">
                {isEditing ? 'Edit Content' : 'Preview Content'}
              </h2>
              <p className="text-sm text-gray-600 font-roboto capitalize">
                {content.type} {content.type === 'blog' ? 'Post' : content.type === 'linkedin' ? 'Post' : 'Question'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={onEdit}
                className="bg-white border border-gray-300 text-[#390099] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-[#390099] transition-all duration-200 font-roboto"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={onSave}
                className="bg-[#390099] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#390099]/90 transition-all duration-200 font-roboto"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                  {content.type === 'blog' ? 'Article Title' : content.type === 'linkedin' ? 'Post Title' : 'Question'}
                </label>
                <input
                  type="text"
                  value={editedContent.topic || editedContent.question || ''}
                  onChange={(e) => setEditedContent({
                    ...editedContent,
                    [content.type === 'blog' || content.type === 'linkedin' ? 'topic' : 'question']: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#390099] focus:border-transparent font-roboto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                  Content
                </label>
                <textarea
                  value={getFullContent()}
                  onChange={(e) => {/* Handle content change */}}
                  rows={20}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#390099] focus:border-transparent font-roboto font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={editedContent.tags?.join(', ') || ''}
                  onChange={(e) => setEditedContent({
                    ...editedContent,
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#390099] focus:border-transparent font-roboto"
                  placeholder="Separate tags with commas"
                />
              </div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap font-roboto text-gray-800 leading-relaxed">
                {getFullContent()}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {content.tags?.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#390099]/10 text-[#390099] border border-[#390099]/20"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <ActionButton
            icon={content.type === 'blog' ? DocumentTextIcon : content.type === 'linkedin' ? ShareIcon : ChatBubbleLeftRightIcon}
            onClick={onUse}
            className="bg-[#390099] text-white hover:bg-[#390099]/90 border-[#390099]"
          >
            Use {content.type === 'blog' ? 'Topic' : content.type === 'linkedin' ? 'Post' : 'Answer'}
          </ActionButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SuggestedContentPage() {
  const [activeTab, setActiveTab] = useState('geoiq');
  const [activeContentType, setActiveContentType] = useState('blog');
  const [loading, setLoading] = useState(true);
  const [suggestedContent, setSuggestedContent] = useState<any>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [viewingContent, setViewingContent] = useState<any>(null);
  const [editingContent, setEditingContent] = useState(false);

  useEffect(() => {
    loadSuggestedContent();
  }, [activeTab]);

  const loadSuggestedContent = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuggestedContent(generateSuggestedContent(activeTab));
      setLoading(false);
    }, 300);
  };

  const handleRegenerateContent = async () => {
    setRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuggestedContent(generateSuggestedContent(activeTab));
    setRegenerating(false);
  };

  const handleViewContent = (content: any, type: string) => {
    setViewingContent({ ...content, type });
    setEditingContent(false);
  };

  const handleEditContent = () => {
    setEditingContent(true);
  };

  const handleSaveContent = () => {
    setEditingContent(false);
    // Handle save logic here
  };

  const handleUseContent = (type: string, id: string) => {
    console.log(`Using ${type} content:`, id);
    setViewingContent(null);
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
      {/* Centered 70% width container - matching prompts page */}
      <div className="w-full max-w-none">
        <div className="w-[70%] mx-auto">
          <motion.div 
            className="space-y-6 bg-white min-h-full font-roboto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Page Header - matching prompts/brands pattern with correct font */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#39009920' }}>
                  <DocumentTextIcon className="w-5 h-5 text-[#390099]" />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-900 font-roboto">
                    Suggested Content
                  </h1>
                  <p className="text-xs text-gray-600 font-roboto">
                    AI-powered content recommendations to boost your brand visibility
                  </p>
                </div>
              </motion.div>

              {/* Regenerate Button */}
              <motion.button
                onClick={handleRegenerateContent}
                disabled={regenerating}
                className="flex items-center space-x-2 bg-white border border-gray-300 text-[#390099] px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-[#390099] transition-all duration-200 font-roboto disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <SparklesIcon className={`w-4 h-4 ${regenerating ? 'animate-pulse' : ''}`} />
                <span>{regenerating ? 'Generating...' : 'Regenerate Content'}</span>
              </motion.button>
            </div>

            {/* Brand Navigation Tabs - exact copy from prompts/brands */}
            <motion.div 
              className="border-b border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <nav className="flex space-x-8">
                {Object.entries(BRANDS).map(([key, brand]) => {
                  const IconComponent = iconMap[brand.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors font-roboto ${
                        activeTab === key
                          ? 'border-[#390099] text-[#390099]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{brand.name}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>

            {/* Content Type Filter Tabs */}
            <motion.div 
              className="border-b border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center space-x-1 p-1 bg-gray-50 rounded-lg">
                {CONTENT_TYPES.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveContentType(type.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 font-roboto ${
                        activeContentType === type.id
                          ? 'bg-white text-[#390099] shadow-sm border border-gray-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{type.name}</span>
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
            </motion.div>

            {/* Content Sections */}
            <AnimatePresence mode="wait">
              {suggestedContent && (
                <motion.div
                  key={`${activeTab}-${activeContentType}`}
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="space-y-8"
                >
                  {/* Blog Posts Section */}
                  {activeContentType === 'blog' && filteredContent.blogPosts && (
                    <motion.div variants={cardVariants} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <DocumentTextIcon className="w-5 h-5 text-[#390099]" />
                          Blog Post Ideas
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.blogPosts.length} suggestions
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredContent.blogPosts.map((post: any) => (
                          <ContentCard key={post.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 font-roboto mb-2">
                                  {post.topic}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto">
                                  {post.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span className="font-roboto">{post.estimatedReadTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ArrowTrendingUpIcon className="w-3 h-3" />
                                  <span className="font-roboto">SEO {post.seoScore}%</span>
                                </div>
                              </div>

                              <TagList tags={post.tags} />
                              
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <span className={`text-xs px-2 py-1 rounded-full font-roboto ${
                                  post.difficulty === 'Low' ? 'bg-green-100 text-green-700' :
                                  post.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {post.difficulty} Difficulty
                                </span>
                                
                                <div className="flex items-center gap-2">
                                  <ActionButton
                                    variant="secondary"
                                    icon={EyeIcon}
                                    onClick={() => handleViewContent(post, 'blog')}
                                  >
                                    View
                                  </ActionButton>
                                  <ActionButton
                                    icon={DocumentTextIcon}
                                    onClick={() => handleUseContent('blog', post.id)}
                                  >
                                    Use Topic
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* LinkedIn Posts Section */}
                  {activeContentType === 'linkedin' && filteredContent.linkedinPosts && (
                    <motion.div variants={cardVariants} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <ShareIcon className="w-5 h-5 text-[#390099]" />
                          LinkedIn Post Ideas
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.linkedinPosts.length} suggestions
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredContent.linkedinPosts.map((post: any) => (
                          <ContentCard key={post.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 font-roboto mb-2">
                                  {post.topic}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto">
                                  {post.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <HeartIcon className="w-3 h-3" />
                                  <span className="font-roboto">{post.estimatedEngagement}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span className="font-roboto">{post.bestTimeToPost}</span>
                                </div>
                              </div>

                              <TagList tags={post.tags} />
                              
                              <div className="pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 justify-end">
                                  <ActionButton
                                    variant="secondary"
                                    icon={EyeIcon}
                                    onClick={() => handleViewContent(post, 'linkedin')}
                                  >
                                    View
                                  </ActionButton>
                                  <ActionButton
                                    icon={ShareIcon}
                                    onClick={() => handleUseContent('linkedin', post.id)}
                                  >
                                    Use Post
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Reddit Questions Section */}
                  {activeContentType === 'reddit' && filteredContent.redditQuestions && (
                    <motion.div variants={cardVariants} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <QuestionMarkCircleIcon className="w-5 h-5 text-[#390099]" />
                          Reddit Questions
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.redditQuestions.length} questions
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredContent.redditQuestions.map((question: any) => (
                          <ContentCard key={question.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 font-roboto mb-2">
                                  {question.question}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto">
                                  {question.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                                  <span className="font-roboto">{question.subreddit}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ArrowTrendingUpIcon className="w-3 h-3" />
                                  <span className="font-roboto">{question.estimatedUpvotes} upvotes</span>
                                </div>
                              </div>

                              <TagList tags={question.tags} />
                              
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
                                    View
                                  </ActionButton>
                                  <ActionButton
                                    icon={ChatBubbleLeftRightIcon}
                                    onClick={() => handleUseContent('reddit', question.id)}
                                  >
                                    Answer Question
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Quora Questions Section */}
                  {activeContentType === 'quora' && filteredContent.quoraQuestions && (
                    <motion.div variants={cardVariants} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 font-roboto flex items-center gap-2" style={{ color: '#9E0059' }}>
                          <QuestionMarkCircleIcon className="w-5 h-5 text-[#FF0054]" />
                          Quora Questions
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredContent.quoraQuestions.length} questions
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredContent.quoraQuestions.map((question: any) => (
                          <ContentCard key={question.id}>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 font-roboto mb-2">
                                  {question.question}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-roboto">
                                  {question.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <HeartIcon className="w-3 h-3" />
                                  <span className="font-roboto">{question.followers} followers</span>
                                </div>
                              </div>

                              <TagList tags={question.tags} />
                              
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
                                    View
                                  </ActionButton>
                                  <ActionButton
                                    icon={ChatBubbleLeftRightIcon}
                                    onClick={() => handleUseContent('quora', question.id)}
                                  >
                                    Answer Question
                                  </ActionButton>
                                </div>
                              </div>
                            </div>
                          </ContentCard>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* View Modal */}
            <AnimatePresence>
              {viewingContent && (
                <ViewModal
                  content={viewingContent}
                  isEditing={editingContent}
                  onClose={() => setViewingContent(null)}
                  onEdit={handleEditContent}
                  onSave={handleSaveContent}
                  onUse={() => handleUseContent(viewingContent.type, viewingContent.id)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 