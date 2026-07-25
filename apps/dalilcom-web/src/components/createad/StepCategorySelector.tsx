import React from 'react';
import { Building2, Car } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAds } from '../../context/AdsContext';
import { useAppSettings } from '../../hooks/useAppSettings';

interface StepCategorySelectorProps {
  category: 'cars' | 'real-estate';
  setCategory: (cat: 'cars' | 'real-estate') => void;
  subCategory: string;
  setSubCategory: (sub: string) => void;
}

const fallbackCats = [
  { id: 'apartments', ar: 'الشقق السكنية' },
  { id: 'lands', ar: 'الأراضي' },
  { id: 'shops', ar: 'المحلات التجارية' },
  { id: 'villas', ar: 'الفلل والمزارع' },
  { id: 'buildings', ar: 'الأبنية' },
  { id: 'arabic', ar: 'البيوت العربية' },
  { id: 'projects', ar: 'مشاريع عقارية قيد التنفيذ' },
];

const valueForCat = (id: string, label: string) => {
  if (id === 'apartments') return 'شقق للبيع والإيجار';
  if (id === 'lands') return 'أراضي للبيع';
  if (id === 'shops') return 'المحلات التجارية';
  if (id === 'villas') return 'فلل ومزارع نزهة';
  if (id === 'buildings') return 'الأبنية';
  if (id === 'arabic') return 'البيوت العربية';
  if (id === 'projects') return 'مشاريع عقارية قيد التنفيذ';
  return label;
};

export function StepCategorySelector({
  category,
  setCategory,
  subCategory,
  setSubCategory,
}: StepCategorySelectorProps) {
  const { settings } = useAppSettings();
  const { realEstateCats } = useAds();
  const realEstateOptions = realEstateCats.length ? realEstateCats : fallbackCats;
  const carOptions = [
    'سيارات سياحية للبيع',
    'سيارات سياحية للإيجار',
    'شاحنات نقل وآليات ثقيلة',
    'دراجات نارية وهوايات',
  ];

  return (
    <div className="space-y-5 text-right" dir="rtl">
      <div>
        <h2 className="text-base sm:text-md font-extrabold text-[#1e3c5a]">اختر نوع وتصنيف الإعلان</h2>
        <p className="text-xs text-gray-500 mt-1">ضع الإعلان ضمن فئته الدقيقة ليظهر في الفلتر الصحيح.</p>
      </div>

      <div className={cn('grid gap-4', settings.carsEnabled ? 'grid-cols-2' : 'grid-cols-1')}>
        <button
          type="button"
          onClick={() => { setCategory('real-estate'); setSubCategory(''); }}
          className={cn('p-5 border rounded-2xl flex flex-col items-center gap-3 bg-white cursor-pointer', category === 'real-estate' && 'border-indigo-600 bg-indigo-50/20 shadow-md')}
        >
          <Building2 size={28} className="text-indigo-600" />
          <span className="text-xs font-black text-gray-800">قسم العقارات والمباني</span>
        </button>
        {settings.carsEnabled && (
          <button
            type="button"
            onClick={() => { setCategory('cars'); setSubCategory(''); }}
            className={cn('p-5 border rounded-2xl flex flex-col items-center gap-3 bg-white cursor-pointer', category === 'cars' && 'border-rose-500 bg-rose-50/20 shadow-md')}
          >
            <Car size={28} className="text-rose-500" />
            <span className="text-xs font-black text-gray-800">قسم المركبات والسيارات</span>
          </button>
        )}
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-150 space-y-3">
        <label className="text-xs font-bold text-slate-700">القسم الفرعي المحدد للإعلان:</label>
        <div className="flex flex-wrap gap-2 justify-end">
          {category === 'real-estate'
            ? realEstateOptions.map((cat) => {
                const value = valueForCat(cat.id, cat.ar);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSubCategory(value)}
                    className={cn('px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer', subCategory === value ? 'bg-[#1e3c5a] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100')}
                  >
                    {cat.ar}
                  </button>
                );
              })
            : settings.carsEnabled && carOptions.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSubCategory(sub)}
                  className={cn('px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer', subCategory === sub ? 'bg-[#1e3c5a] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100')}
                >
                  {sub}
                </button>
              ))}
        </div>
      </div>
    </div>
  );
}
