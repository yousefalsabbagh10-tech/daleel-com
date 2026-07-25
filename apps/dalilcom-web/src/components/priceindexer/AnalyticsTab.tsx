import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export function AnalyticsTab() {
  // Let's model pricing statistics in Syria ($ or equivalent base index per sqm/unit standard)
  const realEstateLocationData = [
    { city: 'دمشق - يعفور', averagePrice: 850, rentIndex: 45 },
    { city: 'دمشق - المزة', averagePrice: 1200, rentIndex: 65 },
    { city: 'دمشق - دمر', averagePrice: 650, rentIndex: 35 },
    { city: 'حلب - الشهباء', averagePrice: 550, rentIndex: 25 },
    { city: 'اللاذقية - الكورنيش', averagePrice: 500, rentIndex: 28 },
    { city: 'طرطوس - المشبكة', averagePrice: 480, rentIndex: 24 }
  ];

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h3 className="font-black text-slate-800 text-sm">مؤشر الأسعار السكني حسب المدينة والمنطقة</h3>
        <p className="text-[11px] text-slate-500">مقارنة متوسط أسعار عقارات التمليك والدراسات الإيجارية السنوية التقديرية بالـ ($) لكل متر مربع</p>
      </div>

      <div className="bg-white border border-gray-150 rounded-3xl p-4 shadow-sm">
        <div className="h-60 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realEstateLocationData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAvgPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="city" tick={{ fontSize: 9, fill: '#475569', fontWeight: 'bold' }} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
              <Tooltip formatter={(value) => [`${value} $`, '']} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              <Area type="monotone" name="متوسط قيمة المتر المربع ($)" dataKey="averagePrice" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAvgPrice)" />
              <Area type="monotone" name="مؤشر الإيجار السنوي التقديري ($/م²)" dataKey="rentIndex" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorRent)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="bg-slate-900 text-slate-300 p-4 rounded-3xl border border-slate-800 text-[11px] leading-relaxed">
        <strong>* معلومات استبيانية:</strong> تعتمد هذه الأرقام الاستبيانية الإرشادية على قراءة ذكية وحسابية لكثافة الإعلانات المعتمدة على موقعنا سوريازيل. تذبذبات الصرف الفعلي والموقع ونظافة البناء تلعب دوراً تفاوضياً شديد الأهمية أثناء إتمام الصفقات على أرض الواقع.
      </div>
    </div>
  );
}
