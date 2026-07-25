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
    <div className="bg-white border border-[#F6F2E8] rounded-2xl overflow-hidden shadow-sm text-right" dir="rtl">
      
      {/* Search header container */}
      <div className="p-6 border-b border-[#F6F2E8] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="ابحث برقم الإعلان أو العنوان والمدينة..." 
            value={adQuery}
            onChange={(e) => setAdQuery(e.target.value)}
            className="w-full h-11 pr-11 pl-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none focus:bg-white focus:border-[#C9A15A] transition-all text-xs text-[#2B2B2B]"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A15A]" size={16} />
        </div>
        <div className="text-xs font-bold text-[#C9A15A]">
          عدد الإعلانات الكلي: <span className="text-[#2B2B2B]">{ads.length}</span>
        </div>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#F6F2E8] text-[#C9A15A] font-extrabold border-b border-[#E3C98D]">
            <tr>
              <th className="p-4 pr-6">العنوان والتصنيف</th>
              <th className="p-4">السعر والمكان</th>
              <th className="p-4">تاريخ الإدراج</th>
              <th className="p-4">الترويج والتميز</th>
              <th className="p-4 pl-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F2E8]">
            {filteredAds.map((ad) => (
              <tr key={ad.id} className="hover:bg-[#F6F2E8]/70 transition-colors">
                <td className="p-4 pr-6">
                  <div className="flex items-center gap-3">
                    {ad.imageUrl && (
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title} 
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E3C98D]"
                      />
                    )}
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#2B2B2B] line-clamp-1">{ad.title}</h4>
                      <span className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        ad.category === 'cars' ? 'bg-[#C9A15A]/10 text-[#C9A15A] border border-[#C9A15A]/25' : 'bg-[#C9A15A]/10 text-[#0D3B46] border border-[#C9A15A]/25'
                      }`}>
                        {ad.category === 'cars' ? 'السيارات' : 'العقارات'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className="font-black text-[#C9A15A] text-[14px]">
                      {ad.price.toLocaleString()} {ad.currency}
                    </span>
                    <p className="text-[#C9A15A] text-[10px] font-semibold">{ad.location}</p>
                  </div>
                </td>
                <td className="p-4 text-[#C9A15A] font-mono">
                  {ad.date || '2026-06-01'}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => onToggleFeatured(ad.id, ad.isFeatured)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[11px] transition-all border outline-none cursor-pointer ${
                      ad.isFeatured
                        ? 'bg-[#C9A15A] hover:bg-[#C9A15A] border-[#C9A15A] text-white bg-[#C9A15A] shadow-sm'
                        : 'bg-[#F6F2E8] hover:bg-[#F6F2E8] border-[#E3C98D] text-[#C9A15A]'
                    }`}
                  >
                    <Sparkles size={13} className={ad.isFeatured ? 'animate-pulse text-white' : 'text-[#C9A15A]'} />
                    {ad.isFeatured ? 'مميز واجهة أولى' : 'إعلان قياسي'}
                  </button>
                </td>
                <td className="p-4 pl-6 text-center">
                  <button 
                    onClick={() => onDeleteAd(ad.id, ad.title)}
                    className="w-8 h-8 rounded-lg bg-[#C9A15A]/10 hover:bg-[#C9A15A]/20 text-[#C9A15A] border border-[#C9A15A]/30 flex items-center justify-center outline-none transition-colors inline-flex cursor-pointer"
                    title="حذف الإعلان نهائياً"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredAds.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-[#C9A15A] font-bold text-xs">
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
