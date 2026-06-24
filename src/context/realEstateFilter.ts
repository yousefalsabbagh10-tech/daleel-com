import { AdItem } from '../types';
import { FilterCriteria } from './AdsContext';

export function matchRealEstateSpecs(
  ad: AdItem,
  criteria: FilterCriteria
): boolean {
  if (criteria.rooms && criteria.rooms !== 'الكل') {
    const rVal = parseInt(criteria.rooms, 10);
    const adRooms = ad.rooms !== undefined ? ad.rooms : (() => {
      const d = (ad.details || []).find(v => v.includes('غرف'));
      return d ? parseInt(d.replace(/[^\d]/g, ''), 10) : null;
    })();
    if (adRooms !== null && adRooms !== rVal) return false;
  }

  if (criteria.bathrooms && criteria.bathrooms !== 'الكل') {
    const bVal = parseInt(criteria.bathrooms, 10);
    const adBaths = ad.bathrooms !== undefined ? ad.bathrooms : (() => {
      const d = (ad.details || []).find(v => v.includes('حمام'));
      return d ? parseInt(d.replace(/[^\d]/g, ''), 10) : null;
    })();
    if (adBaths !== null && adBaths !== bVal) return false;
  }

  let adArea: number | null = ad.areaSize !== undefined ? ad.areaSize : null;
  if (adArea === null) {
    const areaDetail = (ad.details || []).find(d => d.includes('متر') || d.includes('م²') || d.includes('Sq.Ft'));
    if (areaDetail) {
      const parsed = parseInt(areaDetail.replace(/[^\d]/g, ''), 10);
      if (!isNaN(parsed)) adArea = parsed;
    }
  }
  if (criteria.minArea !== undefined && adArea !== null && adArea < criteria.minArea) return false;
  if (criteria.maxArea !== undefined && adArea !== null && adArea > criteria.maxArea) return false;

  if (criteria.purpose && criteria.purpose !== 'الكل') {
    const purposesMap: Record<string, string> = {
      'للإيجار': 'للإيجار',
      'للبيع': 'للبيع',
      'Rent': 'للإيجار',
      'Sale': 'للبيع'
    };
    const mappedFilter = purposesMap[criteria.purpose] || criteria.purpose;
    const currentPurpose = ad.purpose || ((ad.details || []).some(d => d.includes('إيجار') || d.includes('للايجار')) ? 'للإيجار' : 'للبيع');
    if (currentPurpose !== mappedFilter) return false;
  }

  if (criteria.projectStatus && criteria.projectStatus !== 'الكل' && ad.projectStatus !== criteria.projectStatus) return false;
  if (criteria.deliveryYear && criteria.deliveryYear !== 'الكل' && ad.deliveryYear !== criteria.deliveryYear) return false;
  if (criteria.projectType && criteria.projectType !== 'الكل' && ad.projectType !== criteria.projectType) return false;
  if (criteria.projectFinishing && criteria.projectFinishing !== 'الكل' && ad.projectFinishing !== criteria.projectFinishing) return false;

  return true;
}
