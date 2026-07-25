import React from 'react';
import { useAds } from '../context/AdsContext';
import { AdCard } from '../components/AdCard';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function FeaturedPage() {
  const { ads } = useAds();
  const featuredAds = ads.filter(ad => ad.isFeatured);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-blue-400 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <Star size={32} className="fill-white" />
          </div>
          <h2 className="text-3xl font-bold">المنتجات المميزة</h2>
          <p className="text-blue-50 max-w-lg leading-relaxed">
            تصفح أفضل العقارات والسيارات المختارة بعناية لتناسب ذوقك الرفيع.
          </p>
        </div>
        
        {/* Aesthetic background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl translate-y-1/2"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {featuredAds.map((ad, idx) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <AdCard item={ad} />
          </motion.div>
        ))}
        
        {featuredAds.length === 0 && (
          <div className="col-span-full py-20 text-center text-[var(--color-secondary)]">
            لا توجد إعلانات مميزة حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
