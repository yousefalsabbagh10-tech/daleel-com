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
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] sm:h-[82vh] flex flex-col overflow-hidden border border-gray-150"
      >
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-55 shrink-0 gap-3">
          <div className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <ShieldCheck size={13} />
            <span>إعلان موثق ضمن دليل كوم</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-3 sm:px-4 py-2 shadow-sm">
            <img src="/logo-mark.png" alt="دليل كوم" className="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
            <div className="hidden sm:block text-right">
              <div className="text-[17px] font-black leading-none text-[#063f9e]">دليل كوم</div>
              <div className="mt-1 text-[10px] font-bold text-slate-500">عقارات . فرص أكثر</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComparison(item.id)}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border',
                comp ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-gray-200 text-slate-600 hover:bg-slate-100',
              )}
              title={comp ? 'حذف من المقارنة' : 'إضافة للمقارنة'}
            >
              <GitCompare size={18} />
            </button>
            <button
              onClick={() => toggleFavorite(item.id)}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border',
                fav ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-gray-200 text-slate-600 hover:bg-slate-100',
              )}
              title={fav ? 'حذف من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart size={18} className={cn(fav && 'fill-rose-500')} />
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-55 space-y-6">
          <DetailsTab item={item} />
        </div>

        <div className="px-4 sm:px-6 py-4 bg-slate-900 text-slate-400 text-[10px] sm:text-[11px] font-bold border-t border-slate-800 shrink-0 space-y-3">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
            <span>دليل كوم سوريا - منصة متكاملة للإعلانات العقارية</span>
            <span>حقوق النشر محفوظة © {new Date().getFullYear()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
