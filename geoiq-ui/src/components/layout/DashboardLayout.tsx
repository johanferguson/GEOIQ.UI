'use client';

import React from 'react';
import SidebarNav from './SidebarNav';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - 30% #390099 color usage */}
      <SidebarNav />
      
      {/* Main content area - 60% white */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top bar - 30% #390099 color usage */}
        <TopBar />
        
        {/* Page content - 60% white background */}
        <main className={cn(
          'flex-1 p-8 bg-white overflow-auto',
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
} 