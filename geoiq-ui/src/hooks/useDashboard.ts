/**
 * Dashboard Data Hook - GEOIQ Analytics Platform
 * 
 * Custom React hook for managing dashboard data state,
 * API calls, and related side effects.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  DashboardApiResponse,
  ContentMetric,
  GrowthMetric,
  VisibilityTrendData,
  BrandMentionsData,
  ActivityItem,
  QuickAction,
  ApiError
} from '@/types/dashboard';
import { IDashboardService } from '@/services/dashboard.service';
import { Logger } from '@/lib/logger';

/**
 * Dashboard hook state interface
 */
interface DashboardState {
  /** Complete dashboard data */
  data: DashboardApiResponse | null;
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
  /** Quick actions */
  quickActions: QuickAction[];
  /** Loading states */
  loading: {
    dashboard: boolean;
    content: boolean;
    growth: boolean;
    charts: boolean;
  };
  /** Error state */
  error: ApiError | null;
  /** Last update timestamp */
  lastUpdated: Date | null;
}

/**
 * Dashboard hook return interface
 */
interface UseDashboardReturn extends DashboardState {
  /** Refresh all dashboard data */
  refresh: () => Promise<void>;
  /** Refresh specific data section */
  refreshContent: () => Promise<void>;
  refreshGrowth: () => Promise<void>;
  refreshCharts: () => Promise<void>;
  /** Clear error state */
  clearError: () => void;
  /** Check if any loading is in progress */
  isLoading: boolean;
}

/**
 * Dashboard data management hook
 * Single Responsibility: Manage dashboard data state and API interactions
 * 
 * @param dashboardService - Dashboard service instance
 * @param autoRefresh - Whether to auto-refresh data (default: true)
 * @param refreshInterval - Refresh interval in minutes (default: 5)
 * @returns Dashboard state and control functions
 */
export const useDashboard = (
  dashboardService: IDashboardService,
  autoRefresh: boolean = true,
  refreshInterval: number = 5
): UseDashboardReturn => {
  const logger = Logger.getInstance('useDashboard');
  const refreshIntervalRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(true);

  // Initialize state
  const [state, setState] = useState<DashboardState>({
    data: null,
    contentMetrics: [],
    growthMetrics: [],
    visibilityTrend: [],
    brandMentions: [],
    recentActivity: [],
    quickActions: [],
    loading: {
      dashboard: false,
      content: false,
      growth: false,
      charts: false
    },
    error: null,
    lastUpdated: null
  });

  /**
   * Safe state update (only if component is mounted)
   */
  const safeSetState = useCallback((updater: (prev: DashboardState) => DashboardState) => {
    if (mountedRef.current) {
      setState(updater);
    }
  }, []);

  /**
   * Update loading state for specific section
   */
  const setLoading = useCallback((section: keyof DashboardState['loading'], isLoading: boolean) => {
    safeSetState(prev => ({
      ...prev,
      loading: {
        ...prev.loading,
        [section]: isLoading
      }
    }));
  }, [safeSetState]);

  /**
   * Set error state
   */
  const setError = useCallback((error: ApiError | null) => {
    safeSetState(prev => ({
      ...prev,
      error
    }));
  }, [safeSetState]);

  /**
   * Load complete dashboard data
   */
  const loadDashboardData = useCallback(async (useCache: boolean = true) => {
    try {
      setLoading('dashboard', true);
      setError(null);

      logger.info('Loading dashboard data', { useCache });

      const result = await dashboardService.getDashboardData(useCache);

      if (result.success && result.data) {
        safeSetState(prev => ({
          ...prev,
          data: result.data!,
          contentMetrics: result.data!.contentMetrics,
          growthMetrics: result.data!.growthMetrics,
          visibilityTrend: result.data!.visibilityTrend,
          brandMentions: result.data!.brandMentions,
          recentActivity: result.data!.recentActivity,
          quickActions: result.data!.quickActions,
          lastUpdated: new Date()
        }));

        logger.info('Dashboard data loaded successfully');
      } else {
        logger.error('Failed to load dashboard data', result.error);
        setError(result.error || {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to load dashboard data',
          timestamp: new Date()
        });
      }
    } catch (error) {
      logger.error('Unexpected error loading dashboard data', error);
      setError({
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: { originalError: error },
        timestamp: new Date()
      });
    } finally {
      setLoading('dashboard', false);
    }
  }, [dashboardService, logger, setLoading, setError, safeSetState]);

  /**
   * Load content metrics only
   */
  const loadContentMetrics = useCallback(async () => {
    try {
      setLoading('content', true);
      logger.info('Loading content metrics');

      const result = await dashboardService.getContentMetrics();

      if (result.success && result.data) {
        safeSetState(prev => ({
          ...prev,
          contentMetrics: result.data!
        }));
      } else {
        logger.error('Failed to load content metrics', result.error);
        setError(result.error!);
      }
    } catch (error) {
      logger.error('Unexpected error loading content metrics', error);
    } finally {
      setLoading('content', false);
    }
  }, [dashboardService, logger, setLoading, setError, safeSetState]);

  /**
   * Load growth metrics only
   */
  const loadGrowthMetrics = useCallback(async () => {
    try {
      setLoading('growth', true);
      logger.info('Loading growth metrics');

      const result = await dashboardService.getGrowthMetrics();

      if (result.success && result.data) {
        safeSetState(prev => ({
          ...prev,
          growthMetrics: result.data!
        }));
      } else {
        logger.error('Failed to load growth metrics', result.error);
        setError(result.error!);
      }
    } catch (error) {
      logger.error('Unexpected error loading growth metrics', error);
    } finally {
      setLoading('growth', false);
    }
  }, [dashboardService, logger, setLoading, setError, safeSetState]);

  /**
   * Load chart data
   */
  const loadChartData = useCallback(async () => {
    try {
      setLoading('charts', true);
      logger.info('Loading chart data');

      const [visibilityResult, mentionsResult] = await Promise.all([
        dashboardService.getVisibilityTrend(),
        dashboardService.getBrandMentions()
      ]);

      if (visibilityResult.success && mentionsResult.success) {
        safeSetState(prev => ({
          ...prev,
          visibilityTrend: visibilityResult.data!,
          brandMentions: mentionsResult.data!
        }));
      } else {
        const error = visibilityResult.error || mentionsResult.error;
        logger.error('Failed to load chart data', error);
        setError(error!);
      }
    } catch (error) {
      logger.error('Unexpected error loading chart data', error);
    } finally {
      setLoading('charts', false);
    }
  }, [dashboardService, logger, setLoading, setError, safeSetState]);

  /**
   * Refresh all dashboard data
   */
  const refresh = useCallback(async () => {
    await loadDashboardData(false); // Force refresh (no cache)
  }, [loadDashboardData]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  /**
   * Setup auto-refresh interval
   */
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(() => {
        logger.debug('Auto-refreshing dashboard data');
        loadDashboardData(true); // Use cache for auto-refresh
      }, refreshInterval * 60 * 1000);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [autoRefresh, refreshInterval, loadDashboardData, logger]);

  /**
   * Initial data load
   */
  useEffect(() => {
    loadDashboardData(true);
  }, [loadDashboardData]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Calculate if any loading is in progress
  const isLoading = Object.values(state.loading).some(loading => loading);

  return {
    ...state,
    refresh,
    refreshContent: loadContentMetrics,
    refreshGrowth: loadGrowthMetrics,
    refreshCharts: loadChartData,
    clearError,
    isLoading
  };
}; 