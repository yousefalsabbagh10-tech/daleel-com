import React from 'react';
import { useAds } from '../../context/AdsContext';
import { SearchableSelect } from '../SearchableSelect';

interface CarInputsProps {
  carBrand: string;
  setCarBrand: (val: string) => void;
  carModel: string;
  setCarModel: (val: string) => void;
  carYear: string;
  setCarYear: (val: string) => void;
  carGear: string;
  setCarGear: (val: string) => void;
  carFuel: string;
  setCarFuel: (val: string) => void;
  carMileage: string;
  setCarMileage: (val: string) => void;
  carBodyType: string;
  setCarBodyType: (val: string) => void;
  carCondition: string;
  setCarCondition: (val: string) => void;
  carColor: string;
  setCarColor: (val: string) => void;
  carType: string;
  setCarType: (val: string) => void;
}

export function CarInputs({
  carBrand, setCarBrand,
  carModel, setCarModel,
  carYear, setCarYear,
  carGear, setCarGear,
  carFuel, setCarFuel,
  carMileage, setCarMileage,
  carBodyType, setCarBodyType,
  carCondition, setCarCondition,
  carColor, setCarColor,
  carType, setCarType
}: CarInputsProps) {
  const { brands, carModelsMap } = useAds();

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Brand */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">العلامة التجارية</label>
          <SearchableSelect
            value={carBrand}
            onChange={setCarBrand}
            options={brands.map(b => ({ value: b.ar, label: b.ar }))}
            placeholder="اختر العلامة التجارية..."
          />
        </div>

        {/* Model */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">طراز السيارة (الموديل)</label>
          {(() => {
            const brandEn = brands.find(b => b.ar === carBrand)?.en;
            const models = brandEn ? carModelsMap[brandEn] : [];
            
            if (models && models.length > 0) {
              return (
                <SearchableSelect
                  value={carModel}
                  onChange={setCarModel}
                  options={models.map(m => ({ value: m.ar, label: m.ar }))}
                  placeholder="اختر الموديل..."
                />
              );
            }
            return (
              <input
                type="text"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="مثال: لاندكروزر، كامري، سبورتج"
                className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
              />
            );
          })()}
        </div>

        {/* Year */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">سنة الصنع</label>
          <select
            value={carYear}
            onChange={(e) => setCarYear(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2015', '2010'].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Mileage */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">المسافة المقطوعة (كم)</label>
          <input
            type="number"
            value={carMileage}
            onChange={(e) => setCarMileage(e.target.value)}
            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold font-mono text-left"
          />
        </div>

        {/* Transmission */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">علبة التروس</label>
          <select
            value={carGear}
            onChange={(e) => setCarGear(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="أوتوماتيك">أوتوماتيك (Automatic)</option>
            <option value="عادي">عادي (Manual)</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">نوع الوقود</label>
          <select
            value={carFuel}
            onChange={(e) => setCarFuel(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="بنزين">بنزين</option>
            <option value="ديزل">ديزل</option>
            <option value="كهرباء">كهرباء بالكامل</option>
            <option value="هجين">هجين (Hybrid)</option>
          </select>
        </div>

        {/* Body style */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">هيكل السيارة</label>
          <select
            value={carBodyType}
            onChange={(e) => setCarBodyType(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="سيدان">سيدان (Sedan)</option>
            <option value="دفع رباعي SUV">دفع رباعي (SUV)</option>
            <option value="هاتشباك">هاتشباك</option>
            <option value="بيك أب">بيك أب (طونطينة)</option>
          </select>
        </div>

        {/* Condition */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">الحالة الفنية</label>
          <select
            value={carCondition}
            onChange={(e) => setCarCondition(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="خالية تماماً">خالية تماماً من الداخل بظهر نظيف</option>
            <option value="مستعمل نظيف">مستعمل نظيف</option>
            <option value="يحتاج صيانة">يحتاج صيانة بسيطة</option>
          </select>
        </div>

        {/* Vehicle Purpose */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">الغرض من العرض</label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          >
            <option value="للبيع">للبيع</option>
            <option value="للإيجار">للإيجار المباشر</option>
          </select>
        </div>

        {/* Color */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600">لون الهيكل الخارجي</label>
          <input
            type="text"
            value={carColor}
            onChange={(e) => setCarColor(e.target.value)}
            placeholder="مثال: أبيض، ميتالك، أسود"
            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs"
          />
        </div>
      </div>
    </div>
  );
}
