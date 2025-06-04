'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  ShareIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

// Use the same brands from the main content page
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

// Mock content data - in real app this would come from props or API
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
        seoScore: 92,
        difficulty: 'Medium'
      },
      {
        id: `blog-${brandKey}-2`,
        topic: `The Future of Business: ${brand.name}'s Strategic Vision`,
        description: `Explore how ${brand.name} is positioning itself for the future, including upcoming product launches, market expansion, and technological advancements.`,
        tags: ['Strategy', 'Future Tech', 'Business Growth', 'Market Analysis'],
        estimatedReadTime: '12 min read',
        seoScore: 88,
        difficulty: 'High'
      },
      {
        id: `blog-${brandKey}-3`,
        topic: `${brand.name} Success Stories: Client Case Studies`,
        description: `Real-world examples of how ${brand.name} has helped businesses achieve their goals, featuring detailed case studies and measurable results.`,
        tags: ['Case Studies', 'Success Stories', 'ROI', 'Client Results'],
        estimatedReadTime: '6 min read',
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
        bestTimeToPost: 'Tuesday 10:00 AM'
      },
      {
        id: `linkedin-${brandKey}-2`,
        topic: `Behind the Scenes at ${brand.name}`,
        description: `Give followers a peek into company culture, team achievements, and workplace highlights. Great for employer branding and recruitment.`,
        tags: ['Company Culture', 'Team', 'Behind the Scenes'],
        estimatedEngagement: '189 reactions',
        bestTimeToPost: 'Wednesday 2:00 PM'
      },
      {
        id: `linkedin-${brandKey}-3`,
        topic: `${brand.name} Product Innovation Update`,
        description: `Announce new features, improvements, or upcoming releases. Keep your audience informed about product developments.`,
        tags: ['Product Updates', 'Innovation', 'New Features'],
        estimatedEngagement: '312 reactions',
        bestTimeToPost: 'Thursday 9:00 AM'
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
        followers: '1.8K',
        difficulty: 'Intermediate'
      },
      {
        id: `quora-${brandKey}-2`,
        question: `What are the key benefits of using ${brand.name} for business growth?`,
        description: `Comprehensive answer about how ${brand.name} contributes to business success, including ROI, efficiency gains, and strategic advantages.`,
        tags: ['Business Growth', 'ROI', 'Benefits'],
        followers: '2.3K',
        difficulty: 'Beginner'
      },
      {
        id: `quora-${brandKey}-3`,
        question: `What technical expertise is needed to implement ${brand.name}?`,
        description: `Technical guide covering required skills, resources, and implementation complexity for ${brand.name} solutions.`,
        tags: ['Technical Requirements', 'Implementation', 'Skills'],
        followers: '1.4K',
        difficulty: 'Advanced'
      }
    ]
  };
};

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
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 font-roboto";
  const variantClasses = variant === 'primary' 
    ? "bg-[#390099] text-white hover:bg-[#390099]/90 shadow-sm hover:shadow-md"
    : "bg-white border border-gray-300 text-[#390099] hover:bg-gray-50 hover:border-[#390099] shadow-sm";

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

function ContentViewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<any>(null);
  
  // Get URL parameters
  const type = searchParams.get('type') || 'blog';
  const id = searchParams.get('id') || '';
  const brand = searchParams.get('brand') || 'geoiq';

  // Get the content based on URL parameters
  const allContent = generateSuggestedContent(brand);
  const content = React.useMemo(() => {
    switch (type) {
      case 'blog':
        return allContent.blogPosts.find(post => post.id === id);
      case 'linkedin':
        return allContent.linkedinPosts.find(post => post.id === id);
      case 'reddit':
        return allContent.redditQuestions.find(q => q.id === id);
      case 'quora':
        return allContent.quoraQuestions.find(q => q.id === id);
      default:
        return null;
    }
  }, [type, id, brand, allContent]);

  useEffect(() => {
    if (content) {
      setEditedContent(content);
    }
  }, [content]);

  if (!content) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-roboto">Content not found</h3>
            <p className="text-gray-600 font-roboto">The requested content could not be found.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleBack = () => {
    router.push('/content');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleUse = () => {
    console.log(`Using ${type} content:`, content.id);
    // Handle content usage logic here
    alert(`Content "${getContentTitle()}" has been marked for use!`);
  };

  const getContentTitle = () => {
    switch (type) {
      case 'blog': return content.topic;
      case 'linkedin': return content.topic;
      case 'reddit': return content.question;
      case 'quora': return content.question;
      default: return 'Content';
    }
  };

  const getContentIcon = () => {
    switch (type) {
      case 'blog': return DocumentTextIcon;
      case 'linkedin': return ShareIcon;
      case 'reddit':
      case 'quora': return QuestionMarkCircleIcon;
      default: return DocumentTextIcon;
    }
  };

  const generateFullBlogHTML = () => {
    const title = getContentTitle();
    const description = content.description;
    
    return `
      <article class="blog-post">
        <header class="blog-header">
          <h1 class="blog-title">${title}</h1>
          <div class="blog-meta">
            <span class="read-time">${content.estimatedReadTime}</span>
            <span class="seo-score">SEO Score: ${content.seoScore}%</span>
            <span class="difficulty ${content.difficulty.toLowerCase()}">${content.difficulty} Difficulty</span>
          </div>
        </header>
        
        <div class="blog-content">
          <p class="lead">${description}</p>
          
          <h2>Introduction</h2>
          <p>In today's rapidly evolving business landscape, <strong>${content.tags[0].toLowerCase()}</strong> has become a critical factor for success. This comprehensive guide explores how organizations can leverage innovative approaches to drive growth and efficiency.</p>
          
          <h2>Key Benefits</h2>
          <ul>
            ${content.tags.map((tag: string, index: number) => `<li><strong>${tag}</strong>: Detailed explanation of how this aspect contributes to overall success and drives measurable results for organizations.</li>`).join('')}
          </ul>
          
          <h2>Implementation Strategy</h2>
          <p>To successfully implement these solutions, organizations should consider the following approach:</p>
          <ol>
            <li><strong>Assessment Phase</strong>: Evaluate current capabilities and identify areas for improvement</li>
            <li><strong>Planning Phase</strong>: Develop a comprehensive roadmap with clear milestones</li>
            <li><strong>Execution Phase</strong>: Deploy solutions with proper change management</li>
            <li><strong>Optimization Phase</strong>: Continuously monitor and refine processes</li>
          </ol>
          
          <blockquote>
            "The key to successful transformation lies in understanding both the technical requirements and the human elements of change." - Industry Expert
          </blockquote>
          
          <h2>Best Practices</h2>
          <p>Based on extensive research and real-world implementations, here are the most effective practices:</p>
          <ul>
            <li>Start with a clear vision and measurable objectives</li>
            <li>Engage stakeholders throughout the process</li>
            <li>Implement robust training and support systems</li>
            <li>Monitor progress and adjust strategies as needed</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>By following these best practices and leveraging the right tools, organizations can achieve significant improvements in their operations and competitive positioning. The journey requires dedication, but the results speak for themselves.</p>
          
          <div class="call-to-action">
            <h3>Ready to Get Started?</h3>
            <p>Contact our team to learn how we can help you implement these strategies in your organization.</p>
          </div>
        </div>
      </article>
    `;
  };

  const generateLinkedInContent = () => {
    return `${getContentTitle()}

${content.description}

Key insights:
${content.tags.map((tag: string) => `• ${tag}`).join('\n')}

What are your thoughts on this approach? Share your experiences in the comments below.

#Innovation #Technology #Business #Growth #${BRANDS[brand as keyof typeof BRANDS].name.replace(/\s+/g, '')}`;
  };

  const generateAnswerContent = () => {
    return `**Question:** ${getContentTitle()}

**Detailed Answer:**

${content.description}

Based on my experience and research, here are the key points to consider:

${content.tags.map((tag: string, index: number) => `**${index + 1}. ${tag}**
This is particularly important because it directly impacts the overall effectiveness of your approach. Organizations that focus on this area typically see significant improvements in their results.`).join('\n\n')}

**Conclusion:**
The best approach depends on your specific requirements and context, but following these guidelines will help you make an informed decision and achieve better outcomes.

*Tags: ${content.tags.join(', ')}*`;
  };

  const ContentIcon = getContentIcon();

  return (
    <DashboardLayout>
      {/* Header with Back Button */}
      <div className="w-full max-w-none">
        <div className="w-[70%] mx-auto">
          <motion.div 
            className="space-y-6 bg-white min-h-full font-roboto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Back Navigation */}
            <div className="flex items-center justify-between">
              <motion.button
                onClick={handleBack}
                className="flex items-center space-x-2 text-[#390099] hover:text-[#390099]/80 transition-colors font-roboto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Suggested Content</span>
              </motion.button>

              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <ActionButton
                    variant="secondary"
                    icon={PencilIcon}
                    onClick={handleEdit}
                  >
                    Edit
                  </ActionButton>
                ) : (
                  <ActionButton
                    variant="primary"
                    icon={CheckIcon}
                    onClick={handleSave}
                  >
                    Save Changes
                  </ActionButton>
                )}
              </div>
            </div>

            {/* Content Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="p-3 rounded-lg bg-[#390099]/10">
                <ContentIcon className="w-6 h-6 text-[#390099]" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 font-roboto mb-2">
                  {isEditing ? 'Edit Content' : 'Preview Content'}
                </h1>
                <p className="text-sm text-gray-600 font-roboto capitalize">
                  {type} {type === 'blog' ? 'Post' : type === 'linkedin' ? 'Post' : 'Answer'} • {BRANDS[brand as keyof typeof BRANDS].name}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
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
              </div>
            </div>

            {/* Content Display */}
            <div className="max-w-none">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                      {type === 'blog' ? 'Article Title' : type === 'linkedin' ? 'Post Title' : 'Question'}
                    </label>
                    <input
                      type="text"
                      value={editedContent?.topic || editedContent?.question || ''}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        [type === 'blog' || type === 'linkedin' ? 'topic' : 'question']: e.target.value
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#390099] focus:border-transparent font-roboto text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                      Content
                    </label>
                    <textarea
                      value={type === 'blog' ? generateFullBlogHTML() : type === 'linkedin' ? generateLinkedInContent() : generateAnswerContent()}
                      onChange={(e) => {/* Handle content change */}}
                      rows={25}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#390099] focus:border-transparent font-roboto font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-roboto mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={editedContent?.tags?.join(', ') || ''}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        tags: e.target.value.split(',').map(tag => tag.trim())
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#390099] focus:border-transparent font-roboto"
                      placeholder="Separate tags with commas"
                    />
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  {type === 'blog' ? (
                    <div 
                      className="blog-content font-roboto"
                      dangerouslySetInnerHTML={{ __html: generateFullBlogHTML() }}
                      style={{
                        lineHeight: '1.7',
                        color: '#374151'
                      }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap font-roboto text-gray-800 leading-relaxed text-base">
                      {type === 'linkedin' ? generateLinkedInContent() : generateAnswerContent()}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-6 mt-8">
              <div className="text-sm text-gray-600 font-roboto">
                {type === 'blog' && `${content.estimatedReadTime} • SEO Score: ${content.seoScore}%`}
                {type === 'linkedin' && `Expected: ${content.estimatedEngagement} • Best time: ${content.bestTimeToPost}`}
                {(type === 'reddit' || type === 'quora') && `${content.followers || content.estimatedUpvotes} ${type === 'reddit' ? 'upvotes' : 'followers'} expected`}
              </div>
              
              <ActionButton
                icon={type === 'blog' ? DocumentTextIcon : type === 'linkedin' ? ShareIcon : ChatBubbleLeftRightIcon}
                onClick={handleUse}
                className="bg-[#390099] text-white hover:bg-[#390099]/90"
              >
                Use {type === 'blog' ? 'Topic' : type === 'linkedin' ? 'Post' : 'Answer'}
              </ActionButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Blog Styles */}
      <style jsx>{`
        .blog-content h1.blog-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #1f2937;
          margin-bottom: 1rem;
          font-family: 'Roboto', sans-serif;
        }
        
        .blog-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f3f4f6;
        }
        
        .blog-meta span {
          font-size: 0.875rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: #f9fafb;
          color: #6b7280;
          font-weight: 500;
        }
        
        .blog-meta .seo-score {
          background: #dcfce7;
          color: #166534;
        }
        
        .blog-meta .difficulty.low {
          background: #dcfce7;
          color: #166534;
        }
        
        .blog-meta .difficulty.medium {
          background: #fef3c7;
          color: #92400e;
        }
        
        .blog-meta .difficulty.high {
          background: #fecaca;
          color: #991b1b;
        }
        
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1f2937;
          margin: 2rem 0 1rem 0;
          line-height: 1.3;
        }
        
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 1.5rem 0 0.75rem 0;
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
          color: #4b5563;
          line-height: 1.7;
        }
        
        .blog-content p.lead {
          font-size: 1.125rem;
          font-weight: 400;
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1.25rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
          color: #4b5563;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #390099;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .blog-content .call-to-action {
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
          color: white;
          padding: 2rem;
          border-radius: 0.75rem;
          margin: 2rem 0;
          text-align: center;
        }
        
        .blog-content .call-to-action h3 {
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .blog-content .call-to-action p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
        }
      `}</style>
    </DashboardLayout>
  );
}

export default function ContentViewPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="loading-spinner loading-spinner-lg"></div>
        </div>
      </DashboardLayout>
    }>
      <ContentViewPageContent />
    </Suspense>
  );
} 