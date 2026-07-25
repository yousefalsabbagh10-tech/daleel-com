import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useAdsFilter } from './FilterContext';

interface HeaderNavProps {
  filteredCount: number;
}

export function HeaderNav({ filteredCount }: HeaderNavProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filters, isFilterPanelOpen, setIsFilterPanelOpen } = useAdsFilter();

  const titleParam = searchParams.get('title');

  return (
    <div className="bg-[#0D3B46] text-white sticky top-0 z-30 shadow-md">
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto w-full">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ChevronRight size={22} className="rtl:-scale-x-100" />
          <span className="text-sm font-semibold text-white">رجوع</span>
        </button>
        
        <div className="flex-1 text-center font-bold text-lg truncate px-4">
          {titleParam || filters.query || 'كل الإعلانات المتاحة'}
        </div>
        
        <button 
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className={`p-2 rounded-full transition-all flex items-center justify-center gap-1.5 px-3 py-1.5 border cursor-pointer ${
            isFilterPanelOpen 
              ? 'bg-[#C9A15A] text-black border-[#C9A15A] font-bold shadow' 
              : 'hover:bg-white/10 border-white/20 text-white'
          }`}
        >
          <SlidersHorizontal size={18} />
          <span className="text-xs font-semibold hidden md:inline">الفلاتر المتقدمة</span>
          {filteredCount !== 0 && (
            <span className="bg-[#C9A15A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
              {filteredCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
