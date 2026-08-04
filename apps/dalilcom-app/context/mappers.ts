import { AdItem } from './types';
import { normalizeAssetUrl } from '../services/api';

export function mapAdFromApi(row: any): AdItem {
  const ad = row.ad || row;
  const images = row.images || [];
  const specs = row.car_specs || ad.car_specs || {};
  const reSpecs = row.real_estate_specs || ad.real_estate_specs || {};
  const details = row.details || [];
  const detailTexts = details.map((d: any) => d.detail_text || d);
  const mapDetail = detailTexts.find((d: string) => String(d).startsWith('map_url:'));
  return {
    id: String(ad.id ?? ''),
    title: ad.title || '',
    price: Number(ad.price || 0),
    currency: ad.currency || 'SYP',
    location: ad.location || '',
    imageUrl: normalizeAssetUrl(ad.cover_image_url || images[0]?.image_url),
    category: ad.category || 'real-estate',
    subcategory: ad.subcategory || ad.sub_category || '',
    isFeatured: Boolean(ad.is_featured),
    date: ad.created_at || '',
    details: detailTexts.filter((d: string) => !String(d).startsWith('map_url:')),
    ownerPhone: ad.owner_phone,
    whatsappPhone: ad.whatsapp_phone,
    description: ad.description,
    mapUrl: ad.map_url || row.map_url || (mapDetail ? String(mapDetail).replace('map_url:', '') : ''),
    images: (row.images || ad.images || []).map((i: any) => normalizeAssetUrl(typeof i === 'string' ? i : i.image_url)).filter(Boolean),
    videos: (row.videos || ad.videos || []).map((v: any) => normalizeAssetUrl(typeof v === 'string' ? v : v.video_url)).filter(Boolean),
    carBrand: specs.brand_name || ad.car_brand || '',
    carModel: specs.model_name || ad.car_model || '',
    carYear: specs.model_year || ad.car_year || '',
    carGear: specs.transmission || ad.car_gear || '',
    carFuel: specs.fuel_type || ad.car_fuel || '',
    carMileage: specs.mileage ? Number(specs.mileage) : undefined,
    carBodyType: specs.body_type || ad.car_body_type || '',
    carCondition: specs.car_condition || ad.car_condition || '',
    carType: specs.car_type || ad.car_type || ad.purpose || '',
    carColor: specs.color || ad.car_color || '',
    engineSize: specs.engine_size || '',
    enginePower: specs.engine_power || '',
    carDrive: specs.drive_type || '',
    carWarranty: specs.has_warranty || '',
    carAdvertiser: specs.advertiser_type || '',
    propType: reSpecs.property_type || '',
    reRooms: reSpecs.rooms || '',
    reBaths: reSpecs.bathrooms || '',
    reArea: reSpecs.area_text || '',
    reNetArea: reSpecs.net_area || '',
    reFloor: reSpecs.floor || '',
    buildingTotalFloors: reSpecs.total_floors || '',
    reFurnished: reSpecs.furnished || '',
    reBuildingAge: reSpecs.building_age || '',
    reType: reSpecs.re_type || ad.purpose || '',
    heatingType: reSpecs.heating_type || '',
    titleDeedType: reSpecs.title_deed_type || '',
    propertyDirection: reSpecs.property_direction || '',
    hasElevator: reSpecs.has_elevator || '',
    hasParking: reSpecs.has_parking || '',
    advertiserType: reSpecs.advertiser_type || '',
  };
}
