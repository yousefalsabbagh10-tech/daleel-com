import React from 'react';

interface StepLocationProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  neighborhood: string;
  setNeighborhood: (neighborhood: string) => void;
  mapUrl: string;
  setMapUrl: (url: string) => void;
}

export function StepLocation({
  selectedCity,
  setSelectedCity,
  neighborhood,
  setNeighborhood,
  mapUrl,
  setMapUrl
}: StepLocationProps) {
  const governorates = ['دمشق', 'ريف دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب', 'الرقة', 'دير الزور', 'الحسكة', 'درعا', 'السويداء', 'القنيطرة'];

  const openMap = () => {
    const query = `${selectedCity} ${neighborhood}`.trim();
    const url = mapUrl.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-150 space-y-4 text-right animate-fadeIn" dir="rtl">
      <span className="text-xs font-bold text-[#0D3B46] block">تأكيد المنطقة الجغرافية (سوريا)</span>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-650">المحافظة</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full h-11 px-3 bg-slate-50 border border-gray-200 rounded-xl outline-none text-xs font-bold text-right"
          >
            {governorates.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-650">الحي أو المنطقة الفرعية *</label>
          <input 
            type="text" 
            value={neighborhood} 
            onChange={(e) => setNeighborhood(e.target.value)} 
            placeholder="مثال: مشروع دمر، الشهباء، الكورنيش..." 
            className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold outline-none text-right font-sans"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-bold text-gray-650">رابط الموقع على الخريطة (Google Maps)</label>
          <input 
            type="text" 
            value={mapUrl} 
            onChange={(e) => setMapUrl(e.target.value)} 
            placeholder="مثال: https://maps.google.com/..." 
            className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold outline-none text-left font-sans"
            dir="ltr"
          />
        </div>

        <div className="sm:col-span-2 pt-2">
          <button
            type="button"
            onClick={openMap}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#C9A15A]/10 text-[#0D3B46] hover:bg-[#C9A15A]/20 border border-[#C9A15A]/40 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            فتح الموقع على الخريطة للبحث والتأكيد
          </button>
        </div>
      </div>
    </div>
  );
}
