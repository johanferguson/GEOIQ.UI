'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  CpuChipIcon,
  CloudIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowPathIcon,
  TrophyIcon,
  ChartBarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { visibilityScanningService, VISIBILITY_BRANDS, type BrandVisibilityData, type VisibilityData } from '@/services/visibility-scanning.service';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.02
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const iconMap = {
  building: BuildingOfficeIcon,
  cpu: CpuChipIcon,
  cloud: CloudIcon,
  link: LinkIcon
};

// Custom tooltip for donut chart
const renderTooltip = (props: any) => {
  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900 font-roboto">
          {`${props.payload[0].name}: ${props.payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

export default function VisibilityScanningPage() {
  const [activeTab, setActiveTab] = useState('geoiq');
  const [scanData, setScanData] = useState<BrandVisibilityData>({});
  const [isScanning, setIsScanning] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data from service
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await visibilityScanningService.getAllVisibilityData();
        setScanData(data);
      } catch (error) {
        console.error('Failed to load visibility data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const currentData: VisibilityData | null = scanData[activeTab] || null;

  const handleRescan = async () => {
    if (!currentData) return;
    
    setIsScanning(true);
    try {
      const brandConfig = VISIBILITY_BRANDS[activeTab as keyof typeof VISIBILITY_BRANDS];
      const result = await visibilityScanningService.performScan({
        brandKey: activeTab,
        brandName: brandConfig.name,
        forceRefresh: true
      });

      if (result.success && result.data) {
        setScanData(prev => ({
          ...prev,
          [activeTab]: result.data!
        }));
      }
    } catch (error) {
      console.error('Rescan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const copyPrompt = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    const colors = visibilityScanningService.getChartColors();
    switch (sentiment) {
      case 'positive': return colors.positive;
      case 'negative': return colors.negative;
      case 'neutral': return colors.secondary;
      default: return colors.mixed;
    }
  };

  const togglePromptExpansion = (promptId: string) => {
    setExpandedPromptId(expandedPromptId === promptId ? null : promptId);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="w-full max-w-none">
          <div className="w-[70%] mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <ArrowPathIcon className="w-8 h-8 text-[#390099] animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-roboto">Loading visibility data...</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-none">
        <div className="w-[70%] mx-auto">
          <motion.div 
            className="space-y-6 bg-white min-h-full font-roboto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#FF005420' }}>
                  <MagnifyingGlassIcon className="w-5 h-5 text-[#FF0054]" />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-900 font-roboto">
                    Your Visibility
                  </h1>
                  <p className="text-xs text-gray-600 font-roboto">
                    Comprehensive analysis of your brand presence across AI platforms
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={handleRescan}
                disabled={isScanning}
                className="flex items-center space-x-2 bg-[#FF0054] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-[#FF0054]/90 transition-all duration-200 font-roboto disabled:opacity-50"
                whileHover={{ scale: isScanning ? 1 : 1.02 }}
                whileTap={{ scale: isScanning ? 1 : 0.98 }}
              >
                <ArrowPathIcon className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning...' : 'Rescan'}</span>
              </motion.button>
            </motion.div>

            {/* Navigation Tabs */}
            <motion.div 
              className="border-b border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <nav className="flex space-x-8">
                {Object.entries(VISIBILITY_BRANDS).map(([key, brand]) => {
                  const IconComponent = iconMap[brand.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
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

            {/* Charts Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-8"
              >
                {/* Top Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Visibility Score Donut */}
                  <motion.div 
                    variants={cardVariants}
                    className="geoiq-card p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg shadow-slate-200/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium font-roboto" style={{ color: '#9E0059' }}>
                        Visibility Score
                      </h3>
                    </div>
                    
                    <div className="relative">
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <defs>
                            <linearGradient id="visibilityGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF0054" stopOpacity={0.8}/>
                              <stop offset="50%" stopColor="#FF5400" stopOpacity={0.6}/>
                              <stop offset="100%" stopColor="#FFBD00" stopOpacity={0.4}/>
                            </linearGradient>
                            <filter id="donutGlow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <Pie
                            data={[
                              { name: 'Score', value: currentData.visibilityScore || 0 },
                              { name: 'Remaining', value: 100 - (currentData.visibilityScore || 0) }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            filter="url(#donutGlow)"
                          >
                            <Cell fill="url(#visibilityGradient)" />
                            <Cell fill="#e5e7eb" />
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '13px',
                              color: '#374151',
                              fontFamily: 'Roboto, sans-serif',
                              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                              backdropFilter: 'blur(10px)',
                              zIndex: 1000
                            }}
                            labelStyle={{ 
                              color: '#9E0059', 
                              fontWeight: 500,
                              marginBottom: '4px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold font-roboto" style={{ color: '#9E0059' }}>
                            {currentData.visibilityScore || 0}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mentions Pie Chart */}
                  <motion.div 
                    variants={cardVariants}
                    className="geoiq-card p-6 bg-gradient-to-br from-white to-amber-50 border-0 shadow-lg shadow-amber-200/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium font-roboto" style={{ color: '#9E0059' }}>
                        Mentions
                      </h3>
                    </div>
                    
                    <div className="relative" style={{ zIndex: 1 }}>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <defs>
                            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#390099" stopOpacity={1}/>
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity={1}/>
                            </linearGradient>
                            <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FFBD00" stopOpacity={1}/>
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" stopOpacity={1}/>
                            </linearGradient>
                            <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF0054" stopOpacity={1}/>
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity={1}/>
                            </linearGradient>
                            <linearGradient id="mixedGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF5400" stopOpacity={1}/>
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" stopOpacity={1}/>
                            </linearGradient>
                          </defs>
                          <Pie
                            data={currentData.mentionsBreakdown || []}
                            cx="50%"
                            cy="50%"
                            outerRadius={50}
                            dataKey="value"
                            label={({ name, percent, x, y }) => (
                              percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                            )}
                            labelLine={false}
                            fontSize={9}
                            fontFamily="Roboto, sans-serif"
                            fill="#374151"
                          >
                            {(currentData.mentionsBreakdown || []).map((entry: any, index: number) => {
                              const gradientMap: Record<string, string> = {
                                'Positive': 'url(#positiveGradient)',
                                'Neutral': 'url(#neutralGradient)', 
                                'Negative': 'url(#negativeGradient)',
                                'Mixed': 'url(#mixedGradient)'
                              };
                              return (
                                <Cell key={`cell-${index}`} fill={gradientMap[entry.name] || entry.color} />
                              );
                            })}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '13px',
                              color: '#374151',
                              fontFamily: 'Roboto, sans-serif',
                              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                              backdropFilter: 'blur(10px)',
                              zIndex: 1000
                            }}
                            labelStyle={{ 
                              color: '#9E0059', 
                              fontWeight: 500,
                              marginBottom: '4px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Competitive Analysis Radar Chart */}
                  <motion.div 
                    variants={cardVariants}
                    className="geoiq-card p-6 bg-gradient-to-br from-white to-purple-50 border-0 shadow-lg shadow-purple-200/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium font-roboto" style={{ color: '#9E0059' }}>
                        Competitive Analysis
                      </h3>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={160}>
                      <RadarChart data={currentData.radarData || []}>
                        <defs>
                          <linearGradient id="radarFillGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#390099" stopOpacity={0.6}/>
                            <stop offset="50%" stopColor="#FF0054" stopOpacity={0.3}/>
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="radarStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#390099" />
                            <stop offset="50%" stopColor="#FF0054" />
                            <stop offset="100%" stopColor="#FFBD00" />
                          </linearGradient>
                          <linearGradient id="marketFillGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e5e7eb" stopOpacity={0.4}/>
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" stopOpacity={0.2}/>
                          </linearGradient>
                          <filter id="radarGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <PolarGrid stroke="#e1e5e9" strokeOpacity={0.6} />
                        <PolarAngleAxis 
                          dataKey="category" 
                          tick={{ 
                            fontSize: 9, 
                            fill: '#64748b',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 400
                          }}
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ 
                            fontSize: 8, 
                            fill: '#94a3b8',
                            fontFamily: 'Roboto, sans-serif'
                          }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Radar
                          name="Market Average"
                          dataKey="market"
                          stroke="#94a3b8"
                          fill="url(#marketFillGradient)"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                        />
                        <Radar
                          name={VISIBILITY_BRANDS[activeTab as keyof typeof VISIBILITY_BRANDS]?.name || 'Brand'}
                          dataKey={VISIBILITY_BRANDS[activeTab as keyof typeof VISIBILITY_BRANDS]?.name || 'Brand'}
                          stroke="url(#radarStrokeGradient)"
                          fill="url(#radarFillGradient)"
                          strokeWidth={2}
                          filter="url(#radarGlow)"
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '13px',
                            color: '#374151',
                            fontFamily: 'Roboto, sans-serif',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1000
                          }}
                          labelStyle={{ 
                            color: '#9E0059', 
                            fontWeight: 500,
                            marginBottom: '4px'
                          }}
                          formatter={(value: any, name: string) => [
                            `${value}%`, 
                            name === 'market' ? 'Market Average' : VISIBILITY_BRANDS[activeTab as keyof typeof VISIBILITY_BRANDS]?.name || 'Brand'
                          ]}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                {/* Prompt Analysis Section */}
                <motion.div 
                  variants={cardVariants}
                  className="geoiq-card p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg shadow-slate-200/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-[#39009920]">
                        <ChartBarIcon className="w-5 h-5 text-[#390099]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium font-roboto" style={{ color: '#9E0059' }}>
                          Prompt Results
                        </h3>
                        <p className="text-xs text-gray-600 font-roboto">
                          LLM responses to your optimized prompts
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(currentData.promptResults || []).map((result: any, index: number) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200"
                      >
                        <div 
                          className="p-4 cursor-pointer"
                          onClick={() => togglePromptExpansion(result.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <div className="flex items-center space-x-3 mb-2">
                                <p className="text-sm font-bold font-roboto flex-1" style={{ color: '#390099' }}>
                                  {result.prompt}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyPrompt(result.prompt, result.id);
                                  }}
                                  className="flex-shrink-0 p-1 text-gray-400 hover:text-[#390099] transition-colors"
                                >
                                  {copiedPromptId === result.id ? (
                                    <CheckIcon className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <ClipboardDocumentIcon className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-600 font-roboto">
                                <div className="flex items-center space-x-1">
                                  <EyeIcon className="w-3 h-3" />
                                  <span>{result.mentions} mentions</span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <div 
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getSentimentColor(result.sentiment) }}
                                  ></div>
                                  <span>Score: {result.score}%</span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <span>Platforms: {result.platforms.join(', ')}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Score Card */}
                            <div className="flex-shrink-0 ml-4">
                              <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
                                <div className="text-center">
                                  <div className="text-lg font-bold font-roboto" style={{ color: '#FF0054' }}>
                                    {result.score}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expandable LLM Answer Section */}
                        <AnimatePresence>
                          {expandedPromptId === result.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                                <div className="flex items-center space-x-2 mb-3">
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#390099] to-[#FF0054]"></div>
                                  <h4 className="text-sm font-medium text-gray-900 font-roboto">
                                    LLM Response
                                  </h4>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4">
                                  <div 
                                    className="text-xs text-gray-700 font-roboto leading-relaxed whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ 
                                      __html: result.llmAnswer.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #9E0059;">$1</strong>') 
                                    }}
                                  />
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                  <div className="flex items-center space-x-4 text-xs text-gray-500 font-roboto">
                                    <span>Generated by: {result.platforms[0]}</span>
                                    <span>•</span>
                                    <span>Confidence: {result.score}%</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyPrompt(result.llmAnswer, `${result.id}-answer`);
                                    }}
                                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-[#390099] transition-colors font-roboto"
                                  >
                                    {copiedPromptId === `${result.id}-answer` ? (
                                      <>
                                        <CheckIcon className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500">Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <ClipboardDocumentIcon className="w-3 h-3" />
                                        <span>Copy Response</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
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