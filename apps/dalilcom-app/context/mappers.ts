import { AdItem } from './types';
import { normalizeAssetUrl } from '../services/api';

export function mapAdFromApi(row: any): AdItem {
  const ad = row.ad || row;
  const images = row.images || [];
  const specs = row.car_specs || ad.car_specs || {};
  const details = row.details || [];
  const detailTexts = details.map((d: any) => d.detail_text || d);
  const mapDetail = detailTexts.find((d: string) => String(d).startsWith('map_url:'));
  return {
    id: ad.id,
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
  };
}
