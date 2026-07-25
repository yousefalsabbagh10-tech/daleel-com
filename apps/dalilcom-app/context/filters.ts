import { AdItem, Category } from './types';

export interface FilterParams {
  category?: Category | 'all';
  query?: string;
  brand?: string;
}

export function getFilteredAds(ads: AdItem[], { category, query, brand }: FilterParams): AdItem[] {
  let result = ads;

  if (category && category !== 'all') {
    result = result.filter(ad => ad.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(ad =>
      ad.title.toLowerCase().includes(q) ||
      ad.location.toLowerCase().includes(q)
    );
  }

  if (brand) {
    const key = brand.toLowerCase();
    result = result.filter(ad =>
      (ad.carBrand || '').toLowerCase() === key ||
      ad.title.toLowerCase().includes(key)
    );
  }

  return result;
}
