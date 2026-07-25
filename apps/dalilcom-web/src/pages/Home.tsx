import React, { useState } from 'react';
import { Building2, CarFront, ChevronDown, ChevronLeft, Key, List, Tag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { AdCard } from '../components/AdCard';
import { HomeSidebarWidgets } from '../components/home/HomeSidebarWidgets';
import { useAds } from '../context/AdsContext';
import { useAppSettings } from '../hooks/useAppSettings';
import { cn } from '../lib/utils';

function isRental(ad: any) {
  const text = `${ad.title} ${(ad.details || []).join(' ')} ${ad.currency}`;
  return ['إيجار', 'لإيجار', 'للإيجار', 'للايجار', 'اجار', '/شهر', '/يوم', '/أسبوع', '/سنة']
    .some(word => text.includes(word));
}

export function HomePage() {
  const { ads, realEstateCats } = useAds();
  const { settings } = useAppSettings();
  const [category, setCategory] = useState<'real-estate' | 'cars'>('real-estate');
  const [open, setOpen] = useState<'real-estate' | 'cars' | null>('real-estate');
  const navigate = useNavigate();
  const visibleCategory = settings.carsEnabled ? category : 'real-estate';
  const latest = ads.filter(ad => ad.category === visibleCategory);
  const realEstateCount = ads.filter(ad => ad.category === 'real-estate').length;
  const carsCount = ads.filter(ad => ad.category === 'cars').length;
  const carRows = [
    { id: 'all', title: 'كل إعلانات المركبات', count: carsCount, icon: List, url: '/ads?category=cars' },
    { id: 'sale', title: 'سيارات للبيع', count: ads.filter(a => a.category === 'cars' && !isRental(a)).length, icon: Tag, url: '/cars/brands' },
    { id: 'rent', title: 'سيارات للإيجار', count: ads.filter(a => a.category === 'cars' && isRental(a)).length, icon: Key, url: '/ads?category=cars' },
  ];

  const openSection = (next: 'real-estate' | 'cars') => {
    setCategory(next);
    setOpen(open === next ? null : next);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <h2 className="text-[17px] font-bold text-gray-900 mb-4 px-1">التصنيفات</h2>
          <div className="flex flex-col gap-3">
            <CategoryButton
              active={visibleCategory === 'real-estate'}
              icon={<Building2 size={24} />}
              color="bg-[#0D3B46]"
              title="العقارات"
              desc="شقق، فلل، تجاري، أراضي للبيع أو الإيجار"
              count={realEstateCount}
              open={open === 'real-estate'}
              onClick={() => openSection('real-estate')}
            />
            <SubList open={open === 'real-estate'}>
              <SubRow title="كل إعلانات العقارات" count={realEstateCount} onClick={() => navigate('/ads?category=real-estate')} />
              {realEstateCats.map(cat => (
                <SubRow key={cat.id} title={cat.ar} count={ads.filter(ad => ad.category === 'real-estate' && (ad.subCategory || '').includes(cat.ar)).length} onClick={() => navigate(`/real-estate/${cat.id}`)} />
              ))}
            </SubList>

            {settings.carsEnabled && (
              <>
                <CategoryButton
                  active={category === 'cars'}
                  icon={<CarFront size={24} />}
                  color="bg-[#C9A15A]"
                  title="المركبات"
                  desc="سيارات، دراجات، شاحنات للبيع أو الإيجار"
                  count={carsCount}
                  open={open === 'cars'}
                  onClick={() => openSection('cars')}
                />
                <SubList open={open === 'cars'}>
                  {carRows.map(row => <SubRow key={row.id} title={row.title} count={row.count} onClick={() => navigate(row.url)} />)}
                </SubList>
              </>
            )}
          </div>
        </div>
        <HomeSidebarWidgets />
      </div>

      <hr className="border-gray-200" />
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-bold text-gray-900">{visibleCategory === 'real-estate' ? 'أحدث العقارات' : 'أحدث السيارات'}</h2>
          <button onClick={() => navigate(`/ads?category=${visibleCategory}`)} className="text-[13px] font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer">عرض الكل</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {latest.map((item, idx) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }} transition={{ duration: .2, delay: idx * .03 }}>
                <AdCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
          {latest.length === 0 && <div className="col-span-full py-16 text-center text-[var(--color-secondary)] bg-white rounded-2xl border border-gray-100">لا توجد إعلانات في هذا القسم حالياً.</div>}
        </div>
      </div>
    </div>
  );
}

function CategoryButton({ active, icon, color, title, desc, count, open, onClick }: any) {
  return (
    <button onClick={onClick} className={cn('bg-white rounded-xl p-3 flex items-center justify-between w-full border shadow-sm', active ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20' : 'border-gray-100 hover:border-gray-300')}>
      <div className="flex items-center gap-4"><div className={cn('w-12 h-12 rounded-full flex items-center justify-center text-white', color)}>{icon}</div><div className="text-right"><h3 className="font-bold text-[16px] text-gray-900">{title}</h3><p className="text-[13px] text-gray-500">{desc}</p></div></div>
      <div className="flex items-center gap-1 text-gray-400"><span dir="ltr">({count})</span>{open ? <ChevronDown size={20} /> : <ChevronLeft size={20} />}</div>
    </button>
  );
}

function SubList({ open, children }: any) {
  return <AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="bg-white border border-gray-100 rounded-[16px] shadow-sm py-1 mb-2">{children}</div></motion.div>}</AnimatePresence>;
}

function SubRow({ title, count, onClick }: any) {
  return <button onClick={onClick} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-right"><span className="text-[14px] font-semibold text-gray-800">{title}</span><span className="text-[12px] text-[var(--color-secondary)]" dir="ltr">({count})</span></button>;
}
