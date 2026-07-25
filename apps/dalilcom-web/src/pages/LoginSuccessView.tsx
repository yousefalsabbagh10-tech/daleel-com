import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';

interface LoginSuccessViewProps {
  phone: string;
  onCreateAd: () => void;
  onLogout: () => void;
}

export function LoginSuccessView({ phone, onCreateAd, onLogout }: LoginSuccessViewProps) {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-500" dir="rtl">
      <div className="w-20 h-20 bg-[#C9A15A]/10 text-[#0D3B46] rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck size={40} />
      </div>
      <h2 className="text-2xl font-bold mb-2">مرحباً بك في سوريازيل!</h2>
      <p className="text-gray-500 mb-8 text-[15px]">
        أنت مسجل الدخول بالرقم: <span className="font-semibold text-gray-800" dir="ltr">{phone}</span>
      </p>
      <button
        onClick={onCreateAd}
        className="w-full bg-[#0D3B46] text-white py-3.5 rounded-xl font-bold hover:bg-[#0b5ed7] transition-colors mb-4 shadow-sm shadow-[#0D3B46]/10 cursor-pointer"
      >
        أضف إعلان جديد
      </button>
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 text-[#C9A15A] py-3 font-medium hover:bg-[#C9A15A]/10 rounded-xl transition-colors cursor-pointer"
      >
        <LogOut size={18} />
        تسجيل الخروج
      </button>
    </div>
  );
}
