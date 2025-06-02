'use client';

import React from 'react';
import { 
  SparklesIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Brand } from '@/hooks/useCompanyBrands';

interface BrandCardProps {
  brand: Brand;
  onEdit: () => void;
}

export default function BrandCard({ brand, onEdit }: BrandCardProps) {
  const brandColor = brand.color || '#390099';

  return (
    <div
      className="geoiq-card p-6 cursor-pointer relative hover:shadow-md transition-shadow duration-200"
      onClick={onEdit}
    >
      {/* Simple Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="p-2 rounded-lg" 
          style={{ backgroundColor: brandColor + '20' }}
        >
          <SparklesIcon className="w-4 h-4" style={{ color: brandColor }} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 font-roboto">
            {brand.name}
          </h3>
          <p className="text-xs text-gray-500 font-roboto">
            {new Date(brand.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Brand Description */}
      <p className="text-xs text-gray-600 mb-4 line-clamp-2 font-roboto leading-relaxed">
        {brand.description}
      </p>

      {/* Benefits */}
      {brand.benefits && brand.benefits.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <LightBulbIcon className="w-3.5 h-3.5 text-[#390099]" />
            <span className="text-xs font-medium font-roboto" style={{ color: '#9E0059' }}>
              Key Benefits
            </span>
          </div>
          <div className="space-y-1.5">
            {brand.benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div 
                  className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" 
                  style={{ backgroundColor: brandColor }}
                ></div>
                <span className="text-xs text-gray-600 font-roboto leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
            {brand.benefits.length > 2 && (
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-xs text-gray-400 font-roboto ml-3">
                  +{brand.benefits.length - 2} more
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-gray-400">
          <HeartIcon className="w-3.5 h-3.5" />
          <span className="text-xs font-roboto">No benefits added</span>
        </div>
      )}

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
    </div>
  );
} 