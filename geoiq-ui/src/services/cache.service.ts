/**
 * Cache Service - GEOIQ Analytics Platform
 * 
 * Client-side caching service for API responses and computed data.
 * Implements time-based expiration and memory management.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

import { CacheEntry } from '@/types/dashboard';
import { Logger } from '@/lib/logger';

/**
 * Cache service interface
 * Following Interface Segregation Principle
 */
export interface ICacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, data: T, expiryMinutes?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
  size(): number;
}

/**
 * Cache Service Implementation
 * Single Responsibility: Manage client-side data caching
 */
export class CacheService implements ICacheService {
  private readonly logger = Logger.getInstance('CacheService');
  private readonly cache = new Map<string, CacheEntry<any>>();
  private readonly defaultExpiryMinutes = 5;

  /**
   * Get cached data
   * @param key - Cache key
   * @returns Cached data or null if not found/expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.logger.debug(`Cache miss for key: ${key}`);
      return null;
    }

    // Check if entry has expired
    if (entry.expiresAt < new Date()) {
      this.logger.debug(`Cache entry expired for key: ${key}`);
      this.cache.delete(key);
      return null;
    }

    this.logger.debug(`Cache hit for key: ${key}`);
    return entry.data;
  }

  /**
   * Set cached data
   * @param key - Cache key
   * @param data - Data to cache
   * @param expiryMinutes - Expiry time in minutes
   */
  set<T>(key: string, data: T, expiryMinutes?: number): void {
    const expiry = expiryMinutes || this.defaultExpiryMinutes;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiry * 60 * 1000);

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt
    };

    this.cache.set(key, entry);
    this.logger.debug(`Cached data for key: ${key}, expires: ${expiresAt.toISOString()}`);
  }

  /**
   * Delete cached data
   * @param key - Cache key
   */
  delete(key: string): void {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.logger.debug(`Deleted cache entry for key: ${key}`);
    }
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.logger.info(`Cleared cache, removed ${size} entries`);
  }

  /**
   * Check if key exists in cache
   * @param key - Cache key
   * @returns True if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Get cache size
   * @returns Number of cached entries
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = new Date();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt < now) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.logger.info(`Cleaned up ${cleaned} expired cache entries`);
    }
  }
}

/**
 * Cache Service Factory
 */
export class CacheServiceFactory {
  static create(): ICacheService {
    return new CacheService();
  }
} 