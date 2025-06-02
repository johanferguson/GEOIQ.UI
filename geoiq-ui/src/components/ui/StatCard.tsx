/**
 * StatCard Component - GEOIQ Analytics Platform
 * 
 * Reusable statistics card component for displaying metrics
 * with consistent styling and behavior.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { StatCardProps } from '@/types/dashboard';

/**
 * Animated statistics card component
 * Single Responsibility: Display a single metric with consistent styling
 * 
 * @param props - Component props
 * @returns JSX element
 */
export const StatCard: React.FC<StatCardProps> = ({
  metric,
  onClick,
  loading = false,
  animationDelay = 0
}) => {
  /**
   * Handle card click
   */
  const handleClick = () => {
    if (onClick && !loading) {
      onClick(metric);
    }
  };

  /**
   * Get change color class based on change type
   */
  const getChangeColorClass = (): string => {
    switch (metric.changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`
        geoiq-card p-4 transition-all duration-300
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${loading ? 'opacity-60' : ''}
      `}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center justify-between">
        {/* Metric Information */}
        <div className="flex-1">
          <p 
            className="text-sm font-normal font-roboto"
            style={{ color: '#9E0059' }}
          >
            {metric.name}
          </p>
          
          <p 
            className="text-xl font-medium mt-1 font-roboto"
            style={{ color: metric.color }}
          >
            {loading ? '—' : metric.value}
          </p>
          
          <p className={`text-xs mt-1 font-roboto ${getChangeColorClass()}`}>
            {loading ? 'Loading...' : metric.change}
          </p>
        </div>

        {/* Icon */}
        <div 
          className="p-2 rounded-lg flex-shrink-0"
          style={{ 
            backgroundColor: `${metric.iconColor || metric.color}20` 
          }}
        >
          <metric.icon 
            className="w-5 h-5"
            style={{ color: metric.iconColor || metric.color }}
          />
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
        </div>
      )}
    </motion.div>
  );
};

/**
 * Skeleton loader for StatCard
 * Used during loading states
 */
export const StatCardSkeleton: React.FC = () => (
  <div className="geoiq-card p-4">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-1"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
      <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

export default StatCard; 