import React from 'react';
import { Search, Sparkles, Trash2 } from 'lucide-react';
import { AdItem } from '../../types';

interface AdminAdsTabProps {
  ads: AdItem[];
  adQuery: string;
  setAdQuery: (q: string) => void;
  onToggleFeatured: (id: string, currentStatus: boolean) => void;
  onDeleteAd: (id: string, title: string) => void;
}

export function AdminAdsTab({
  ads,
  adQuery,
  setAdQuery,
  onToggleFeatured,
  onDeleteAd,
}: AdminAdsTabProps) {
  const filteredAds = ads.filter(
    (a) =>
      a.title.toLowerCase().includes(adQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(adQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm text-right" dir="rtl">
      
      {/* Search header container */}
      <div className="p-6 border-b border-gray-150 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="ابحث برقم الإعلان أو العنوان والمدينة..." 
            value={adQuery}
            onChange={(e) => setAdQuery(e.target.value)}
            className="w-full h-11 pr-11 pl-4 bg-slate-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-rose-500 transition-all text-xs text-slate-800"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <div className="text-xs font-bold text-slate-500">
          عدد الإعلانات الكلي: <span className="text-slate-800">{ads.length}</span>
        </div>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead className="bg-slate-50 text-slate-500 font-extrabold border-b border-gray-200">
            <tr>
              <th className="p-4 pr-6">العنوان والتصنيف</th>
              <th className="p-4">السعر والمكان</th>
              <th className="p-4">تاريخ الإدراج</th>
              <th className="p-4">الترويج والتميز</th>
              <th className="p-4 pl-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAds.map((ad) => (
              <tr key={ad.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 pr-6">
                  <div className="flex items-center gap-3">
                    {ad.imageUrl && (
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title} 
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-255"
                      />
                    )}
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 line-clamp-1">{ad.title}</h4>
                      <span className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        ad.category === 'cars' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {ad.category === 'cars' ? 'السيارات' : 'العقارات'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className="font-black text-rose-600 text-[14px]">
                      {ad.price.toLocaleString()} {ad.currency}
                    </span>
                    <p className="text-slate-500 text-[10px] font-semibold">{ad.location}</p>
                  </div>
                </td>
                <td className="p-4 text-slate-500 font-mono">
                  {ad.date || '2026-06-01'}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => onToggleFeatured(ad.id, ad.isFeatured)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[11px] transition-all border outline-none cursor-pointer ${
                      ad.isFeatured
                        ? 'bg-amber-550 hover:bg-amber-600 border-amber-300 text-white bg-amber-500 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 border-gray-200 text-slate-500'
                    }`}
                  >
                    <Sparkles size={13} className={ad.isFeatured ? 'animate-pulse text-white' : 'text-slate-400'} />
                    {ad.isFeatured ? 'مميز واجهة أولى' : 'إعلان قياسي'}
                  </button>
                </td>
                <td className="p-4 pl-6 text-center">
                  <button 
                    onClick={() => onDeleteAd(ad.id, ad.title)}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center justify-center outline-none transition-colors inline-flex cursor-pointer"
                    title="حذف الإعلان نهائياً"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredAds.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-gray-400 font-bold text-xs">
                  لا تطابق نتائج الإعلانات شرط البحث الحالي دمشق/السيارات.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
