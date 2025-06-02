'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentIcon,
  ArrowPathIcon,
  CheckIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface PromptCardProps {
  id: string;
  text: string;
  category: 'general' | 'pricing' | 'features' | 'comparison';
  brandMentions: number;
  competitorMentions: number;
  visibilityScore: number;
  onCopy?: (text: string) => void;
  onRegenerate?: (id: string) => void;
  className?: string;
}

const categoryColors = {
  general: 'bg-blue-100 text-blue-800',
  pricing: 'bg-green-100 text-green-800',
  features: 'bg-purple-100 text-purple-800',
  comparison: 'bg-orange-100 text-orange-800',
};

const categoryLabels = {
  general: 'General',
  pricing: 'Pricing',
  features: 'Features',
  comparison: 'Comparison',
};

export default function PromptCard({
  id,
  text,
  category,
  brandMentions,
  competitorMentions,
  visibilityScore,
  onCopy,
  onRegenerate,
  className,
}: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      onCopy?.(text);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    onRegenerate?.(id);
    // Simulate regeneration delay
    setTimeout(() => setIsRegenerating(false), 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('geoiq-card p-6', className)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            categoryColors[category]
          )}>
            <TagIcon className="w-3 h-3 mr-1" />
            {categoryLabels[category]}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            disabled={isCopied}
            className={cn(
              'p-2 rounded-lg transition-all duration-200',
              isCopied
                ? 'bg-green-100 text-green-600'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            )}
            title="Copy to clipboard"
          >
            {isCopied ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <ClipboardDocumentIcon className="w-4 h-4" />
            )}
          </button>
          
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className={cn(
              'p-2 rounded-lg transition-all duration-200',
              isRegenerating
                ? 'bg-primary-100 text-primary-600'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            )}
            title="Regenerate prompt"
          >
            <ArrowPathIcon className={cn(
              'w-4 h-4',
              isRegenerating && 'animate-spin'
            )} />
          </button>
        </div>
      </div>

      {/* Prompt Text */}
      <div className="mb-4">
        <p className="text-gray-900 leading-relaxed">
          {text}
        </p>
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Brand mentions:</span>
            <span className="font-medium text-primary-600">{brandMentions}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Competitor mentions:</span>
            <span className="font-medium text-orange-600">{competitorMentions}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Visibility:</span>
          <span className={cn(
            'text-sm font-bold',
            getScoreColor(visibilityScore)
          )}>
            {visibilityScore}%
          </span>
        </div>
      </div>

      {/* Copy Success Message */}
      {isCopied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
} 