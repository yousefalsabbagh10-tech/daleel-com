import { AdItem } from '../types';
import { FilterCriteria } from './AdsContext';
import { CarBrand } from './AdsContextTypes';
import { matchCarSpecs } from './carFilter';
import { matchRealEstateSpecs } from './realEstateFilter';

export function filterAds(
  ads: AdItem[],
  criteria: FilterCriteria,
  brands: CarBrand[],
  carModelsMap: Record<string, { ar: string; en: string }[]>
): AdItem[] {
  return ads.filter(ad => {
    // 1. Category check
    if (criteria.category && criteria.category !== 'all' && ad.category !== criteria.category) {
      return false;
    }

    // Subcategory check
    if (criteria.subCategory && criteria.subCategory !== 'الكل') {
      const isSubCategoryMatch = (adSub: string, filterSub: string): boolean => {
        if (adSub === filterSub) return true;
        const filterNormalized = filterSub.trim();
        const adSubNormalized = adSub.trim();

        if (adSubNormalized === 'شقق للبيع' && filterNormalized === 'شقق للبيع') return true;
        if (adSubNormalized === 'شقق للإيجار سنوي' && (filterNormalized === 'شقق للإيجار' || filterNormalized === 'شقق مفروشة فندقية للإيجار')) return true;
        if (adSubNormalized === 'أراضي للبيع' && filterNormalized === 'أراضي للبيع') return true;
        if (adSubNormalized === 'أراضي للإيجار' && filterNormalized === 'أراضي للإيجار') return true;
        if (adSubNormalized === 'فلل ومزارع نزهة' && (filterNormalized === 'فلل ومزارع للبيع' || filterNormalized === 'فلل ومزارع للإيجار')) return true;
        
        if (adSubNormalized === 'أبنية ومكاتب تجارية') {
          if (
            filterNormalized === 'محلات تجارية للبيع' ||
            filterNormalized === 'محلات تجارية للإيجار' ||
            filterNormalized === 'أبنية للبيع' ||
            filterNormalized === 'أبنية للإيجار' ||
            filterNormalized === 'بيوت عربية للبيع' ||
            filterNormalized === 'بيوت عربية للإيجار'
          ) {
            return true;
          }
        }

        if (adSubNormalized === 'مشاريع عقارية قيد التنفيذ' && 
            (filterNormalized === 'مشاريع سكنية قيد الإنشاء' || 
             filterNormalized === 'مشاريع تجارية قيد الإنشاء' ||
             filterNormalized === 'مشاريع عقارية قيد التنفيذ' ||
             filterNormalized.includes('مشاريع'))) {
          return true;
        }

        if (adSubNormalized === 'سيارات للبيع' && filterNormalized === 'سيارات للبيع') return true;
        if (adSubNormalized === 'سيارات للإيجار' && filterNormalized === 'سيارات للإيجار') return true;

        return false;
      };

      const adSub = ad.subCategory;
      if (adSub) {
        if (!isSubCategoryMatch(adSub, criteria.subCategory)) {
          return false;
        }
      } else {
        const filterNormalized = criteria.subCategory.trim();
        const title = ad.title.toLowerCase();
        const detailsStr = (ad.details || []).join(' ').toLowerCase();
        const adText = title + ' ' + detailsStr;
        
        let matched = false;
        if (filterNormalized === 'شقق للبيع') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار') || ad.currency.includes('/سنة') || ad.currency.includes('/شهر');
          const isApt = adText.includes('شقة') || adText.includes('سويت') || adText.includes('بنتهاوس') || adText.includes('apartment');
          if (isApt && !isForRent) matched = true;
        } else if (filterNormalized === 'شقق للإيجار' || filterNormalized === 'شقق مفروشة فندقية للإيجار') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار') || ad.currency.includes('/سنة') || ad.currency.includes('/شهر') || ad.currency.includes('/يوم') || ad.currency.includes('/أسبوع');
          const isApt = adText.includes('شقة') || adText.includes('سويت') || adText.includes('بنتهاوس') || adText.includes('apartment');
          if (isApt && isForRent) matched = true;
        } else if (filterNormalized === 'أراضي للبيع') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار');
          const isLand = adText.includes('أرض') || adText.includes('أراضي') || adText.includes('land');
          if (isLand && !isForRent) matched = true;
        } else if (filterNormalized === 'أراضي للإيجار') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار');
          const isLand = adText.includes('أرض') || adText.includes('أراضي') || adText.includes('land');
          if (isLand && isForRent) matched = true;
        } else if (filterNormalized === 'فلل ومزارع للبيع') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار');
          const isVilla = adText.includes('فلل') || adText.includes('فيلا') || adText.includes('مزرعة') || adText.includes('villa');
          if (isVilla && !isForRent) matched = true;
        } else if (filterNormalized === 'فلل ومزارع للإيجار') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار');
          const isVilla = adText.includes('فلل') || adText.includes('فيلا') || adText.includes('مزرعة') || adText.includes('villa');
          if (isVilla && isForRent) matched = true;
        } else if (filterNormalized === 'محلات تجارية للبيع' || filterNormalized === 'أبنية للبيع' || filterNormalized === 'بيوت عربية للبيع') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار');
          if (!isForRent) matched = true;
        } else if (filterNormalized === 'محلات تجارية للإيجار' || filterNormalized === 'أبنية للإيجار' || filterNormalized === 'بيوت عربية للإيجار') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار') || ad.currency.includes('/سنة') || ad.currency.includes('/شهر');
          if (isForRent) matched = true;
        } else if (filterNormalized === 'مشاريع سكنية قيد الإنشاء' || filterNormalized === 'مشاريع تجارية قيد الإنشاء' || filterNormalized === 'مشاريع عقارية قيد التنفيذ') {
          matched = title.includes('مشروع') || title.includes('مشاريع') || detailsStr.includes('مشروع') || detailsStr.includes('مشاريع') || detailsStr.includes('إنشاء');
        } else if (filterNormalized === 'سيارات للبيع') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار') || ad.currency.includes('/سنة') || ad.currency.includes('/شهر');
          if (!isForRent) matched = true;
        } else if (filterNormalized === 'سيارات للإيجار') {
          const isForRent = adText.includes('إيجار') || adText.includes('لإيجار') || adText.includes('للإيجار') || adText.includes('للايجار') || adText.includes('اجار') || ad.currency.includes('/سنة') || ad.currency.includes('/شهر') || ad.currency.includes('/يوم') || ad.currency.includes('/أسبوع');
          if (isForRent) matched = true;
        } else {
          matched = adText.includes(filterNormalized.toLowerCase());
        }
        if (!matched) return false;
      }
    }

    // 2. Text Search Query
    if (criteria.query && criteria.query.trim()) {
      const searchNorm = criteria.query.toLowerCase().trim();
      const matchesTitle = ad.title.toLowerCase().includes(searchNorm);
      const matchesDetails = (ad.details || []).some(d => d.toLowerCase().includes(searchNorm));
      const matchesLocation = ad.location.toLowerCase().includes(searchNorm);
      if (!matchesTitle && !matchesDetails && !matchesLocation) return false;
    }

    // 3. Price Filter
    if (criteria.minPrice !== undefined && ad.price < criteria.minPrice) return false;
    if (criteria.maxPrice !== undefined && ad.price > criteria.maxPrice) return false;

    // 4. Location Filter
    if (criteria.location && criteria.location !== 'الكل') {
      if (!ad.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false;
      }
    }

    // 5. Featured Filter
    if (criteria.isFeatured && !ad.isFeatured) return false;

    // Category-specific Advanced Filters
    if (ad.category === 'cars') {
      return matchCarSpecs(ad, criteria, brands, carModelsMap);
    } else {
      return matchRealEstateSpecs(ad, criteria);
    }
  });
}
