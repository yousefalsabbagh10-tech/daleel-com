import React from 'react';
import { BookmarkCheck, Trash2 } from 'lucide-react';

interface SavedReport {
  id: string;
  type: 'cars' | 'real-estate';
  title: string;
  specs: string;
  estimatedPrice: number;
  priceRange: [number, number];
  date: string;
}

interface ReportsTabProps {
  reports: SavedReport[];
  onDeleteReport: (id: string, e: React.MouseEvent) => void;
  currencySymbol?: string;
}

export function ReportsTab({ reports, onDeleteReport, currencySymbol = 'ل.س' }: ReportsTabProps) {
  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <span className="text-xs font-black text-slate-500">مجموع التقارير المخزنة محلياً ({reports.length})</span>
        <h3 className="font-black text-slate-800 text-sm">أرشيف تقارير التقييمات المحفوظة</h3>
      </div>

      {reports.length === 0 ? (
        <div className="py-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-gray-250 flex flex-col items-center justify-center gap-3">
          <BookmarkCheck size={32} className="opacity-25 animate-bounce" />
          <p className="text-xs font-bold text-slate-500">لا يوجد تقارير محفوظة بعد</p>
          <p className="text-[10px] text-slate-400">قم بتخصيص التقييم والضغط على زر "حفظ التقرير الحالي بالأرشيف" لتجدها هنا</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reports.map((rep) => (
            <div 
              key={rep.id}
              className="p-4 bg-white border border-gray-150 rounded-[20px] shadow-sm hover:shadow-md transition-all relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2 pr-6">
                  <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full ${
                    rep.type === 'cars' ? 'bg-[#C9A15A]/10 text-[#C9A15A]' : 'bg-[#C9A15A]/10 text-[#0D3B46]'
                  }`}>
                    {rep.type === 'cars' ? 'تقييم مركبة' : 'تقييم عقاري'}
                  </span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">{rep.title}</h4>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mb-3">{rep.specs}</p>
              </div>

              <div className="flex items-baseline justify-between border-t border-gray-100 pt-3 mt-1">
                <span className="text-[10px] text-slate-400 font-bold">{rep.date}</span>
                <div className="text-xs font-black text-slate-800 flex items-center gap-1">
                  <span>متوسط التخمين:</span>
                  <span className="text-[#C9A15A] font-bold font-mono">
                    {rep.estimatedPrice.toLocaleString()} {currencySymbol}
                  </span>
                </div>
              </div>

              {/* Delete trigger */}
              <button
                onClick={(e) => onDeleteReport(rep.id, e)}
                className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 p-1.5 bg-[#C9A15A]/10 hover:bg-[#C9A15A]/20 rounded-lg text-[#C9A15A] transition-opacity"
                title="حذف التقرير"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
