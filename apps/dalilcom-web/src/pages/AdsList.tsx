import React from 'react';
import { useAds, FilterCriteria } from '../context/AdsContext';
import { FilterProvider, useAdsFilter } from './ads/FilterContext';
import { HeaderNav } from './ads/HeaderNav';
import { FilterDrawer } from './ads/FilterDrawer';
import { ResultGrid } from './ads/ResultGrid';
import { applyFiltersAndSort } from './ads/filterLogic';

function AdsListContent() {
  const { getFilteredAds } = useAds();
  const { filters } = useAdsFilter();

  const criteria: FilterCriteria = {
    query: filters.query || undefined,
    category: filters.category !== 'all'
      ? (filters.category as FilterCriteria['category'])
      : undefined,
    minPrice: filters.minPrice !== '' ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice !== '' ? Number(filters.maxPrice) : undefined,
    location: filters.location !== 'الكل' ? filters.location : undefined,
    brand: filters.selectedBrand !== 'الكل' ? filters.selectedBrand : undefined,
    carModel: filters.selectedModel !== 'الكل' ? filters.selectedModel : undefined,
    minYear: filters.minYear !== 'الكل' ? filters.minYear : undefined,
    maxYear: filters.maxYear !== 'الكل' ? filters.maxYear : undefined,
    minMileage: filters.minMileage !== '' ? Number(filters.minMileage) : undefined,
    maxMileage: filters.maxMileage !== '' ? Number(filters.maxMileage) : undefined,
    transmission: filters.transmission !== 'الكل' ? filters.transmission : undefined,
    fuelType: filters.fuelType !== 'الكل' ? filters.fuelType : undefined,
    purpose: filters.category === 'cars' 
      ? (filters.carPurpose !== 'الكل' ? filters.carPurpose : undefined) 
      : (filters.rePurpose !== 'الكل' ? filters.rePurpose : undefined),
    rooms: filters.rooms !== 'الكل' ? filters.rooms : undefined,
    bathrooms: filters.bathrooms !== 'الكل' ? filters.bathrooms : undefined,
    minArea: filters.minArea !== '' ? Number(filters.minArea) : undefined,
    maxArea: filters.maxArea !== '' ? Number(filters.maxArea) : undefined,
    projectStatus: filters.projectStatus !== 'الكل' ? filters.projectStatus : undefined,
    deliveryYear: filters.deliveryYear !== 'الكل' ? filters.deliveryYear : undefined,
    projectType: filters.projectType !== 'الكل' ? filters.projectType : undefined,
    projectFinishing: filters.projectFinishing !== 'الكل' ? filters.projectFinishing : undefined,
    subCategory: filters.subCategory !== 'الكل' ? filters.subCategory : undefined,
  };

  const rawFilteredAds = getFilteredAds(criteria);
  const finalFilteredAds = applyFiltersAndSort(rawFilteredAds, filters);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F2E8] pb-20">
      <HeaderNav filteredCount={finalFilteredAds.length} />
      <FilterDrawer />
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        <ResultGrid filteredAds={finalFilteredAds} />
      </div>
    </div>
  );
}

export function AdsList() {
  return (
    <FilterProvider>
      <AdsListContent />
    </FilterProvider>
  );
}

export { AdsList as AdsListPage };
export default AdsList;
