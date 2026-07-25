import React, { useState } from 'react';
import { useAds } from '../context/AdsContext';
import { AdCard } from '../components/AdCard';
import { Heart, Trash2, ArrowLeft, FolderHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FavoritesPage() {
  const { ads, favorites, toggleFavorite } = useAds();
  const navigate = useNavigate();

  const favoritedItems = ads.filter(ad => favorites.includes(ad.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-150">
        <div className="text-right">
          <div className="flex items-center gap-2 text-[#C9A15A] mb-1">
            <Heart className="fill-current" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">قائمتي المفضلة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">الإعلانات المحفوظة</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">الوصول السريع إلى العقارات والسيارات التي تثير اهتمامك ومتابعة آخر تحديثاتها</p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft size={16} className="rtl:-scale-x-100" />
          <span>الرجوع للرئيسية</span>
        </button>
      </div>

      {favoritedItems.length === 0 ? (
        /* Empty State with Apple elegance */
        <div className="bg-white border border-gray-150 rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 bg-[#C9A15A]/10 rounded-full flex items-center justify-center text-[#C9A15A] mx-auto">
            <FolderHeart size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">لا توجد إعلانات محفوظة بعد</h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-sm mx-auto">
              تصفح تصنيفات السيارات والعقارات المميزة واضغط على أيقونة القلب لحفظ الإعلانات التي تثير اهتمامك لسهولة الوصول إليها لاحقاً.
            </p>
          </div>
          <div className="pt-2">
            <button 
              onClick={() => navigate('/ads')}
              className="px-6 py-3 bg-[#C9A15A] hover:bg-[#0D3B46] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-[0.98]"
            >
              استكشف كافة الإعلانات الآن
            </button>
          </div>
        </div>
      ) : (
        /* Grid with favorited cards */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-right">
            <span className="text-xs font-bold text-slate-400">({favoritedItems.length}) إعلان محفوظ</span>
            <button 
              onClick={() => {
                if (window.confirm('هل أنت متأكد من إزالة جميع الإعلانات من المفضلة؟')) {
                  favorites.forEach(id => toggleFavorite(id));
                }
              }}
              className="text-xs font-semibold text-[#C9A15A] hover:text-[#0D3B46] flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={13} />
              إزالة الكل
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {favoritedItems.map(item => (
              <div key={item.id} className="relative">
                <AdCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
