'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface User {
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface TopBarProps {
  user?: User;
  className?: string;
}

const planColors = {
  free: 'bg-gray-100 text-gray-800',
  pro: 'bg-gradient-to-r from-primary-500 to-magenta-500 text-white',
  enterprise: 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white',
};

const planLabels = {
  free: 'Free',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

export default function TopBar({ user, className }: TopBarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const currentUser = user || {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'free' as const,
  };

  const notifications = [
    {
      id: '1',
      title: 'Scan Complete',
      message: 'Your brand visibility scan has finished processing',
      time: '2 minutes ago',
      unread: true,
    },
    {
      id: '2',
      title: 'New Recommendation',
      message: 'AI has generated 3 new content recommendations',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Content Approved',
      message: 'Your LinkedIn post has been approved for publishing',
      time: '3 hours ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={cn('bg-gradient-to-r from-[#390099] to-[#FF0054] border-b border-gray-200 shadow-sm', className)}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - could add breadcrumbs or search here */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-medium text-white font-roboto">Dashboard</h1>
        </div>

        {/* Right side - Plan, Notifications, User Menu */}
        <div className="flex items-center space-x-4">
          {/* Plan Badge */}
          <div className={cn(
            'px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1',
            planColors[currentUser.plan]
          )}>
            {currentUser.plan !== 'free' && (
              <SparklesIcon className="w-4 h-4" />
            )}
            <span>{planLabels[currentUser.plan]}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
            >
              <BellIcon className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200',
                          notification.unread && 'bg-blue-50'
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            'w-2 h-2 rounded-full mt-2',
                            notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                          )} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <UserCircleIcon className="w-8 h-8" />
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white font-roboto">{currentUser.name}</p>
                <p className="text-xs text-gray-200 font-roboto">{currentUser.email}</p>
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-600">{currentUser.email}</p>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <UserCircleIcon className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <CogIcon className="w-4 h-4 mr-3" />
                      Settings
                    </button>
                    {currentUser.plan === 'free' && (
                      <button className="flex items-center w-full px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 transition-colors duration-200">
                        <SparklesIcon className="w-4 h-4 mr-3" />
                        Upgrade Plan
                      </button>
                    )}
                  </div>
                  <div className="border-t border-gray-200 py-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
} 