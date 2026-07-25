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
    <div className="bg-white p-6 rounded-3xl border border-[#F6F2E8] space-y-4 text-right animate-fadeIn" dir="rtl">
      <label className="text-xs font-black text-[#0D3B46] block">تحديد سعر البيع أو الإيجار المتوقع</label>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1 text-right">
          <label className="text-xs font-bold text-[#0D3B46]">العملة</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full h-11 px-3 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl text-xs font-extrabold outline-none text-right"
          >
            <option value="ل.س">ليرة سورية (ل.س)</option>
            <option value="دولار">دولار أمريكي ($)</option>
          </select>
        </div>

        <div className="col-span-2 space-y-1 text-right">
          <label className="text-xs font-bold text-[#0D3B46] font-sans">السعر الإجمالي المطلوب *</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} 
            className="w-full h-11 px-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl text-xs font-extrabold font-mono text-center outline-none text-right"
            placeholder="السعر بالأرقام"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1 text-right">
          <label className="text-xs font-bold text-[#0D3B46]">رقم الاتصال</label>
          <input
            type="tel"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
            className="w-full h-11 px-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl text-xs font-extrabold font-mono text-right outline-none"
            placeholder="09xxxxxxxx"
          />
        </div>
        <div className="space-y-1 text-right">
          <label className="text-xs font-bold text-[#0D3B46]">رقم واتساب</label>
          <input
            type="tel"
            value={whatsappPhone}
            onChange={(e) => setWhatsappPhone(e.target.value)}
            className="w-full h-11 px-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl text-xs font-extrabold font-mono text-right outline-none"
            placeholder="963xxxxxxxxx"
          />
        </div>
      </div>
    </div>
  );
}
