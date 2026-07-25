import React, { useState } from 'react';
import { 
  PiggyBank, Settings2, ShieldCheck, Landmark
} from 'lucide-react';

export function AffordabilityCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(3000000); // 3M SP or 1200 USD
  const [otherMonthlyDebts, setOtherMonthlyDebts] = useState<number>(500000);
  const [cashDownpayment, setCashDownpayment] = useState<number>(50000000); // 50M SP
  const [affordabilityInterestRate, setAffordabilityInterestRate] = useState<number>(6.5);
  const [affordabilityTermYears, setAffordabilityTermYears] = useState<number>(20);
  const [currency, setCurrency] = useState<'ل.س' | '$'>('ل.س');

  // Calculate purchase capability based on salary DBR (Debt Burden Ratio)
  // Max allowable installment is usually 40% of salary
  const maxTotalAllowableInstallment = Math.max(0, Math.round(monthlySalary * 0.40) - otherMonthlyDebts);

  const calculateMaxLoanAmount = () => {
    if (maxTotalAllowableInstallment <= 0) return 0;
    const monthlyRate = (affordabilityInterestRate / 100) / 12;
    const totalPayments = affordabilityTermYears * 12;
    
    if (monthlyRate === 0) return maxTotalAllowableInstallment * totalPayments;
    
    // Reverse PMT formula to find Principal
    return Math.round(
      (maxTotalAllowableInstallment * (Math.pow(1 + monthlyRate, totalPayments) - 1)) / 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))
    );
  };

  const maxEstimatedLoan = calculateMaxLoanAmount();
  const maxHomePurchaseValue = maxEstimatedLoan + cashDownpayment;

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Input Pillar */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="font-extrabold text-xs text-[#0D3B46] flex items-center gap-1 bg-[#C9A15A]/10 px-2.5 py-1 rounded-lg">
              <Settings2 size={13} />
              معايير القدرة والشروط المالية
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg">
              {['ل.س', '$'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setCurrency(unit as any)}
                  className={`px-3 py-1 text-xs font-black rounded-md ${currency === unit ? 'bg-[#0D3B46] text-white' : 'text-slate-600'}`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Monthly Salary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>الراتب / الدخل الشهري الصافي</span>
                <span>{monthlySalary.toLocaleString()} {currency}</span>
              </div>
              <input 
                type="range"
                min={currency === '$' ? 100 : 500000}
                max={currency === '$' ? 10000 : 15000000}
                step={currency === '$' ? 100 : 500000}
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full accent-[#0D3B46]"
              />
            </div>

            {/* Other Debts */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>الالتزامات أو الأقساط الشهرية الأخرى</span>
                <span>{otherMonthlyDebts.toLocaleString()} {currency}</span>
              </div>
              <input 
                type="range"
                min={0}
                max={currency === '$' ? 5000 : 5000000}
                step={currency === '$' ? 50 : 250000}
                value={otherMonthlyDebts}
                onChange={(e) => setOtherMonthlyDebts(Number(e.target.value))}
                className="w-full accent-[#0D3B46]"
              />
            </div>

            {/* Cash Savings / Downpayment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>مجموع الكاش / المدخرات للدفعة الفورية الاولى</span>
                <span>{cashDownpayment.toLocaleString()} {currency}</span>
              </div>
              <input 
                type="range"
                min={currency === '$' ? 1000 : 5000000}
                max={currency === '$' ? 200000 : 300000000}
                step={currency === '$' ? 1000 : 5000000}
                value={cashDownpayment}
                onChange={(e) => setCashDownpayment(Number(e.target.value))}
                className="w-full accent-[#0D3B46]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Interest */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">فائدة افتراضية (%)</label>
                <input 
                  type="number"
                  step="0.1"
                  value={affordabilityInterestRate}
                  onChange={(e) => setAffordabilityInterestRate(Number(e.target.value))}
                  className="h-10 w-full px-3 text-xs border border-gray-200 bg-slate-50 rounded-xl font-bold font-mono text-center outline-none focus:border-[#C9A15A]"
                />
              </div>

              {/* Term */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">سنوات السداد</label>
                <input 
                  type="number"
                  value={affordabilityTermYears}
                  onChange={(e) => setAffordabilityTermYears(Number(e.target.value))}
                  className="h-10 w-full px-3 text-xs border border-gray-200 bg-slate-50 rounded-xl font-bold font-mono text-center outline-none focus:border-[#C9A15A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Pillar */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <span className="text-[10px] text-slate-400 font-extrabold block">القدرة الشرائية القصوى المقدرة لك</span>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-[#C9A15A] font-mono tracking-tight leading-none">
                {maxHomePurchaseValue.toLocaleString()} {currency}
              </h2>
              <span className="text-[10px] text-slate-400 block font-semibold">مجموع قيمة العقار أو السيارة الممكن شراؤها بالكامل</span>
            </div>

            <div className="border-t border-white/10 pt-3 space-y-3 font-bold text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-mono text-white">{maxEstimatedLoan.toLocaleString()} {currency}</span>
                <span className="text-[10px] text-slate-400">القرض الأقصى الممكن:</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-mono text-white">{cashDownpayment.toLocaleString()} {currency}</span>
                <span className="text-[10px] text-slate-400">الدفعة النقدية المتوفرة:</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-mono text-[#C9A15A]">{maxTotalAllowableInstallment.toLocaleString()} {currency}/شهر</span>
                <span className="text-[10px] text-slate-400">القسط الشهري الأقصى المسموح:</span>
              </div>
            </div>
          </div>

          <div className="bg-[#C9A15A]/10 border border-[#C9A15A]/25 rounded-3xl p-4 space-y-2">
            <span className="font-extrabold text-[#0D3B46] text-xs flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#0D3B46]" />
              الضوابط والتحليلات المالية
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
              بموجب أنظمة تقدير المعيار المالي المحلي، يُنصح بألا تتخطى التزاماتك الإجمالية الشهرية سقف الـ <strong>%40</strong> من راتبك الصافي لضمان المعيشة المستقرة والقدرة المستدامة على سداد الأقساط.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
