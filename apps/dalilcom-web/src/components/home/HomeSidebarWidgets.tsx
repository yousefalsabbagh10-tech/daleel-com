import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinned, PlusCircle, Sparkles } from 'lucide-react';

export function HomeSidebarWidgets() {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:pt-[38px]" dir="rtl">
      <div className="apple-card h-32 bg-gray-900 relative overflow-hidden group cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
          alt="عروض مميزة"
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-4 right-4 left-4 text-white z-10 text-right">
          <h4 className="font-bold text-lg mb-1 shadow-sm">عروض مميزة</h4>
          <p className="text-xs text-gray-200 line-clamp-1">اكتشف أحدث العقارات</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/featured')}
          className="apple-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[var(--color-primary)] h-24 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#C9A15A]/10 flex items-center justify-center">
            <Sparkles size={18} className="fill-current text-[#0D3B46]" />
          </div>
          <span className="text-[13px] font-bold text-gray-800">الإعلانات المميزة</span>
        </button>

        <button
          onClick={() => navigate('/create-ad')}
          className="apple-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[var(--color-primary)] h-24 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#C9A15A]/10 flex items-center justify-center">
            <PlusCircle size={18} className="text-[#0D3B46]" />
          </div>
          <span className="text-[13px] font-bold text-gray-800">أضف إعلانك</span>
        </button>
      </div>

      <button
        onClick={() => navigate('/map')}
        className="apple-card bg-[#C9A15A]/10 border-[#C9A15A]/30 p-4 flex items-center justify-between hover:bg-[#C9A15A]/20 transition-colors group text-right cursor-pointer"
      >
        <div>
          <h4 className="font-bold text-[15px] text-[var(--color-primary)] mb-1">ابحث في الخريطة</h4>
          <p className="text-[12px] text-[var(--color-secondary)]">اختر الموقع مباشرة</p>
        </div>
        <div className="w-12 h-12 relative flex items-center justify-center">
          <MapPinned size={36} className="text-[var(--color-primary)] opacity-80 group-hover:scale-110 transition-transform" />
        </div>
      </button>
    </div>
  );
}
