export type Category = 'real-estate' | 'cars';

export interface AdItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  imageUrl: string;
  category: Category;
  subcategory?: string;
  isFeatured: boolean;
  date: string;
  details: string[];
  ownerPhone?: string;
  whatsappPhone?: string;
  description?: string;
  mapUrl?: string;
  images?: string[];
  videos?: string[];
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  carGear?: string;
  carFuel?: string;
  carMileage?: number;
  carBodyType?: string;
  carCondition?: string;
  carType?: string;
  carColor?: string;
}

export interface AppState {
  ads: AdItem[];
  favorites: string[];
  loading: boolean;
  error: string | null;
}
