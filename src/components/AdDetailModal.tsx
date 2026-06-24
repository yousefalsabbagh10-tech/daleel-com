import React, { useState } from 'react';
import { AdItem } from '../types';
import { 
  X, Calculator, MessageSquare, ShieldCheck, Heart, GitCompare, Info 
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAds } from '../context/AdsContext';
import { cn } from '../lib/utils';
import { DetailsTab } from './addetail/DetailsTab';
import { CalculatorTab } from './addetail/CalculatorTab';
import { OfferTab } from './addetail/OfferTab';

interface AdDetailModalProps {
  item: AdItem;
  onClose: () => void;
}

export function AdDetailModal({ item, onClose }: AdDetailModalProps) {
  const { toggleFavorite, isFavorite, toggleComparison, isInComparison } = useAds();
  const isCar = item.category === 'cars';
  
  const fav = isFavorite(item.id);
  const comp = isInComparison(item.id);

  const [activeTab, setActiveTab] = useState<'details' | 'calculator' | 'offer'>('details');

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] sm:h-[82vh] flex flex-col overflow-hidden border border-gray-150"
      >
        {/* Modal Top Floating Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-55 flex-row-reverse shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComparison(item.id)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border",
                comp 
                  ? "bg-slate-900 border-slate-900 text-white" 
                  : "bg-slate-50 border-gray-200 text-slate-600 hover:bg-slate-100"
              )}
              title={comp ? "حذف من المقارنة" : "إضافة للمقارنة"}
            >
              <GitCompare size={18} />
            </button>

            <button
              onClick={() => toggleFavorite(item.id)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border",
                fav 
                  ? "bg-rose-50 border-rose-100 text-rose-500" 
                  : "bg-slate-50 border-gray-200 text-slate-600 hover:bg-slate-100"
              )}
              title={fav ? "حذف من المفضلة" : "إضافة للمفضلة"}
            >
              <Heart size={18} className={cn(fav && "fill-rose-500")} />
            </button>

            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${isCar ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
              {isCar ? 'مزاد ومعرض المركبات' : 'قسم العقارات المطور'}
            </span>
            <div className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <ShieldCheck size={13} className="inline-block" />
              <span>متحقق بالكامل 🇸🇾</span>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Tabs inside Detail panel */}
        <div className="bg-slate-50 border-b border-gray-200 flex shrink-0 justify-around">
          {[
            { id: 'details', label: 'تفاصيل ومواصفات الإعلان', icon: Info },
            { id: 'calculator', label: 'حاسبة التمويل المالي الدعم', icon: Calculator },
            { id: 'offer', label: 'مفاوض الأسعار الذكي وسوق المساومة', icon: MessageSquare },
          ].map(tab => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-3 text-center flex items-center justify-center gap-1.5 text-xs sm:text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  isTabActive 
                    ? 'border-rose-500 text-rose-600 bg-white' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
              >
                <tab.icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-55 space-y-6">
          {activeTab === 'details' && (
            <DetailsTab item={item} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'calculator' && (
            <CalculatorTab item={item} />
          )}

          {activeTab === 'offer' && (
            <OfferTab item={item} />
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-4 bg-slate-900 text-slate-400 text-[10px] sm:text-[11px] font-bold border-t border-slate-800 flex items-center justify-between shrink-0 flex-col sm:flex-row gap-2">
          <span>سوريازيل سوريا - منصة متكاملة للسيارات والعقارات</span>
          <div className="flex items-center gap-3">
            <span>حقوق النشر محفوظة ومسجلة سوريازيل © {new Date().getFullYear()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
