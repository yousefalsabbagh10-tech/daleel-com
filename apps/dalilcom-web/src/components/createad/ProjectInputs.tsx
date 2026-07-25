import React from 'react';

interface ProjectInputsProps {
  projectStatusState: string;
  setProjectStatusState: (val: string) => void;
  deliveryYearState: string;
  setDeliveryYearState: (val: string) => void;
  projectFloorsState: number | '';
  setProjectFloorsState: (val: number | '') => void;
  projectTypeState: string;
  setProjectTypeState: (val: string) => void;
  projectFinishingState: string;
  setProjectFinishingState: (val: string) => void;
  projectLandAreaState: number | '';
  setProjectLandAreaState: (val: number | '') => void;
  projectUnitsCountState: number | '';
  setProjectUnitsCountState: (val: number | '') => void;
}

export function ProjectInputs({
  projectStatusState, setProjectStatusState,
  deliveryYearState, setDeliveryYearState,
  projectFloorsState, setProjectFloorsState,
  projectTypeState, setProjectTypeState,
  projectFinishingState, setProjectFinishingState,
  projectLandAreaState, setProjectLandAreaState,
  projectUnitsCountState, setProjectUnitsCountState
}: ProjectInputsProps) {
  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0D3B46]">مستوى إنجاز المشروع الحركي</label>
          <select
            value={projectStatusState}
            onChange={(e) => setProjectStatusState(e.target.value)}
            className="w-full h-11 px-3 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none text-xs"
          >
            <option value="تحت الأرض / حفر وتأسيس">تأسيس وحفر الأراضي الأولية</option>
            <option value="هيكل وعضم قيد التشبيك">بناء الهياكل والصب المالي (على العظم)</option>
            <option value="كسوة داخلية وتشطيب">مرحلة التشطيبات والكسوة الداخلية</option>
            <option value="جاهز للتسليم خلال أشهر">جاهز للتسليم الفوري القريب جداً</option>
          </select>
        </div>

        {/* Delivery year */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0D3B46]">السنة المتوقعة للتسليم النهائي للعميل</label>
          <select
            value={deliveryYearState}
            onChange={(e) => setDeliveryYearState(e.target.value)}
            className="w-full h-11 px-3 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none text-xs"
          >
            {['2025', '2026', '2027', '2028', '2029'].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Floors count */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0D3B46]">عدد طوابق المشروع بالكامل</label>
          <input
            type="number"
            value={projectFloorsState}
            onChange={(e) => setProjectFloorsState(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="مثال: 5 طوابق"
            className="w-full h-11 px-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none text-xs font-bold"
          />
        </div>

        {/* Project Finishing */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0D3B46]">حالة تسليم شقق المشروع</label>
          <select
            value={projectFinishingState}
            onChange={(e) => setProjectFinishingState(e.target.value)}
            className="w-full h-11 px-3 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none text-xs"
          >
            <option value="على العضم">على العظم بالكامل</option>
            <option value="نصف كسوة">نصف كسوة مخدمة</option>
            <option value="سوبر ديلوكس جاهز">سوبر ديلوكس متم كامل ومفتاح</option>
          </select>
        </div>

        {/* Land Area */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#2B2B2B]">مساحة أرض المشروع (م²)</label>
          <input
            type="number"
            value={projectLandAreaState}
            onChange={(e) => setProjectLandAreaState(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="مثال: 4500"
            className="w-full h-11 px-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none text-xs font-bold font-mono"
          />
        </div>

        {/* Units count */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0D3B46]">عدد الوحدات أو الشقق الكلي</label>
          <input
            type="number"
            value={projectUnitsCountState}
            onChange={(e) => setProjectUnitsCountState(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="مثال: 40 شقة"
            className="w-full h-11 px-4 bg-[#F6F2E8] border border-[#E3C98D] rounded-xl outline-none text-xs font-bold font-mono"
          />
        </div>
      </div>
    </div>
  );
}
