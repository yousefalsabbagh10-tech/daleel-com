import React, { useState } from 'react';
import { Info, Compass, AlertCircle, Trash2 } from 'lucide-react';
import { AdCard } from '../../components/AdCard';
import { useAdsFilter } from './FilterContext';
import { useAds } from '../../context/AdsContext';

interface ResultGridProps {
  filteredAds: any[];
}

export function ResultGrid({ filteredAds }: ResultGridProps) {
  const { deleteAd } = useAds();
  const { resetFilters } = useAdsFilter();
  const [showTipsAlert, setShowTipsAlert] = useState(true);

  return (
    <div className="flex-1 space-y-6">
      {/* Tip notification bar if enabled */}
      {showTipsAlert && (
        <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 flex gap-3 relative animate-in slide-in-from-top duration-300" dir="rtl">
          <Info className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div className="text-right">
            <span className="font-bold text-amber-900 text-[14px] block mb-0.5">تبويب المساعدة الذكي</span>
            <p className="text-amber-800 text-[13px] leading-relaxed">
              نصيحة: يمكنك استخدام **البحث الذكي بكلمة مفتاحية** (مثل: "فلل" أو "مرسيدس") بالاقتران مع الفلاتر الجانبية (الأوتوماتيك، عدد الغرف، الغرض) لتصفية النتائج بدقة وسرعة متناهية! تحديث البيانات يحصل فورياً مع كل تبديل في المعايير.
            </p>
          </div>
          <button 
            onClick={() => setShowTipsAlert(false)}
            className="absolute top-3 left-3 text-amber-400 hover:text-amber-700 p-1 rounded transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Result top metadata bar */}
      <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm" dir="rtl">
        <div className="flex items-center gap-2">
          <Compass className="text-blue-500 animate-spin-slow" size={20} />
          <span className="text-[14px] text-gray-500 font-medium font-sans">النتائج المطابقة:</span>
          <span className="bg-[#1e3c5a]/10 text-[#1e3c5a] text-xs font-extrabold px-2.5 py-1 rounded-full leading-none">
            {filteredAds.length} إعلانات
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">آخر تحديث: للتو</span>
        </div>
      </div>

      {/* Dynamic Grid Results */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
        {filteredAds.map((ad) => (
          <div key={ad.id} className="relative group">
            {ad.id.startsWith('user-ad-') && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('هل ترغب في حذف هذا الإعلان التجريبي؟')) {
                    deleteAd(ad.id);
                  }
                }}
                title="حذف الإعلان"
                className="absolute top-3 left-3 z-30 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow shadow-red-600/30"
              >
                <Trash2 size={16} />
              </button>
            )}
            <AdCard item={ad} />
          </div>
        ))}
      </div>

      {/* Custom Empty states */}
      {filteredAds.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm" dir="rtl">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-500">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-lg font-extrabold text-gray-900 mb-2">لا توجد نتائج مطابقة تماماً للمواصفات</h3>
          <p className="text-[14px] text-gray-500 text-center max-w-md leading-relaxed mb-6 font-semibold">
            يرجى تعديل معايير الفلترة، أو تصفير السعر وتغيير الموقع من أجل العثور على تشكيلة أوسع من المنتجات.
          </p>
          <button
            onClick={resetFilters}
            className="apple-btn bg-blue-50 text-[#1e3c5a] border border-blue-200/60 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            تحديث وتصفير خيارات البحث
          </button>
        </div>
      )}
    </div>
  );
}
