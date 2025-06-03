'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  DocumentTextIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  iconColor: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, iconColor: '#390099' },
  { name: 'Company & Brands', href: '/brands', icon: BuildingOfficeIcon, iconColor: '#390099' },
  { name: 'Prompts', href: '/prompts', icon: ChatBubbleLeftRightIcon, iconColor: '#390099' },
  { name: 'Visibility Scanning', href: '/scan', icon: MagnifyingGlassIcon, iconColor: '#FF0054', badge: 3 },
  { name: 'Suggested Content', href: '/content', icon: DocumentTextIcon, iconColor: '#390099' },
  { name: 'Reports & Analytics', href: '/analytics', icon: ChartBarIcon, iconColor: '#390099' },
  { name: 'Scheduling', href: '/schedule', icon: CalendarIcon, iconColor: '#390099' },
  { name: 'Settings', href: '/settings', icon: CogIcon, iconColor: '#FFBD00' },
];

interface SidebarNavProps {
  className?: string;
}

export default function SidebarNav({ className }: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'geoiq-sidebar flex flex-col h-full relative',
        className
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-geoiq-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-medium bg-geoiq-gradient bg-clip-text text-transparent font-roboto">
                GEOIQ
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer relative',
                  isActive
                    ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-gray-900 border-r-4'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
                style={{
                  borderRightColor: isActive ? '#390099' : undefined
                }}
              >
                <Icon
                  className={cn(
                    'flex-shrink-0 w-5 h-5 transition-colors duration-200',
                    isActive
                      ? 'text-[#390099]'
                      : 'text-gray-500 group-hover:opacity-80'
                  )}
                />
                
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 flex items-center justify-between flex-1"
                    >
                      <span className="font-roboto font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-pink-500 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-pink-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-r from-primary-50 to-magenta-50 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-geoiq-gradient rounded-full flex items-center justify-center">
                  <LightBulbIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 font-roboto">
                    Upgrade to Pro
                  </p>
                  <p className="text-xs text-gray-600 font-roboto">
                    Unlock advanced features
                  </p>
                </div>
              </div>
              <button className="w-full mt-3 geoiq-btn-primary text-xs py-2">
                Upgrade Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 