'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getVisibilityScoreColor } from '@/lib/utils';

interface VisibilityGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { radius: 40, strokeWidth: 6, fontSize: 'text-lg' },
  md: { radius: 60, strokeWidth: 8, fontSize: 'text-2xl' },
  lg: { radius: 80, strokeWidth: 10, fontSize: 'text-3xl' },
};

export default function VisibilityGauge({ 
  score, 
  size = 'md', 
  showLabel = true, 
  className 
}: VisibilityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const config = sizeConfig[size];
  const normalizedScore = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * config.radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const color = getVisibilityScoreColor(normalizedScore);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(normalizedScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [normalizedScore]);

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg
          width={config.radius * 2 + config.strokeWidth}
          height={config.radius * 2 + config.strokeWidth}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.radius + config.strokeWidth / 2}
            cy={config.radius + config.strokeWidth / 2}
            r={config.radius}
            stroke="#e5e7eb"
            strokeWidth={config.strokeWidth}
            fill="transparent"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={config.radius + config.strokeWidth / 2}
            cy={config.radius + config.strokeWidth / 2}
            r={config.radius}
            stroke={color}
            strokeWidth={config.strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        
        {/* Score text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className={`font-bold ${config.fontSize} text-gray-900`}>
              {Math.round(animatedScore)}%
            </div>
          </motion.div>
        </div>
      </div>
      
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-3 text-center"
        >
          <div className="text-sm font-medium text-gray-900">Visibility Score</div>
          <div className={`text-xs font-medium ${getScoreColor(normalizedScore)}`}>
            {getScoreLabel(normalizedScore)}
          </div>
        </motion.div>
      )}
    </div>
  );
} 