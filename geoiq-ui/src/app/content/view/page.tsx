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

// Simplified animation variants for better performance
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0 }
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

// Simplified ActionButton for better performance
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
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm font-medium transition-colors duration-150 font-roboto";
  const variantClasses = variant === 'primary' 
    ? "bg-[#390099] text-white hover:bg-[#390099]/90 shadow-sm hover:shadow-md"
    : "bg-white border border-gray-300 text-[#390099] hover:bg-gray-50 hover:border-[#390099] shadow-sm";

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

function ContentViewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<any>(null);
  
  // Get URL parameters
  const type = searchParams.get('type') || 'blog';
  const id = searchParams.get('id') || '';
  const brand = searchParams.get('brand') || 'geoiq';

  // Memoize allContent to prevent infinite re-renders
  const allContent = React.useMemo(() => {
    return generateSuggestedContent(brand);
  }, [brand]);

  // Get the content based on URL parameters
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
  }, [type, id, allContent]);

  // Fix useEffect to only run when content actually changes
  useEffect(() => {
    if (content && (!editedContent || editedContent.id !== content.id)) {
      setEditedContent(content);
    }
  }, [content, editedContent]);

  // Memoize functions to prevent unnecessary re-renders
  const getContentTitle = React.useCallback(() => {
    if (!content) return 'Content';
    switch (type) {
      case 'blog': return content.topic;
      case 'linkedin': return content.topic;
      case 'reddit': return content.question;
      case 'quora': return content.question;
      default: return 'Content';
    }
  }, [content, type]);

  const getContentIcon = React.useCallback(() => {
    switch (type) {
      case 'blog': return DocumentTextIcon;
      case 'linkedin': return ShareIcon;
      case 'reddit':
      case 'quora': return QuestionMarkCircleIcon;
      default: return DocumentTextIcon;
    }
  }, [type]);

  // Memoize the blog HTML generation to prevent recreating on every render
  const generateFullBlogHTML = React.useCallback(() => {
    if (!content) return '';
    
    const title = getContentTitle();
    const description = content.description;
    const brandInfo = BRANDS[brand as keyof typeof BRANDS];
    
    return `
      <article class="corporate-blog-post">
        <header class="blog-header">
          <div class="header-meta">
            <span class="brand-badge">${brandInfo.name}</span>
            <time class="publish-date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
          <h1 class="blog-title">${title}</h1>
          <div class="blog-meta">
            <span class="read-time"><i class="icon-clock"></i>${content.estimatedReadTime}</span>
            <span class="seo-score success"><i class="icon-chart"></i>SEO Score: ${content.seoScore}%</span>
            <span class="difficulty ${content.difficulty.toLowerCase()}"><i class="icon-level"></i>${content.difficulty} Difficulty</span>
          </div>
          <div class="blog-excerpt">
            <p>${description}</p>
          </div>
        </header>
        
        <div class="blog-content">
          <section class="content-section">
            <h2>Executive Summary</h2>
            <div class="highlight-box">
              <p>In today's competitive business landscape, <strong>${content.tags[0].toLowerCase()}</strong> has emerged as a critical differentiator for organizations seeking sustainable growth. This comprehensive analysis explores how ${brandInfo.name} is setting new industry standards through innovative approaches and strategic initiatives.</p>
            </div>
          </section>

          <section class="content-section">
            <h2>Key Business Benefits</h2>
            <div class="benefits-grid">
              ${content.tags.map((tag: string, index: number) => `
                <div class="benefit-card">
                  <div class="benefit-number">${index + 1}</div>
                  <h3>${tag}</h3>
                  <p>Comprehensive analysis of how ${tag.toLowerCase()} contributes to organizational success, driving measurable improvements in operational efficiency and market competitiveness.</p>
                </div>
              `).join('')}
            </div>
          </section>
          
          <section class="content-section">
            <h2>Strategic Implementation Framework</h2>
            <p>Organizations seeking to maximize their investment should consider the following structured approach:</p>
            
            <div class="implementation-steps">
              <div class="step-item">
                <div class="step-number">01</div>
                <div class="step-content">
                  <h3>Strategic Assessment</h3>
                  <p>Comprehensive evaluation of current organizational capabilities, infrastructure, and market positioning to identify optimization opportunities.</p>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">02</div>
                <div class="step-content">
                  <h3>Planning & Roadmap Development</h3>
                  <p>Creation of detailed implementation timeline with clearly defined milestones, resource allocation, and success metrics.</p>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">03</div>
                <div class="step-content">
                  <h3>Execution & Change Management</h3>
                  <p>Systematic deployment of solutions with comprehensive change management protocols and stakeholder engagement strategies.</p>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">04</div>
                <div class="step-content">
                  <h3>Optimization & Continuous Improvement</h3>
                  <p>Ongoing monitoring, performance analysis, and iterative refinement to ensure sustained value delivery and competitive advantage.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section class="content-section">
            <div class="quote-section">
              <blockquote>
                "The future belongs to organizations that can effectively balance technological innovation with human-centered design principles, creating solutions that drive both efficiency and engagement."
              </blockquote>
              <cite>— Industry Research Institute</cite>
            </div>
          </section>
          
          <section class="content-section">
            <h2>Industry Best Practices</h2>
            <div class="best-practices">
              <div class="practice-item">
                <h4>📊 Data-Driven Decision Making</h4>
                <p>Establish clear metrics and KPIs to measure success and guide strategic decisions.</p>
              </div>
              <div class="practice-item">
                <h4>🤝 Stakeholder Engagement</h4>
                <p>Ensure comprehensive buy-in across all organizational levels through effective communication and training.</p>
              </div>
              <div class="practice-item">
                <h4>🔄 Agile Implementation</h4>
                <p>Adopt flexible methodologies that allow for rapid iteration and continuous improvement.</p>
              </div>
              <div class="practice-item">
                <h4>📈 Performance Monitoring</h4>
                <p>Implement robust tracking systems to monitor progress and identify optimization opportunities.</p>
              </div>
            </div>
          </section>
          
          <section class="content-section conclusion">
            <h2>Conclusion & Next Steps</h2>
            <p>Organizations that successfully implement these strategic frameworks position themselves for sustained competitive advantage in an increasingly complex marketplace. The key to success lies in maintaining a balance between technological innovation and operational excellence while ensuring alignment with broader business objectives.</p>
            
            <div class="action-items">
              <h3>Recommended Action Items:</h3>
              <ul>
                <li>Conduct comprehensive organizational assessment</li>
                <li>Develop detailed implementation roadmap</li>
                <li>Establish cross-functional project team</li>
                <li>Define success metrics and monitoring protocols</li>
              </ul>
            </div>
          </section>
          
          <div class="cta-section">
            <div class="cta-content">
              <h3>Ready to Transform Your Organization?</h3>
              <p>Partner with ${brandInfo.name} to unlock your organization's full potential through strategic innovation and proven methodologies.</p>
              <div class="cta-buttons">
                <button class="cta-primary">Schedule Consultation</button>
                <button class="cta-secondary">Download Whitepaper</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }, [content, brand, getContentTitle]);

  const generateLinkedInContent = React.useCallback(() => {
    if (!content) return '';
    return `${getContentTitle()}

${content.description}

Key insights:
${content.tags.map((tag: string) => `• ${tag}`).join('\n')}

What are your thoughts on this approach? Share your experiences in the comments below.

#Innovation #Technology #Business #Growth #${BRANDS[brand as keyof typeof BRANDS].name.replace(/\s+/g, '')}`;
  }, [content, brand, getContentTitle]);

  const generateAnswerContent = React.useCallback(() => {
    if (!content) return '';
    return `**Question:** ${getContentTitle()}

**Detailed Answer:**

${content.description}

Based on my experience and research, here are the key points to consider:

${content.tags.map((tag: string, index: number) => `**${index + 1}. ${tag}**
This is particularly important because it directly impacts the overall effectiveness of your approach. Organizations that focus on this area typically see significant improvements in their results.`).join('\n\n')}

**Conclusion:**
The best approach depends on your specific requirements and context, but following these guidelines will help you make an informed decision and achieve better outcomes.

*Tags: ${content.tags.join(', ')}*`;
  }, [content, getContentTitle]);

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
    router.back(); // Use router.back() for better performance instead of pushing new route
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

  const ContentIcon = getContentIcon();

  return (
    <DashboardLayout>
      {/* Responsive container */}
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <motion.div 
            className="space-y-4 md:space-y-6 bg-white min-h-full font-roboto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Back Navigation - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-[#390099] hover:text-[#390099]/80 transition-colors font-roboto"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Suggested Content</span>
              </button>

              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <ActionButton
                    variant="secondary"
                    icon={PencilIcon}
                    onClick={handleEdit}
                  >
                    <span className="hidden sm:inline">Edit</span>
                  </ActionButton>
                ) : (
                  <ActionButton
                    variant="primary"
                    icon={CheckIcon}
                    onClick={handleSave}
                  >
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </ActionButton>
                )}
              </div>
            </div>

            {/* Content Header - Responsive */}
            <div className="flex items-start gap-4 pb-4 md:pb-6 border-b border-gray-200">
              <div className="p-3 rounded-lg bg-[#390099]/10">
                <ContentIcon className="w-6 h-6 text-[#390099]" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 font-roboto mb-2">
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

            {/* Content Display - Responsive */}
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
                      className="corporate-blog-content font-roboto"
                      dangerouslySetInnerHTML={{ __html: generateFullBlogHTML() }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap font-roboto text-gray-800 leading-relaxed text-base">
                      {type === 'linkedin' ? generateLinkedInContent() : generateAnswerContent()}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Footer - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-200 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 mt-8">
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

      {/* Enhanced Corporate Blog Styles */}
      <style jsx global>{`
        .corporate-blog-content {
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.7;
          color: #2d3748;
        }

        .corporate-blog-post {
          max-width: 100%;
          margin: 0 auto;
          background: white;
        }

        .blog-header {
          margin-bottom: 3rem;
          padding: 0 0 2rem 0;
          border-bottom: 2px solid #e2e8f0;
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .brand-badge {
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .publish-date {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .blog-title {
          font-size: clamp(1.875rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          color: #1a202c;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.025em;
        }

        .blog-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .blog-meta span {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-weight: 600;
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .blog-meta .success {
          background: #dcfce7;
          color: #166534;
          border-color: #bbf7d0;
        }

        .blog-meta .difficulty.low {
          background: #dcfce7;
          color: #166534;
          border-color: #bbf7d0;
        }

        .blog-meta .difficulty.medium {
          background: #fef3c7;
          color: #92400e;
          border-color: #fde68a;
        }

        .blog-meta .difficulty.high {
          background: #fecaca;
          color: #991b1b;
          border-color: #fca5a5;
        }

        .blog-excerpt {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem;
          border-radius: 12px;
          border-left: 4px solid #390099;
          margin-top: 2rem;
        }

        .blog-excerpt p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #4a5568;
          margin: 0;
          font-weight: 500;
        }

        .blog-content {
          margin-top: 3rem;
        }

        .content-section {
          margin-bottom: 3rem;
        }

        .blog-content h2 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #1a202c;
          margin: 3rem 0 1.5rem 0;
          line-height: 1.2;
          position: relative;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e2e8f0;
        }

        .blog-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #2d3748;
          margin: 2rem 0 1rem 0;
        }

        .blog-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #4a5568;
          margin: 1.5rem 0 0.75rem 0;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          color: #4a5568;
          font-size: 1rem;
          line-height: 1.7;
        }

        .highlight-box {
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin: 2rem 0;
          box-shadow: 0 10px 25px rgba(57, 0, 153, 0.15);
        }

        .highlight-box p {
          color: white;
          margin: 0;
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .benefit-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
        }

        .benefit-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .benefit-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .benefit-card h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a202c;
        }

        .benefit-card p {
          margin: 0;
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.6;
        }

        .implementation-steps {
          margin: 2rem 0;
        }

        .step-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #390099;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
          color: white;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .step-content h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a202c;
        }

        .step-content p {
          margin: 0;
          color: #4a5568;
          line-height: 1.6;
        }

        .quote-section {
          margin: 3rem 0;
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          position: relative;
        }

        .quote-section::before {
          content: '"';
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 4rem;
          color: #390099;
          opacity: 0.3;
          font-family: serif;
        }

        .quote-section blockquote {
          font-size: 1.375rem;
          font-style: italic;
          color: #2d3748;
          margin: 0;
          line-height: 1.5;
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto;
        }

        .quote-section cite {
          display: block;
          margin-top: 1.5rem;
          font-size: 1rem;
          color: #64748b;
          font-weight: 600;
        }

        .best-practices {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .practice-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .practice-item h4 {
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .practice-item p {
          margin: 0;
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.5;
        }

        .conclusion {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .action-items {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
        }

        .action-items h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #390099;
        }

        .action-items ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .action-items li {
          margin-bottom: 0.5rem;
          color: #4a5568;
          line-height: 1.5;
        }

        .cta-section {
          background: linear-gradient(135deg, #390099 0%, #9E0059 100%);
          color: white;
          padding: 3rem 2rem;
          border-radius: 16px;
          margin: 3rem 0;
          text-align: center;
          box-shadow: 0 20px 40px rgba(57, 0, 153, 0.2);
        }

        .cta-content h3 {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }

        .cta-content p {
          margin: 0 0 2rem 0;
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-primary, .cta-secondary {
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
        }

        .cta-primary {
          background: white;
          color: #390099;
        }

        .cta-primary:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .cta-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .cta-secondary:hover {
          background: white;
          color: #390099;
        }

        @media (max-width: 768px) {
          .blog-header {
            margin-bottom: 2rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .best-practices {
            grid-template-columns: 1fr;
          }

          .step-item {
            flex-direction: column;
            text-align: center;
          }

          .quote-section {
            padding: 2rem 1rem;
          }

          .quote-section blockquote {
            font-size: 1.125rem;
          }

          .cta-section {
            padding: 2rem 1rem;
          }

          .cta-content h3 {
            font-size: 1.5rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-primary, .cta-secondary {
            width: 100%;
            max-width: 300px;
          }
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