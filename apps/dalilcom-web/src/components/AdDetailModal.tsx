import React from 'react';
import { AdItem } from '../types';
import { X, ShieldCheck, Heart, GitCompare } from 'lucide-react';
import { motion } from 'motion/react';
import { useAds } from '../context/AdsContext';
import { cn } from '../lib/utils';
import { DetailsTab } from './addetail/DetailsTab';

interface AdDetailModalProps {
  item: AdItem;
  onClose: () => void;
}

export function AdDetailModal({ item, onClose }: AdDetailModalProps) {
  const { toggleFavorite, isFavorite, toggleComparison, isInComparison } = useAds();
  const fav = isFavorite(item.id);
  const comp = isInComparison(item.id);

  return (
    <div className="fixed inset-0 z-[300] bg-[#0D3B46]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] sm:h-[82vh] flex flex-col overflow-hidden border border-[#F6F2E8]"
      >
        <div className="px-4 sm:px-6 py-4 border-b border-[#F6F2E8] flex items-center justify-between bg-[#F6F2E8] shrink-0 gap-3">
          <div className="text-[11px] text-[#0D3B46] font-extrabold flex items-center gap-1 bg-[#C9A15A]/15 px-2.5 py-1 rounded-full border border-[#C9A15A]/30">
            <ShieldCheck size={13} />
            <span>إعلان موثق ضمن دليل كوم</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#F6F2E8] bg-white px-3 sm:px-4 py-2 shadow-sm">
            <img src="/logo-mark.png" alt="دليل كوم" className="h-12 w-32 object-contain" />

          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComparison(item.id)}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border',
                comp ? 'bg-[#2B2B2B] border-[#2B2B2B] text-white' : 'bg-[#F6F2E8] border-[#E3C98D] text-[#0D3B46] hover:bg-[#F6F2E8]',
              )}
              title={comp ? 'حذف من المقارنة' : 'إضافة للمقارنة'}
            >
              <GitCompare size={18} />
            </button>
            <button
              onClick={() => toggleFavorite(item.id)}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border',
                fav ? 'bg-[#C9A15A]/10 border-[#C9A15A]/25 text-[#C9A15A]' : 'bg-[#F6F2E8] border-[#E3C98D] text-[#0D3B46] hover:bg-[#F6F2E8]',
              )}
              title={fav ? 'حذف من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart size={18} className={cn(fav && 'fill-[#C9A15A]')} />
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-[#F6F2E8] flex items-center justify-center text-[#C9A15A] cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F6F2E8] space-y-6">
          <DetailsTab item={item} />
        </div>

        <div className="px-4 sm:px-6 py-4 bg-[#0D3B46] text-[#F6F2E8]/80 text-[10px] sm:text-[11px] font-bold border-t border-[#C9A15A]/30 shrink-0 space-y-3">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
            <span>دليل كوم سوريا - منصة متكاملة للإعلانات العقارية</span>
            <span>حقوق النشر محفوظة © {new Date().getFullYear()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
