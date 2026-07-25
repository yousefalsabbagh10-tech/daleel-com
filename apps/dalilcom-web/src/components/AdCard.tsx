import React, { useState } from 'react';
import { AdItem } from '../types';
import { MapPin, Star, Sparkles, Heart, GitCompare } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AdDetailModal } from './AdDetailModal';
import { useAds } from '../context/AdsContext';

interface AdCardProps {
  item: AdItem;
  key?: any;
}

export function AdCard({ item }: AdCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const { toggleFavorite, isFavorite, toggleComparison, isInComparison } = useAds();

  const fav = isFavorite(item.id);
  const comp = isInComparison(item.id);

  return (
    <>
      <motion.div 
        whileHover={{ y: -4 }}
        onClick={() => setDetailOpen(true)}
        className="apple-card flex flex-col h-full relative group p-0 cursor-pointer active:scale-[0.98] transition-all select-none overflow-hidden rounded-[20px] sm:rounded-3xl border border-gray-100/80 bg-white shadow-sm hover:shadow-md"
      >
        {item.isFeatured && (
          <span className="absolute top-2.5 right-2.5 bg-[#C9A15A] text-white text-[9px] sm:text-[12px] font-extrabold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 z-10 shadow-sm">
            <Sparkles size={11} className="fill-current animate-pulse text-white" />
            مميز
          </span>
        )}

        {/* Favorite (Heart) absolute button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-2.5 left-2.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-[#C9A15A] flex items-center justify-center shadow z-20 border border-gray-150 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="حفظ للمفضلة"
        >
          <Heart size={13} className={cn(fav ? "fill-[#C9A15A] text-[#C9A15A]" : "text-slate-600")} />
        </button>
        
        <div className="h-28 xs:h-36 sm:h-48 w-full relative bg-slate-50 overflow-hidden rounded-t-[20px] sm:rounded-t-3xl">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-2.5 xs:p-3.5 sm:p-5 flex flex-col flex-1">
          <div className="flex flex-col mb-1.5">
            <h3 className="font-bold text-[12px] xs:text-[13px] sm:text-base md:text-lg leading-snug tracking-tight text-slate-900 group-hover:text-[#C9A15A] transition-colors line-clamp-2 min-h-[32px] sm:min-h-[44px]">
              {item.title}
            </h3>
            <span className="font-extrabold text-[#C9A15A] whitespace-nowrap text-[12px] xs:text-[13px] sm:text-base mt-1 text-right">
              {item.price.toLocaleString()} {item.currency}
            </span>
          </div>
          
          <div className="flex items-center text-[10px] xs:text-[11px] sm:text-[13px] text-slate-400 mb-2 sm:mb-4 font-semibold line-clamp-1">
            <MapPin size={12} className="ml-1 inline-block text-[#C9A15A] shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <div className="mt-auto flex flex-col">
            <div className="flex flex-wrap gap-1 mb-2 sm:mb-4">
              {item.details.slice(0, 2).map((detail, idx) => (
                <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-600 text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-[5px] whitespace-nowrap">
                  {detail}
                </span>
              ))}
              {item.details.length > 2 && (
                <span className="hidden sm:inline-block bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold px-2 py-0.5 rounded-[5px] whitespace-nowrap">
                  +{item.details.length - 2}
                </span>
              )}
            </div>

            {/* Quick compare option row */}
            <div className="flex items-center justify-between border-t border-gray-100/70 pt-2 text-[10px] sm:text-[11px]">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComparison(item.id);
                }}
                className={cn(
                  "flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg font-bold border transition-all cursor-pointer text-[9px] sm:text-[11px]",
                  comp 
                    ? "bg-slate-900 text-white border-slate-900" 
                    : "bg-slate-50 text-slate-600 border-gray-200 hover:bg-slate-100"
                )}
              >
                <GitCompare size={10} className="sm:w-3 sm:h-3" />
                <span>{comp ? 'مضاف' : 'مقارنة'}</span>
              </button>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold">تحديث {item.date}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {detailOpen && (
          <AdDetailModal 
            item={item} 
            onClose={() => setDetailOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

