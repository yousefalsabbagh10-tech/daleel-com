import React, { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useAds } from '../context/AdsContext';

export function NotificationsPage() {
  const {
    notifications,
    unreadNotificationsCount,
    markAllNotificationsRead,
    clearAllNotifications,
    addNotification,
    deleteNotification,
  } = useAds();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const createSystemNotification = async () => {
    await addNotification({
      title: 'إشعار نظام جديد',
      body: 'تم إنشاء هذا الإشعار من واجهة المستخدم وحفظه في قاعدة البيانات.',
      date: 'الآن',
    });
    showToast('تم حفظ الإشعار في قاعدة البيانات');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-1 py-4 pb-24 relative select-none" dir="rtl">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl z-50">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between border-b border-[#F6F2E8] pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#C9A15A]/10 p-2.5 rounded-2xl text-[#C9A15A]">
            <Bell size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B]">مركز الإشعارات</h2>
            <p className="text-[12px] text-[#C9A15A] font-semibold mt-0.5">البيانات محفوظة في قاعدة البيانات</p>
          </div>
        </div>
        <span className="bg-[#C9A15A]/10 text-[#C9A15A] text-xs font-extrabold px-3 py-1.5 rounded-full">
          {unreadNotificationsCount} غير مقروء
        </span>
      </div>

      <div className="flex justify-between items-center bg-white px-2">
        <button onClick={() => { markAllNotificationsRead(); showToast('تم تعليم الإشعارات كمقروءة'); }} className="text-xs font-black text-[#C9A15A] flex items-center gap-1.5">
          <Check size={14} /> تعيين الكل كمقروء
        </button>
        <button onClick={() => { clearAllNotifications(); showToast('تم حذف الإشعارات من قاعدة البيانات'); }} className="text-xs font-black text-[#C9A15A] flex items-center gap-1.5">
          <Trash2 size={14} /> حذف الكل
        </button>
      </div>

      <button onClick={createSystemNotification} className="w-full h-11 rounded-xl bg-[#0D3B46] text-white text-xs font-black">
        إنشاء إشعار وحفظه في قاعدة البيانات
      </button>

      <div className="space-y-3.5">
        {notifications.map(item => (
          <div key={item.id} className={`p-4 sm:p-5 rounded-[20px] border relative ${item.isRead ? 'bg-white border-[#F6F2E8]' : 'bg-[#C9A15A]/10 border-[#C9A15A]/30'}`}>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className={`p-2 rounded-xl shrink-0 ${item.isRead ? 'bg-[#F6F2E8] text-[#C9A15A]' : 'bg-[#C9A15A]/20 text-[#0D3B46]'}`}>
                <Bell size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2 mb-1.5">
                  <h3 className="font-extrabold text-xs sm:text-sm leading-snug text-[#2B2B2B]">{item.title}</h3>
                  <span className="text-[10px] font-bold text-[#C9A15A] shrink-0">{item.date}</span>
                </div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#0D3B46]">{item.body}</p>
              </div>
              <button onClick={() => deleteNotification(item.id)} className="p-1.5 hover:bg-[#F6F2E8] rounded-lg text-[#C9A15A] hover:text-[#C9A15A]">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="py-20 text-center text-[#C9A15A] bg-white rounded-3xl border border-dashed border-[#E3C98D]">
            صندوق الوارد فارغ
          </div>
        )}
      </div>
    </div>
  );
}
