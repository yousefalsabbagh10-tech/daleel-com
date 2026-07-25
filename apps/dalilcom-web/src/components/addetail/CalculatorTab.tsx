import React, { useState } from 'react';
import { AdItem } from '../../types';
import { Calculator, CheckCircle2, Landmark } from 'lucide-react';

interface CalculatorTabProps {
  item: AdItem;
}

export function CalculatorTab({ item }: CalculatorTabProps) {
  const isCar = item.category === 'cars';
  const currency = item.currency || 'ل.س';
  const originalPrice = item.price;

  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenureYears, setTenureYears] = useState(isCar ? 5 : 25);
  const [interestRate, setInterestRate] = useState(isCar ? 4.5 : 6.0);
  const [eligibleStatus, setEligibleStatus] = useState<string | null>(null);

  const downPaymentAmount = (originalPrice * downPaymentPct) / 100;
  const loanPrincipal = originalPrice - downPaymentAmount;
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = tenureYears * 12;

  const monthlyInstallment = monthlyRate > 0 
    ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : loanPrincipal / totalMonths;

  const totalPayment = monthlyInstallment * totalMonths + downPaymentAmount;
  const totalInterestPaid = totalPayment - originalPrice;

  const handleApplyFinance = () => {
    setEligibleStatus('loading');
    setTimeout(() => {
      setEligibleStatus('success');
    }, 1600);
  };

  const formatValue = (val: number) => {
    return `${Math.round(val).toLocaleString('en-US')} ${currency}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Pickers Form */}
      <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Calculator size={20} className="text-[#C9A15A]" />
          <div className="text-right">
            <h4 className="font-black text-xs sm:text-sm text-slate-800">حاسبة الأقساط الشهرية والتكاليف</h4>
            <span className="text-[10px] text-slate-400 font-semibold">تخطيط مالي مرن وبسيط لحساب تمويل المشتريات</span>
          </div>
        </div>

        {/* Down Payment Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>الدفعة الأولى المقدمة ({downPaymentPct}%)</span>
            <span className="text-[#C9A15A] font-black">{formatValue(downPaymentAmount)}</span>
          </div>
          <input 
            type="range" 
            min={10} 
            max={80} 
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-[#C9A15A] bg-gray-100 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>الحد الأدنى المقترح (10%)</span>
            <span>80% كحد أقصى</span>
          </div>
        </div>

        {/* Tenure Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>مدة القرض والتمويل المستهدف</span>
            <span className="text-[#C9A15A] font-black">{tenureYears} سنة ({totalMonths} شهر)</span>
          </div>
          <input 
            type="range" 
            min={1} 
            max={isCar ? 7 : 30} 
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-[#C9A15A] bg-gray-100 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>سنة واحدة</span>
            <span>الأقصى ({isCar ? '7 سنوات' : '30 سنة'})</span>
          </div>
        </div>

        {/* Interest rate Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>معدل الفائدة السنوي المتوقع</span>
            <span className="text-[#C9A15A] font-black">{interestRate}%</span>
          </div>
          <input 
            type="range" 
            min={1.0} 
            max={15.0} 
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-[#C9A15A] bg-gray-100 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Apply check */}
        <div className="pt-2">
          {eligibleStatus === 'success' ? (
            <div className="bg-[#C9A15A]/10 border border-[#C9A15A]/25 p-4 rounded-xl flex items-center gap-3 text-xs text-[#0D3B46] font-bold">
              <CheckCircle2 size={18} className="text-[#0D3B46] shrink-0" />
              <div>
                <span>تهانينا! تم توليد تقرير دراسية التأهيل المبدئ السريع لدعم معاملتك.</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleApplyFinance}
              className="w-full h-11 bg-slate-900 hover:bg-slate-850 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Landmark size={15} />
              {eligibleStatus === 'loading' ? 'جاري الفحص المالي التلقائي...' : 'افحص إمكانية التمويل من المصارف الشريكة'}
            </button>
          )}
        </div>
      </div>

      {/* Result Display */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm text-center space-y-4">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-widest">القسط الشهري المتوقع</span>
          <div className="inline-block py-3 px-6 bg-[#C9A15A]/5 rounded-3xl border border-[#C9A15A]/25">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#C9A15A]">
              {Math.round(monthlyInstallment).toLocaleString('en-US')}{' '}
              <span className="text-sm font-semibold">{currency} / شهر</span>
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
            * الحسابات تقريبية تختلف باختلاف معايير مصارف التمويل المحلية وأنظمتها الائتمانية.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-xl border border-slate-800">
          <h4 className="font-extrabold text-xs text-[#C9A15A] pb-3 border-b border-slate-800">تفاصيل وهيكلية تكاليف التمويل:</h4>
          <div className="space-y-3.5 text-xs font-semibold" dir="rtl">
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">سعر الإعلان الإجمالي</span>
              <span>{formatValue(originalPrice)}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">الدفعة المقدمة المدفوعة نقداً</span>
              <span>- {formatValue(downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">قيمة أصل القرض المستحق</span>
              <span className="text-[#C9A15A] font-bold">{formatValue(loanPrincipal)}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-slate-800/80 pb-3">
              <span className="text-slate-400">إجمالي الأرباح / الفوائد المقدرة</span>
              <span className="text-amber-400">+ {formatValue(totalInterestPaid)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-1">
              <span className="text-slate-300">مجموع التدفق النقدي المتوقع المدفوع</span>
              <span className="text-white">{formatValue(totalPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
