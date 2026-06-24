import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles as Star, PlusCircle, MapPinned as Globe2, Coins, Calculator } from 'lucide-react';

export function HomeSidebarWidgets() {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:pt-[38px]" dir="rtl">
      
      {/* Promo Banner */}
      <div className="apple-card h-32 bg-gray-900 relative overflow-hidden group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
          alt="Promo" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-4 right-4 left-4 text-white z-10 text-right">
          <h4 className="font-bold text-lg mb-1 shadow-sm">عروض مميزة</h4>
          <p className="text-xs text-gray-200 line-clamp-1">اكتشف أحدث العقارات والسيارات</p>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/featured')}
          className="apple-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[var(--color-primary)] h-24 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Star size={18} className="fill-current text-blue-600" />
          </div>
          <span className="text-[13px] font-bold text-gray-800">الإعلانات المميزة</span>
        </button>

        <button 
          onClick={() => navigate('/create-ad')}
          className="apple-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[var(--color-primary)] h-24 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <PlusCircle size={18} className="text-blue-600" />
          </div>
          <span className="text-[13px] font-bold text-gray-800">أضف إعلانك</span>
        </button>
      </div>

      {/* Mortgage & Car Financing Calculator Widget */}
      <button 
        onClick={() => navigate('/calculators')}
        className="apple-card bg-purple-50 hover:bg-purple-100/80 border-purple-100/70 p-4 flex items-center justify-between transition-all group text-right cursor-pointer"
      >
        <div>
          <h4 className="font-extrabold text-[15px] text-purple-950 mb-1 flex items-center gap-1">
            <Coins size={15} className="text-purple-600 animate-bounce" />
            حاسبة التمويل والراتب 🪙
          </h4>
          <p className="text-[12px] text-purple-800">استعلم عن الأقساط وجدول السداد وقدرتك الشرائية</p>
        </div>
        <div className="w-12 h-12 relative flex items-center justify-center bg-purple-100 text-purple-700 rounded-xl">
          <Calculator size={26} className="group-hover:scale-110 transition-transform" />
        </div>
      </button>

      {/* Map Search Widget */}
      <button className="apple-card bg-blue-50 border-blue-100 p-4 flex items-center justify-between hover:bg-blue-100/80 transition-colors group text-right cursor-pointer">
        <div>
          <h4 className="font-bold text-[15px] text-[var(--color-primary)] mb-1">ابحث في الخريطة</h4>
          <p className="text-[12px] text-[var(--color-secondary)]">اختر الموقع مباشرة</p>
        </div>
        <div className="w-12 h-12 relative flex items-center justify-center">
          <Globe2 size={36} className="text-[var(--color-primary)] opacity-80 group-hover:scale-110 transition-transform" />
        </div>
      </button>

    </div>
  );
}
