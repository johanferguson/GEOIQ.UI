/**
 * Company & Brands Service - GEOIQ Analytics Platform
 * 
 * Handles all company and brand-related API calls, data transformation,
 * caching, and business logic following SOLID principles.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import {
  Company,
  Brand,
  CompanyCreateData,
  CompanyUpdateData,
  BrandCreateData,
  BrandUpdateData,
  CompanyBrandsApiResponse,
  BrandFilters,
  CompanyValidationResult,
  BrandValidationResult,
  SampleDataConfig
} from '@/types/company-brands';
import { ServiceResult, ApiError } from '@/types/dashboard';
import { ApiClient } from './api.service';
import { CacheService } from './cache.service';
import { Logger } from '@/lib/logger';

/**
 * Company & Brands Service Interface
 * Following Interface Segregation Principle
 */
export interface ICompanyBrandsService {
  // Company operations
  getCompany(): Promise<ServiceResult<Company | null>>;
  createCompany(data: CompanyCreateData): Promise<ServiceResult<Company>>;
  updateCompany(data: CompanyUpdateData): Promise<ServiceResult<Company>>;
  deleteCompany(): Promise<ServiceResult<void>>;
  
  // Brand operations
  getBrands(filters?: BrandFilters): Promise<ServiceResult<Brand[]>>;
  getBrandById(id: string): Promise<ServiceResult<Brand>>;
  createBrand(data: BrandCreateData): Promise<ServiceResult<Brand>>;
  updateBrand(id: string, data: BrandUpdateData): Promise<ServiceResult<Brand>>;
  deleteBrand(id: string): Promise<ServiceResult<void>>;
  
  // Combined operations
  getCompanyAndBrands(): Promise<ServiceResult<CompanyBrandsApiResponse>>;
  refreshData(): Promise<ServiceResult<CompanyBrandsApiResponse>>;
  
  // Validation
  validateCompany(data: CompanyCreateData | CompanyUpdateData): CompanyValidationResult;
  validateBrand(data: BrandCreateData | BrandUpdateData): BrandValidationResult;
  
  // Sample data
  loadSampleData(config?: SampleDataConfig): Promise<ServiceResult<CompanyBrandsApiResponse>>;
  clearAllData(): Promise<ServiceResult<void>>;
}

/**
 * Company & Brands Service Implementation
 * Single Responsibility: Manages all company and brand-related data operations
 */
export class CompanyBrandsService implements ICompanyBrandsService {
  private readonly logger = Logger.getInstance('CompanyBrandsService');
  private readonly companyCacheKey = 'company_data';
  private readonly brandsCacheKey = 'brands_data';
  private readonly cacheExpiryMinutes = 10;

  constructor(
    private readonly apiClient: ApiClient,
    private readonly cacheService: CacheService
  ) {}

  /**
   * Get company information
   * @returns Promise with company data or error
   */
  async getCompany(): Promise<ServiceResult<Company | null>> {
    try {
      this.logger.info('Fetching company data');

      // Check cache first
      const cached = this.cacheService.get<Company>(this.companyCacheKey);
      if (cached) {
        this.logger.info('Returning cached company data');
        return { success: true, data: cached };
      }

      // Fetch from API
      const response = await this.apiClient.get<Company>('/company');
      
      if (!response.success) {
        // If company doesn't exist, return null instead of error
        if (response.error?.code === 'NOT_FOUND') {
          return { success: true, data: null };
        }
        return { success: false, error: response.error };
      }

      // Cache the result
      if (response.data) {
        this.cacheService.set(
          this.companyCacheKey,
          response.data,
          this.cacheExpiryMinutes
        );
      }

      return { success: true, data: response.data || null };

    } catch (error) {
      this.logger.error('Error fetching company data', error);
      return {
        success: false,
        error: this.createError('COMPANY_FETCH_ERROR', 'Failed to fetch company data', error)
      };
    }
  }

  /**
   * Create new company
   * @param data - Company creation data
   * @returns Promise with created company or error
   */
  async createCompany(data: CompanyCreateData): Promise<ServiceResult<Company>> {
    try {
      this.logger.info('Creating company', { name: data.name });

      // Validate data
      const validation = this.validateCompany(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Company data validation failed', validation.errors)
        };
      }

      // Create via API
      const response = await this.apiClient.post<Company>('/company', data);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      // Cache the result
      this.cacheService.set(
        this.companyCacheKey,
        response.data,
        this.cacheExpiryMinutes
      );

      this.logger.info('Company created successfully', { id: response.data.id });
      return { success: true, data: response.data };

    } catch (error) {
      this.logger.error('Error creating company', error);
      return {
        success: false,
        error: this.createError('COMPANY_CREATE_ERROR', 'Failed to create company', error)
      };
    }
  }

  /**
   * Update existing company
   * @param data - Company update data
   * @returns Promise with updated company or error
   */
  async updateCompany(data: CompanyUpdateData): Promise<ServiceResult<Company>> {
    try {
      this.logger.info('Updating company');

      // Validate data
      const validation = this.validateCompany(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Company data validation failed', validation.errors)
        };
      }

      // Update via API
      const response = await this.apiClient.patch<Company>('/company', data);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      // Update cache
      this.cacheService.set(
        this.companyCacheKey,
        response.data,
        this.cacheExpiryMinutes
      );

      this.logger.info('Company updated successfully', { id: response.data.id });
      return { success: true, data: response.data };

    } catch (error) {
      this.logger.error('Error updating company', error);
      return {
        success: false,
        error: this.createError('COMPANY_UPDATE_ERROR', 'Failed to update company', error)
      };
    }
  }

  /**
   * Delete company
   * @returns Promise with success or error
   */
  async deleteCompany(): Promise<ServiceResult<void>> {
    try {
      this.logger.info('Deleting company');

      const response = await this.apiClient.delete<void>('/company');
      
      if (!response.success) {
        return { success: false, error: response.error };
      }

      // Clear cache
      this.cacheService.delete(this.companyCacheKey);

      this.logger.info('Company deleted successfully');
      return { success: true };

    } catch (error) {
      this.logger.error('Error deleting company', error);
      return {
        success: false,
        error: this.createError('COMPANY_DELETE_ERROR', 'Failed to delete company', error)
      };
    }
  }

  /**
   * Get brands with optional filtering
   * @param filters - Optional brand filters
   * @returns Promise with brands array or error
   */
  async getBrands(filters?: BrandFilters): Promise<ServiceResult<Brand[]>> {
    try {
      this.logger.info('Fetching brands', { filters });

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.color) queryParams.append('color', filters.color);
      if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters?.sortDirection) queryParams.append('sortDirection', filters.sortDirection);

      const url = `/brands${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      // Check cache for unfiltered requests
      if (!filters || Object.keys(filters).length === 0) {
        const cached = this.cacheService.get<Brand[]>(this.brandsCacheKey);
        if (cached) {
          this.logger.info('Returning cached brands data');
          return { success: true, data: cached };
        }
      }

      // Fetch from API
      const response = await this.apiClient.get<Brand[]>(url);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      // Cache unfiltered results
      if (!filters || Object.keys(filters).length === 0) {
        this.cacheService.set(
          this.brandsCacheKey,
          response.data,
          this.cacheExpiryMinutes
        );
      }

      return { success: true, data: response.data };

    } catch (error) {
      this.logger.error('Error fetching brands', error);
      return {
        success: false,
        error: this.createError('BRANDS_FETCH_ERROR', 'Failed to fetch brands', error)
      };
    }
  }

  /**
   * Get brand by ID
   * @param id - Brand ID
   * @returns Promise with brand data or error
   */
  async getBrandById(id: string): Promise<ServiceResult<Brand>> {
    try {
      this.logger.info('Fetching brand by ID', { id });

      const response = await this.apiClient.get<Brand>(`/brands/${id}`);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };

    } catch (error) {
      this.logger.error('Error fetching brand by ID', error);
      return {
        success: false,
        error: this.createError('BRAND_FETCH_ERROR', 'Failed to fetch brand', error)
      };
    }
  }

  /**
   * Create new brand
   * @param data - Brand creation data
   * @returns Promise with created brand or error
   */
  async createBrand(data: BrandCreateData): Promise<ServiceResult<Brand>> {
    try {
      this.logger.info('Creating brand', { name: data.name });

      // Validate data
      const validation = this.validateBrand(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Brand data validation failed', validation.errors)
        };
      }

      // Create via API
      const response = await this.apiClient.post<Brand>('/brands', data);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      // Clear brands cache to force refresh
      this.cacheService.delete(this.brandsCacheKey);

      this.logger.info('Brand created successfully', { id: response.data.id });
      return { success: true, data: response.data };

    } catch (error) {
      this.logger.error('Error creating brand', error);
      return {
        success: false,
        error: this.createError('BRAND_CREATE_ERROR', 'Failed to create brand', error)
      };
    }
  }

  /**
   * Update existing brand
   * @param id - Brand ID
   * @param data - Brand update data
   * @returns Promise with updated brand or error
   */
  async updateBrand(id: string, data: BrandUpdateData): Promise<ServiceResult<Brand>> {
    try {
      this.logger.info('Updating brand', { id });

      // Validate data
      const validation = this.validateBrand(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Brand data validation failed', validation.errors)
        };
      }

      // Update via API
      const response = await this.apiClient.patch<Brand>(`/brands/${id}`, data);
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error };
      }

      // Clear brands cache to force refresh
      this.cacheService.delete(this.brandsCacheKey);

      this.logger.info('Brand updated successfully', { id: response.data.id });
      return { success: true, data: response.data };

    } catch (error) {
      this.logger.error('Error updating brand', error);
      return {
        success: false,
        error: this.createError('BRAND_UPDATE_ERROR', 'Failed to update brand', error)
      };
    }
  }

  /**
   * Delete brand
   * @param id - Brand ID
   * @returns Promise with success or error
   */
  async deleteBrand(id: string): Promise<ServiceResult<void>> {
    try {
      this.logger.info('Deleting brand', { id });

      const response = await this.apiClient.delete<void>(`/brands/${id}`);
      
      if (!response.success) {
        return { success: false, error: response.error };
      }

      // Clear brands cache to force refresh
      this.cacheService.delete(this.brandsCacheKey);

      this.logger.info('Brand deleted successfully', { id });
      return { success: true };

    } catch (error) {
      this.logger.error('Error deleting brand', error);
      return {
        success: false,
        error: this.createError('BRAND_DELETE_ERROR', 'Failed to delete brand', error)
      };
    }
  }

  /**
   * Get company and brands together
   * @returns Promise with combined data or error
   */
  async getCompanyAndBrands(): Promise<ServiceResult<CompanyBrandsApiResponse>> {
    try {
      this.logger.info('Fetching company and brands data');

      // Fetch both in parallel
      const [companyResult, brandsResult] = await Promise.all([
        this.getCompany(),
        this.getBrands()
      ]);

      if (!companyResult.success) {
        return { success: false, error: companyResult.error };
      }

      if (!brandsResult.success) {
        return { success: false, error: brandsResult.error };
      }

      const response: CompanyBrandsApiResponse = {
        company: companyResult.data || null,
        brands: brandsResult.data || [],
        metadata: {
          timestamp: new Date(),
          totalBrands: brandsResult.data?.length || 0,
          version: '1.0.0'
        }
      };

      return { success: true, data: response };

    } catch (error) {
      this.logger.error('Error fetching company and brands data', error);
      return {
        success: false,
        error: this.createError('COMBINED_FETCH_ERROR', 'Failed to fetch company and brands data', error)
      };
    }
  }

  /**
   * Refresh all data (clear cache and fetch fresh)
   * @returns Promise with fresh data or error
   */
  async refreshData(): Promise<ServiceResult<CompanyBrandsApiResponse>> {
    try {
      this.logger.info('Refreshing company and brands data');

      // Clear caches
      this.cacheService.delete(this.companyCacheKey);
      this.cacheService.delete(this.brandsCacheKey);

      // Fetch fresh data
      return await this.getCompanyAndBrands();

    } catch (error) {
      this.logger.error('Error refreshing data', error);
      return {
        success: false,
        error: this.createError('REFRESH_ERROR', 'Failed to refresh data', error)
      };
    }
  }

  /**
   * Validate company data
   * @param data - Company data to validate
   * @returns Validation result
   */
  validateCompany(data: CompanyCreateData | CompanyUpdateData): CompanyValidationResult {
    const errors: Partial<Record<keyof Company, string>> = {};

    // Name validation
    if ('name' in data && (!data.name || data.name.trim().length < 2)) {
      errors.name = 'Company name must be at least 2 characters long';
    }

    // Description validation
    if ('description' in data && (!data.description || data.description.trim().length < 10)) {
      errors.description = 'Company description must be at least 10 characters long';
    }

    // KPIs validation
    if ('coreKPIs' in data && (!data.coreKPIs || data.coreKPIs.length === 0)) {
      errors.coreKPIs = 'At least one core KPI is required';
    }

    // Mission statement validation
    if ('missionStatement' in data && (!data.missionStatement || data.missionStatement.trim().length < 20)) {
      errors.missionStatement = 'Mission statement must be at least 20 characters long';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Validate brand data
   * @param data - Brand data to validate
   * @returns Validation result
   */
  validateBrand(data: BrandCreateData | BrandUpdateData): BrandValidationResult {
    const errors: Partial<Record<keyof Brand, string>> = {};

    // Name validation
    if ('name' in data && (!data.name || data.name.trim().length < 2)) {
      errors.name = 'Brand name must be at least 2 characters long';
    }

    // Description validation
    if ('description' in data && (!data.description || data.description.trim().length < 10)) {
      errors.description = 'Brand description must be at least 10 characters long';
    }

    // Benefits validation
    if ('benefits' in data && (!data.benefits || data.benefits.length === 0)) {
      errors.benefits = 'At least one benefit is required';
    }

    // Color validation (if provided)
    if ('color' in data && data.color && !/^#[0-9A-F]{6}$/i.test(data.color)) {
      errors.color = 'Color must be a valid hex code (e.g., #FF0000)';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Load sample data for development/testing
   * @param config - Sample data configuration
   * @returns Promise with sample data or error
   */
  async loadSampleData(config?: SampleDataConfig): Promise<ServiceResult<CompanyBrandsApiResponse>> {
    try {
      this.logger.info('Loading sample data', config);

      const defaultConfig: SampleDataConfig = {
        includeCompany: true,
        includeBrands: true,
        brandCount: 3
      };

      const finalConfig = { ...defaultConfig, ...config };

      // Sample company data
      const sampleCompany: Company = {
        id: 'sample-company-1',
        name: 'TechVision Solutions',
        description: 'A cutting-edge technology company specializing in AI-powered business solutions, cloud infrastructure, and digital transformation services for small to medium enterprises.',
        coreKPIs: [
          'Monthly Recurring Revenue (MRR)',
          'Customer Acquisition Cost (CAC)', 
          'Customer Lifetime Value (CLV)',
          'Net Promoter Score (NPS)',
          'Time to Market for New Features',
          'Client Retention Rate'
        ],
        missionStatement: 'To empower businesses worldwide with intelligent technology solutions that drive growth, efficiency, and innovation. We believe in democratizing access to advanced AI tools, making cutting-edge technology accessible to companies of all sizes.',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date(),
      };

      // Sample brands data
      const sampleBrands: Brand[] = [
        {
          id: 'sample-brand-1',
          name: 'TechVision AI',
          description: 'Our flagship AI platform that provides intelligent business insights, automated decision-making, and predictive analytics for enterprise clients.',
          benefits: [
            'Reduces manual data analysis by 80%',
            'Improves decision accuracy by 65%',
            'Real-time insights and reporting',
            '24/7 AI-powered customer support',
            'Seamless integration with existing systems',
            'Advanced machine learning algorithms'
          ],
          color: '#8B5CF6',
          status: 'active' as const,
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date(),
        },
        {
          id: 'sample-brand-2', 
          name: 'CloudFlow Pro',
          description: 'A comprehensive cloud infrastructure management platform designed for scalable, secure, and cost-effective cloud operations.',
          benefits: [
            'Reduces cloud costs by up to 40%',
            'Auto-scaling capabilities',
            'Enterprise-grade security',
            'Multi-cloud support',
            'Compliance management tools',
            'DevOps integration'
          ],
          color: '#EC4899',
          status: 'active' as const,
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date(),
        },
        {
          id: 'sample-brand-3',
          name: 'DataBridge Connect',
          description: 'An innovative data integration solution that connects disparate systems, enabling seamless data flow and real-time synchronization.',
          benefits: [
            'Connect 500+ data sources',
            'Real-time data synchronization',
            'No-code integration builder',
            'Advanced data transformation',
            'Monitoring and alerting',
            'Enterprise security standards'
          ],
          color: '#10B981',
          status: 'active' as const,
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date(),
        }
      ].slice(0, finalConfig.brandCount);

      const response: CompanyBrandsApiResponse = {
        company: finalConfig.includeCompany ? sampleCompany : null,
        brands: finalConfig.includeBrands ? sampleBrands : [],
        metadata: {
          timestamp: new Date(),
          totalBrands: finalConfig.includeBrands ? sampleBrands.length : 0,
          version: '1.0.0'
        }
      };

      // Cache the sample data
      if (finalConfig.includeCompany) {
        this.cacheService.set(this.companyCacheKey, sampleCompany, this.cacheExpiryMinutes);
      }
      if (finalConfig.includeBrands) {
        this.cacheService.set(this.brandsCacheKey, sampleBrands, this.cacheExpiryMinutes);
      }

      this.logger.info('Sample data loaded successfully');
      return { success: true, data: response };

    } catch (error) {
      this.logger.error('Error loading sample data', error);
      return {
        success: false,
        error: this.createError('SAMPLE_DATA_ERROR', 'Failed to load sample data', error)
      };
    }
  }

  /**
   * Clear all data and cache
   * @returns Promise with success or error
   */
  async clearAllData(): Promise<ServiceResult<void>> {
    try {
      this.logger.info('Clearing all company and brands data');

      // Clear caches
      this.cacheService.delete(this.companyCacheKey);
      this.cacheService.delete(this.brandsCacheKey);

      // In a real implementation, this would call API endpoints to delete data
      // For now, we just clear the cache

      this.logger.info('All data cleared successfully');
      return { success: true };

    } catch (error) {
      this.logger.error('Error clearing data', error);
      return {
        success: false,
        error: this.createError('CLEAR_DATA_ERROR', 'Failed to clear data', error)
      };
    }
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
 * Company & Brands Service Factory
 * Following Factory Pattern for service instantiation
 */
export class CompanyBrandsServiceFactory {
  /**
   * Create Company & Brands service instance
   * @param apiClient - API client instance
   * @param cacheService - Cache service instance
   * @returns Company & Brands service instance
   */
  static create(
    apiClient: ApiClient,
    cacheService: CacheService
  ): ICompanyBrandsService {
    return new CompanyBrandsService(apiClient, cacheService);
  }

  /**
   * Create service with default dependencies
   * @returns Company & Brands service instance with default dependencies
   */
  static createWithDefaults(): ICompanyBrandsService {
    const apiClient = new ApiClient(
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
      process.env.NEXT_PUBLIC_API_TOKEN
    );
    const cacheService = new CacheService();
    
    return new CompanyBrandsService(apiClient, cacheService);
  }
} 