import axios from 'axios';

const API_BASE_URL = 'https://backend.paradisepeaktravels.com/api/v1';

export interface Package {
  _id: string;
  title: string;
  category: string;  
  type: string;      
  status: string;   
  price: number;
  currency: string;  
  duration: string;
  maxPeople?: number;
  difficulty?: string;
  description?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  location?: string;
  mainImage?: string;
  images?: Array<{
    url: string;
    alt: string;
  }>;
  slug: string;
  pricePerText?: string;
  createdAt: string;
  updatedAt: string;
}

export const packageService = {
  
  getPackages: async (params?: {
    category?: string;
    type?: string;
    status?: string;
    featured?: boolean;
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }): Promise<Package[]> => {
    try {
      console.log('Making API request to:', `${API_BASE_URL}/packages`, 'with params:', params);
      const response = await axios.get(`${API_BASE_URL}/packages`, { params });
      console.log('API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error.response?.data || error.message;
    }
  },

  
  getPackageBySlug: async (slug: string): Promise<Package> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/packages/${slug}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getFeaturedPackages: async (): Promise<Package[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/packages?featured=true&status=Active`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getPackagesByCategory: async (category: string): Promise<Package[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/packages?category=${category}&status=Active`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getPackagesByType: async (category: string, type: string): Promise<Package[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/packages?category=${category}&type=${type}&status=Active`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};

export default packageService;