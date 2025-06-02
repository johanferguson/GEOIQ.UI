/**
 * Company & Brands Hook - GEOIQ Analytics Platform
 * 
 * Custom React hook for managing company and brand data state.
 * Follows SOLID principles with separation of concerns between
 * UI state management and business logic.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Company,
  Brand,
  CompanyCreateData,
  CompanyUpdateData,
  BrandCreateData,
  BrandUpdateData,
  CompanyBrandsState,
  BrandFilters,
  SampleDataConfig
} from '@/types/company-brands';
import { ICompanyBrandsService } from '@/services/company-brands.service';
import { LocalStorageCompanyBrandsService } from '@/services/local-storage.service';
import { Logger } from '@/lib/logger';

/**
 * Hook configuration interface
 */
interface UseCompanyBrandsConfig {
  /** Whether to auto-load data on mount */
  autoLoad?: boolean;
  /** Whether to use localStorage service (for development) */
  useLocalStorage?: boolean;
  /** Custom service instance */
  service?: ICompanyBrandsService;
}

/**
 * Hook return interface
 * Following Interface Segregation Principle
 */
export interface UseCompanyBrandsReturn {
  // State
  company: Company | null;
  brands: Brand[];
  loading: boolean;
  error: string | null;

  // Company operations
  createCompany: (data: CompanyCreateData) => Promise<Company | null>;
  updateCompany: (data: CompanyUpdateData) => Promise<Company | null>;
  deleteCompany: () => Promise<boolean>;

  // Brand operations
  getBrands: (filters?: BrandFilters) => Promise<Brand[]>;
  getBrandById: (id: string) => Promise<Brand | null>;
  createBrand: (data: BrandCreateData) => Promise<Brand | null>;
  updateBrand: (id: string, data: BrandUpdateData) => Promise<Brand | null>;
  deleteBrand: (id: string) => Promise<boolean>;

  // Utility operations
  refreshData: () => Promise<void>;
  loadSampleData: (config?: SampleDataConfig) => Promise<void>;
  clearAllData: () => Promise<void>;

  // Computed values
  hasData: boolean;
  totalBrands: number;
}

/**
 * Company & Brands Hook
 * Single Responsibility: Manage UI state for company and brand data
 * 
 * @param config - Hook configuration options
 * @returns Hook interface with state and operations
 */
export function useCompanyBrands(config: UseCompanyBrandsConfig = {}): UseCompanyBrandsReturn {
  const {
    autoLoad = true,
    useLocalStorage = true, // Default to localStorage for development
    service: customService
  } = config;

  const logger = Logger.getInstance('useCompanyBrands');

  // Initialize service
  const service = useMemo(() => {
    if (customService) {
      return customService;
    }
    
    if (useLocalStorage) {
      return new LocalStorageCompanyBrandsService();
    }

    // In production, this would use the API service
    // return CompanyBrandsServiceFactory.createWithDefaults();
    return new LocalStorageCompanyBrandsService();
  }, [customService, useLocalStorage]);

  // State management
  const [state, setState] = useState<CompanyBrandsState>({
    company: null,
    brands: [],
    loading: false,
    error: null
  });

  /**
   * Set loading state
   */
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  /**
   * Set error state
   */
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  /**
   * Load initial data
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.getCompanyAndBrands();
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          company: result.data!.company,
          brands: result.data!.brands,
          loading: false,
          error: null
        }));
      } else {
        setError(result.error?.message || 'Failed to load data');
        setLoading(false);
      }
    } catch (error) {
      logger.error('Error loading data', error);
      setError('Unexpected error occurred');
      setLoading(false);
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Create company
   */
  const createCompany = useCallback(async (data: CompanyCreateData): Promise<Company | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.createCompany(data);
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          company: result.data!,
          loading: false,
          error: null
        }));
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to create company');
        setLoading(false);
        return null;
      }
    } catch (error) {
      logger.error('Error creating company', error);
      setError('Unexpected error occurred');
      setLoading(false);
      return null;
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Update company
   */
  const updateCompany = useCallback(async (data: CompanyUpdateData): Promise<Company | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.updateCompany(data);
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          company: result.data!,
          loading: false,
          error: null
        }));
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to update company');
        setLoading(false);
        return null;
      }
    } catch (error) {
      logger.error('Error updating company', error);
      setError('Unexpected error occurred');
      setLoading(false);
      return null;
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Delete company
   */
  const deleteCompany = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.deleteCompany();
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          company: null,
          loading: false,
          error: null
        }));
        return true;
      } else {
        setError(result.error?.message || 'Failed to delete company');
        setLoading(false);
        return false;
      }
    } catch (error) {
      logger.error('Error deleting company', error);
      setError('Unexpected error occurred');
      setLoading(false);
      return false;
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Get brands with optional filters
   */
  const getBrands = useCallback(async (filters?: BrandFilters): Promise<Brand[]> => {
    try {
      const result = await service.getBrands(filters);
      
      if (result.success && result.data) {
        // Update state only if no filters (full list)
        if (!filters || Object.keys(filters).length === 0) {
          setState(prev => ({
            ...prev,
            brands: result.data!
          }));
        }
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to get brands');
        return [];
      }
    } catch (error) {
      logger.error('Error getting brands', error);
      setError('Unexpected error occurred');
      return [];
    }
  }, [service, setError, logger]);

  /**
   * Get brand by ID
   */
  const getBrandById = useCallback(async (id: string): Promise<Brand | null> => {
    try {
      const result = await service.getBrandById(id);
      
      if (result.success && result.data) {
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to get brand');
        return null;
      }
    } catch (error) {
      logger.error('Error getting brand by ID', error);
      setError('Unexpected error occurred');
      return null;
    }
  }, [service, setError, logger]);

  /**
   * Create brand
   */
  const createBrand = useCallback(async (data: BrandCreateData): Promise<Brand | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.createBrand(data);
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          brands: [...prev.brands, result.data!],
          loading: false,
          error: null
        }));
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to create brand');
        setLoading(false);
        return null;
      }
    } catch (error) {
      logger.error('Error creating brand', error);
      setError('Unexpected error occurred');
      setLoading(false);
      return null;
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Update brand
   */
  const updateBrand = useCallback(async (id: string, data: BrandUpdateData): Promise<Brand | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.updateBrand(id, data);
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          brands: prev.brands.map(brand => 
            brand.id === id ? result.data! : brand
          ),
          loading: false,
          error: null
        }));
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to update brand');
        setLoading(false);
        return null;
      }
    } catch (error) {
      logger.error('Error updating brand', error);
      setError('Unexpected error occurred');
      setLoading(false);
      return null;
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Delete brand
   */
  const deleteBrand = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.deleteBrand(id);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          brands: prev.brands.filter(brand => brand.id !== id),
          loading: false,
          error: null
        }));
        return true;
      } else {
        setError(result.error?.message || 'Failed to delete brand');
        setLoading(false);
        return false;
      }
    } catch (error) {
      logger.error('Error deleting brand', error);
      setError('Unexpected error occurred');
      setLoading(false);
      return false;
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Refresh all data
   */
  const refreshData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.refreshData();
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          company: result.data!.company,
          brands: result.data!.brands,
          loading: false,
          error: null
        }));
      } else {
        setError(result.error?.message || 'Failed to refresh data');
        setLoading(false);
      }
    } catch (error) {
      logger.error('Error refreshing data', error);
      setError('Unexpected error occurred');
      setLoading(false);
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Load sample data
   */
  const loadSampleData = useCallback(async (config?: SampleDataConfig): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.loadSampleData(config);
      
      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          company: result.data!.company,
          brands: result.data!.brands,
          loading: false,
          error: null
        }));
      } else {
        setError(result.error?.message || 'Failed to load sample data');
        setLoading(false);
      }
    } catch (error) {
      logger.error('Error loading sample data', error);
      setError('Unexpected error occurred');
      setLoading(false);
    }
  }, [service, setLoading, setError, logger]);

  /**
   * Clear all data
   */
  const clearAllData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const result = await service.clearAllData();
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          company: null,
          brands: [],
          loading: false,
          error: null
        }));
      } else {
        setError(result.error?.message || 'Failed to clear data');
        setLoading(false);
      }
    } catch (error) {
      logger.error('Error clearing data', error);
      setError('Unexpected error occurred');
      setLoading(false);
    }
  }, [service, setLoading, setError, logger]);

  // Computed values
  const hasData = useMemo(() => {
    return Boolean((state.company && state.company.name) || state.brands.length > 0);
  }, [state.company, state.brands]);

  const totalBrands = useMemo(() => {
    return state.brands.length;
  }, [state.brands]);

  // Auto-load data on mount
  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [autoLoad, loadData]);

  return {
    // State
    company: state.company,
    brands: state.brands,
    loading: state.loading,
    error: state.error,

    // Company operations
    createCompany,
    updateCompany,
    deleteCompany,

    // Brand operations
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,

    // Utility operations
    refreshData,
    loadSampleData,
    clearAllData,

    // Computed values
    hasData,
    totalBrands
  };
}

// Export types for backward compatibility
export type { Company, Brand } from '@/types/company-brands'; 