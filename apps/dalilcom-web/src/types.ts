export type Category = 'real-estate' | 'cars';

export interface AdItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  category: Category;
  imageUrl: string;
  isFeatured: boolean;
  date: string;
  details: string[];
  imageUrls?: string[];
  videoUrl?: string;
  mapUrl?: string;
  ownerPhone?: string;
  whatsappPhone?: string;
  description?: string;
  // Structured classification fields for perfect filtering
  subCategory?: string;
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
  propType?: string;
  reRooms?: string;
  reBaths?: string;
  reArea?: string;
  reNetArea?: string;
  reType?: string;
  reFloor?: string;
  reFurnished?: string;
  reBuildingAge?: string;
  rooms?: number;
  bathrooms?: number;
  areaSize?: number;
  purpose?: string;
  
  // Real estate project specific fields
  projectStatus?: string;
  deliveryYear?: string;
  projectFloors?: number | '';
  projectType?: string;
  projectFinishing?: string;
  projectLandArea?: number | '';
  projectUnitsCount?: number | '';
  projectFacilities?: string[];
  projectAmenities?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
}

export interface User {
  phone: string;
  isLoggedIn: boolean;
}
