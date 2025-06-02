'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowPathIcon,
  FunnelIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PromptCard from '@/components/ui/PromptCard';
import { cn } from '@/lib/utils';

const mockPrompts = [
  {
    id: '1',
    text: 'What are the best project management tools for small businesses looking to improve team collaboration and productivity?',
    category: 'general' as const,
    brandMentions: 3,
    competitorMentions: 1,
    visibilityScore: 75,
  },
  {
    id: '2',
    text: 'Compare the pricing models of different CRM solutions for startups with limited budgets.',
    category: 'pricing' as const,
    brandMentions: 2,
    competitorMentions: 4,
    visibilityScore: 33,
  },
  {
    id: '3',
    text: 'What features should I look for in a customer support platform that integrates well with existing business tools?',
    category: 'features' as const,
    brandMentions: 4,
    competitorMentions: 2,
    visibilityScore: 67,
  },
  {
    id: '4',
    text: 'How does TechCorp compare to other enterprise software solutions in terms of scalability and security?',
    category: 'comparison' as const,
    brandMentions: 5,
    competitorMentions: 3,
    visibilityScore: 83,
  },
  {
    id: '5',
    text: 'What are the most cost-effective marketing automation tools for e-commerce businesses?',
    category: 'pricing' as const,
    brandMentions: 1,
    competitorMentions: 5,
    visibilityScore: 17,
  },
  {
    id: '6',
    text: 'Which analytics platforms provide the best insights for data-driven decision making in retail?',
    category: 'general' as const,
    brandMentions: 3,
    competitorMentions: 2,
    visibilityScore: 60,
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'features', label: 'Features' },
  { value: 'comparison', label: 'Comparison' },
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState(mockPrompts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegeneratingAll, setIsRegeneratingAll] = useState(false);

  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesSearch = prompt.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegenerateAll = async () => {
    setIsRegeneratingAll(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRegeneratingAll(false);
  };

  const handleRegeneratePrompt = (id: string) => {
    console.log('Regenerating prompt:', id);
    // Implement individual prompt regeneration
  };

  const handleCopyPrompt = (text: string) => {
    console.log('Copied prompt:', text);
    // Additional copy handling if needed
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Prompts</h1>
            <p className="text-gray-600 mt-2">
              Generate and test prompts to improve your brand visibility
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={handleRegenerateAll}
              disabled={isRegeneratingAll}
              className={cn(
                'geoiq-btn-secondary flex items-center space-x-2',
                isRegeneratingAll && 'opacity-50 cursor-not-allowed'
              )}
            >
              <ArrowPathIcon className={cn(
                'w-4 h-4',
                isRegeneratingAll && 'animate-spin'
              )} />
              <span>{isRegeneratingAll ? 'Regenerating...' : 'Regenerate All'}</span>
            </button>
            
            <button className="geoiq-btn-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Generate New</span>
            </button>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="geoiq-card p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="geoiq-input pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-3">
              <FunnelIcon className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="geoiq-input min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">{filteredPrompts.length}</span> prompts
              </div>
              <div>
                Avg. visibility: <span className="font-medium text-primary-600">
                  {Math.round(filteredPrompts.reduce((acc, p) => acc + p.visibilityScore, 0) / filteredPrompts.length || 0)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PromptCard
                {...prompt}
                onCopy={handleCopyPrompt}
                onRegenerate={handleRegeneratePrompt}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `No prompts match "${searchQuery}". Try adjusting your search or filters.`
                : 'No prompts available for the selected category.'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="geoiq-btn-secondary"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredPrompts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <button className="geoiq-btn-secondary">
              Load More Prompts
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
} 