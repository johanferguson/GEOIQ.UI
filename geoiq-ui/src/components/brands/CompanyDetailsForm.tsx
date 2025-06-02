'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  StarIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { Company } from '@/hooks/useCompanyBrands';

interface CompanyDetailsFormProps {
  company: Company | null;
  onSave: (companyData: Partial<Company>) => Promise<Company>;
}

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fieldVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

export default function CompanyDetailsForm({ company, onSave }: CompanyDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coreKPIs: [] as string[],
    missionStatement: '',
  });
  const [newKPI, setNewKPI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        description: company.description || '',
        coreKPIs: company.coreKPIs || [],
        missionStatement: company.missionStatement || '',
      });
    }
  }, [company]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addKPI = () => {
    if (newKPI.trim() && !formData.coreKPIs.includes(newKPI.trim())) {
      setFormData(prev => ({
        ...prev,
        coreKPIs: [...prev.coreKPIs, newKPI.trim()]
      }));
      setNewKPI('');
    }
  };

  const removeKPI = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coreKPIs: prev.coreKPIs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Error saving company:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.description.trim() && formData.missionStatement.trim();

  return (
    <motion.div
      variants={formVariants}
      initial="initial"
      animate="animate"
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <BuildingOfficeIcon className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 font-roboto mb-4">
          Company Profile
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Define your company's identity, mission, and core metrics. This information helps 
          shape how AI systems understand and represent your brand.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Name */}
        <motion.div variants={fieldVariants} className="space-y-3">
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
            <BuildingOfficeIcon className="w-5 h-5 text-purple-600" />
            <span>Company Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your company name..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-roboto"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
          </div>
        </motion.div>

        {/* Company Description */}
        <motion.div variants={fieldVariants} className="space-y-3">
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
            <DocumentTextIcon className="w-5 h-5 text-purple-600" />
            <span>Company Description</span>
          </label>
          <div className="relative">
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what your company does, your industry, and what makes you unique..."
              rows={4}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-roboto resize-none"
              required
            />
          </div>
        </motion.div>

        {/* Core KPIs */}
        <motion.div variants={fieldVariants} className="space-y-3">
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
            <ChartBarIcon className="w-5 h-5 text-purple-600" />
            <span>Core KPIs</span>
          </label>
          <p className="text-sm text-gray-600 font-roboto">
            Add the key performance indicators that matter most to your business
          </p>
          
          {/* Add KPI Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={newKPI}
              onChange={(e) => setNewKPI(e.target.value)}
              placeholder="e.g., Monthly Recurring Revenue, Customer Satisfaction Score..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-300 font-roboto"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKPI())}
            />
            <motion.button
              type="button"
              onClick={addKPI}
              disabled={!newKPI.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg font-roboto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-5 h-5" />
            </motion.button>
          </div>

          {/* KPIs List */}
          <AnimatePresence>
            {formData.coreKPIs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {formData.coreKPIs.map((kpi, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                      <span className="text-gray-900 font-medium font-roboto">{kpi}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeKPI(index)}
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

        {/* Mission Statement */}
        <motion.div variants={fieldVariants} className="space-y-3">
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-900 font-roboto">
            <StarIcon className="w-5 h-5 text-purple-600" />
            <span>Mission Statement</span>
          </label>
          <div className="relative">
            <textarea
              value={formData.missionStatement}
              onChange={(e) => handleInputChange('missionStatement', e.target.value)}
              placeholder="Describe your company's purpose, values, and what you aim to achieve..."
              rows={4}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-roboto resize-none"
              required
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="group relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-roboto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : isSaved ? (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <CheckIcon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="save"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LightBulbIcon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>
              {isLoading ? 'Saving...' : isSaved ? 'Saved!' : 'Save Company Profile'}
            </span>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
} 