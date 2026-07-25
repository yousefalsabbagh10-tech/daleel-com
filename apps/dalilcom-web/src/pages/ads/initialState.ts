import { AdsFilterState } from './types';

export function getInitialFilters(searchParams: URLSearchParams): AdsFilterState {
  const catParam = searchParams.get('category') || 'all';
  const brandParam = searchParams.get('brand') || 'الكل';
  const modelParam = searchParams.get('model') || 'الكل';
  const propParam = searchParams.get('propType') || 'الكل';
  const locParam = searchParams.get('location') || 'الكل';
  const titleP = searchParams.get('title') || '';

  const isHotelAptDetermined = 
    titleP.includes('مفروشة') || 
    titleP.includes('فندقية') || 
    titleP.includes('سياح') || 
    titleP.includes('إيجار') || 
    titleP.includes('اجار');

  return {
    category: catParam,
    query: searchParams.get('query') || '',
    subCategory: searchParams.get('subCategory') || 'الكل',
    minPrice: '',
    maxPrice: '',
    location: locParam,
    // Car Specs
    carPurpose: 'الكل',
    selectedBrand: brandParam,
    selectedModel: modelParam,
    minYear: 'الكل',
    maxYear: 'الكل',
    minMileage: '',
    maxMileage: '',
    transmission: 'الكل',
    fuelType: 'الكل',
    carBodyType: 'الكل',
    carCondition: 'الكل',
    enginePower: 'الكل',
    engineSize: 'الكل',
    carDrive: 'الكل',
    carColor: 'الكل',
    carWarranty: 'الكل',
    carAdvertiser: 'الكل',
    adDateRange: 'الكل',
    // Real Estate Specs
    rePurpose: 'الكل',
    propType: propParam,
    isHotelApt: isHotelAptDetermined,
    aptFurnished: 'الكل',
    minRentPeriod: 'الكل',
    bedsCount: 'الكل',
    hotelAmenities: [],
    minNetArea: '',
    maxNetArea: '',
    rooms: 'الكل',
    bathrooms: 'الكل',
    aptFloor: 'الكل',
    buildingTotalFloors: 'الكل',
    buildingAge: 'الكل',
    heatingType: 'الكل',
    kitchenType: 'الكل',
    balconyCount: 'الكل',
    hasElevator: 'الكل',
    hasParking: 'الكل',
    houseStatus: 'الكل',
    inComplex: 'الكل',
    titleDeedType: 'الكل',
    propertyDirection: 'الكل',
    advertiserType: 'الكل',
    onlyWithVideo: false,
    villaFloors: 'الكل',
    villaAmenities: [],
    landZoning: 'الكل',
    landFrontage: 'الكل',
    officeFitted: 'الكل',
    shopHasLicense: 'الكل',
    minArea: '',
    maxArea: '',
    deliveryYear: 'الكل',
    projectStatus: 'الكل',
    paymentPlan: 'الكل',
    projectFloors: '',
    projectType: 'الكل',
    projectFinishing: 'الكل',
    projectLandArea: '',
    projectUnitsCount: '',
    projectFacilities: [],
    projectAmenities: [],
    sortBy: 'الافتراضي'
  };
}
