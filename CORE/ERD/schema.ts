export interface User {
  id: string;
  phone: string;
  createdAt: Date;
}

export interface Ad {
  id: string;
  userId: string;
  type: 'real-estate' | 'cars';
  title: string;
  price: number;
  currency: string;
  location: string;
  isFeatured: boolean;
  images: string[];
  details: Record<string, string>;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
}
