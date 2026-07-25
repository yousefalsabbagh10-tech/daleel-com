import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdsFilterState } from './types';
import { getInitialFilters } from './initialState';

interface FilterContextType {
  filters: AdsFilterState;
  updateFilter: <K extends keyof AdsFilterState>(key: K, value: AdsFilterState[K]) => void;
  updateFilters: (updated: Partial<AdsFilterState>) => void;
  resetFilters: () => void;
  activeSubPanel: string | null;
  setActiveSubPanel: (panel: string | null) => void;
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
  isAdvancedFiltersOpen: boolean;
  setIsAdvancedFiltersOpen: (isOpen: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const POPULAR_LOCATIONS = [
  'الكل',
  'دمشق',
  'حلب',
  'حمص',
  'حماة',
  'اللاذقية',
  'طرطوس',
  'السويداء',
  'درعا',
  'القنيطرة',
  'دير الزور',
  'الحسكة',
  'الرقة',
  'إدلب'
];

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<AdsFilterState>(() => getInitialFilters(searchParams));
  const [activeSubPanel, setActiveSubPanel] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters(getInitialFilters(searchParams));
    setActiveSubPanel(null);
  }, [searchParams]);

  // Sync isFilterPanelOpen with query parameters initially
  useEffect(() => {
    const catSearch = searchParams.get('category');
    const propParam = searchParams.get('propType');
    const brandParam = searchParams.get('brand');
    const titleP = searchParams.get('title') || '';
    if (catSearch === 'cars' || catSearch === 'real-estate' || propParam || brandParam) {
      setIsFilterPanelOpen(true);
    } else {
      const lower = titleP.toLowerCase();
      if (
        lower.includes('سيار') || lower.includes('مركبات') ||
        lower.includes('شقة') || lower.includes('شقق') ||
        lower.includes('عقار') || lower.includes('فيلا') ||
        lower.includes('فلل') || lower.includes('أرض') ||
        lower.includes('أراضي') || lower.includes('محل') ||
        lower.includes('محلات') || lower.includes('مكتب')
      ) {
        setIsFilterPanelOpen(true);
      }
    }
  }, [searchParams]);

  const updateFilter = <K extends keyof AdsFilterState>(key: K, value: AdsFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateFilters = (updated: Partial<AdsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const resetFilters = () => {
    setFilters(getInitialFilters(new URLSearchParams()));
    setActiveSubPanel(null);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        updateFilters,
        resetFilters,
        activeSubPanel,
        setActiveSubPanel,
        isFilterPanelOpen,
        setIsFilterPanelOpen,
        isAdvancedFiltersOpen,
        setIsAdvancedFiltersOpen
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useAdsFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useAdsFilter must be used within a FilterProvider');
  }
  return context;
}
