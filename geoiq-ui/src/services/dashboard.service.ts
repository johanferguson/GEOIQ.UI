/**
 * Dashboard Service - GEOIQ Analytics Platform
 * 
 * Handles all dashboard-related API calls, data transformation,
 * and caching following SOLID principles and separation of concerns.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import {
  DashboardApiResponse,
  ContentMetric,
  GrowthMetric,
  VisibilityTrendData,
  BrandMentionsData,
  ActivityItem,
  QuickAction,
  ServiceResult,
  ApiError,
  CacheEntry,
  DashboardConfig
} from '@/types/dashboard';
import { ApiClient } from './api.service';
import { CacheService } from './cache.service';
import { Logger } from '@/lib/logger';

/**
 * Dashboard Service Interface
 * Following Interface Segregation Principle
 */
export interface IDashboardService {
  getDashboardData(useCache?: boolean): Promise<ServiceResult<DashboardApiResponse>>;
  getContentMetrics(): Promise<ServiceResult<ContentMetric[]>>;
  getGrowthMetrics(): Promise<ServiceResult<GrowthMetric[]>>;
  getVisibilityTrend(period?: string): Promise<ServiceResult<VisibilityTrendData[]>>;
  getBrandMentions(period?: string): Promise<ServiceResult<BrandMentionsData[]>>;
  getRecentActivity(limit?: number): Promise<ServiceResult<ActivityItem[]>>;
  getQuickActions(): Promise<ServiceResult<QuickAction[]>>;
  refreshDashboard(): Promise<ServiceResult<DashboardApiResponse>>;
  getUserConfig(): Promise<ServiceResult<DashboardConfig>>;
  updateUserConfig(config: Partial<DashboardConfig>): Promise<ServiceResult<DashboardConfig>>;
}

/**
 * Dashboard Service Implementation
 * Single Responsibility: Manages all dashboard-related data operations
 */
export class DashboardService implements IDashboardService {
  private readonly logger = Logger.getInstance('DashboardService');
  private readonly cacheKey = 'dashboard_data';
  private readonly cacheExpiryMinutes = 5;

  constructor(
    private readonly apiClient: ApiClient,
    private readonly cacheService: CacheService
  ) {}

  /**
   * Get complete dashboard data
   * @param useCache - Whether to use cached data if available
   * @returns Promise with dashboard data or error
   */
  async getDashboardData(useCache: boolean = true): Promise<ServiceResult<DashboardApiResponse>> {
    try {
      this.logger.info('Fetching dashboard data', { useCache });

      // Check cache first if enabled
      if (useCache) {
        const cached = this.cacheService.get<DashboardApiResponse>(this.cacheKey);
        if (cached) {
          this.logger.info('Returning cached dashboard data');
          return { success: true, data: cached };
        }
      }

      // Fetch from API
      const response = await this.apiClient.get<DashboardApiResponse>('/dashboard');
      
      if (!response.success || !response.data) {
        this.logger.error('Failed to fetch dashboard data', response.error);
        return { success: false, error: response.error };
      }

      // Transform and validate data
      const transformedData = this.transformApiResponse(response.data);
      
      // Cache the result
      this.cacheService.set(
        this.cacheKey,
        transformedData,
        this.cacheExpiryMinutes
      );

      this.logger.info('Successfully fetched and cached dashboard data');
      return { success: true, data: transformedData };

    } catch (error) {
      this.logger.error('Unexpected error fetching dashboard data', error);
      return {
        success: false,
        error: {
          code: 'DASHBOARD_FETCH_ERROR',
          message: 'Failed to fetch dashboard data',
          details: { originalError: error },
          timestamp: new Date()
        }
      };
    }
  }

  /**
   * Get content metrics only
   * @returns Promise with content metrics or error
   */
  async getContentMetrics(): Promise<ServiceResult<ContentMetric[]>> {
    try {
      this.logger.info('Fetching content metrics');
      
      const response = await this.apiClient.get<ContentMetric[]>('/dashboard/content-metrics');
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching content metrics', error);
      return {
        success: false,
        error: this.createError('CONTENT_METRICS_ERROR', 'Failed to fetch content metrics', error)
      };
    }
  }

  /**
   * Get growth metrics only
   * @returns Promise with growth metrics or error
   */
  async getGrowthMetrics(): Promise<ServiceResult<GrowthMetric[]>> {
    try {
      this.logger.info('Fetching growth metrics');
      
      const response = await this.apiClient.get<GrowthMetric[]>('/dashboard/growth-metrics');
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching growth metrics', error);
      return {
        success: false,
        error: this.createError('GROWTH_METRICS_ERROR', 'Failed to fetch growth metrics', error)
      };
    }
  }

  /**
   * Get visibility trend data
   * @param period - Time period for the trend (default: '12m')
   * @returns Promise with visibility trend data or error
   */
  async getVisibilityTrend(period: string = '12m'): Promise<ServiceResult<VisibilityTrendData[]>> {
    try {
      this.logger.info('Fetching visibility trend', { period });
      
      const response = await this.apiClient.get<VisibilityTrendData[]>(
        `/dashboard/visibility-trend?period=${period}`
      );
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching visibility trend', error);
      return {
        success: false,
        error: this.createError('VISIBILITY_TREND_ERROR', 'Failed to fetch visibility trend', error)
      };
    }
  }

  /**
   * Get brand mentions data
   * @param period - Time period for the data (default: '30d')
   * @returns Promise with brand mentions data or error
   */
  async getBrandMentions(period: string = '30d'): Promise<ServiceResult<BrandMentionsData[]>> {
    try {
      this.logger.info('Fetching brand mentions', { period });
      
      const response = await this.apiClient.get<BrandMentionsData[]>(
        `/dashboard/brand-mentions?period=${period}`
      );
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching brand mentions', error);
      return {
        success: false,
        error: this.createError('BRAND_MENTIONS_ERROR', 'Failed to fetch brand mentions', error)
      };
    }
  }

  /**
   * Get recent activity items
   * @param limit - Number of items to return (default: 10)
   * @returns Promise with activity items or error
   */
  async getRecentActivity(limit: number = 10): Promise<ServiceResult<ActivityItem[]>> {
    try {
      this.logger.info('Fetching recent activity', { limit });
      
      const response = await this.apiClient.get<ActivityItem[]>(
        `/dashboard/recent-activity?limit=${limit}`
      );
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching recent activity', error);
      return {
        success: false,
        error: this.createError('RECENT_ACTIVITY_ERROR', 'Failed to fetch recent activity', error)
      };
    }
  }

  /**
   * Get quick actions for current user
   * @returns Promise with quick actions or error
   */
  async getQuickActions(): Promise<ServiceResult<QuickAction[]>> {
    try {
      this.logger.info('Fetching quick actions');
      
      const response = await this.apiClient.get<QuickAction[]>('/dashboard/quick-actions');
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching quick actions', error);
      return {
        success: false,
        error: this.createError('QUICK_ACTIONS_ERROR', 'Failed to fetch quick actions', error)
      };
    }
  }

  /**
   * Force refresh dashboard data (bypass cache)
   * @returns Promise with fresh dashboard data or error
   */
  async refreshDashboard(): Promise<ServiceResult<DashboardApiResponse>> {
    this.logger.info('Refreshing dashboard data');
    this.cacheService.delete(this.cacheKey);
    return this.getDashboardData(false);
  }

  /**
   * Get user's dashboard configuration
   * @returns Promise with user config or error
   */
  async getUserConfig(): Promise<ServiceResult<DashboardConfig>> {
    try {
      this.logger.info('Fetching user dashboard config');
      
      const response = await this.apiClient.get<DashboardConfig>('/dashboard/config');
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error fetching user config', error);
      return {
        success: false,
        error: this.createError('USER_CONFIG_ERROR', 'Failed to fetch user config', error)
      };
    }
  }

  /**
   * Update user's dashboard configuration
   * @param config - Partial configuration to update
   * @returns Promise with updated config or error
   */
  async updateUserConfig(config: Partial<DashboardConfig>): Promise<ServiceResult<DashboardConfig>> {
    try {
      this.logger.info('Updating user dashboard config', config);
      
      const response = await this.apiClient.patch<DashboardConfig>('/dashboard/config', config);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('Error updating user config', error);
      return {
        success: false,
        error: this.createError('USER_CONFIG_UPDATE_ERROR', 'Failed to update user config', error)
      };
    }
  }

  /**
   * Transform raw API response to typed dashboard data
   * @param apiData - Raw API response data
   * @returns Transformed dashboard data
   * @private
   */
  private transformApiResponse(apiData: any): DashboardApiResponse {
    // Add data transformation logic here
    // Convert timestamps, validate data types, set defaults, etc.
    
    return {
      contentMetrics: apiData.contentMetrics || [],
      growthMetrics: apiData.growthMetrics || [],
      visibilityTrend: apiData.visibilityTrend || [],
      brandMentions: apiData.brandMentions || [],
      recentActivity: apiData.recentActivity || [],
      quickActions: apiData.quickActions || [],
      metadata: {
        timestamp: new Date(apiData.metadata?.timestamp || Date.now()),
        refreshInterval: apiData.metadata?.refreshInterval || 5,
        version: apiData.metadata?.version || '1.0.0'
      }
    };
  }

  /**
   * Create standardized error object
   * @param code - Error code
   * @param message - Error message
   * @param originalError - Original error object
   * @returns Standardized API error
   * @private
   */
  private createError(code: string, message: string, originalError?: any): ApiError {
    return {
      code,
      message,
      details: { originalError },
      timestamp: new Date()
    };
  }
}

/**
 * Dashboard Service Factory
 * Following Dependency Inversion Principle
 */
export class DashboardServiceFactory {
  static create(
    apiClient: ApiClient,
    cacheService: CacheService
  ): IDashboardService {
    return new DashboardService(apiClient, cacheService);
  }
} 