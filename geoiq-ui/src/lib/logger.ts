/**
 * Logger Utility - GEOIQ Analytics Platform
 * 
 * Centralized logging service with configurable log levels,
 * structured logging, and environment-aware output.
 * 
 * @author GEOIQ Development Team
 * @version 1.0.0
 */

/**
 * Log levels enumeration
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

/**
 * Log entry interface
 */
interface LogEntry {
  timestamp: string;
  level: string;
  service: string;
  message: string;
  data?: any;
  error?: Error;
}

/**
 * Logger interface
 */
export interface ILogger {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: any): void;
}

/**
 * Logger Implementation
 * Single Responsibility: Handle application logging
 */
export class Logger implements ILogger {
  private static instances = new Map<string, Logger>();
  private static globalLogLevel = LogLevel.INFO;

  private constructor(private readonly service: string) {}

  /**
   * Get logger instance for service
   * @param service - Service name
   * @returns Logger instance
   */
  static getInstance(service: string): Logger {
    if (!this.instances.has(service)) {
      this.instances.set(service, new Logger(service));
    }
    return this.instances.get(service)!;
  }

  /**
   * Set global log level
   * @param level - Log level
   */
  static setLogLevel(level: LogLevel): void {
    this.globalLogLevel = level;
  }

  /**
   * Log debug message
   * @param message - Log message
   * @param data - Additional data
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Log info message
   * @param message - Log message
   * @param data - Additional data
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Log warning message
   * @param message - Log message
   * @param data - Additional data
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Log error message
   * @param message - Log message
   * @param error - Error object or additional data
   */
  error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, message, undefined, error);
  }

  /**
   * Internal log method
   * @param level - Log level
   * @param message - Log message
   * @param data - Additional data
   * @param error - Error object
   * @private
   */
  private log(level: LogLevel, message: string, data?: any, error?: any): void {
    // Check if should log based on global level
    if (level < Logger.globalLogLevel) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      service: this.service,
      message,
      ...(data && { data }),
      ...(error && { error })
    };

    // Output based on environment
    if (process.env.NODE_ENV === 'development') {
      this.consoleLog(entry);
    } else {
      this.structuredLog(entry);
    }
  }

  /**
   * Console logging for development
   * @param entry - Log entry
   * @private
   */
  private consoleLog(entry: LogEntry): void {
    const { timestamp, level, service, message, data, error } = entry;
    const prefix = `[${timestamp}] ${level} [${service}]`;

    switch (level) {
      case 'DEBUG':
        console.debug(prefix, message, data || '');
        break;
      case 'INFO':
        console.info(prefix, message, data || '');
        break;
      case 'WARN':
        console.warn(prefix, message, data || '');
        break;
      case 'ERROR':
        console.error(prefix, message, error || data || '');
        break;
    }
  }

  /**
   * Structured logging for production
   * @param entry - Log entry
   * @private
   */
  private structuredLog(entry: LogEntry): void {
    // In production, you might send to external logging service
    console.log(JSON.stringify(entry));
  }
}

// Initialize logger based on environment
if (typeof window !== 'undefined') {
  // Client-side initialization
  Logger.setLogLevel(
    process.env.NODE_ENV === 'development' 
      ? LogLevel.DEBUG 
      : LogLevel.WARN
  );
} 