import React from 'react';
import { CarFront, CheckCircle2 } from 'lucide-react';
import { useAppSettings } from '../../hooks/useAppSettings';

export function AdminSettingsTab() {
  const { settings, updateCarsEnabled } = useAppSettings();

  const toggleCars = async () => {
    await updateCarsEnabled(!settings.carsEnabled);
    window.location.reload();
  };

  return (
    <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-8 text-right font-sans" dir="rtl">
      <div className="pb-4 border-b border-gray-100">
        <h3 className="font-extrabold text-sm text-slate-800">إعدادات منصة سوريازيل</h3>
        <p className="text-[11px] text-slate-500 font-medium">التحكم بالأقسام الظاهرة للمستخدمين.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-50 border border-gray-150 rounded-2xl space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <CarFront size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">عرض قسم السيارات</h4>
                <p className="text-[11px] text-slate-500 font-bold">يتحكم بظهور المركبات في الواجهة وإضافة الإعلان.</p>
              </div>
            </div>
            <span className={settings.carsEnabled ? 'text-emerald-600 font-black text-xs' : 'text-rose-600 font-black text-xs'}>
              {settings.carsEnabled ? 'مفعل' : 'مخفي'}
            </span>
          </div>

          <button type="button" onClick={toggleCars} className="w-full h-14 rounded-2xl bg-white border border-gray-200 px-4 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all">
            <span className="text-xs font-black text-slate-700">
              {settings.carsEnabled ? 'السيارات ظاهرة للمستخدمين' : 'السيارات مخفية عن المستخدمين'}
            </span>
            <span className={`w-14 h-8 rounded-full p-1 flex transition-all ${settings.carsEnabled ? 'bg-emerald-500 justify-start' : 'bg-slate-300 justify-end'}`}>
              <span className="w-6 h-6 rounded-full bg-white shadow" />
            </span>
          </button>
        </div>

        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-emerald-800 leading-6">
            عند الإخفاء تبقى بيانات السيارات محفوظة في قاعدة البيانات، لكنها لا تظهر للمستخدم ولا يستطيع اختيارها عند إضافة إعلان.
          </p>
        </div>
      </div>
    </div>
  );
}
