import React from 'react';
import { useAds } from '../context/AdsContext';
import { AdCard } from '../components/AdCard';
import { MapPinned } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MapPage() {
  const { ads } = useAds();
  const navigate = useNavigate();
  const realEstateAds = ads.filter(ad => ad.category === 'real-estate');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#C9A15A]/10 text-[#0D3B46] flex items-center justify-center">
          <MapPinned size={26} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">الإعلانات على الخريطة</h2>
          <p className="text-sm text-gray-500 font-medium">{realEstateAds.length.toLocaleString('ar-SY')} موقع عقاري معروض</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {realEstateAds.map(ad => (
          <div key={ad.id} className="relative group">
            <AdCard item={ad} />
            <div className="absolute top-2 left-2 z-10">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const url = ad.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ad.location)}`;
                  window.open(url, '_blank');
                }}
                className="bg-[#0D3B46] hover:bg-[#0D3B46] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md transition-colors"
              >
                فتح على الخريطة
              </button>
            </div>
          </div>
        ))}
        {realEstateAds.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 font-bold">
            لا توجد إعلانات لعرضها على الخريطة
          </div>
        )}
      </div>
    </div>
  );
}
