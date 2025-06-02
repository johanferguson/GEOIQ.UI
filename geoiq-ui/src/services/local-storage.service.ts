/**
 * Local Storage Service - GEOIQ Analytics Platform
 * 
 * Adapter service that implements the Company & Brands service interface
 * using localStorage for development and testing purposes.
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
import { ICompanyBrandsService } from './company-brands.service';
import { Logger } from '@/lib/logger';

/**
 * Local Storage Company & Brands Service
 * Adapter Pattern: Implements the same interface as the API service
 * but uses localStorage for data persistence
 */
export class LocalStorageCompanyBrandsService implements ICompanyBrandsService {
  private readonly logger = Logger.getInstance('LocalStorageCompanyBrandsService');
  private readonly companyKey = 'geoiq_company';
  private readonly brandsKey = 'geoiq_brands';

  constructor() {}

  /**
   * Get company from localStorage
   * @returns Promise with company data or error
   */
  async getCompany(): Promise<ServiceResult<Company | null>> {
    try {
      this.logger.info('Fetching company from localStorage');

      const stored = localStorage.getItem(this.companyKey);
      if (!stored) {
        return { success: true, data: null };
      }

      const company = JSON.parse(stored) as Company;
      
      // Convert date strings back to Date objects
      company.createdAt = new Date(company.createdAt);
      company.updatedAt = new Date(company.updatedAt);

      return { success: true, data: company };

    } catch (error) {
      this.logger.error('Error fetching company from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_READ_ERROR', 'Failed to read company data', error)
      };
    }
  }

  /**
   * Create company in localStorage
   * @param data - Company creation data
   * @returns Promise with created company or error
   */
  async createCompany(data: CompanyCreateData): Promise<ServiceResult<Company>> {
    try {
      this.logger.info('Creating company in localStorage', { name: data.name });

      // Validate data
      const validation = this.validateCompany(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Company data validation failed', validation.errors)
        };
      }

      const company: Company = {
        ...data,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      localStorage.setItem(this.companyKey, JSON.stringify(company));

      this.logger.info('Company created successfully', { id: company.id });
      return { success: true, data: company };

    } catch (error) {
      this.logger.error('Error creating company in localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_WRITE_ERROR', 'Failed to create company', error)
      };
    }
  }

  /**
   * Update company in localStorage
   * @param data - Company update data
   * @returns Promise with updated company or error
   */
  async updateCompany(data: CompanyUpdateData): Promise<ServiceResult<Company>> {
    try {
      this.logger.info('Updating company in localStorage');

      // Get existing company
      const existingResult = await this.getCompany();
      if (!existingResult.success || !existingResult.data) {
        return {
          success: false,
          error: this.createError('NOT_FOUND', 'Company not found', null)
        };
      }

      // Validate data
      const validation = this.validateCompany(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Company data validation failed', validation.errors)
        };
      }

      const updatedCompany: Company = {
        ...existingResult.data,
        ...data,
        updatedAt: new Date()
      };

      localStorage.setItem(this.companyKey, JSON.stringify(updatedCompany));

      this.logger.info('Company updated successfully', { id: updatedCompany.id });
      return { success: true, data: updatedCompany };

    } catch (error) {
      this.logger.error('Error updating company in localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_WRITE_ERROR', 'Failed to update company', error)
      };
    }
  }

  /**
   * Delete company from localStorage
   * @returns Promise with success or error
   */
  async deleteCompany(): Promise<ServiceResult<void>> {
    try {
      this.logger.info('Deleting company from localStorage');

      localStorage.removeItem(this.companyKey);

      this.logger.info('Company deleted successfully');
      return { success: true };

    } catch (error) {
      this.logger.error('Error deleting company from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_DELETE_ERROR', 'Failed to delete company', error)
      };
    }
  }

  /**
   * Get brands from localStorage with optional filtering
   * @param filters - Optional brand filters
   * @returns Promise with brands array or error
   */
  async getBrands(filters?: BrandFilters): Promise<ServiceResult<Brand[]>> {
    try {
      this.logger.info('Fetching brands from localStorage', { filters });

      const stored = localStorage.getItem(this.brandsKey);
      let brands: Brand[] = [];

      if (stored) {
        brands = JSON.parse(stored) as Brand[];
        
        // Convert date strings back to Date objects
        brands = brands.map(brand => ({
          ...brand,
          createdAt: new Date(brand.createdAt),
          updatedAt: new Date(brand.updatedAt)
        }));
      }

      // Apply filters if provided
      if (filters) {
        brands = this.applyBrandFilters(brands, filters);
      }

      return { success: true, data: brands };

    } catch (error) {
      this.logger.error('Error fetching brands from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_READ_ERROR', 'Failed to read brands data', error)
      };
    }
  }

  /**
   * Get brand by ID from localStorage
   * @param id - Brand ID
   * @returns Promise with brand data or error
   */
  async getBrandById(id: string): Promise<ServiceResult<Brand>> {
    try {
      this.logger.info('Fetching brand by ID from localStorage', { id });

      const brandsResult = await this.getBrands();
      if (!brandsResult.success || !brandsResult.data) {
        return { success: false, error: brandsResult.error };
      }

      const brand = brandsResult.data.find(b => b.id === id);
      if (!brand) {
        return {
          success: false,
          error: this.createError('NOT_FOUND', 'Brand not found', { id })
        };
      }

      return { success: true, data: brand };

    } catch (error) {
      this.logger.error('Error fetching brand by ID from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_READ_ERROR', 'Failed to read brand data', error)
      };
    }
  }

  /**
   * Create brand in localStorage
   * @param data - Brand creation data
   * @returns Promise with created brand or error
   */
  async createBrand(data: BrandCreateData): Promise<ServiceResult<Brand>> {
    try {
      this.logger.info('Creating brand in localStorage', { name: data.name });

      // Validate data
      const validation = this.validateBrand(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Brand data validation failed', validation.errors)
        };
      }

      // Get existing brands
      const brandsResult = await this.getBrands();
      if (!brandsResult.success) {
        return { success: false, error: brandsResult.error };
      }

      const brands = brandsResult.data || [];

      const newBrand: Brand = {
        ...data,
        id: this.generateId(),
        status: data.status || 'active' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      brands.push(newBrand);
      localStorage.setItem(this.brandsKey, JSON.stringify(brands));

      this.logger.info('Brand created successfully', { id: newBrand.id });
      return { success: true, data: newBrand };

    } catch (error) {
      this.logger.error('Error creating brand in localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_WRITE_ERROR', 'Failed to create brand', error)
      };
    }
  }

  /**
   * Update brand in localStorage
   * @param id - Brand ID
   * @param data - Brand update data
   * @returns Promise with updated brand or error
   */
  async updateBrand(id: string, data: BrandUpdateData): Promise<ServiceResult<Brand>> {
    try {
      this.logger.info('Updating brand in localStorage', { id });

      // Validate data
      const validation = this.validateBrand(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: this.createError('VALIDATION_ERROR', 'Brand data validation failed', validation.errors)
        };
      }

      // Get existing brands
      const brandsResult = await this.getBrands();
      if (!brandsResult.success || !brandsResult.data) {
        return { success: false, error: brandsResult.error };
      }

      const brands = brandsResult.data;
      const brandIndex = brands.findIndex(b => b.id === id);

      if (brandIndex === -1) {
        return {
          success: false,
          error: this.createError('NOT_FOUND', 'Brand not found', { id })
        };
      }

      const updatedBrand: Brand = {
        ...brands[brandIndex],
        ...data,
        updatedAt: new Date()
      };

      brands[brandIndex] = updatedBrand;
      localStorage.setItem(this.brandsKey, JSON.stringify(brands));

      this.logger.info('Brand updated successfully', { id: updatedBrand.id });
      return { success: true, data: updatedBrand };

    } catch (error) {
      this.logger.error('Error updating brand in localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_WRITE_ERROR', 'Failed to update brand', error)
      };
    }
  }

  /**
   * Delete brand from localStorage
   * @param id - Brand ID
   * @returns Promise with success or error
   */
  async deleteBrand(id: string): Promise<ServiceResult<void>> {
    try {
      this.logger.info('Deleting brand from localStorage', { id });

      // Get existing brands
      const brandsResult = await this.getBrands();
      if (!brandsResult.success || !brandsResult.data) {
        return { success: false, error: brandsResult.error };
      }

      const brands = brandsResult.data;
      const filteredBrands = brands.filter(b => b.id !== id);

      if (filteredBrands.length === brands.length) {
        return {
          success: false,
          error: this.createError('NOT_FOUND', 'Brand not found', { id })
        };
      }

      localStorage.setItem(this.brandsKey, JSON.stringify(filteredBrands));

      this.logger.info('Brand deleted successfully', { id });
      return { success: true };

    } catch (error) {
      this.logger.error('Error deleting brand from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_DELETE_ERROR', 'Failed to delete brand', error)
      };
    }
  }

  /**
   * Get company and brands together
   * @returns Promise with combined data or error
   */
  async getCompanyAndBrands(): Promise<ServiceResult<CompanyBrandsApiResponse>> {
    try {
      this.logger.info('Fetching company and brands from localStorage');

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
      this.logger.error('Error fetching company and brands from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_READ_ERROR', 'Failed to fetch company and brands data', error)
      };
    }
  }

  /**
   * Refresh data (no-op for localStorage)
   * @returns Promise with fresh data or error
   */
  async refreshData(): Promise<ServiceResult<CompanyBrandsApiResponse>> {
    this.logger.info('Refreshing data from localStorage');
    return await this.getCompanyAndBrands();
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
   * Load sample data
   * @param config - Sample data configuration
   * @returns Promise with sample data or error
   */
  async loadSampleData(config?: SampleDataConfig): Promise<ServiceResult<CompanyBrandsApiResponse>> {
    try {
      this.logger.info('Loading sample data to localStorage', config);

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

      // Save to localStorage
      if (finalConfig.includeCompany) {
        localStorage.setItem(this.companyKey, JSON.stringify(sampleCompany));
      }
      if (finalConfig.includeBrands) {
        localStorage.setItem(this.brandsKey, JSON.stringify(sampleBrands));
      }

      const response: CompanyBrandsApiResponse = {
        company: finalConfig.includeCompany ? sampleCompany : null,
        brands: finalConfig.includeBrands ? sampleBrands : [],
        metadata: {
          timestamp: new Date(),
          totalBrands: finalConfig.includeBrands ? sampleBrands.length : 0,
          version: '1.0.0'
        }
      };

      this.logger.info('Sample data loaded successfully to localStorage');
      return { success: true, data: response };

    } catch (error) {
      this.logger.error('Error loading sample data to localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_WRITE_ERROR', 'Failed to load sample data', error)
      };
    }
  }

  /**
   * Clear all data from localStorage
   * @returns Promise with success or error
   */
  async clearAllData(): Promise<ServiceResult<void>> {
    try {
      this.logger.info('Clearing all data from localStorage');

      localStorage.removeItem(this.companyKey);
      localStorage.removeItem(this.brandsKey);

      this.logger.info('All data cleared successfully from localStorage');
      return { success: true };

    } catch (error) {
      this.logger.error('Error clearing data from localStorage', error);
      return {
        success: false,
        error: this.createError('STORAGE_DELETE_ERROR', 'Failed to clear data', error)
      };
    }
  }

  /**
   * Apply filters to brands array
   * @param brands - Brands array to filter
   * @param filters - Filter criteria
   * @returns Filtered brands array
   * @private
   */
  private applyBrandFilters(brands: Brand[], filters: BrandFilters): Brand[] {
    let filtered = [...brands];

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(brand => brand.status === filters.status);
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(brand => 
        brand.name.toLowerCase().includes(searchLower) ||
        brand.description.toLowerCase().includes(searchLower)
      );
    }

    // Color filter
    if (filters.color) {
      filtered = filtered.filter(brand => brand.color === filters.color);
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[filters.sortBy!];
        const bValue = b[filters.sortBy!];
        
        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;
        
        return filters.sortDirection === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }

  /**
   * Generate unique ID
   * @returns Unique identifier string
   * @private
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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