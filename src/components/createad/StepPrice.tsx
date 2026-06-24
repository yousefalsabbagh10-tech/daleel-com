import React from 'react';

interface StepPriceProps {
  currency: string;
  setCurrency: (currency: string) => void;
  price: number | '';
  setPrice: (price: number | '') => void;
}

export function StepPrice({
  currency,
  setCurrency,
  price,
  setPrice
}: StepPriceProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-150 space-y-4 text-right animate-fadeIn" dir="rtl">
      <label className="text-xs font-black text-[#1e3c5a] block">تحديد سعر البيع أو الإيجار المتوقع</label>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1 text-right">
          <label className="text-xs font-bold text-gray-600">العملة</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full h-11 px-3 bg-slate-50 border border-gray-200 rounded-xl text-xs font-extrabold outline-none text-right"
          >
            <option value="ل.س">ليرة سورية (ل.س)</option>
            <option value="دولار">دولار أمريكي ($)</option>
          </select>
        </div>

        <div className="col-span-2 space-y-1 text-right">
          <label className="text-xs font-bold text-gray-600 font-sans">السعر الإجمالي المطلوب *</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} 
            className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-xs font-extrabold font-mono text-center outline-none text-right"
            placeholder="السعر بالأرقام"
          />
        </div>
      </div>
    </div>
  );
}
