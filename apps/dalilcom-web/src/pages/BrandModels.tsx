import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, Car } from 'lucide-react';
import { useAds } from '../context/AdsContext';

export function BrandModelsPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { brands, carModelsMap, ads } = useAds();

  const brand = brands.find(b => b.en.toLowerCase().replace(/[\s-]/g, '') === brandId?.toLowerCase());

  if (!brand) {
    return <Navigate to="/cars/brands" replace />;
  }

  const customModels = carModelsMap[brand.en];
  const rawModels = customModels && customModels.length > 0
    ? [
        { ar: `كل إعلانات ${brand.ar}`, en: '', count: brand.count },
        ...customModels.map((m, idx) => ({ 
          ar: m.ar, 
          en: m.en, 
          count: 0
        }))
      ]
    : [{ ar: `كل إعلانات ${brand.ar}`, en: '', count: brand.count }];

  // Calculate real count of ads for a specific brand-model combination
  const getBrandModelCount = (modelAr: string, isAll: boolean) => {
    return ads.filter(ad => {
      if (ad.category !== 'cars') return false;
      const title = ad.title.toLowerCase();
      const brandArClean = brand.ar.toLowerCase();
      const brandEnClean = brand.en.toLowerCase();
      const matchesBrand = title.includes(brandArClean) || 
                           title.includes(brandEnClean) || 
                           (ad.details || []).some(d => d.toLowerCase().includes(brandArClean) || d.toLowerCase().includes(brandEnClean));

      if (!matchesBrand) return false;

      if (isAll) return true;

      const modelArClean = modelAr.toLowerCase();
      return title.includes(modelArClean) || (ad.details || []).some(d => d.toLowerCase().includes(modelArClean));
    }).length;
  };

  const models = rawModels.map((model, idx) => ({
    ...model,
    count: getBrandModelCount(model.ar, idx === 0)
  }));

  return (
    <div className="absolute inset-0 z-50 bg-[var(--color-bg-secondary)] flex flex-col animate-in fade-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="bg-[#0D3B46] text-white flex items-center justify-center py-3 relative shadow-sm shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="absolute right-4 text-white hover:bg-white/10 p-1 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="rotate-180" />
        </button>
        <h1 className="font-bold text-[16px]">{brand.ar}</h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
          <div className="bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden flex flex-col">
            {models.map((model, idx) => (
              <React.Fragment key={idx}>
                <button 
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors group text-right"
                  onClick={() => {
                    const isAll = idx === 0;
                    if (isAll) {
                      navigate(`/ads?category=cars&brand=${encodeURIComponent(brand.ar)}&title=${encodeURIComponent(model.ar)}`);
                    } else {
                      navigate(`/ads?category=cars&brand=${encodeURIComponent(brand.ar)}&carModel=${encodeURIComponent(model.ar)}&title=${encodeURIComponent(`${brand.ar} ${model.ar}`)}`);
                    }
                  }} 
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-500 shrink-0 shadow-sm transition-transform group-hover:scale-105 border border-gray-100">
                      <Car size={20} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span 
                        className={`text-[15px] ${idx === 0 ? 'font-bold text-[#0D3B46]' : 'font-semibold text-gray-800'}`}
                      >
                        {model.ar}
                      </span>
                      {model.en && (
                        <span className="text-[12px] text-gray-500 font-medium mt-0.5" dir="ltr">
                          {model.en}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <span className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${idx === 0 ? 'bg-[#C9A15A]/10 text-[#0D3B46]' : 'bg-gray-100 text-gray-500'}`} dir="ltr">{model.count} إعلان</span>
                    <ChevronLeft size={16} className="opacity-60" />
                  </div>
                </button>
                {idx < models.length - 1 && (
                  <div className="h-[1px] bg-gray-50 mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
