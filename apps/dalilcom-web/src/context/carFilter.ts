import { AdItem } from '../types';
import { FilterCriteria, CarBrand } from './AdsContext';

export function matchCarSpecs(
  ad: AdItem,
  criteria: FilterCriteria,
  brands: CarBrand[],
  carModelsMap: Record<string, { ar: string; en: string }[]>
): boolean {
  if (criteria.brand && criteria.brand !== 'الكل') {
    if (ad.carBrand) {
      if (ad.carBrand !== criteria.brand) return false;
    } else {
      const brandAr = criteria.brand;
      const brandObj = (brands || []).find(b => b.ar === brandAr || b.en === brandAr);
      const brandEn = brandObj ? brandObj.en : brandAr;
      const brandNorm = brandAr.toLowerCase();
      const brandEnNorm = brandEn.toLowerCase();

      let isMatch = ad.title.toLowerCase().includes(brandNorm) ||
                    ad.title.toLowerCase().includes(brandEnNorm) ||
                    (ad.details || []).some(d => d.toLowerCase().includes(brandNorm)) ||
                    (ad.details || []).some(d => d.toLowerCase().includes(brandEnNorm));

      if (!isMatch) {
        const models = carModelsMap[brandEn] || [];
        for (const model of models) {
          const modelAr = model.ar.toLowerCase();
          const modelEn = model.en.toLowerCase();
          const containsModel = ad.title.toLowerCase().includes(modelAr) ||
                                ad.title.toLowerCase().includes(modelEn) ||
                                (ad.details || []).some(d => d.toLowerCase().includes(modelAr)) ||
                                (ad.details || []).some(d => d.toLowerCase().includes(modelEn));
          if (containsModel) {
            isMatch = true;
            break;
          }
        }
      }
      if (!isMatch) return false;
    }
  }

  if (criteria.carModel && criteria.carModel !== 'الكل') {
    if (ad.carModel) {
      if (ad.carModel !== criteria.carModel) return false;
    } else {
      const modelAr = criteria.carModel.toLowerCase();
      let modelEn = '';
      for (const brandKey in carModelsMap) {
        const mList = carModelsMap[brandKey] || [];
        const found = mList.find(m => m.ar.toLowerCase() === modelAr);
        if (found) {
          modelEn = found.en.toLowerCase();
          break;
        }
      }
      const hasModelMatch = ad.title.toLowerCase().includes(modelAr) || 
                            (modelEn && ad.title.toLowerCase().includes(modelEn)) ||
                            (ad.details || []).some(d => d.toLowerCase().includes(modelAr)) ||
                            (modelEn && (ad.details || []).some(d => d.toLowerCase().includes(modelEn)));
      if (!hasModelMatch) return false;
    }
  }

  if (criteria.carYear && criteria.carYear !== 'الكل') {
    if (ad.carYear) {
      if (ad.carYear !== criteria.carYear) return false;
    } else {
      if (!(ad.details || []).some(d => d === criteria.carYear)) return false;
    }
  }

  const adYearNum = ad.carYear ? parseInt(ad.carYear, 10) : (() => {
    const adYearString = (ad.details || []).find(d => /^(19|20)\d{2}$/.test(d));
    return adYearString ? parseInt(adYearString, 10) : null;
  })();

  if (criteria.minYear && criteria.minYear !== 'الكل') {
    const minYearNum = parseInt(criteria.minYear, 10);
    if (adYearNum !== null && adYearNum < minYearNum) return false;
  }
  if (criteria.maxYear && criteria.maxYear !== 'الكل') {
    const maxYearNum = parseInt(criteria.maxYear, 10);
    if (adYearNum !== null && adYearNum > maxYearNum) return false;
  }

  let adMileage: number | null = ad.carMileage !== undefined ? ad.carMileage : null;
  if (adMileage === null) {
    const mileageDetail = (ad.details || []).find(d => d.includes('كم') || d.includes('ممشى') || d.includes('مسافة'));
    if (mileageDetail) {
      const parsed = parseInt(mileageDetail.replace(/[^\d]/g, ''), 10);
      if (!isNaN(parsed)) adMileage = parsed;
    }
  }
  if (criteria.minMileage !== undefined && adMileage !== null && adMileage < criteria.minMileage) return false;
  if (criteria.maxMileage !== undefined && adMileage !== null && adMileage > criteria.maxMileage) return false;

  if (criteria.transmission && criteria.transmission !== 'الكل') {
    if (ad.carGear) {
      if (ad.carGear !== criteria.transmission) return false;
    } else {
      if (!(ad.details || []).some(d => d.includes(criteria.transmission as string))) return false;
    }
  }

  if (criteria.fuelType && criteria.fuelType !== 'الكل') {
    if (ad.carFuel) {
      if (ad.carFuel !== criteria.fuelType) return false;
    } else {
      if (!(ad.details || []).some(d => d.includes(criteria.fuelType as string))) return false;
    }
  }

  return true;
}
