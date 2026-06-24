import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, CarFront, Landmark, Calculator
} from 'lucide-react';
import { MortgageCalculator } from '../components/calculators/MortgageCalculator';
import { AutoCalculator } from '../components/calculators/AutoCalculator';
import { AffordabilityCalculator } from '../components/calculators/AffordabilityCalculator';

export function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'mortgage' | 'auto' | 'affordability'>('mortgage');

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 py-6 pb-24" dir="rtl">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5 gap-3">
        <div className="flex items-center gap-3 text-right">
          <div className="bg-indigo-50 p-2.5 rounded-2xl text-indigo-600">
            <Calculator size={24} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">محرك الحاسبات المالي الذكي</h2>
            <p className="text-[11px] sm:text-[13px] text-slate-500 font-semibold mt-0.5">احسب قيمة التمويل العقاري، وقسط مركبتك أو قيم قدرتك الشرائية والادخارية بالمرونة والليرة/الدولار</p>
          </div>
        </div>
      </div>

      {/* Tabs list selector */}
      <div className="flex flex-wrap p-1 gap-1.5 bg-slate-100/90 backdrop-blur-sm rounded-2xl border border-gray-200/50">
        {[
          { id: 'mortgage', label: 'حاسبة التمويل العقاري السكني', icon: Building2 },
          { id: 'auto', label: 'حاسبة أقساط وفائدة السيارات', icon: CarFront },
          { id: 'affordability', label: 'مقيّم ومخطط القدرة الشرائية الكاش', icon: Landmark },
        ].map((tab) => {
          const isTabActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isTabActive 
                  ? 'bg-slate-950 text-white shadow-md scale-[1.01]' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Display active tab content */}
      <div className="bg-slate-50/50 border border-gray-200/40 rounded-[32px] p-4 sm:p-6 shadow-sm min-h-[40vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'mortgage' && <MortgageCalculator />}
            {activeTab === 'auto' && <AutoCalculator />}
            {activeTab === 'affordability' && <AffordabilityCalculator />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
