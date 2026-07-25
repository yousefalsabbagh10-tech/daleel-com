import React from 'react';
import { useAdsFilter } from './FilterContext';
import { HotelAptFilters } from './HotelAptFilters';
import { SearchableSelect } from '../../components/SearchableSelect';

export function AptFilters() {
  const { filters, updateFilter } = useAdsFilter();

  return (
    <div className="p-4 bg-purple-50/40 rounded-xl space-y-4 border border-purple-100/65 animate-in slide-in-from-top-2 duration-300">
      {/* Toggle Apt Type */}
      <div className="flex bg-white/80 p-1 rounded-xl border border-purple-100/60 gap-1 shadow-xs">
        <button
          type="button"
          onClick={() => updateFilter('isHotelApt', false)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
            !filters.isHotelApt 
              ? 'bg-purple-600 text-white shadow-sm font-extrabold' 
              : 'text-gray-550 hover:bg-purple-50/50'
          }`}
        >
          🏢 شقة سكنية عادية
        </button>
        <button
          type="button"
          onClick={() => {
            updateFilter('isHotelApt', true);
            updateFilter('aptFurnished', 'مفروش');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
            filters.isHotelApt 
              ? 'bg-purple-600 text-white shadow-sm font-extrabold' 
              : 'text-gray-550 hover:bg-purple-50/50'
          }`}
        >
          🛋️ شقق مفروشة فندقية للإيجار
        </button>
      </div>

      {!filters.isHotelApt ? (
        <>
          <span className="text-[10px] font-bold text-purple-750 bg-purple-100 px-2.5 py-0.5 rounded-full block w-fit">تفاصيل وتصنيفات الشقة المتقدمة 🏢</span>
          
          {/* Rooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block text-right">🛌 عدد غرف النوم</label>
            <div className="grid grid-cols-5 gap-1">
              {['الكل', '1 غرف', '2 غرف', '3 غرف', '4 غرف'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateFilter('rooms', opt)}
                  type="button"
                  className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filters.rooms === opt 
                      ? 'bg-purple-600 text-white font-black shadow-sm' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {opt === 'الكل' ? 'الكل' : opt.replace(/[^0-9]/g, '')}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block text-right">🚿 عدد الحمامات</label>
            <div className="grid grid-cols-4 gap-1">
              {['الكل', '1 حمام', '2 حمام', '3 حمامات'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateFilter('bathrooms', opt)}
                  type="button"
                  className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filters.bathrooms === opt 
                      ? 'bg-purple-600 text-white font-black shadow-sm' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {opt === 'الكل' ? 'الكل' : opt.replace(/[^0-9]/g, '') + '+'}
                </button>
              ))}
            </div>
          </div>

          {/* Floor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">🏢 الطابق / الدور</label>
            <SearchableSelect
              value={filters.aptFloor}
              onChange={(val) => updateFilter('aptFloor', val)}
              options={[
                { value: 'الكل', label: 'الكل / أي طابق' },
                { value: 'أرضي', label: 'طابق أرضي (Ground Floor)' },
                { value: '1', label: 'الطابق الأول' },
                { value: '2', label: 'الطابق الثاني' },
                { value: '3', label: 'الطابق الثالث' },
                { value: '4', label: 'الطابق الرابع' },
                { value: '5', label: 'الطابق الخامس' },
                { value: '6', label: 'الطابق السادس' },
                { value: '7', label: 'الطابق السابع' },
                { value: '8+', label: 'الطابق الثامن فأكثر' },
                { value: 'أخير', label: 'طابق أخير ورووف' },
                { value: 'قبو', label: 'قبو / تسوية' }
              ]}
            />
          </div>

          {/* Title Deed Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">📜 طابو العقار وملكيته (الطابو)</label>
            <SearchableSelect
              value={filters.titleDeedType}
              onChange={(val) => updateFilter('titleDeedType', val)}
              options={[
                { value: 'الكل', label: 'كل أنواع صكوك الملكية' },
                { value: 'طابو أخضر ملكية تامة', label: 'طابو أخضر ملكية تامة (شخصي)' },
                { value: 'سجل عقاري / أسهم', label: 'سجل عقاري / أسهم نظامية' },
                { value: 'حكم محكمة / كاتب عدل', label: 'حكم محكمة / كاتب عدل موثق' },
                { value: 'زراعي', label: 'طابو زراعي مشترك' },
                { value: 'فراغ إسكاني', label: 'فراغ إسكاني بالمؤسسة' }
              ]}
            />
          </div>

          {/* Furnishing */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">🛋️ فرش وتأثيث العقار</label>
            <div className="flex gap-1 bg-white p-1 rounded-lg border border-gray-200">
              {['الكل', 'مفروش', 'غير مفروش'].map((fur) => (
                <button
                  key={fur}
                  onClick={() => updateFilter('aptFurnished', fur)}
                  type="button"
                  className={`flex-1 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                    filters.aptFurnished === fur
                      ? 'bg-purple-100 text-purple-900 font-extrabold'
                      : 'text-gray-550 hover:text-gray-850'
                  }`}
                >
                  {fur}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <HotelAptFilters />
      )}
    </div>
  );
}
