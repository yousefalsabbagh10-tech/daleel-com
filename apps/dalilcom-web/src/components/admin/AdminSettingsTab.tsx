import React from 'react';
import { CarFront, CheckCircle2, Settings } from 'lucide-react';

export function AdminSettingsTab() {
  return (
    <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-8 text-right font-sans" dir="rtl">
      <div className="pb-4 border-b border-gray-100">
        <h3 className="font-extrabold text-sm text-slate-800">إعدادات منصة دليل كوم</h3>
        <p className="text-[11px] text-slate-500 font-medium">
          إعدادات عامة للمنصة، مع تفعيل دائم لقسم السيارات والعقارات.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-50 border border-gray-150 rounded-2xl space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A15A]/10 text-[#C9A15A] flex items-center justify-center">
                <CarFront size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">قسم السيارات</h4>
                <p className="text-[11px] text-slate-500 font-bold">
                  السيارات مفعلة دائماً وتظهر في الواجهة وإضافة الإعلان.
                </p>
              </div>
            </div>
            <span className="text-[#0D3B46] font-black text-xs">مفعل دائماً</span>
          </div>
        </div>

        <div className="p-5 bg-[#C9A15A]/10 border border-[#C9A15A]/25 rounded-2xl flex items-start gap-3">
          <CheckCircle2 size={18} className="text-[#0D3B46] shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-[#0D3B46] leading-6">
            تم إلغاء زر إخفاء السيارات من لوحة التحكم. بيانات السيارات تبقى ظاهرة وقابلة للإضافة والتصفح.
          </p>
        </div>

        <div className="p-5 bg-[#C9A15A]/10 border border-[#C9A15A]/30 rounded-2xl flex items-start gap-3 md:col-span-2">
          <Settings size={18} className="text-[#0D3B46] shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-[#0D3B46] leading-6">
            أي إعدادات أخرى للمنصة يمكن إضافتها هنا بدون التأثير على ظهور قسم السيارات.
          </p>
        </div>
      </div>
    </div>
  );
}
