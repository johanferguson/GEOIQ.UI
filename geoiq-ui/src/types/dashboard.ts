/**
 * Dashboard Types - GEOIQ Analytics Platform
 * 
 * Defines type-safe interfaces for dashboard components, API responses,
 * and data structures following SOLID principles.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import { ComponentType } from 'react';

/**
 * Base interface for all statistical metrics
 * Following Interface Segregation Principle
 */
export interface BaseMetric {
  /** Unique identifier for the metric */
  id: string;
  /** Human-readable name for the metric */
  name: string;
  /** Current value as string for display flexibility */
  value: string;
  /** Numerical value for calculations */
  numericValue: number;
  /** Change indicator text */
  change: string;
  /** Type of change for styling */
  changeType: 'positive' | 'negative' | 'neutral';
  /** Last updated timestamp */
  lastUpdated: Date;
}

/**
 * Content metrics interface
 * Extends BaseMetric for content-specific data
 */
export interface ContentMetric extends BaseMetric {
  /** Icon component for display */
  icon: ComponentType<{ className?: string }>;
  /** Primary color for the metric */
  color: string;
  /** Icon-specific color (for branded icons) */
  iconColor: string;
  /** Content platform type */
  platform: 'blog' | 'linkedin' | 'reddit' | 'quora' | 'other';
}

/**
 * Growth metrics interface
 * Extends BaseMetric for growth-specific data
 */
export interface GrowthMetric extends BaseMetric {
  /** Icon component for display */
  icon: ComponentType<{ className?: string }>;
  /** Primary color for the metric */
  color: string;
  /** Icon-specific color */
  iconColor: string;
  /** Growth category */
  category: 'mentions' | 'visibility' | 'sentiment' | 'scans' | 'other';
  /** Target value for progress calculation */
  target?: number;
}

/**
 * Chart data point interface
 * Generic interface for chart data points
 */
export interface ChartDataPoint {
  /** X-axis value (usually time-based) */
  x: string | number;
  /** Y-axis value */
  y: number;
  /** Optional additional data */
  metadata?: Record<string, any>;
}

/**
 * Visibility trend data interface
 * Specific structure for visibility trend charts
 */
export interface VisibilityTrendData extends ChartDataPoint {
  /** Month abbreviation */
  month: string;
  /** Visibility percentage */
  visibility: number;
  /** Previous month comparison */
  previousMonth?: number;
}

/**
 * Brand mentions data interface
 * Specific structure for brand mentions charts
 */
export interface BrandMentionsData extends ChartDataPoint {
  /** Platform name */
  platform: string;
  /** Number of mentions */
  mentions: number;
  /** Growth rate from previous period */
  growthRate?: number;
}

/**
 * Quick action interface
 * Defines structure for dashboard action cards
 */
export interface QuickAction {
  /** Unique identifier */
  id: string;
  /** Action title */
  title: string;
  /** Action description */
  description: string;
  /** Icon component */
  icon: ComponentType<{ className?: string }>;
  /** Navigation href */
  href: string;
  /** Gradient color classes */
  color: string;
  /** Whether this is a primary action */
  primary?: boolean;
  /** Action category */
  category: 'scan' | 'content' | 'analytics' | 'settings';
}

/**
 * Activity item interface
 * Structure for recent activity items
 */
export interface ActivityItem {
  /** Unique identifier */
  id: string;
  /** Activity type */
  type: 'scan' | 'content' | 'recommendation' | 'system';
  /** Activity title */
  title: string;
  /** Activity description */
  description: string;
  /** Timestamp string */
  time: string;
  /** Activity status */
  status: 'success' | 'warning' | 'error' | 'info';
  /** Optional user who performed the action */
  user?: string;
  /** Optional metadata */
  metadata?: Record<string, any>;
}

/**
 * Dashboard API response interface
 * Defines expected structure from backend API
 */
export interface DashboardApiResponse {
  /** Content metrics */
  contentMetrics: ContentMetric[];
  /** Growth metrics */
  growthMetrics: GrowthMetric[];
  /** Visibility trend data */
  visibilityTrend: VisibilityTrendData[];
  /** Brand mentions data */
  brandMentions: BrandMentionsData[];
  /** Recent activity items */
  recentActivity: ActivityItem[];
  /** Quick actions available to user */
  quickActions: QuickAction[];
  /** Response metadata */
  metadata: {
    /** Response timestamp */
    timestamp: Date;
    /** Data refresh interval in minutes */
    refreshInterval: number;
    /** API version */
    version: string;
  };
}

/**
 * API error interface
 * Standardized error structure for API responses
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, any>;
  /** Timestamp when error occurred */
  timestamp: Date;
}

/**
 * Dashboard configuration interface
 * User-specific dashboard settings
 */
export interface DashboardConfig {
  /** User ID */
  userId: string;
  /** Dashboard layout preferences */
  layout: {
    /** Whether to show content metrics */
    showContentMetrics: boolean;
    /** Whether to show growth metrics */
    showGrowthMetrics: boolean;
    /** Chart refresh interval */
    chartRefreshInterval: number;
  };
  /** Theme preferences */
  theme: {
    /** Color scheme */
    colorScheme: 'light' | 'dark' | 'auto';
    /** Reduced motion preference */
    reducedMotion: boolean;
  };
}

/**
 * Component props interfaces
 * For type-safe component props
 */
export interface StatCardProps {
  /** Metric data */
  metric: ContentMetric | GrowthMetric;
  /** Optional click handler */
  onClick?: (metric: ContentMetric | GrowthMetric) => void;
  /** Loading state */
  loading?: boolean;
  /** Animation delay */
  animationDelay?: number;
}

export interface ChartCardProps<T = ChartDataPoint> {
  /** Chart title */
  title: string;
  /** Chart data */
  data: T[];
  /** Chart type */
  type: 'area' | 'bar' | 'line' | 'pie';
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
  /** Height in pixels */
  height?: number;
}

/**
 * Service method result interface
 * Standardized return type for service methods
 */
export interface ServiceResult<T> {
  /** Whether operation was successful */
  success: boolean;
  /** Result data */
  data?: T;
  /** Error information if operation failed */
  error?: ApiError;
}

/**
 * Cache entry interface
 * For caching API responses
 */
export interface CacheEntry<T> {
  /** Cached data */
  data: T;
  /** Cache timestamp */
  timestamp: Date;
  /** Cache expiry time */
  expiresAt: Date;
} 