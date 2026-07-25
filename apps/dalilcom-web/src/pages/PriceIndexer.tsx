import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, BarChart3, BookmarkCheck, Trash2
} from 'lucide-react';
import { ValuationTab } from '../components/priceindexer/ValuationTab';
import { AnalyticsTab } from '../components/priceindexer/AnalyticsTab';
import { ReportsTab } from '../components/priceindexer/ReportsTab';
import { api, listApi } from '../lib/api';

interface SavedReport {
  id: string;
  type: 'cars' | 'real-estate';
  title: string;
  specs: string;
  estimatedPrice: number;
  priceRange: [number, number];
  date: string;
}

export function PriceIndexerPage() {
  const [activeTab, setActiveTab] = useState<'valuation' | 'analytics' | 'reports'>('valuation');
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    listApi<any>('/valuation-reports?per_page=200')
      .then(rows => setSavedReports(rows.map(row => ({
        id: row.id,
        type: row.type,
        title: row.title,
        specs: row.specs,
        estimatedPrice: Number(row.estimated_price),
        priceRange: [Number(row.min_price), Number(row.max_price)],
        date: row.report_date,
      }))))
      .catch(console.error);
  }, []);

  const saveReport = (newRep: Omit<SavedReport, 'id' | 'date'>) => {
    const formatted: SavedReport = {
      ...newRep,
      id: `rep-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    api.post('/valuation-reports', {
      id: formatted.id,
      type: formatted.type,
      title: formatted.title,
      specs: formatted.specs,
      estimated_price: formatted.estimatedPrice,
      min_price: formatted.priceRange[0],
      max_price: formatted.priceRange[1],
      report_date: formatted.date,
    }).catch(console.error);
    setSavedReports([formatted, ...savedReports]);
    showToast('💾 تم حفظ تقرير التخمين العقاري/المركبة بالأرشيف بنجاح!');
  };

  const deleteReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    api.delete(`/valuation-reports/${id}`).catch(console.error);
    setSavedReports(savedReports.filter(r => r.id !== id));
    showToast('🗑️ تم إقصاء التقرير من سجلاتك المحلية');
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 py-6 pb-24 relative select-none" dir="rtl">
      
      {/* Toast alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-2xl shadow-xl z-50"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-5 text-right">
        <div className="bg-[#C9A15A]/10 p-2.5 rounded-2xl text-[#C9A15A]">
          <TrendingUp size={24} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">مقيّم الأسعار الذكي سوريازيل</h2>
          <p className="text-[11px] sm:text-[13px] text-slate-500 font-semibold mt-0.5">حلول حسابية وذكية استبيانية لتقدير السعر العادل للسيارات والعقارات لمنع التضخم والتدقيق الاستباقي</p>
        </div>
      </div>

      {/* Navigation tabs row */}
      <div className="flex flex-wrap p-1 gap-1.5 bg-slate-100/90 rounded-2xl border border-gray-200/50">
        {[
          { id: 'valuation', label: 'حاسبة التقييم والتخمين الفوري', icon: TrendingUp },
          { id: 'analytics', label: 'مؤشرات التحليلات والأسعار', icon: BarChart3 },
          { id: 'reports', label: `أرشيف تقاريري المحفوظة (${savedReports.length})`, icon: BookmarkCheck },
        ].map((tab) => {
          const isTabActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isTabActive 
                  ? 'bg-[#0D3B46] text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab viewport container */}
      <div className="bg-slate-50/50 border border-gray-200/40 rounded-[32px] p-4 sm:p-6 shadow-sm min-h-[40vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === 'valuation' && (
              <ValuationTab onSaveReport={saveReport} />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsTab />
            )}
            {activeTab === 'reports' && (
              <ReportsTab reports={savedReports} onDeleteReport={deleteReport} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
