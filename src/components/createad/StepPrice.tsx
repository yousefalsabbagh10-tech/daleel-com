import React from 'react';

interface StepPriceProps {
  currency: string;
  setCurrency: (currency: string) => void;
  price: number | '';
  setPrice: (price: number | '') => void;
  ownerPhone: string;
  setOwnerPhone: (phone: string) => void;
  whatsappPhone: string;
  setWhatsappPhone: (phone: string) => void;
}

export function StepPrice({
  currency,
  setCurrency,
  price,
  setPrice,
  ownerPhone,
  setOwnerPhone,
  whatsappPhone,
  setWhatsappPhone
}: StepPriceProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-150 space-y-5 text-right animate-fadeIn" dir="rtl">
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

      <div className="border-t border-gray-100 pt-4 space-y-1">
        <label className="text-xs font-black text-[#1e3c5a] block">رقم هاتف المعلن للتواصل *</label>
        <p className="text-[11px] text-gray-400 font-medium">هذا الرقم سيظهر للمشترين عند الضغط على "اتصل بالمعلن"</p>
        <input 
          type="tel" 
          value={ownerPhone} 
          onChange={(e) => setOwnerPhone(e.target.value)} 
          className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm font-extrabold font-mono outline-none text-left"
          placeholder="مثال: 0933000000"
          dir="ltr"
        />
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-1">
        <label className="text-xs font-black text-[#1e3c5a] block">رقم واتساب للتواصل (اختياري)</label>
        <p className="text-[11px] text-gray-400 font-medium">إذا كان رقم الواتساب مختلفاً عن رقم الهاتف أعلاه</p>
        <input 
          type="tel" 
          value={whatsappPhone} 
          onChange={(e) => setWhatsappPhone(e.target.value)} 
          className="w-full h-11 px-4 bg-slate-50 border border-gray-200 rounded-xl text-sm font-extrabold font-mono outline-none text-left"
          placeholder="مثال: 0933000000"
          dir="ltr"
        />
      </div>
    </div>
  );
}

