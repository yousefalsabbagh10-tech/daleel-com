import React from 'react';

export function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#C9A15A]/30 border-t-[#0D3B46] rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500">جاري تحميل الصفحة...</p>
      </div>
    </div>
  );
}
