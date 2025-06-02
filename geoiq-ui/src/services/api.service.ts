/**
 * API Client Service - GEOIQ Analytics Platform
 * 
 * Generic HTTP client for API communication with standardized
 * error handling, request/response transformation, and authentication.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import { ServiceResult, ApiError } from '@/types/dashboard';
import { Logger } from '@/lib/logger';

/**
 * HTTP request configuration interface
 */
export interface RequestConfig {
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to include credentials */
  credentials?: boolean;
  /** Request signal for cancellation */
  signal?: AbortSignal;
}

/**
 * API client interface
 * Following Interface Segregation Principle
 */
export interface IApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<ServiceResult<T>>;
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<ServiceResult<T>>;
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<ServiceResult<T>>;
  patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ServiceResult<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<ServiceResult<T>>;
}

/**
 * API Client Implementation
 * Single Responsibility: Handle HTTP communication with backend API
 */
export class ApiClient implements IApiClient {
  private readonly logger = Logger.getInstance('ApiClient');
  private readonly defaultHeaders: Record<string, string>;
  private readonly defaultTimeout = 10000; // 10 seconds

  constructor(
    private readonly baseUrl: string,
    private readonly authToken?: string
  ) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` })
    };
  }

  /**
   * GET request
   * @param url - Request URL (relative to base URL)
   * @param config - Optional request configuration
   * @returns Promise with response data or error
   */
  async get<T>(url: string, config?: RequestConfig): Promise<ServiceResult<T>> {
    return this.makeRequest<T>('GET', url, undefined, config);
  }

  /**
   * POST request
   * @param url - Request URL (relative to base URL)
   * @param data - Request body data
   * @param config - Optional request configuration
   * @returns Promise with response data or error
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ServiceResult<T>> {
    return this.makeRequest<T>('POST', url, data, config);
  }

  /**
   * PUT request
   * @param url - Request URL (relative to base URL)
   * @param data - Request body data
   * @param config - Optional request configuration
   * @returns Promise with response data or error
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ServiceResult<T>> {
    return this.makeRequest<T>('PUT', url, data, config);
  }

  /**
   * PATCH request
   * @param url - Request URL (relative to base URL)
   * @param data - Request body data
   * @param config - Optional request configuration
   * @returns Promise with response data or error
   */
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ServiceResult<T>> {
    return this.makeRequest<T>('PATCH', url, data, config);
  }

  /**
   * DELETE request
   * @param url - Request URL (relative to base URL)
   * @param config - Optional request configuration
   * @returns Promise with response data or error
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<ServiceResult<T>> {
    return this.makeRequest<T>('DELETE', url, undefined, config);
  }

  /**
   * Make HTTP request
   * @param method - HTTP method
   * @param url - Request URL
   * @param data - Request body data
   * @param config - Request configuration
   * @returns Promise with response data or error
   * @private
   */
  private async makeRequest<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ServiceResult<T>> {
    const fullUrl = `${this.baseUrl}${url}`;
    const requestId = this.generateRequestId();

    try {
      this.logger.info(`Making ${method} request`, {
        requestId,
        url: fullUrl,
        hasData: !!data
      });

      const response = await fetch(fullUrl, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...config?.headers
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: config?.credentials ? 'include' : 'same-origin',
        signal: config?.signal,
        ...(config?.timeout && {
          signal: AbortSignal.timeout(config.timeout)
        })
      });

      // Handle response
      const result = await this.handleResponse<T>(response, requestId);
      
      this.logger.info(`Request completed`, {
        requestId,
        status: response.status,
        success: result.success
      });

      return result;

    } catch (error) {
      this.logger.error(`Request failed`, {
        requestId,
        method,
        url: fullUrl,
        error
      });

      return {
        success: false,
        error: this.createErrorFromException(error)
      };
    }
  }

  /**
   * Handle HTTP response
   * @param response - Fetch response object
   * @param requestId - Unique request identifier
   * @returns Parsed response data or error
   * @private
   */
  private async handleResponse<T>(
    response: Response,
    requestId: string
  ): Promise<ServiceResult<T>> {
    const contentType = response.headers.get('content-type') || '';
    
    try {
      // Handle different content types
      let responseData: any;
      
      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType.includes('text/')) {
        responseData = await response.text();
      } else {
        responseData = await response.blob();
      }

      // Handle HTTP error status codes
      if (!response.ok) {
        const error: ApiError = {
          code: `HTTP_${response.status}`,
          message: responseData?.message || response.statusText || 'Request failed',
          details: {
            status: response.status,
            statusText: response.statusText,
            responseData,
            requestId
          },
          timestamp: new Date()
        };

        return { success: false, error };
      }

      // Successful response
      return { success: true, data: responseData };

    } catch (parseError) {
      this.logger.error(`Failed to parse response`, {
        requestId,
        contentType,
        status: response.status,
        error: parseError
      });

      return {
        success: false,
        error: {
          code: 'RESPONSE_PARSE_ERROR',
          message: 'Failed to parse response data',
          details: {
            parseError,
            contentType,
            status: response.status,
            requestId
          },
          timestamp: new Date()
        }
      };
    }
  }

  /**
   * Create error from exception
   * @param error - Exception object
   * @returns Standardized API error
   * @private
   */
  private createErrorFromException(error: any): ApiError {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network connection failed',
        details: { originalError: error },
        timestamp: new Date()
      };
    }

    if (error.name === 'AbortError') {
      return {
        code: 'REQUEST_TIMEOUT',
        message: 'Request timed out',
        details: { originalError: error },
        timestamp: new Date()
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: { originalError: error },
      timestamp: new Date()
    };
  }

  /**
   * Generate unique request ID
   * @returns Unique request identifier
   * @private
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Update authentication token
   * @param token - New auth token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    this.logger.info('Auth token updated');
  }

  /**
   * Remove authentication token
   */
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
    this.logger.info('Auth token cleared');
  }
}

/**
 * API Client Factory
 * Following Dependency Inversion Principle
 */
export class ApiClientFactory {
  /**
   * Create API client instance
   * @param baseUrl - Base API URL
   * @param authToken - Optional authentication token
   * @returns API client instance
   */
  static create(baseUrl: string, authToken?: string): IApiClient {
    return new ApiClient(baseUrl, authToken);
  }

  /**
   * Create API client from environment
   * @returns API client configured from environment variables
   */
  static createFromEnv(): IApiClient {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
    const authToken = process.env.NEXT_PUBLIC_API_TOKEN;
    
    return new ApiClient(baseUrl, authToken);
  }
} 