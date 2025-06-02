// Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OAuthProvider {
  name: 'google' | 'microsoft' | 'facebook';
  icon: string;
  color: string;
}

// Company & Brand Types
export interface Company {
  id: string;
  name: string;
  description: string;
  kpiDescription: string;
  brands: Brand[];
  visibilityScore: number;
  lastScanDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  competitors: string[];
  visibilityScore: number;
}

export interface Competitor {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

// Prompt Types
export interface Prompt {
  id: string;
  text: string;
  category: 'general' | 'pricing' | 'features' | 'comparison';
  brandMentions: number;
  competitorMentions: number;
  visibilityScore: number;
  createdAt: Date;
}

export interface PromptResponse {
  id: string;
  promptId: string;
  llmProvider: 'chatgpt' | 'claude' | 'gemini';
  response: string;
  brandMentions: string[];
  competitorMentions: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: Date;
}

// Scan & Analytics Types
export interface ScanResult {
  id: string;
  companyId: string;
  totalPrompts: number;
  brandMentions: number;
  competitorMentions: number;
  visibilityScore: number;
  insights: ScanInsight[];
  createdAt: Date;
}

export interface ScanInsight {
  id: string;
  type: 'opportunity' | 'threat' | 'neutral';
  message: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface VisibilityMetrics {
  score: number;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  breakdown: {
    prompts: number;
    mentions: number;
    sentiment: number;
  };
}

// Content Management Types
export interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'linkedin' | 'seo';
  status: 'draft' | 'submitted' | 'approved' | 'published';
  body: string;
  sourcePrompt?: string;
  tags: string[];
  authorId: string;
  reviewerId?: string;
  feedback?: string;
  scheduledDate?: Date;
  publishedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentFilter {
  status?: ContentItem['status'];
  type?: ContentItem['type'];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Recommendation Types
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'blog' | 'linkedin' | 'seo';
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  expectedImpact: 'low' | 'medium' | 'high';
  sourcePrompts: string[];
  keywords: string[];
  createdAt: Date;
}

// Schedule Types
export interface ScheduledPost {
  id: string;
  contentId: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'blog';
  scheduledDate: Date;
  status: 'scheduled' | 'published' | 'failed';
  publishedDate?: Date;
  error?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'content' | 'scan' | 'review';
  date: Date;
  status: string;
  description?: string;
}

// Settings Types
export interface UserSettings {
  id: string;
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    scanResults: boolean;
    contentApproval: boolean;
    weeklyReports: boolean;
  };
  integrations: {
    google: boolean;
    microsoft: boolean;
    facebook: boolean;
    linkedin: boolean;
  };
  preferences: {
    timezone: string;
    language: string;
    theme: 'light' | 'dark' | 'system';
  };
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  features: {
    maxBrands: number;
    maxPrompts: number;
    advancedAnalytics: boolean;
    prioritySupport: boolean;
    customIntegrations: boolean;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI Component Types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  current: boolean;
  badge?: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => string | undefined;
  };
}

export interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
} 