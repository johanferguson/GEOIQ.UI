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

// Mock data for development
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
    clearData,
  };
} 