import React from 'react';
import { useAdsFilter } from './FilterContext';
import { AptFilters } from './AptFilters';
import { OtherPropFilters } from './OtherPropFilters';
import { 
  Home, Building2, Landmark, Briefcase, ShoppingBag, Layers, SlidersHorizontal, Building, Warehouse, Construction 
} from 'lucide-react';

export function RealEstateFilters() {
  const { filters, updateFilter } = useAdsFilter();

  const propertyTypes = [
    { value: 'الكل', ar: 'الكل', icon: Layers },
    { value: 'شقة', ar: 'شقة', icon: Home },
    { value: 'بيت عربي', ar: 'بيت عربي', icon: Warehouse },
    { value: 'فيلا', ar: 'فيلا', icon: Building2 },
    { value: 'أرض', ar: 'أرض', icon: Landmark },
    { value: 'مكتب', ar: 'مكتب', icon: Briefcase },
    { value: 'محل', ar: 'محل', icon: ShoppingBag },
    { value: 'بناء', ar: 'أبنية', icon: Building },
    { value: 'مشروع', ar: 'مشروع قيد التنفيذ', icon: Construction }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="border-b border-[#F6F2E8] pb-2">
        <h4 className="font-extrabold text-xs text-[#0D3B46] tracking-wider mb-1 flex items-center gap-1.5">
          <SlidersHorizontal size={14} className="text-[#0D3B46] animate-bounce" />
          تفاصيل العقار المخصصة فئوياً ⚡
        </h4>
        <p className="text-[11px] text-[#C9A15A] leading-tight">اختر نوع التصنيف لتفعيل بحث متقدم ملائم تماماً لطبيعة العقار</p>
      </div>
      
      {/* Real Estate Purpose Tabs */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-[#2B2B2B] block text-right">الغرض من الإعلان</label>
        <div className="flex gap-1.5 bg-[#F6F2E8] p-1 rounded-xl">
          {['الكل', 'للبيع', 'للإيجار'].map((purp) => (
            <button
              key={purp}
              onClick={() => updateFilter('rePurpose', purp)}
              type="button"
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filters.rePurpose === purp
                  ? 'bg-white text-[#0D3B46] shadow-sm font-extrabold'
                  : 'text-[#0D3B46] hover:text-[#2B2B2B]'
              }`}
            >
              {purp}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Grid Selector */}
      <div className="space-y-2">
        <label className="text-[12px] font-bold text-[#2B2B2B] block text-right">نوع العقار (اختر فئة)</label>
        <div className="grid grid-cols-3 gap-1.5">
          {propertyTypes.map((item) => {
            const IconComp = item.icon;
            const active = filters.propType === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => updateFilter('propType', item.value)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer gap-1 ${
                  active
                    ? 'bg-[#C9A15A]/10 text-[#0D3B46] border-[#C9A15A] font-extrabold shadow-sm scale-[1.02]'
                    : 'bg-white border-[#E3C98D] text-[#0D3B46] hover:border-[#E3C98D]'
                }`}
              >
                <IconComp size={16} className={active ? 'text-[#0D3B46]' : 'text-[#C9A15A]'} />
                <span className="text-[11px] font-bold">{item.ar}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional configurations based on selected design */}
      {filters.propType === 'شقة' ? <AptFilters /> : <OtherPropFilters />}

      {/* Shared Area Bounds (م²) */}
      <div className="space-y-1.5 pt-2 border-t border-dashed border-[#E3C98D]">
        <label className="text-xs font-bold text-[#0D3B46] block text-right">المساحة الإجمالية (متر مربع)</label>
        <div className="grid grid-cols-2 gap-2" dir="ltr">
          <input
            type="number"
            placeholder="أقصى م²"
            value={filters.maxArea}
            onChange={(e) => updateFilter('maxArea', e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full h-11 pl-1 pr-2 text-xs rounded-lg border border-[#E3C98D] text-center outline-none bg-[#F6F2E8] focus:bg-white focus:border-[#C9A15A] font-medium"
          />
          <input
            type="number"
            placeholder="أدنى م²"
            value={filters.minArea}
            onChange={(e) => updateFilter('minArea', e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full h-11 pl-1 pr-2 text-xs rounded-lg border border-[#E3C98D] text-center outline-none bg-[#F6F2E8] focus:bg-white focus:border-[#C9A15A] font-medium"
          />
        </div>
      </div>
    </div>
  );
}
