import React from 'react';

interface StepLocationProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  neighborhood: string;
  setNeighborhood: (neighborhood: string) => void;
}

export function StepLocation({
  selectedCity,
  setSelectedCity,
  neighborhood,
  setNeighborhood
}: StepLocationProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-150 space-y-4 text-right animate-fadeIn" dir="rtl">
      <span className="text-xs font-bold text-[#1e3c5a] block">تأكيد المنطقة الجغرافية (سوريا)</span>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-650">المحافظة</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full h-11 px-3 bg-slate-50 border border-gray-200 rounded-xl outline-none text-xs font-bold text-right"
          >
            {['دمشق', 'حلب', 'اللاذقية', 'طرطوس', 'حمص', 'حماة', 'السويداء'].map(city => (
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
      </div>
    </div>
  );
}
