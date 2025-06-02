'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  SparklesIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Brand } from '@/hooks/useCompanyBrands';

interface BrandCardProps {
  brand: Brand;
  onEdit: () => void;
  onDelete: () => void;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -8, scale: 1.02 }
};

const brandColors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-purple-500', 
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-purple-500',
  'from-purple-500 to-violet-500',
  'from-fuchsia-500 to-purple-500'
];

export default function BrandCard({ brand, onEdit, onDelete }: BrandCardProps) {
  const colorIndex = brand.name.length % brandColors.length;
  const gradientColor = brandColors[colorIndex];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300"
      onClick={onEdit}
    >
      {/* Gradient Header */}
      <div className={`h-32 bg-gradient-to-br ${gradientColor} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 left-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleEdit}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <PencilIcon className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={handleDelete}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-red-500/50 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 opacity-20">
          <div className="w-24 h-24 bg-white rounded-full transform translate-x-8 translate-y-8"></div>
        </div>
        <div className="absolute top-1/2 right-4 opacity-10">
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Brand Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-roboto group-hover:text-purple-600 transition-colors duration-300">
          {brand.name}
        </h3>

        {/* Brand Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 font-roboto leading-relaxed">
          {brand.description}
        </p>

        {/* Benefits */}
        {brand.benefits && brand.benefits.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <LightBulbIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700 font-roboto">Key Benefits</span>
            </div>
            <div className="space-y-2">
              {brand.benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 font-roboto">{benefit}</span>
                </div>
              ))}
              {brand.benefits.length > 3 && (
                <div className="flex items-center space-x-2 pt-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-400 font-roboto">
                    +{brand.benefits.length - 3} more benefits
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State for Benefits */}
        {(!brand.benefits || brand.benefits.length === 0) && (
          <div className="flex items-center space-x-2 text-gray-400">
            <HeartIcon className="w-4 h-4" />
            <span className="text-sm font-roboto">No benefits added yet</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-roboto">
            Created {new Date(brand.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-gray-500 font-roboto">Active</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
} 