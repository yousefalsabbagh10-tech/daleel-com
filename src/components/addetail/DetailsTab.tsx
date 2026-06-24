import React, { useState } from 'react';
import { AdItem } from '../../types';
import { MapPin, Sparkles, Phone, MessageSquare, Video, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DetailsTabProps {
  item: AdItem;
  setActiveTab: (tab: 'details' | 'calculator' | 'offer') => void;
}

export function DetailsTab({ item, setActiveTab }: DetailsTabProps) {
  const isCar = item.category === 'cars';
  const allImages = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls : [item.imageUrl].filter(Boolean);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [viewingVideo, setViewingVideo] = useState(false);

  const formattedPrice = `${item.price.toLocaleString('en-US')} ${item.currency || 'ل.س'}`;

  const whatsappUrl = `https://wa.me/963900000000?text=${encodeURIComponent(
    `مرحباً سوريازيل 🇸🇾، أنا مهتم بالإعلان التالي المعروض على منصتكم:\n\n` +
    `• الإعلان: ${item.title}\n` +
    `• السعر المطلوب: ${formattedPrice}\n` +
    `• الموقع: ${item.location}\n\n` +
    `أود الاستفسار وتحديد موعد للمعاينة والشراء.`
  )}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Gallery / Left Column */}
      <div className="space-y-4">
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-gray-150 shadow-sm group">
          {viewingVideo && item.videoUrl ? (
            <video 
              src={item.videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full object-contain bg-black" 
            />
          ) : (
            <img 
              src={allImages[currentSlideIdx] || item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transition-colors duration-300"
            />
          )}
          
          {!viewingVideo && allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center hover:bg-white shadow transition-all cursor-pointer z-10 animate-fade-in"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center hover:bg-white shadow transition-all cursor-pointer z-10 animate-fade-in"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          {!viewingVideo && allImages.length > 0 && (
            <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full select-none z-10">
              {currentSlideIdx + 1} / {allImages.length}
            </span>
          )}
        </div>

        {/* Multimedia selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 flex-wrap flex-row-reverse justify-between">
            {item.videoUrl && (
              <button
                type="button"
                onClick={() => setViewingVideo(prev => !prev)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 flex-row-reverse",
                  viewingVideo 
                    ? "bg-rose-600 text-white border-rose-600 shadow" 
                    : "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100"
                )}
              >
                <Video size={13} />
                <span>{viewingVideo ? "عرض ألبوم الصور 🖼️" : "تشغيل مقطع الفيديو 🎥"}</span>
              </button>
            )}

            {!viewingVideo && allImages.length > 1 && (
              <span className="text-[10px] font-bold text-gray-400 select-none mr-1">تصفّح صور الألبوم:</span>
            )}
          </div>

          {!viewingVideo && allImages.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin flex-row-reverse justify-start">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIdx(idx)}
                  className={cn(
                    "w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 relative",
                    idx === currentSlideIdx ? "border-rose-500 scale-[0.98] shadow-sm" : "border-gray-200 opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover animate-fade-in" alt={`Thumbnail ${idx}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 bg-stone-50 border border-gray-200 rounded-2xl space-y-3">
          <h4 className="font-extrabold text-[#111] text-xs">نصائح سوريازيل لمعاملات آمنة:</h4>
          <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4 pr-1">
            <li>تحقق دائماً من الأوراق الثبوتية الشخصية وسند الملكية (الطابو / لوحة السيارة ورخصة القيادة).</li>
            <li>بالنسبة للعقارات، تأكد من صحة التوثيق العقاري في دائرة المصالح العقارية الرسمية.</li>
            <li>بالنسبة للسيارات، قم بمعاينة وفحص السيارة تقنياً في مركز فحص معتمد قبل أي دفعة مالية.</li>
          </ul>
        </div>
      </div>

      {/* Description & Attributes Column */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{item.title}</h3>
          <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs mt-1">
            <MapPin size={15} className="text-rose-500 shrink-0" />
            <span>{item.location}</span>
          </div>
        </div>

        <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-bold mb-1">السعر المطلوب النهائي</span>
            <span className="text-2xl font-black text-rose-600">{formattedPrice}</span>
          </div>
          {item.isFeatured && (
            <span className="bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-[11px] font-bold flex items-center gap-1">
              <Sparkles size={11} className="fill-current animate-pulse text-amber-600" />
              إعلان مميز ونشط
            </span>
          )}
        </div>

        {item.description && (
          <div className="p-5 bg-slate-50 border border-gray-150 rounded-2xl space-y-2">
            <h4 className="font-extrabold text-xs text-slate-800">وصف بائع العقار/المركبة:</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-bold whitespace-pre-line bg-white/60 p-3 rounded-xl border border-gray-100">{item.description}</p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-extrabold text-sm text-slate-800">تفاصيل ومواصفات الإدراج</h4>
          <div className="grid grid-cols-2 gap-3">
            {item.details.map((detail, index) => (
              <div key={index} className="p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2.5 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-xs font-bold text-slate-800">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-150">
          <a 
            href={whatsappUrl}
            target="_blank" 
            referrerPolicy="no-referrer"
            className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 cursor-pointer"
          >
            <Phone size={16} />
            تواصل مباشرة عبر واتساب
          </a>
          
          <button 
            onClick={() => setActiveTab('offer')}
            className="flex-1 h-12 bg-slate-900 hover:bg-slate-850 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={16} />
            مساومة ومحادثة البائع الذكي
          </button>
        </div>
      </div>
    </div>
  );
}
