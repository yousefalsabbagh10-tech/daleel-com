export const steps = ['القسم', 'التفاصيل', 'الموقع', 'الوسائط', 'السعر'];

export const subcategories = {
  'real-estate': [
    'شقق للبيع والإيجار',
    'أراضي للبيع',
    'فلل ومزارع نزهة',
    'المحلات التجارية',
    'الأبنية',
    'البيوت العربية',
    'مشاريع عقارية قيد التنفيذ',
  ],
  cars: ['سيارات للبيع', 'سيارات للإيجار', 'شاحنات ومركبات', 'دراجات نارية'],
};

export const presetImages = {
  'real-estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900',
  cars: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900',
};

export const initialForm = {
  category: 'real-estate',
  subcategory: 'شقق للبيع والإيجار',
  title: '',
  description: '',
  city: 'دمشق',
  neighborhood: '',
  mapUrl: '',
  imageUrl: presetImages['real-estate'],
  images: [presetImages['real-estate']],
  videoUrl: '',
  videos: [] as string[],
  price: '',
  currency: 'ل.س',
  rooms: '3 غرف',
  baths: '2 حمام',
  area: '150 متر مربع',
  floor: 'الطابق الأول',
  furnished: 'غير مفروش',
  age: 'جديد / صفر',
  reType: 'للبيع',
  projectStatus: 'تحت الأرض / حفر وتأسيس',
  deliveryYear: '2026',
  projectFloors: '',
  projectFinishing: 'على العضم',
  projectLandArea: '',
  projectUnitsCount: '',
  carBrand: '',
  carModel: '',
  carYear: '2024',
  carGear: 'أوتوماتيك',
  carFuel: 'بنزين',
  carMileage: '',
  carBodyType: 'سيدان',
  carCondition: 'مستعمل نظيف',
  carColor: '',
  carType: 'للبيع',
  ownerPhone: '',
  whatsappPhone: '',
};

export type CreateAdForm = typeof initialForm;
