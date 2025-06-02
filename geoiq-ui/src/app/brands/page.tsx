'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  PlusIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useCompanyBrands } from '@/hooks/useCompanyBrands';
import { Brand, BrandCreateData, BrandUpdateData } from '@/types/company-brands';
import CompanyDetailsForm from '@/components/brands/CompanyDetailsForm';
import BrandCard from '@/components/brands/BrandCard';
import BrandForm from '@/components/brands/BrandForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

type BrandView = 'list' | 'add' | 'edit';

export default function CompanyBrandsPage() {
  const { 
    company, 
    brands, 
    loading, 
    error, 
    updateCompany, 
    createBrand, 
    updateBrand, 
    deleteBrand,
    loadSampleData,
    hasData
  } = useCompanyBrands();
  
  const [activeTab, setActiveTab] = useState('company');
  const [brandView, setBrandView] = useState<BrandView>('list');
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const handleSaveBrand = async (brandData: BrandCreateData | BrandUpdateData) => {
    try {
      let result: Brand | null = null;
      
      if (editingBrand) {
        result = await updateBrand(editingBrand.id, brandData as BrandUpdateData);
      } else {
        result = await createBrand(brandData as BrandCreateData);
      }
      
      if (result) {
        // Navigate back to list after saving
        setBrandView('list');
        setEditingBrand(null);
      }
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setBrandView('edit');
  };

  const handleAddNewBrand = () => {
    setEditingBrand(null);
    setBrandView('add');
  };

  const handleBackToList = () => {
    setBrandView('list');
    setEditingBrand(null);
  };

  const handleLoadSampleData = async () => {
    try {
      await loadSampleData();
    } catch (error) {
      console.error('Error loading sample data:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1 font-roboto">Something went wrong</h3>
            <p className="text-xs text-gray-600 font-roboto">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Centered 70% width container */}
      <div className="w-full max-w-none">
        <div className="w-[70%] mx-auto">
          <motion.div 
            className="space-y-6 bg-white min-h-full font-roboto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Minimal Page Header */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#39009920' }}>
                  <BuildingOfficeIcon className="w-5 h-5 text-[#390099]" />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-900 font-roboto">
                    Company & Brands
                  </h1>
                  <p className="text-xs text-gray-600 font-roboto">
                    Manage your corporate identity and brand portfolio
                  </p>
                </div>
              </motion.div>

              {/* Auto-load sample data if no data exists */}
              {!hasData && (
                <motion.button
                  onClick={handleLoadSampleData}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors font-roboto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Initialize with sample data
                </motion.button>
              )}
            </div>

            {/* Clean Navigation Tabs */}
            <motion.div 
              className="border-b border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <nav className="flex space-x-8">
                {[
                  { id: 'company', label: 'Company Details', icon: BuildingOfficeIcon },
                  { id: 'brands', label: 'Brand Portfolio', icon: SparklesIcon }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === 'brands') {
                        setBrandView('list'); // Reset to list view when switching to brands tab
                      }
                    }}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors font-roboto ${
                      activeTab === tab.id
                        ? 'border-[#390099] text-[#390099]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
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
                  {/* Brand List View */}
                  {brandView === 'list' && (
                    <>
                      {/* Clean Brands Header */}
                      <motion.div 
                        className="flex justify-between items-start mb-6"
                        variants={cardVariants}
                      >
                        <div>
                          <h2 className="text-lg font-medium text-gray-900 font-roboto mb-1">
                            Brand Portfolio
                          </h2>
                          <p className="text-xs text-gray-600 font-roboto">
                            {brands.length === 0 ? 'No brands configured' : `${brands.length} brand${brands.length !== 1 ? 's' : ''} in portfolio`}
                          </p>
                        </div>
                        <motion.button
                          onClick={handleAddNewBrand}
                          className="flex items-center space-x-2 bg-[#390099] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-[#390099]/90 transition-all duration-200 font-roboto"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <PlusIcon className="w-4 h-4" />
                          <span>Add Brand</span>
                        </motion.button>
                      </motion.div>

                      {/* Professional Brands Grid */}
                      {brands.length === 0 ? (
                        <motion.div 
                          className="geoiq-card p-8 text-center bg-gradient-to-br from-white to-slate-50 border-0 shadow-sm"
                          variants={cardVariants}
                        >
                          <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#39009915' }}>
                            <HeartIcon className="w-6 h-6 text-[#390099]" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2 font-roboto">
                            No brands configured
                          </h3>
                          <p className="text-xs text-gray-600 mb-4 max-w-sm mx-auto font-roboto">
                            Start building your brand portfolio by creating your first brand identity.
                          </p>
                          <button
                            onClick={handleAddNewBrand}
                            className="inline-flex items-center space-x-2 bg-[#390099] text-white px-4 py-2 rounded-lg text-xs font-medium shadow-sm hover:bg-[#390099]/90 transition-all duration-200 font-roboto"
                          >
                            <PlusIcon className="w-4 h-4" />
                            <span>Create First Brand</span>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                          variants={staggerContainer}
                        >
                          {brands.map((brand) => (
                            <motion.div key={brand.id} variants={cardVariants}>
                              <BrandCard
                                brand={brand}
                                onEdit={() => handleEditBrand(brand)}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </>
                  )}

                  {/* Brand Form View (Add/Edit) */}
                  {(brandView === 'add' || brandView === 'edit') && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-screen"
                    >
                      {/* Enhanced Form Header with Back Button */}
                      <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-100">
                        <motion.button
                          onClick={handleBackToList}
                          className="p-3 text-gray-400 hover:text-[#390099] hover:bg-gray-50 rounded-xl transition-all duration-200"
                          whileHover={{ scale: 1.05, x: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowLeftIcon className="w-6 h-6" />
                        </motion.button>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <SparklesIcon className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 font-roboto">
                              {brandView === 'add' ? 'Add New Brand' : 'Edit Brand'}
                            </h2>
                          </div>
                          <p className="text-sm text-gray-600 font-roboto ml-11">
                            {brandView === 'add' 
                              ? 'Create a new brand identity for your portfolio' 
                              : 'Update brand information and key benefits'
                            }
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Inline Brand Form Container */}
                      <div className="bg-white">
                        <BrandForm
                          brand={editingBrand}
                          onSave={handleSaveBrand}
                          onCancel={handleBackToList}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 