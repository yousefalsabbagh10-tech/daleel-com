import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { useAdsFilter, POPULAR_LOCATIONS } from './FilterContext';
import { useAds } from '../../context/AdsContext';

export function SubPanels() {
  const { filters, updateFilter, activeSubPanel, setActiveSubPanel } = useAdsFilter();
  const { brands, carModelsMap } = useAds();
  const [locQuery, setLocQuery] = useState('');

  // 1. Sort By
  if (activeSubPanel === 'sortBy') {
    const sortOptions = [
      { id: 'الافتراضي', label: 'الترتيب الافتراضي' },
      { id: 'السعر من الأقل للأعلى', label: 'السعر: من الأقل إلى الأعلى' },
      { id: 'السعر من الأعلى للأقل', label: 'السعر: من الأعلى إلى الأقل' },
      { id: 'الأحدث أولاً', label: 'تاريخ الإعلان: الأحدث أولاً' }
    ];
    return (
      <div className="space-y-2">
        {sortOptions.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => { updateFilter('sortBy', opt.id); setActiveSubPanel(null); }}
            className="flex items-center justify-between p-3.5 border border-gray-150 rounded-xl hover:border-[#1e3c5a] cursor-pointer"
          >
            <span className={`text-[14px] font-bold ${filters.sortBy === opt.id ? 'text-[#1e3c5a]' : 'text-gray-750'}`}>{opt.label}</span>
            {filters.sortBy === opt.id && <Check size={18} className="text-[#1e3c5a]" />}
          </div>
        ))}
      </div>
    );
  }

  // 2. Location
  if (activeSubPanel === 'location') {
    const filteredLocations = POPULAR_LOCATIONS.filter(l => l.includes(locQuery));
    return (
      <div className="space-y-2">
        <div className="px-2 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن مدينة..."
              className="w-full h-11 pr-10 pl-4 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-[#1e3c5a] focus:bg-white text-right font-medium"
              onChange={(e) => setLocQuery(e.target.value)}
              value={locQuery}
            />
            <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-2 py-1">
          {filteredLocations.map((loc) => (
            <div 
              key={loc}
              onClick={() => { updateFilter('location', loc); setActiveSubPanel(null); }}
              className="flex items-center justify-between p-3.5 border border-gray-150 rounded-xl hover:border-[#1e3c5a] cursor-pointer"
            >
              <span className={`text-[14px] font-bold ${filters.location === loc ? 'text-[#1e3c5a]' : 'text-gray-750'}`}>{loc}</span>
              {filters.location === loc && <Check size={18} className="text-[#1e3c5a]" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Brand & Model for Cars
  if (activeSubPanel === 'brandModel') {
    const selectedBrandEn = filters.selectedBrand !== 'الكل'
      ? (brands.find(b => b.ar === filters.selectedBrand || b.en === filters.selectedBrand)?.en || filters.selectedBrand)
      : '';
    const activeModels = selectedBrandEn ? carModelsMap[selectedBrandEn] || [] : [];

    return (
      <div className="space-y-4">
        {/* Brand */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">الماركة (الشركة المصنعة)</label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border rounded-xl">
            {[{ ar: 'الكل' }, ...brands].map((b) => (
              <button
                key={b.ar}
                onClick={() => {
                  updateFilter('selectedBrand', b.ar);
                  updateFilter('selectedModel', 'الكل');
                }}
                className={`py-2 text-right px-2 rounded-lg text-xs font-semibold ${filters.selectedBrand === b.ar ? 'bg-[#1e3c5a]/10 text-[#1e3c5a]' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                {b.ar}
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        {filters.selectedBrand !== 'الكل' && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">الموديل (الطراز)</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border rounded-xl">
              {[{ ar: 'الكل' }, ...activeModels].map((m) => (
                <button
                  key={m.ar}
                  onClick={() => {
                    updateFilter('selectedModel', m.ar);
                    setActiveSubPanel(null);
                  }}
                  className={`py-2 text-right px-2 rounded-lg text-xs font-semibold ${filters.selectedModel === m.ar ? 'bg-[#1e3c5a]/10 text-[#1e3c5a]' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  {m.ar}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
