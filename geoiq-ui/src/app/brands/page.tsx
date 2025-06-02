'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  SparklesIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  HeartIcon,
  BeakerIcon,
  TrashIcon as ClearIcon
} from '@heroicons/react/24/outline';
import { useCompanyBrands } from '@/hooks/useCompanyBrands';
import CompanyDetailsForm from '@/components/brands/CompanyDetailsForm';
import BrandCard from '@/components/brands/BrandCard';
import BrandForm from '@/components/brands/BrandForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

export default function CompanyBrandsPage() {
  const { 
    company, 
    brands, 
    loading, 
    error, 
    updateCompany, 
    addBrand, 
    updateBrand, 
    deleteBrand,
    loadSampleData,
    clearData
  } = useCompanyBrands();
  
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('company');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const handleSaveBrand = async (brandData) => {
    try {
      if (editingBrand) {
        await updateBrand(editingBrand.id, brandData);
      } else {
        await addBrand(brandData);
      }
      setShowBrandForm(false);
      setEditingBrand(null);
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setShowBrandForm(true);
  };

  const handleDeleteBrand = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(brandId);
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    }
  };

  const handleAddNewBrand = () => {
    setEditingBrand(null);
    setShowBrandForm(true);
  };

  const handleLoadSampleData = () => {
    if (window.confirm('This will replace any existing data with sample data. Continue?')) {
      loadSampleData();
    }
  };

  const handleClearData = () => {
    if (window.confirm('This will permanently delete all company and brand data. Continue?')) {
      clearData();
    }
  };

  const hasData = (company && company.name) || brands.length > 0;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl">
                  <BuildingOfficeIcon className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white font-roboto mb-4">
                Company & Brands
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Build your digital identity. Define your company's mission and create compelling brands 
                that resonate with your audience in the AI-powered world.
              </p>
              
              {/* Demo Data Controls */}
              {!hasData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 flex justify-center gap-4"
                >
                  <motion.button
                    onClick={handleLoadSampleData}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BeakerIcon className="w-5 h-5" />
                    <span className="font-roboto">Load Sample Data</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        {/* Demo Controls */}
        {hasData && (
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex space-x-3 bg-white rounded-xl p-2 shadow-lg border border-gray-100">
              <motion.button
                onClick={handleLoadSampleData}
                className="flex items-center space-x-2 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BeakerIcon className="w-4 h-4" />
                <span className="font-roboto text-sm">Load Sample Data</span>
              </motion.button>
              <motion.button
                onClick={handleClearData}
                className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ClearIcon className="w-4 h-4" />
                <span className="font-roboto text-sm">Clear All Data</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              {[
                { id: 'company', label: 'Company Details', icon: BuildingOfficeIcon },
                { id: 'brands', label: 'Brand Portfolio', icon: SparklesIcon }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-roboto">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'company' && (
            <motion.div
              key="company"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              <CompanyDetailsForm 
                company={company} 
                onSave={updateCompany} 
              />
            </motion.div>
          )}

          {activeTab === 'brands' && (
            <motion.div
              key="brands"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              {/* Brands Header */}
              <motion.div 
                className="flex justify-between items-center mb-8"
                variants={cardVariants}
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-roboto mb-2">
                    Brand Portfolio
                  </h2>
                  <p className="text-gray-600">
                    Create and manage your brand collection. Each brand tells a unique story.
                  </p>
                </div>
                <motion.button
                  onClick={handleAddNewBrand}
                  className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-roboto">Add New Brand</span>
                </motion.button>
              </motion.div>

              {/* Brands Grid */}
              {brands.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  variants={cardVariants}
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2 font-roboto">
                    No brands yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start building your brand portfolio. Create your first brand to begin telling your story.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleAddNewBrand}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <PlusIcon className="w-5 h-5" />
                      <span className="font-roboto">Create Your First Brand</span>
                    </button>
                    <button
                      onClick={handleLoadSampleData}
                      className="inline-flex items-center space-x-2 bg-white text-purple-600 border border-purple-200 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all duration-300"
                    >
                      <BeakerIcon className="w-5 h-5" />
                      <span className="font-roboto">Try Sample Brands</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainer}
                >
                  {brands.map((brand) => (
                    <motion.div key={brand.id} variants={cardVariants}>
                      <BrandCard
                        brand={brand}
                        onEdit={() => handleEditBrand(brand)}
                        onDelete={() => handleDeleteBrand(brand.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand Form Modal */}
      <AnimatePresence>
        {showBrandForm && (
          <BrandForm
            brand={editingBrand}
            onSave={handleSaveBrand}
            onCancel={() => {
              setShowBrandForm(false);
              setEditingBrand(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 