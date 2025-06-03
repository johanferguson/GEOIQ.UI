export interface Prompt {
  id: string;
  text: string;
  createdAt: Date;
  brand: string;
}

export interface BrandConfig {
  name: string;
  color: string;
  bgColor: string;
  description: string;
  icon: string;
}

export const BRANDS: Record<string, BrandConfig> = {
  'geoiq': {
    name: 'TechVision Solutions',
    color: '#390099',
    bgColor: '#39009920',
    description: 'Intelligent business solutions and analytics',
    icon: 'building'
  },
  'techvision': {
    name: 'TechVision AI',
    color: '#2563eb',
    bgColor: '#2563eb20',
    description: 'AI-powered business solutions and automation',
    icon: 'cpu'
  },
  'cloudflow': {
    name: 'CloudFlow Pro',
    color: '#059669',
    bgColor: '#05966920',
    description: 'Cloud infrastructure and workflow optimization',
    icon: 'cloud'
  },
  'databridge': {
    name: 'DataBridge Connect',
    color: '#dc2626',
    bgColor: '#dc262620',
    description: 'Data integration and connectivity solutions',
    icon: 'link'
  }
};

const BRAND_PROMPT_TEMPLATES: Record<string, string[]> = {
  'geoiq': [
    "What is TechVision Solutions and what services do they provide?",
    "Tell me about TechVision Solutions' main features and capabilities.",
    "How does TechVision Solutions compare to other business intelligence platforms?",
    "What are the pricing options for TechVision Solutions?",
    "Can you explain TechVision Solutions' analytics and intelligence solutions?",
    "What industries does TechVision Solutions serve?",
    "How do I get started with TechVision Solutions?",
    "What are the key benefits of using TechVision Solutions?",
    "Does TechVision Solutions offer customer support and training?",
    "What integrations are available with TechVision Solutions?",
    "How secure is TechVision Solutions for business data?",
    "Can TechVision Solutions help with business intelligence and analytics?",
    "What data visualization capabilities does TechVision Solutions have?",
    "How does TechVision Solutions handle data privacy and compliance?",
    "What are TechVision Solutions' most popular use cases?",
    "Is TechVision Solutions suitable for small and medium businesses?",
    "How does TechVision Solutions' technology platform work?",
    "What kind of ROI can businesses expect from TechVision Solutions?",
    "Does TechVision Solutions offer API access for developers?",
    "How does TechVision Solutions help with strategic decision-making?",
    "What are the system requirements for TechVision Solutions?",
    "Can TechVision Solutions integrate with existing business systems?",
    "What makes TechVision Solutions different from competitors?",
    "How reliable is TechVision Solutions' uptime and performance?",
    "What training resources does TechVision Solutions provide?",
    "How does TechVision Solutions handle large-scale enterprise deployments?",
    "What are customers saying about TechVision Solutions?",
    "Does TechVision Solutions offer free trials or demos?",
    "How does TechVision Solutions ensure data accuracy and quality?",
    "What is TechVision Solutions' roadmap for future features?",
    "Can TechVision Solutions help optimize business operations?",
    "How does TechVision Solutions support remote work and collaboration?",
    "What are the limitations of TechVision Solutions?",
    "How does TechVision Solutions handle multi-language and international support?",
    "What certifications and compliance standards does TechVision Solutions meet?",
    "How does TechVision Solutions help improve business performance?",
    "Can TechVision Solutions be customized for specific industry needs?",
    "What is the learning curve for TechVision Solutions?",
    "How does TechVision Solutions protect against data breaches and security threats?",
    "What partnerships and integrations does TechVision Solutions have?",
    "How does TechVision Solutions measure customer success and satisfaction?",
    "Can TechVision Solutions help with predictive analytics and forecasting?",
    "What are TechVision Solutions' enterprise and premium features?",
    "How does TechVision Solutions handle data migration and onboarding?",
    "What support options are available for TechVision Solutions users?",
    "How does TechVision Solutions ensure ethical data practices?",
    "What deployment options does TechVision Solutions offer?",
    "How does TechVision Solutions help with business intelligence reporting?",
    "What are TechVision Solutions' key competitive advantages?",
    "How does TechVision Solutions support business growth and digital transformation?"
  ],
  'techvision': [
    "What is TechVision AI and what services do they provide?",
    "Tell me about TechVision AI's main features and capabilities.",
    "How does TechVision AI compare to other AI automation platforms?",
    "What are the pricing options for TechVision AI?",
    "Can you explain TechVision AI's business automation solutions?",
    "What industries does TechVision AI serve?",
    "How do I get started with TechVision AI?",
    "What are the key benefits of using TechVision AI?",
    "Does TechVision AI offer customer support and training?",
    "What integrations are available with TechVision AI?",
    "How secure is TechVision AI for business data?",
    "Can TechVision AI help with customer service automation?",
    "What machine learning capabilities does TechVision AI have?",
    "How does TechVision AI handle data privacy and compliance?",
    "What are TechVision AI's most popular use cases?",
    "Is TechVision AI suitable for small businesses?",
    "How does TechVision AI's AI technology work?",
    "What kind of ROI can businesses expect from TechVision AI?",
    "Does TechVision AI offer API access for developers?",
    "How does TechVision AI help with predictive analytics?",
    "What are the system requirements for TechVision AI?",
    "Can TechVision AI integrate with existing business software?",
    "What makes TechVision AI different from competitors?",
    "How reliable is TechVision AI's uptime and performance?",
    "What training resources does TechVision AI provide?",
    "How does TechVision AI handle large-scale deployments?",
    "What are customers saying about TechVision AI?",
    "Does TechVision AI offer free trials or demos?",
    "How does TechVision AI ensure data accuracy?",
    "What is TechVision AI's roadmap for future features?",
    "Can TechVision AI help automate marketing processes?",
    "How does TechVision AI support remote work environments?",
    "What are the limitations of TechVision AI?",
    "How does TechVision AI handle multi-language support?",
    "What certifications does TechVision AI have?",
    "How does TechVision AI help with decision-making?",
    "Can TechVision AI be customized for specific industries?",
    "What is the learning curve for TechVision AI?",
    "How does TechVision AI protect against AI bias?",
    "What partnerships does TechVision AI have?",
    "How does TechVision AI measure success and performance?",
    "Can TechVision AI help with employee productivity?",
    "What are TechVision AI's enterprise features?",
    "How does TechVision AI handle data migration?",
    "What support options are available for TechVision AI users?",
    "How does TechVision AI ensure ethical AI practices?",
    "What are the deployment options for TechVision AI?",
    "How does TechVision AI help with business intelligence?",
    "What are TechVision AI's key differentiators in the market?",
    "How does TechVision AI support business growth and scaling?"
  ],
  'cloudflow': [
    "What is CloudFlow Pro and what cloud services do they offer?",
    "Tell me about CloudFlow Pro's main features and benefits.",
    "How does CloudFlow Pro compare to other cloud infrastructure providers?",
    "What are the pricing plans available for CloudFlow Pro?",
    "Can you explain CloudFlow Pro's workflow optimization capabilities?",
    "What types of businesses use CloudFlow Pro?",
    "How do I migrate my infrastructure to CloudFlow Pro?",
    "What are the key advantages of choosing CloudFlow Pro?",
    "Does CloudFlow Pro provide 24/7 technical support?",
    "What integrations are supported by CloudFlow Pro?",
    "How secure is CloudFlow Pro's cloud infrastructure?",
    "Can CloudFlow Pro help with remote team collaboration?",
    "What scalability options does CloudFlow Pro provide?",
    "How does CloudFlow Pro ensure data backup and recovery?",
    "What are CloudFlow Pro's most popular services?",
    "Is CloudFlow Pro suitable for startups and small companies?",
    "How does CloudFlow Pro's cloud technology work?",
    "What cost savings can businesses expect with CloudFlow Pro?",
    "Does CloudFlow Pro offer API access and developer tools?",
    "How does CloudFlow Pro help with workflow automation?",
    "What are the performance benchmarks for CloudFlow Pro?",
    "Can CloudFlow Pro integrate with legacy systems?",
    "What makes CloudFlow Pro unique in the cloud market?",
    "How reliable is CloudFlow Pro's service uptime?",
    "What training and onboarding does CloudFlow Pro provide?",
    "How does CloudFlow Pro handle enterprise-level deployments?",
    "What do customers say about CloudFlow Pro's service?",
    "Does CloudFlow Pro offer free trials or pilot programs?",
    "How does CloudFlow Pro ensure optimal performance?",
    "What is CloudFlow Pro's vision for cloud innovation?",
    "Can CloudFlow Pro help streamline business processes?",
    "How does CloudFlow Pro support hybrid cloud environments?",
    "What are the potential drawbacks of CloudFlow Pro?",
    "How does CloudFlow Pro handle compliance requirements?",
    "What industry certifications does CloudFlow Pro maintain?",
    "How does CloudFlow Pro facilitate better collaboration?",
    "Can CloudFlow Pro be tailored for specific business needs?",
    "What is the implementation timeline for CloudFlow Pro?",
    "How does CloudFlow Pro address security concerns?",
    "What strategic partnerships does CloudFlow Pro have?",
    "How does CloudFlow Pro measure client satisfaction?",
    "Can CloudFlow Pro improve operational efficiency?",
    "What enterprise governance features does CloudFlow Pro offer?",
    "How does CloudFlow Pro assist with cloud migration?",
    "What customer success resources does CloudFlow Pro provide?",
    "How does CloudFlow Pro stay ahead of cloud trends?",
    "What deployment models does CloudFlow Pro support?",
    "How does CloudFlow Pro enhance business agility?",
    "What are CloudFlow Pro's competitive advantages?",
    "How does CloudFlow Pro support digital transformation initiatives?"
  ],
  'databridge': [
    "What is DataBridge Connect and what data services do they provide?",
    "Tell me about DataBridge Connect's core features and capabilities.",
    "How does DataBridge Connect compare to other data integration platforms?",
    "What are the subscription options for DataBridge Connect?",
    "Can you explain DataBridge Connect's data connectivity solutions?",
    "What industries benefit most from DataBridge Connect?",
    "How do I implement DataBridge Connect in my organization?",
    "What are the main benefits of using DataBridge Connect?",
    "Does DataBridge Connect offer comprehensive customer support?",
    "What third-party systems can integrate with DataBridge Connect?",
    "How secure is data handling with DataBridge Connect?",
    "Can DataBridge Connect help with real-time data processing?",
    "What data volume capabilities does DataBridge Connect have?",
    "How does DataBridge Connect ensure data quality and integrity?",
    "What are DataBridge Connect's most requested features?",
    "Is DataBridge Connect appropriate for small to medium businesses?",
    "How does DataBridge Connect's integration technology function?",
    "What efficiency gains can organizations achieve with DataBridge Connect?",
    "Does DataBridge Connect provide APIs for custom development?",
    "How does DataBridge Connect facilitate data analytics?",
    "What are the technical specifications of DataBridge Connect?",
    "Can DataBridge Connect work with existing data infrastructure?",
    "What sets DataBridge Connect apart from its competitors?",
    "How dependable is DataBridge Connect's system availability?",
    "What educational resources does DataBridge Connect offer?",
    "How does DataBridge Connect scale for large organizations?",
    "What feedback do users give about DataBridge Connect?",
    "Does DataBridge Connect provide trial periods or demonstrations?",
    "How does DataBridge Connect maintain data accuracy?",
    "What future developments is DataBridge Connect planning?",
    "Can DataBridge Connect optimize data workflows?",
    "How does DataBridge Connect support multi-cloud environments?",
    "What challenges might users face with DataBridge Connect?",
    "How does DataBridge Connect address regulatory compliance?",
    "What professional certifications does DataBridge Connect hold?",
    "How does DataBridge Connect improve decision-making processes?",
    "Can DataBridge Connect be configured for specific use cases?",
    "What is the typical setup time for DataBridge Connect?",
    "How does DataBridge Connect handle data privacy concerns?",
    "What business alliances does DataBridge Connect maintain?",
    "How does DataBridge Connect track user engagement and success?",
    "Can DataBridge Connect enhance organizational productivity?",
    "What governance tools does DataBridge Connect provide?",
    "How does DataBridge Connect support data transformation?",
    "What implementation support does DataBridge Connect offer?",
    "How does DataBridge Connect adapt to emerging technologies?",
    "What hosting options are available for DataBridge Connect?",
    "How does DataBridge Connect drive business value?",
    "What are DataBridge Connect's key market differentiators?",
    "How does DataBridge Connect enable data-driven innovation?"
  ]
};

class PromptsService {
  private storageKey = 'geoiq-brand-prompts';

  generateRandomPrompts(brand: string, count: number = 20): Prompt[] {
    const templates = BRAND_PROMPT_TEMPLATES[brand] || BRAND_PROMPT_TEMPLATES['techvision'];
    const shuffled = [...templates].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    return selected.map((text, index) => ({
      id: `${brand}-${Date.now()}-${index}`,
      text,
      createdAt: new Date(),
      brand
    }));
  }

  getPrompts(brand: string): Prompt[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const allPrompts = JSON.parse(stored);
        const brandPrompts = allPrompts[brand];
        if (brandPrompts && brandPrompts.length > 0) {
          return brandPrompts.map((p: any) => ({
            ...p,
            createdAt: new Date(p.createdAt)
          }));
        }
      }
    } catch (error) {
      console.error('Error loading prompts from storage:', error);
    }
    
    // Generate and save new prompts if none exist
    return this.generateAndSaveNewPrompts(brand);
  }

  generateAndSaveNewPrompts(brand: string): Prompt[] {
    const newPrompts = this.generateRandomPrompts(brand);
    this.savePrompts(brand, newPrompts);
    return newPrompts;
  }

  private savePrompts(brand: string, prompts: Prompt[]): void {
    try {
      let allPrompts = {};
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        allPrompts = JSON.parse(stored);
      }
      
      allPrompts[brand] = prompts;
      localStorage.setItem(this.storageKey, JSON.stringify(allPrompts));
    } catch (error) {
      console.error('Error saving prompts to storage:', error);
    }
  }

  async copyPrompt(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy prompt:', error);
      return false;
    }
  }
}

export const promptService = new PromptsService(); 