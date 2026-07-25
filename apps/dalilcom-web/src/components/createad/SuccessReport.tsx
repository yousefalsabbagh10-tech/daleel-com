import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessReportProps {
  price: number | '';
  currency: string;
  title: string;
  selectedCity: string;
  neighborhood: string;
  onGoHome: () => void;
}

export function SuccessReport({
  price,
  currency,
  title,
  selectedCity,
  neighborhood,
  onGoHome
}: SuccessReportProps) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-xl text-center space-y-6" dir="rtl">
      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 size={36} className="animate-bounce" />
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900">مبارك! تم إشهار ونشر إعلانك بنجاح!</h2>
        <p className="text-xs text-slate-500 mt-1 font-semibold">إعلانك منشور الآن ومتاح لكافة مشتري وزوار منصة سوريازيل بالوطن والبلاد</p>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl max-w-md mx-auto text-right text-xs space-y-2 border border-gray-150">
        <div className="flex justify-between font-bold text-slate-700">
          <span className="font-mono text-[#C9A15A]">{Number(price).toLocaleString()} {currency}</span>
          <span>سعر المنتج الأصلي المعتمد:</span>
        </div>
        <div className="flex justify-between font-bold text-slate-700">
          <span className="line-clamp-1 max-w-[200px] text-ellipsis">{title}</span>
          <span className="text-slate-400">عنوان السلعة:</span>
        </div>
        <div className="flex justify-between font-bold text-slate-700">
          <span>{selectedCity}، {neighborhood}</span>
          <span className="text-slate-400">حيز التواجد الجغرافي:</span>
        </div>
      </div>

      <button 
        onClick={onGoHome}
        className="w-full max-w-xs h-11 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl transition-all cursor-pointer font-sans"
      >
        العودة لساحة العروض الرئيسية
      </button>
    </div>
  );
}
