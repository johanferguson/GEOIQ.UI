import { Logger } from '@/lib/logger';

// Core interfaces
export interface VisibilityData {
  visibilityScore: number;
  totalMentions: number;
  positiveRatio: number;
  competitorData: CompetitorData[];
  radarData: RadarMetric[];
  mentionsBreakdown: MentionBreakdown[];
  promptResults: PromptResult[];
  lastScanDate: Date;
  scanId: string;
}

export interface CompetitorData {
  name: string;
  mentions: number;
  color: string;
}

export interface RadarMetric {
  category: string;
  [brandName: string]: number | string;
  market: number;
}

export interface MentionBreakdown {
  name: 'Positive' | 'Neutral' | 'Negative' | 'Mixed';
  value: number;
  color: string;
}

export interface PromptResult {
  id: string;
  prompt: string;
  mentions: number;
  score: number;
  platforms: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  llmAnswer: string;
  generatedAt: Date;
}

export interface BrandVisibilityData {
  [brandKey: string]: VisibilityData;
}

export interface ScanRequest {
  brandKey: string;
  brandName: string;
  forceRefresh?: boolean;
}

export interface ScanResponse {
  success: boolean;
  data?: VisibilityData;
  error?: string;
  scanId: string;
}

// Brand configuration for visibility scanning
export const VISIBILITY_BRANDS = {
  'geoiq': {
    name: 'TechVision Solutions',
    color: '#390099',
    description: 'Intelligent business solutions and analytics',
    industry: 'Business Intelligence',
    competitors: ['Tableau', 'Power BI', 'Looker', 'Qlik Sense'],
    icon: 'building'
  },
  'techvision': {
    name: 'TechVision AI',
    color: '#390099',
    description: 'AI-powered business solutions and automation',
    industry: 'Artificial Intelligence',
    competitors: ['OpenAI', 'Anthropic', 'Google AI', 'Microsoft AI'],
    icon: 'cpu'
  },
  'cloudflow': {
    name: 'CloudFlow Pro',
    color: '#390099',
    description: 'Cloud infrastructure and workflow optimization',
    industry: 'Cloud Computing',
    competitors: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean'],
    icon: 'cloud'
  },
  'databridge': {
    name: 'DataBridge Connect',
    color: '#390099',
    description: 'Data integration and connectivity solutions',
    industry: 'Data Integration',
    competitors: ['Zapier', 'MuleSoft', 'Informatica', 'Talend'],
    icon: 'link'
  }
} as const;

// Style guide colors for charts
const CHART_COLORS = {
  primary: '#390099',
  accent: '#FF0054',
  secondary: '#FFBD00',
  tertiary: '#FF5400',
  neutral: '#9E0059',
  positive: '#390099',
  negative: '#FF0054',
  mixed: '#FF5400'
} as const;

/**
 * Visibility Scanning Service
 * Manages brand visibility data, LLM responses, and competitive analysis
 */
export class VisibilityScanningService {
  private readonly logger = Logger.getInstance('VisibilityScanningService');
  private readonly storageKey = 'geoiq-visibility-data';
  private readonly cacheExpiryHours = 1; // Data expires after 1 hour

  /**
   * Generate realistic visibility data for a brand
   */
  private generateVisibilityData(brandKey: string, brandName: string): VisibilityData {
    const brand = VISIBILITY_BRANDS[brandKey as keyof typeof VISIBILITY_BRANDS];
    const scanId = `scan-${brandKey}-${Date.now()}`;
    
    return {
      visibilityScore: Math.floor(Math.random() * 30) + 60, // 60-90%
      totalMentions: Math.floor(Math.random() * 500) + 200,
      positiveRatio: Math.floor(Math.random() * 20) + 75, // 75-95%
      
      competitorData: [
        { name: brandName, mentions: Math.floor(Math.random() * 100) + 150, color: CHART_COLORS.primary },
        { name: 'Competitor A', mentions: Math.floor(Math.random() * 80) + 120, color: CHART_COLORS.accent },
        { name: 'Competitor B', mentions: Math.floor(Math.random() * 70) + 100, color: CHART_COLORS.secondary },
        { name: 'Competitor C', mentions: Math.floor(Math.random() * 60) + 80, color: CHART_COLORS.tertiary },
        { name: 'Competitor D', mentions: Math.floor(Math.random() * 50) + 60, color: CHART_COLORS.neutral }
      ],
      
      radarData: [
        { category: 'Features', [brandName]: Math.floor(Math.random() * 20) + 80, market: Math.floor(Math.random() * 15) + 70 },
        { category: 'Pricing', [brandName]: Math.floor(Math.random() * 20) + 75, market: Math.floor(Math.random() * 15) + 80 },
        { category: 'Usability', [brandName]: Math.floor(Math.random() * 20) + 85, market: Math.floor(Math.random() * 15) + 75 },
        { category: 'Support', [brandName]: Math.floor(Math.random() * 20) + 80, market: Math.floor(Math.random() * 15) + 70 },
        { category: 'Integration', [brandName]: Math.floor(Math.random() * 20) + 75, market: Math.floor(Math.random() * 15) + 80 },
        { category: 'Market Share', [brandName]: Math.floor(Math.random() * 20) + 70, market: Math.floor(Math.random() * 15) + 85 }
      ],
      
      mentionsBreakdown: [
        { name: 'Positive', value: Math.floor(Math.random() * 40) + 50, color: CHART_COLORS.positive },
        { name: 'Neutral', value: Math.floor(Math.random() * 30) + 25, color: CHART_COLORS.secondary },
        { name: 'Negative', value: Math.floor(Math.random() * 20) + 10, color: CHART_COLORS.negative },
        { name: 'Mixed', value: Math.floor(Math.random() * 15) + 10, color: CHART_COLORS.mixed }
      ],
      
      promptResults: this.generatePromptResults(brandName),
      lastScanDate: new Date(),
      scanId
    };
  }

  /**
   * Generate realistic prompt results with LLM answers
   */
  private generatePromptResults(brandName: string): PromptResult[] {
    const promptTemplates = [
      {
        prompt: `What are the key advantages of ${brandName} for enterprise clients?`,
        sentiment: 'positive' as const,
        platforms: ['ChatGPT', 'Claude', 'Gemini'],
        answer: `${brandName} offers several compelling advantages for enterprise clients that make it an attractive choice in today's competitive landscape:

**Scalability & Performance**: ${brandName} is designed with enterprise-grade architecture that can scale seamlessly with your organization's growth. The platform handles large data volumes efficiently and maintains consistent performance even under heavy workloads.

**Advanced Security**: Enterprise-level security is built into every aspect of ${brandName}, including end-to-end encryption, multi-factor authentication, compliance with industry standards (SOX, GDPR, HIPAA), and regular security audits.

**Integration Capabilities**: ${brandName} offers robust API connectivity and pre-built integrations with popular enterprise tools like Salesforce, Microsoft 365, SAP, and other critical business systems, ensuring smooth workflow continuity.

**Customization & Flexibility**: The platform provides extensive customization options, allowing enterprises to tailor the solution to their specific business processes and requirements without compromising core functionality.

**Dedicated Support**: Enterprise clients receive priority support with dedicated account managers, 24/7 technical assistance, and personalized onboarding and training programs.

**Cost Efficiency**: With transparent pricing models and no hidden fees, ${brandName} delivers strong ROI through improved operational efficiency and reduced total cost of ownership.`
      },
      {
        prompt: `How does ${brandName} compare to its main competitors?`,
        sentiment: 'positive' as const,
        platforms: ['ChatGPT', 'Perplexity'],
        answer: `${brandName} stands out in the competitive landscape through several key differentiators:

**Innovation Focus**: While competitors often focus on feature parity, ${brandName} leads with innovative solutions that anticipate market needs. The platform consistently introduces cutting-edge features before they become industry standards.

**User Experience**: ${brandName} prioritizes intuitive design and user-friendly interfaces, resulting in shorter learning curves and higher adoption rates compared to more complex competitors.

**Performance Benchmarks**: Independent studies show that ${brandName} outperforms major competitors in key metrics like processing speed, uptime reliability (99.9% vs industry average of 99.5%), and customer satisfaction scores.

**Pricing Advantage**: ${brandName} offers competitive pricing with transparent cost structures, often providing 20-30% better value than similar enterprise solutions without compromising on features or support quality.

**Community & Ecosystem**: The ${brandName} community is known for its active user base, comprehensive documentation, and extensive third-party integrations, creating a robust ecosystem that many competitors struggle to match.`
      },
      {
        prompt: `What pricing options are available for ${brandName}?`,
        sentiment: 'neutral' as const,
        platforms: ['Claude', 'Gemini', 'ChatGPT'],
        answer: `${brandName} offers flexible pricing options designed to accommodate businesses of all sizes:

**Starter Plan** ($49/month):
- Perfect for small teams (up to 10 users)
- Core features and basic integrations
- Email support and community access
- 5GB storage and standard reporting

**Professional Plan** ($149/month):
- Ideal for growing businesses (up to 50 users)
- Advanced features and premium integrations
- Priority support and dedicated resources
- 50GB storage and advanced analytics

**Enterprise Plan** (Custom pricing):
- Unlimited users and full feature access
- Custom integrations and white-label options
- Dedicated account manager and 24/7 support
- Unlimited storage and enterprise-grade security

**Free Trial**: 14-day free trial available for all plans with no credit card required.

All plans include regular updates, basic training resources, and access to the ${brandName} community forum.`
      },
      {
        prompt: `Can you recommend ${brandName} for small businesses?`,
        sentiment: 'positive' as const,
        platforms: ['ChatGPT', 'Claude'],
        answer: `${brandName} is an excellent choice for small businesses, offering several advantages specifically tailored to smaller organizations:

**Affordability**: The Starter Plan at $49/month provides exceptional value, giving small businesses access to enterprise-grade features without the enterprise-level costs typically associated with such solutions.

**Ease of Implementation**: ${brandName} is designed for quick setup and deployment. Most small businesses can be up and running within a few hours, not weeks or months like with more complex enterprise solutions.

**Scalability**: As your business grows, ${brandName} grows with you. The platform's modular design allows you to add features and users as needed without requiring a complete system overhaul.

**Support Quality**: Small business customers receive the same high-quality support as enterprise clients, with responsive customer service and comprehensive self-help resources.

Many small businesses report significant productivity improvements and cost savings within the first few months of implementation.`
      },
      {
        prompt: `What are the limitations of ${brandName}?`,
        sentiment: 'negative' as const,
        platforms: ['Perplexity', 'Claude'],
        answer: `While ${brandName} is a strong solution, it's important to consider some limitations:

**Learning Curve**: Despite efforts to maintain user-friendliness, new users may require 2-3 weeks to fully master all features, particularly advanced customization options.

**Integration Limitations**: While ${brandName} supports many popular integrations, some niche or legacy systems may require custom development work, which can be costly and time-consuming.

**Mobile App**: The mobile application, while functional, doesn't offer the full feature set available on desktop, which may limit productivity for mobile-heavy workflows.

**Offline Functionality**: ${brandName} requires internet connectivity for most features, with limited offline capabilities compared to some desktop-based alternatives.

**Customization Complexity**: While highly customizable, setting up complex workflows and custom fields may require technical expertise or professional services.`
      }
    ];

    return promptTemplates.map((template, index) => ({
      id: `prompt-${index + 1}`,
      prompt: template.prompt,
      mentions: Math.floor(Math.random() * 20) + 10,
      score: template.sentiment === 'positive' ? Math.floor(Math.random() * 25) + 70 : 
             template.sentiment === 'negative' ? Math.floor(Math.random() * 15) + 45 :
             Math.floor(Math.random() * 20) + 60,
      platforms: template.platforms,
      sentiment: template.sentiment,
      llmAnswer: template.answer,
      generatedAt: new Date()
    }));
  }

  /**
   * Get cached data if available and not expired
   */
  private getCachedData(): BrandVisibilityData | null {
    try {
      const cached = localStorage.getItem(this.storageKey);
      if (!cached) return null;

      const data = JSON.parse(cached);
      const now = new Date().getTime();
      const expiryTime = this.cacheExpiryHours * 60 * 60 * 1000;

      // Check if any brand data is expired
      for (const brandKey in data) {
        const brandData = data[brandKey];
        if (brandData.lastScanDate) {
          const scanTime = new Date(brandData.lastScanDate).getTime();
          if (now - scanTime > expiryTime) {
            return null; // Expire all data if any is old
          }
        }
      }

      return data;
    } catch (error) {
      this.logger.error('Error reading cached visibility data', error);
      return null;
    }
  }

  /**
   * Save data to cache
   */
  private setCacheData(data: BrandVisibilityData): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.logger.info('Visibility data cached successfully');
    } catch (error) {
      this.logger.error('Error caching visibility data', error);
    }
  }

  /**
   * Get visibility data for all brands
   */
  async getAllVisibilityData(): Promise<BrandVisibilityData> {
    try {
      // Try to get cached data first
      const cachedData = this.getCachedData();
      if (cachedData) {
        this.logger.info('Returning cached visibility data');
        return cachedData;
      }

      // Generate fresh data for all brands
      const data: BrandVisibilityData = {};
      
      for (const [brandKey, brandConfig] of Object.entries(VISIBILITY_BRANDS)) {
        data[brandKey] = this.generateVisibilityData(brandKey, brandConfig.name);
      }

      // Cache the generated data
      this.setCacheData(data);
      
      this.logger.info('Generated fresh visibility data for all brands');
      return data;
    } catch (error) {
      this.logger.error('Error getting visibility data', error);
      throw new Error('Failed to load visibility data');
    }
  }

  /**
   * Get visibility data for a specific brand
   */
  async getBrandVisibilityData(brandKey: string): Promise<VisibilityData> {
    try {
      const allData = await this.getAllVisibilityData();
      
      if (!allData[brandKey]) {
        throw new Error(`No data found for brand: ${brandKey}`);
      }

      return allData[brandKey];
    } catch (error) {
      this.logger.error(`Error getting brand visibility data for ${brandKey}`, error);
      throw error;
    }
  }

  /**
   * Perform a new scan for a specific brand
   */
  async performScan(request: ScanRequest): Promise<ScanResponse> {
    try {
      this.logger.info(`Starting visibility scan for brand: ${request.brandKey}`);

      // Simulate scan delay (in real implementation, this would call LLM APIs)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const brandConfig = VISIBILITY_BRANDS[request.brandKey as keyof typeof VISIBILITY_BRANDS];
      if (!brandConfig) {
        return {
          success: false,
          error: `Invalid brand key: ${request.brandKey}`,
          scanId: `error-${Date.now()}`
        };
      }

      // Generate new visibility data
      const newData = this.generateVisibilityData(request.brandKey, request.brandName);

      // Update cache with new data
      const allData = await this.getAllVisibilityData();
      allData[request.brandKey] = newData;
      this.setCacheData(allData);

      this.logger.info(`Visibility scan completed for brand: ${request.brandKey}`);

      return {
        success: true,
        data: newData,
        scanId: newData.scanId
      };
    } catch (error) {
      this.logger.error(`Error performing scan for brand: ${request.brandKey}`, error);
      return {
        success: false,
        error: 'Scan failed due to technical error',
        scanId: `error-${Date.now()}`
      };
    }
  }

  /**
   * Clear all cached visibility data
   */
  async clearCache(): Promise<void> {
    try {
      localStorage.removeItem(this.storageKey);
      this.logger.info('Visibility data cache cleared');
    } catch (error) {
      this.logger.error('Error clearing visibility data cache', error);
    }
  }

  /**
   * Get supported brands
   */
  getSupportedBrands(): typeof VISIBILITY_BRANDS {
    return VISIBILITY_BRANDS;
  }

  /**
   * Get chart colors for consistency
   */
  getChartColors(): typeof CHART_COLORS {
    return CHART_COLORS;
  }
}

// Export singleton instance
export const visibilityScanningService = new VisibilityScanningService(); 