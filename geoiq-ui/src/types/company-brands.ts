/**
 * Company & Brands Types - GEOIQ Analytics Platform
 * 
 * Defines type-safe interfaces for company and brand management,
 * API responses, and data structures following SOLID principles.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

/**
 * Base entity interface
 * Following Interface Segregation Principle
 */
export interface BaseEntity {
  /** Unique identifier */
  id: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Company interface
 * Represents a company entity with core business information
 */
export interface Company extends BaseEntity {
  /** Company name */
  name: string;
  /** Company description */
  description: string;
  /** Core Key Performance Indicators */
  coreKPIs: string[];
  /** Company mission statement */
  missionStatement: string;
  /** Company logo URL (optional) */
  logoUrl?: string;
  /** Company website URL (optional) */
  websiteUrl?: string;
  /** Industry category (optional) */
  industry?: string;
}

/**
 * Brand interface
 * Represents a brand entity with marketing information
 */
export interface Brand extends BaseEntity {
  /** Brand name */
  name: string;
  /** Brand description */
  description: string;
  /** Key benefits of the brand */
  benefits: string[];
  /** Brand color (hex code) */
  color?: string;
  /** Brand logo URL (optional) */
  logoUrl?: string;
  /** Target audience (optional) */
  targetAudience?: string;
  /** Brand status */
  status: 'active' | 'inactive' | 'draft';
}

/**
 * Company creation/update data
 * Omits system-generated fields
 */
export type CompanyCreateData = Omit<Company, 'id' | 'createdAt' | 'updatedAt'>;
export type CompanyUpdateData = Partial<CompanyCreateData>;

/**
 * Brand creation/update data
 * Omits system-generated fields
 */
export type BrandCreateData = Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>;
export type BrandUpdateData = Partial<BrandCreateData>;

/**
 * Company & Brands API response interface
 * Defines expected structure from backend API
 */
export interface CompanyBrandsApiResponse {
  /** Company information */
  company: Company | null;
  /** List of brands */
  brands: Brand[];
  /** Response metadata */
  metadata: {
    /** Response timestamp */
    timestamp: Date;
    /** Total number of brands */
    totalBrands: number;
    /** API version */
    version: string;
  };
}

/**
 * Company & Brands state interface
 * Used by hooks and components for state management
 */
export interface CompanyBrandsState {
  /** Company data */
  company: Company | null;
  /** Brands array */
  brands: Brand[];
  /** Loading state */
  loading: boolean;
  /** Error message */
  error: string | null;
}

/**
 * Brand filter options
 * For filtering and searching brands
 */
export interface BrandFilters {
  /** Filter by status */
  status?: Brand['status'];
  /** Search by name */
  search?: string;
  /** Filter by color */
  color?: string;
  /** Sort by field */
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

/**
 * Company validation result
 * For form validation
 */
export interface CompanyValidationResult {
  /** Whether validation passed */
  isValid: boolean;
  /** Validation errors by field */
  errors: Partial<Record<keyof Company, string>>;
}

/**
 * Brand validation result
 * For form validation
 */
export interface BrandValidationResult {
  /** Whether validation passed */
  isValid: boolean;
  /** Validation errors by field */
  errors: Partial<Record<keyof Brand, string>>;
}

/**
 * Sample data configuration
 * For development and testing
 */
export interface SampleDataConfig {
  /** Whether to include sample company */
  includeCompany: boolean;
  /** Whether to include sample brands */
  includeBrands: boolean;
  /** Number of sample brands to generate */
  brandCount: number;
} 