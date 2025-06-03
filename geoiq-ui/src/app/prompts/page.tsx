'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowPathIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  CloudIcon,
  LinkIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { promptService, Prompt, BRANDS } from '@/services/prompts.service';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

const cardVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.02
    }
  }
};

// Icon mapping
const iconMap = {
  building: BuildingOfficeIcon,
  cpu: CpuChipIcon,
  cloud: CloudIcon,
  link: LinkIcon
};

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState('geoiq');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrompts();
  }, [activeTab]);

  const loadPrompts = () => {
    setLoading(true);
    try {
      const loadedPrompts = promptService.getPrompts(activeTab);
      setPrompts(loadedPrompts);
    } catch (error) {
      console.error('Error loading prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegeneratePrompts = async () => {
    setIsRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const newPrompts = promptService.generateAndSaveNewPrompts(activeTab);
      setPrompts(newPrompts);
    } catch (error) {
      console.error('Error regenerating prompts:', error);
    }
    
    setIsRegenerating(false);
  };

  const handleCopyPrompt = async (prompt: Prompt) => {
    const success = await promptService.copyPrompt(prompt.text);
    if (success) {
      setCopiedPromptId(prompt.id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    }
  };

  if (loading && prompts.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="loading-spinner loading-spinner-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  const currentBrand = BRANDS[activeTab];

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
            {/* Minimal Page Header - matching Company & Brands */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#39009920' }}>
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#390099]" />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-900 font-roboto">
                    Brand Prompts
                  </h1>
                  <p className="text-xs text-gray-600 font-roboto">
                    Test your brand visibility across different LLMs and AI platforms
                  </p>
                </div>
              </motion.div>

              {/* Regenerate Button */}
              <motion.button
                onClick={handleRegeneratePrompts}
                disabled={isRegenerating}
                className="flex items-center space-x-2 bg-white border border-gray-300 text-[#390099] px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-[#390099] transition-all duration-200 font-roboto disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <ArrowPathIcon className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Prompts'}</span>
              </motion.button>
            </div>

            {/* Clean Navigation Tabs - exact copy from Company & Brands */}
            <motion.div 
              className="border-b border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <nav className="flex space-x-8">
                {Object.entries(BRANDS).map(([key, brand]) => {
                  const IconComponent = iconMap[brand.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTab(key);
                        setCopiedPromptId(null); // Clear copied state when switching tabs
                      }}
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors font-roboto ${
                        activeTab === key
                          ? 'border-[#390099] text-[#390099]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{brand.name}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="initial"
              >
                {/* Prompts Table */}
                <motion.div 
                  className="geoiq-card overflow-hidden bg-white border border-gray-200 shadow-sm"
                  variants={cardVariants}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-roboto">
                            {currentBrand.name} Prompt
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-roboto w-16">
                            Copy
                          </th>
                        </tr>
                      </thead>
                      <motion.tbody 
                        className="bg-white divide-y divide-gray-200"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        {prompts.map((prompt, index) => (
                          <motion.tr
                            key={prompt.id}
                            variants={cardVariants}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 font-roboto leading-relaxed">
                                {prompt.text}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleCopyPrompt(prompt)}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  copiedPromptId === prompt.id
                                    ? 'bg-green-100 text-green-600'
                                    : 'text-gray-400 hover:text-[#390099] hover:bg-[#390099]/10'
                                }`}
                                title={copiedPromptId === prompt.id ? 'Copied!' : 'Copy prompt'}
                              >
                                {copiedPromptId === prompt.id ? (
                                  <CheckIcon className="w-4 h-4" />
                                ) : (
                                  <ClipboardDocumentIcon className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-600 font-roboto">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>All prompts ready for LLM testing</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span>Total prompts: <span className="font-medium text-[#390099]">{prompts.length}</span></span>
                        <span>|</span>
                        <span>Brand: <span className="font-medium text-gray-900">{currentBrand.name}</span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Usage Instructions */}
                <motion.div
                  className="geoiq-card p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-sm"
                  variants={cardVariants}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#39009915' }}>
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#390099]" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 font-roboto mb-3">
                        How to Test {currentBrand.name} Visibility
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="space-y-2 text-xs text-gray-600 font-roboto">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#390099] rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Copy any prompt using the copy icon</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#390099] rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Test in ChatGPT, Claude, Gemini, or other AI platforms</span>
                          </li>
                        </ul>
                        <ul className="space-y-2 text-xs text-gray-600 font-roboto">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#390099] rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Track how often {currentBrand.name} appears in responses</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#390099] rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Switch tabs to test different brand strategies</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 