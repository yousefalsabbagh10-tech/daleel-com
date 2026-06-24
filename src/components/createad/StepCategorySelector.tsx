import React from 'react';
import { Building2, Car } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppSettings } from '../../hooks/useAppSettings';

interface StepCategorySelectorProps {
  category: 'cars' | 'real-estate';
  setCategory: (cat: 'cars' | 'real-estate') => void;
  subCategory: string;
  setSubCategory: (sub: string) => void;
}

export function StepCategorySelector({
  category,
  setCategory,
  subCategory,
  setSubCategory
}: StepCategorySelectorProps) {
  const { settings } = useAppSettings();

  return (
    <div className="space-y-5 text-right" dir="rtl">
      <div>
        <h2 className="text-base sm:text-md font-extrabold text-[#1e3c5a]">اختر نوع وتصنيف الإعلان</h2>
        <p className="text-xs text-gray-500 mt-1">علو كفاءة سوريازيل تبدأ بوضع السلعة في قسمها الدقيق</p>
      </div>

      <div className={cn("grid gap-4", settings.carsEnabled ? "grid-cols-2" : "grid-cols-1")}>
        <button
          type="button"
          onClick={() => { setCategory('real-estate'); setSubCategory(''); }}
          className={cn(
            "p-5 border rounded-2xl flex flex-col items-center gap-3 bg-white cursor-pointer", 
            category === 'real-estate' && "border-indigo-600 bg-indigo-50/20 shadow-md"
          )}
        >
          <Building2 size={28} className="text-indigo-600" />
          <span className="text-xs font-black text-gray-800">قسم العقارات والمباني</span>
        </button>
        {settings.carsEnabled && <button
          type="button"
          onClick={() => { setCategory('cars'); setSubCategory(''); }}
          className={cn(
            "p-5 border rounded-2xl flex flex-col items-center gap-3 bg-white cursor-pointer", 
            category === 'cars' && "border-rose-500 bg-rose-50/20 shadow-md"
          )}
        >
          <Car size={28} className="text-rose-500" />
          <span className="text-xs font-black text-gray-800">قسم المركبات والسيارات</span>
        </button>}
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-150 space-y-3">
        <label className="text-xs font-bold text-slate-700">القسم الفرعي المحدد للمنتج:</label>
        <div className="flex flex-wrap gap-2">
          {category === 'real-estate' ? (
            ['شقق للبيع والإيجار', 'فلل ومزارع نزهة', 'أراضي للبيع', 'مشاريع عقارية قيد التنفيذ'].map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSubCategory(sub)}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer", 
                  subCategory === sub ? "bg-[#1e3c5a] text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                )}
              >
                {sub}
              </button>
            ))
          ) : settings.carsEnabled ? (
            ['سيارات سياحية للبيع', 'سيارات سياحية للإيجار', 'شاحنات نقل وآليات ثقيلة', 'دراجات نارية وهوايات'].map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSubCategory(sub)}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer", 
                  subCategory === sub ? "bg-[#1e3c5a] text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                )}
              >
                {sub}
              </button>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}
