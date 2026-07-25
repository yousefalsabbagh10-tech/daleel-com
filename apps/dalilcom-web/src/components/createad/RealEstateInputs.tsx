import React from 'react';

interface RealEstateInputsProps {
  reRooms: string;
  setReRooms: (val: string) => void;
  reBaths: string;
  setReBaths: (val: string) => void;
  reArea: string;
  setReArea: (val: string) => void;
  reType: string;
  setReType: (val: string) => void;
  reFloor: string;
  setReFloor: (val: string) => void;
  reFurnished: string;
  setReFurnished: (val: string) => void;
  reBuildingAge: string;
  setReBuildingAge: (val: string) => void;
  buildingTotalFloors?: string;
  setBuildingTotalFloors?: (val: string) => void;
  heatingType?: string;
  setHeatingType?: (val: string) => void;
  hasElevator?: string;
  setHasElevator?: (val: string) => void;
  hasParking?: string;
  setHasParking?: (val: string) => void;
  titleDeedType?: string;
  setTitleDeedType?: (val: string) => void;
  propertyDirection?: string;
  setPropertyDirection?: (val: string) => void;
  advertiserType?: string;
  setAdvertiserType?: (val: string) => void;
}

export function RealEstateInputs({
  reRooms, setReRooms,
  reBaths, setReBaths,
  reArea, setReArea,
  reType, setReType,
  reFloor, setReFloor,
  reFurnished, setReFurnished,
  reBuildingAge, setReBuildingAge,
  buildingTotalFloors = '', setBuildingTotalFloors,
  heatingType = '', setHeatingType,
  hasElevator = '', setHasElevator,
  hasParking = '', setHasParking,
  titleDeedType = '', setTitleDeedType,
  propertyDirection = '', setPropertyDirection,
  advertiserType = '', setAdvertiserType
}: RealEstateInputsProps) {
  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rooms count */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">عدد الغرف والصالونات</label>
          <select
            value={reRooms}
            onChange={(e) => setReRooms(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold"
          >
            <option value="1 غرف">استوديو / غرفة واحدة</option>
            <option value="2 غرف">غرفتين وصالة</option>
            <option value="3 غرف">3 غرف وصالة مريحة</option>
            <option value="4 غرف">4 غرف وصالة واسعة</option>
            <option value="5 غرف">5 غرف أو أكثر</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">عدد دورات المياه (الحمامات)</label>
          <select
            value={reBaths}
            onChange={(e) => setReBaths(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold"
          >
            <option value="1 حمام">حمام واحد (1)</option>
            <option value="2 حمام">حمّامين (2)</option>
            <option value="3 حمام">3 حمامات أو أكثر</option>
          </select>
        </div>

        {/* Area */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">المساحة الإجمالية (متر مربع)</label>
          <input
            type="text"
            value={reArea}
            onChange={(e) => setReArea(e.target.value)}
            placeholder="مثال: 120 متر مربع"
            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold font-mono"
          />
        </div>

        {/* Purpose */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">نوع وهدف العقد</label>
          <select
            value={reType}
            onChange={(e) => setReType(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold"
          >
            <option value="للبيع">عرض للبيع النهائي</option>
            <option value="للإيجار">عرض للإيجار السكني / السنوي</option>
          </select>
        </div>

        {/* Floor */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">الطابق الحالي</label>
          <input
            type="text"
            value={reFloor}
            onChange={(e) => setReFloor(e.target.value)}
            placeholder="مثال: الطابق الثالث، أرضي، قبو"
            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          />
        </div>

        {/* Furnished */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">حالة الفرش والديكور</label>
          <select
            value={reFurnished}
            onChange={(e) => setReFurnished(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="غير مفروش">على بياض / غير مفروش</option>
            <option value="مفروش بالكامل">مفروش بفرش نظيف وجاهز</option>
            <option value="شبه مفروش">شبه مفروش (أجهزة كهربائية فقط)</option>
          </select>
        </div>

        {/* Building Age */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">عمر البناء الافتراضي</label>
          <select
            value={reBuildingAge}
            onChange={(e) => setReBuildingAge(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="جديد / صفر">كسوة جديدة تماماً وعمر البناء صفر</option>
            <option value="1-5 سنوات">بين سنة وخمس سنوات</option>
            <option value="5-10 سنوات">بين 5 و10 سنوات</option>
            <option value="قديم مخدم">حوالي عشر سنوات أو أكثر فما فوق</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">عدد طوابق البناء</label>
          <input type="text" value={buildingTotalFloors} onChange={(event) => setBuildingTotalFloors?.(event.target.value)} className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">نوع التدفئة</label>
          <input type="text" value={heatingType} onChange={(event) => setHeatingType?.(event.target.value)} className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">الطابو / الملكية</label>
          <input type="text" value={titleDeedType} onChange={(event) => setTitleDeedType?.(event.target.value)} className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">الاتجاه / الإطلالة</label>
          <input type="text" value={propertyDirection} onChange={(event) => setPropertyDirection?.(event.target.value)} className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">مصعد</label>
          <select value={hasElevator} onChange={(event) => setHasElevator?.(event.target.value)} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs">
            <option value="">اختياري</option>
            <option value="نعم">نعم</option>
            <option value="لا">لا</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">موقف سيارات</label>
          <select value={hasParking} onChange={(event) => setHasParking?.(event.target.value)} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs">
            <option value="">اختياري</option>
            <option value="نعم">نعم</option>
            <option value="لا">لا</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">نوع المعلن</label>
          <input type="text" value={advertiserType} onChange={(event) => setAdvertiserType?.(event.target.value)} placeholder="المالك / وسيط" className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs" />
        </div>
      </div>
    </div>
  );
}
