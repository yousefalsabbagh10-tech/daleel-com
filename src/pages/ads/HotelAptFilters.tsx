import React from 'react';
import { useAdsFilter } from './FilterContext';
import { SearchableSelect } from '../../components/SearchableSelect';

export function HotelAptFilters() {
  const { filters, updateFilter } = useAdsFilter();

  const hotelAmenitiesList = [
    'إنترنت / واي فاي مجاني',
    'تكييف مركزي حار/بارد',
    'شاشة ذكية / نيتفليكس',
    'غسالة ملابس مجففة',
    'براد / مع غلاية وميكروويف',
    'خدمة تنظيف الغرف',
    'خزنة أمان شخصية',
    'مسبح للمجمع',
    'صالة رياضية / جيم',
    'رسبشن وموظف استقبال'
  ];

  return (
    <div className="space-y-4 pt-1">
      <span className="text-[10px] font-bold text-indigo-750 bg-indigo-100 px-2.5 py-0.5 rounded-full block w-fit">فلاتر الشقق المفروشة والفندقية السياحية 🛋️</span>
      
      {/* Rent Period */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-700 block text-right">📅 أقل مدة إيجار مقبولة</label>
        <div className="grid grid-cols-5 gap-1" dir="rtl">
          {[
            { value: 'الكل', label: 'الكل' },
            { value: 'يوم', label: 'يومي' },
            { value: 'أسبوع', label: 'أسبوعي' },
            { value: 'شهر', label: 'شهري' },
            { value: 'سنة', label: 'سنوي' }
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateFilter('minRentPeriod', opt.value)}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                filters.minRentPeriod === opt.value
                  ? 'bg-purple-600 text-white font-black shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bed count */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-700 block text-right">🛏️ عدد الأسرة المتوفرة بالشقة</label>
        <div className="grid grid-cols-3 gap-1" dir="rtl">
          {['الكل', '1 سرير', '2 سرير', '3 أسرة', '4 أسرة فأكثر'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateFilter('bedsCount', opt)}
              className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filters.bedsCount === opt
                  ? 'bg-purple-600 text-white font-black shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 block text-right">✨ وسائل الراحة والخدمات المتوفرة بالشقة</label>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-1.5 bg-white/50 rounded-lg border border-purple-100">
          {hotelAmenitiesList.map((amenity) => {
            const isSelected = filters.hotelAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    updateFilter('hotelAmenities', filters.hotelAmenities.filter(a => a !== amenity));
                  } else {
                    updateFilter('hotelAmenities', [...filters.hotelAmenities, amenity]);
                  }
                }}
                className={`p-1.5 text-[10px] text-right font-semibold rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-100 border-purple-500 text-purple-950 font-extrabold shadow-sm'
                    : 'bg-white border-gray-150 text-gray-650 hover:border-gray-300'
                }`}
              >
                <span>{amenity}</span>
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 mr-1 text-[8px] ${isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300'}`}>
                  {isSelected && '✓'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
