import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAds, CarBrand } from '../context/AdsContext';
import { ChevronLeft, Search, CarFront } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function DynamicLucideIcon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const IconComponent = (Icons as any)[name] || CarFront;
  return <IconComponent size={size} className={className} />;
}

function BrandCard({ brand }: { brand: CarBrand }) {
  const [imgError, setImgError] = useState(false);
  const [cdnError, setCdnError] = useState(false);
  const [domainError, setDomainError] = useState(false);
  const navigate = useNavigate();
  const { ads } = useAds();
  
  const brandCount = ads.filter(ad => {
    if (ad.category !== 'cars') return false;
    const title = ad.title.toLowerCase();
    const brandArClean = brand.ar.toLowerCase();
    const brandEnClean = brand.en.toLowerCase();
    return title.includes(brandArClean) || 
           title.includes(brandEnClean) || 
           (ad.details || []).some(d => d.toLowerCase().includes(brandArClean) || d.toLowerCase().includes(brandEnClean));
  }).length;

  // Format brand name for filippofg CDN (lowercase, replacing space or dot/special chars with hyphen)
  const brandSlugForCdn = brand.en.toLowerCase()
    .replace(/[\s_.]/g, '-')   // replace spaces, dots, underscores with hyphens
    .replace(/-+/g, '-');      // collapse multiple consecutive hyphens

  const logoCdnUrl = `https://cdn.jsdelivr.net/gh/filippofg/car-logos-dataset@master/logos/optimized/${brandSlugForCdn}.png`;
  
  return (
    <button 
      onClick={() => {
        const brandSlug = brand.en.toLowerCase().replace(/[\s-]/g, '');
        navigate(`/cars/brands/${brandSlug}`);
      }}
      className="apple-card p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-md transition-all cursor-pointer bg-white h-full group animate-in fade-in zoom-in duration-300"
    >
      <div className="h-10 sm:h-12 w-20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
        {brand.image && !imgError ? (
          <img 
            src={brand.image} 
            alt={brand.ar}
            className="max-h-full max-w-full object-contain rounded-lg transition-all duration-300"
            onError={() => setImgError(true)}
          />
        ) : !cdnError ? (
          <img 
            src={logoCdnUrl} 
            alt={brand.ar}
            className="max-h-full max-w-full object-contain transition-all duration-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
            onError={() => setCdnError(true)}
          />
        ) : brand.domain && !domainError ? (
          <img 
            src={`https://www.google.com/s2/favicons?sz=128&domain=${brand.domain}`} 
            alt={brand.ar}
            className="max-h-full max-w-full object-contain transition-all duration-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
            onError={() => setDomainError(true)}
          />
        ) : brand.icon ? (
          <DynamicLucideIcon name={brand.icon} size={36} className="text-[var(--color-primary)] opacity-80 group-hover:opacity-100 transition-colors" />
        ) : (
          <CarFront className="text-gray-300 opacity-60 group-hover:text-[var(--color-primary)] transition-colors" size={36} />
        )}
      </div>
      <h3 className="font-bold text-[14px] text-gray-900 mb-0.5">{brand.ar}</h3>
      <p className="text-[12px] text-[var(--color-secondary)] font-medium mb-1">{brand.en}</p>
      <p className="text-[13px] text-gray-400 font-bold" dir="ltr">({brandCount})</p>
    </button>
  );
}

export function CarBrandsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { brands, ads } = useAds();

  const isRentCar = (ad: any) => {
    const hasRentKeyword = ad.title.toLowerCase().includes('إيجار') || ad.title.toLowerCase().includes('لإيجار') || ad.title.toLowerCase().includes('للإيجار') || ad.title.toLowerCase().includes('للايجار') || ad.title.toLowerCase().includes('اجار') ||
                          (ad.details || []).some((d: string) => d.includes('إيجار') || d.includes('لإيجار') || d.includes('للإيجار') || d.includes('للايجار') || d.includes('اجار'));
    const hasRentCurrency = ad.currency.includes('/سنة') || ad.currency.includes('/شهر') || ad.currency.includes('/يوم') || ad.currency.includes('/أسبوع');
    return hasRentKeyword || hasRentCurrency;
  };

  const forSaleCarsCount = ads.filter(ad => ad.category === 'cars' && !isRentCar(ad)).length;

  const filteredBrands = brands.filter(b => 
    b.ar.includes(searchQuery) || b.en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Search Bar - Mimicking Screenshot style */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex items-center px-4 h-12 sticky top-20 z-40">
        <input 
          type="text" 
          placeholder="ابحث عن تصنيف..." 
          className="w-full h-full outline-none text-[15px] bg-transparent text-gray-900 placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="text-gray-400 shrink-0" size={20} />
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-[12px] p-4 shadow-sm mb-4">
        <h2 className="font-bold text-[16px] text-gray-900">كل إعلانات سيارات للبيع</h2>
        <button 
          onClick={() => navigate(`/ads?category=cars&purpose=${encodeURIComponent('للبيع')}&title=${encodeURIComponent('سيارات للبيع')}`)}
          className="flex items-center gap-2 text-[var(--color-secondary)] hover:text-gray-900 transition-colors font-semibold"
        >
          <span className="text-[14px]" dir="ltr">({forSaleCarsCount})</span>
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredBrands.map((brand, idx) => (
            <motion.div
              key={brand.en}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBrands.length === 0 && (
        <div className="py-20 text-center text-[var(--color-secondary)] bg-white rounded-[16px] border border-gray-100">
          لا توجد نتائج مطابقة للبحث.
        </div>
      )}

    </div>
  );
}
