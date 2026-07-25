import React from 'react';
import { X, ChevronLeft, MapPin, RefreshCw, Filter, Search } from 'lucide-react';
import { useAdsFilter } from './FilterContext';
import { CarFilters } from './CarFilters';
import { RealEstateFilters } from './RealEstateFilters';
import { SubPanels } from './SubPanels';

export function FilterDrawer() {
  const { 
    filters, updateFilter, resetFilters,
    activeSubPanel, setActiveSubPanel,
    isFilterPanelOpen, setIsFilterPanelOpen,
    isAdvancedFiltersOpen, setIsAdvancedFiltersOpen
  } = useAdsFilter();

  if (!isFilterPanelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
      {/* Background backdrop */}
      <div 
        className="absolute inset-0 bg-[#2B2B2B]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsFilterPanelOpen(false)}
      />

      <div className="absolute inset-y-0 left-0 right-0 md:left-auto md:right-0 w-full md:max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Sliding Panel Header */}
        <div className="p-4 bg-[#0D3B46] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {activeSubPanel ? (
              <button 
                onClick={() => setActiveSubPanel(null)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} className="scale-x-[-1]" />
              </button>
            ) : (
              <button 
                onClick={() => setIsFilterPanelOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            )}
            <span className="font-extrabold text-[15px] font-sans">
              {activeSubPanel ? 'تصفية فرعية' : 'فلاتر تصفية متقدمة ذكية'}
            </span>
          </div>

          {!activeSubPanel && (
            <button 
              onClick={resetFilters}
              className="text-xs font-bold text-[#C9A15A] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={13} />
              إعادة تهيئة
            </button>
          )}
        </div>

        {/* Sliding Panel Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#F6F2E8]/50">
          {activeSubPanel ? (
            <SubPanels />
          ) : (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Category Select Toggles */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#2B2B2B] block">التصنيف الرئيسي للبحث</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F6F2E8] rounded-xl">
                  {[
                    { id: 'all', title: 'الكل' },
                    { id: 'real-estate', title: 'عقارات', color: 'text-[#0D3B46]' },
                    { id: 'cars', title: 'سيارات', color: 'text-[#C9A15A]' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.id)}
                      className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        filters.category === cat.id 
                          ? `bg-white ${cat.color || 'text-[#2B2B2B]'} shadow-sm font-extrabold` 
                          : 'text-[#C9A15A] hover:text-[#2B2B2B]'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Search Input */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#2B2B2B] block">البحث بكلمة دلالية</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={filters.query}
                    onChange={(e) => updateFilter('query', e.target.value)}
                    placeholder="مثال: شقة دوبلكس، النترا..."
                    className="w-full h-11 pr-10 pl-4 text-xs bg-white rounded-xl border border-[#E3C98D] outline-none focus:border-[#0D3B46] focus:ring-1 focus:ring-[#0D3B46]/20 transition-all text-right font-medium"
                  />
                  <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C9A15A]" />
                </div>
              </div>

              {/* Min/Max Price Bounds */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#2B2B2B] block">نطاق السعر المقبول (ل.س)</label>
                <div className="grid grid-cols-2 gap-2" dir="ltr">
                  <input 
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full h-11 pl-2 text-xs rounded-xl border border-[#E3C98D] text-center outline-none bg-white focus:border-[#0D3B46] font-semibold"
                    placeholder="أقصى"
                  />
                  <input 
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full h-11 pl-2 text-xs rounded-xl border border-[#E3C98D] text-center outline-none bg-white focus:border-[#0D3B46] font-semibold"
                    placeholder="أدنى"
                  />
                </div>
              </div>

              {/* Location Select trigger */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#2B2B2B] block">المنطقة والموقع</label>
                <button
                  type="button"
                  onClick={() => setActiveSubPanel('location')}
                  className="w-full h-11 px-3 py-2 flex items-center justify-between text-right text-[14px] bg-white text-[#2B2B2B] rounded-xl border border-[#E3C98D] shadow-sm hover:border-[#0D3B46]/50 transition-all cursor-pointer font-semibold"
                >
                  <span className="truncate">{filters.location || 'الكل / جميع المدن الإدارية'}</span>
                  <MapPin size={16} className="text-[#0D3B46]" />
                </button>
              </div>

              {/* Condition/Cat panels */}
              {filters.category === 'cars' && <CarFilters />}
              {filters.category === 'real-estate' && <RealEstateFilters />}
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="p-4 bg-white border-t border-[#F6F2E8] flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setIsFilterPanelOpen(false)}
            className="flex-1 py-3 bg-[#0D3B46] hover:bg-opacity-95 text-white rounded-xl text-center font-bold text-xs shadow-md cursor-pointer"
          >
            تحديث وتطبيق التصفية
          </button>
          <button 
            onClick={() => setIsFilterPanelOpen(false)}
            className="px-5 py-3 border border-[#E3C98D] hover:bg-[#F6F2E8] text-[#0D3B46] rounded-xl text-center font-bold text-xs cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
