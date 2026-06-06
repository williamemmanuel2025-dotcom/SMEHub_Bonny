import React, { createContext, useContext, useState, useMemo } from 'react';
import { Business, Category, MOCK_BUSINESSES, CATEGORIES } from '../data/mockData';

interface AppContextType {
  businesses: Business[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  filteredBusinesses: Business[];
  featuredBusinesses: Business[];
  updateBusiness: (id: string, updated: Business) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const updateBusiness = (id: string, updated: Business) => {
    setBusinesses(prev => prev.map(b => b.id === id ? updated : b));
  };

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((bus) => {
      const matchesSearch = bus.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            bus.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            bus.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? bus.category === selectedCategory : true;
      const matchesArea = selectedArea ? bus.area === selectedArea : true;
      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [businesses, searchQuery, selectedCategory, selectedArea]);

  const featuredBusinesses = useMemo(() => {
    return businesses.filter(b => b.featured_status);
  }, [businesses]);

  return (
    <AppContext.Provider value={{
      businesses,
      categories,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedArea,
      setSelectedArea,
      filteredBusinesses,
      featuredBusinesses,
      updateBusiness
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
