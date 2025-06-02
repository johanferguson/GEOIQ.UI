'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  SparklesIcon, 
  DocumentTextIcon, 
  LightBulbIcon,
  PlusIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Brand } from '@/hooks/useCompanyBrands';

interface BrandFormProps {
  brand?: Brand | null;
  onSave: (brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

const modalVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const formVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 }
};

const fieldVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

export default function BrandForm({ brand, onSave, onCancel }: BrandFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: [] as string[],
    color: '#8B5CF6'
  });
  const [newBenefit, setNewBenefit] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!brand;

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || '',
        description: brand.description || '',
        benefits: brand.benefits || [],
        color: brand.color || '#8B5CF6'
      });
    }
  }, [brand]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      onCancel();
    } catch (error) {
      console.error('Error saving brand:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.description.trim();

  const brandColors = [
    '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6',
    '#8B5A2B', '#6366F1', '#84CC16', '#F97316', '#06B6D4', '#A855F7'
  ];

  return (
    <AnimatePresence>
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onCancel()}
      >
        <motion.div
          variants={formVariants}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-roboto">
                    {isEditing ? 'Edit Brand' : 'Create New Brand'}
                  </h2>
                  <p className="text-purple-100">
                    {isEditing ? 'Update your brand details' : 'Build your brand identity'}
                  </p>
                </div>
              </div>
              <button
                onClick={onCancel}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Brand Name */}
              <motion.div variants={fieldVariants} className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
                  <SparklesIcon className="w-5 h-5 text-purple-600" />
                  <span>Brand Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your brand name..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 font-roboto"
                  required
                />
              </motion.div>

              {/* Brand Description */}
              <motion.div variants={fieldVariants} className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
                  <DocumentTextIcon className="w-5 h-5 text-purple-600" />
                  <span>Brand Description</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your brand's personality, target audience, and unique value proposition..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 font-roboto resize-none"
                  required
                />
              </motion.div>

              {/* Brand Color */}
              <motion.div variants={fieldVariants} className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
                  <div 
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: formData.color }}
                  ></div>
                  <span>Brand Color</span>
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {brandColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleInputChange('color', color)}
                      className={`w-12 h-12 rounded-xl transition-all duration-200 ${
                        formData.color === color 
                          ? 'ring-4 ring-purple-300 scale-110' 
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {formData.color === color && (
                        <CheckIcon className="w-6 h-6 text-white mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Brand Benefits */}
              <motion.div variants={fieldVariants} className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
                  <LightBulbIcon className="w-5 h-5 text-purple-600" />
                  <span>Brand Benefits</span>
                </label>
                <p className="text-sm text-gray-600 font-roboto">
                  Add key benefits that make your brand unique and valuable
                </p>
                
                {/* Add Benefit Input */}
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="e.g., Eco-friendly materials, 24/7 customer support..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-300 font-roboto"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  />
                  <motion.button
                    type="button"
                    onClick={addBenefit}
                    disabled={!newBenefit.trim()}
                    className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Benefits List */}
                <AnimatePresence>
                  {formData.benefits.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 max-h-48 overflow-y-auto"
                    >
                      {formData.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg group"
                        >
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: formData.color }}
                            ></div>
                            <span className="text-gray-900 font-medium font-roboto">{benefit}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <motion.button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 font-roboto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg font-roboto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <CheckIcon className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Saving...' : isEditing ? 'Update Brand' : 'Create Brand'}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 