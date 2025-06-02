import { useState, useEffect } from 'react';

export interface Company {
  id: string;
  name: string;
  description: string;
  coreKPIs: string[];
  missionStatement: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyBrandsState {
  company: Company | null;
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

// Sample data for testing and demonstration
const sampleCompany: Company = {
  id: '1',
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

const sampleBrands: Brand[] = [
  {
    id: '1',
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
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date(),
  },
  {
    id: '2', 
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
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
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
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  }
];

// Mock data for development (empty by default)
const mockCompany: Company = {
  id: '1',
  name: '',
  description: '',
  coreKPIs: [],
  missionStatement: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockBrands: Brand[] = [];

export function useCompanyBrands() {
  const [state, setState] = useState<CompanyBrandsState>({
    company: null,
    brands: [],
    loading: true,
    error: null,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedCompany = localStorage.getItem('geoiq_company');
      const savedBrands = localStorage.getItem('geoiq_brands');

      setState({
        company: savedCompany ? JSON.parse(savedCompany) : mockCompany,
        brands: savedBrands ? JSON.parse(savedBrands) : mockBrands,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load company data',
      }));
    }
  }, []);

  // Load sample data for demonstration
  const loadSampleData = () => {
    try {
      // Save sample data to localStorage
      localStorage.setItem('geoiq_company', JSON.stringify(sampleCompany));
      localStorage.setItem('geoiq_brands', JSON.stringify(sampleBrands));

      setState({
        company: sampleCompany,
        brands: sampleBrands,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load sample data',
      }));
    }
  };

  // Save company data
  const updateCompany = async (companyData: Partial<Company>) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const updatedCompany = {
        ...state.company,
        ...companyData,
        updatedAt: new Date(),
      } as Company;

      // Save to localStorage
      localStorage.setItem('geoiq_company', JSON.stringify(updatedCompany));

      setState(prev => ({
        ...prev,
        company: updatedCompany,
        loading: false,
        error: null,
      }));

      return updatedCompany;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to update company',
      }));
      throw error;
    }
  };

  // Add new brand
  const addBrand = async (brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const newBrand: Brand = {
        ...brandData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedBrands = [...state.brands, newBrand];

      // Save to localStorage
      localStorage.setItem('geoiq_brands', JSON.stringify(updatedBrands));

      setState(prev => ({
        ...prev,
        brands: updatedBrands,
        loading: false,
        error: null,
      }));

      return newBrand;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to add brand',
      }));
      throw error;
    }
  };

  // Update existing brand
  const updateBrand = async (brandId: string, brandData: Partial<Brand>) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const updatedBrands = state.brands.map(brand =>
        brand.id === brandId
          ? { ...brand, ...brandData, updatedAt: new Date() }
          : brand
      );

      // Save to localStorage
      localStorage.setItem('geoiq_brands', JSON.stringify(updatedBrands));

      setState(prev => ({
        ...prev,
        brands: updatedBrands,
        loading: false,
        error: null,
      }));

      return updatedBrands.find(brand => brand.id === brandId);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to update brand',
      }));
      throw error;
    }
  };

  // Delete brand
  const deleteBrand = async (brandId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const updatedBrands = state.brands.filter(brand => brand.id !== brandId);

      // Save to localStorage
      localStorage.setItem('geoiq_brands', JSON.stringify(updatedBrands));

      setState(prev => ({
        ...prev,
        brands: updatedBrands,
        loading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to delete brand',
      }));
      throw error;
    }
  };

  // Get brand by ID
  const getBrandById = (brandId: string) => {
    return state.brands.find(brand => brand.id === brandId);
  };

  // Clear all data
  const clearData = () => {
    localStorage.removeItem('geoiq_company');
    localStorage.removeItem('geoiq_brands');
    setState({
      company: mockCompany,
      brands: mockBrands,
      loading: false,
      error: null,
    });
  };

  return {
    company: state.company,
    brands: state.brands,
    loading: state.loading,
    error: state.error,
    updateCompany,
    addBrand,
    updateBrand,
    deleteBrand,
    getBrandById,
    loadSampleData,
    clearData,
  };
} 