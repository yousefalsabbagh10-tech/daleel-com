import React, { useState } from 'react';
import { AdItem } from '../../types';
import { Flame, Send, Phone } from 'lucide-react';

interface OfferTabProps {
  item: AdItem;
}

export function OfferTab({ item }: OfferTabProps) {
  const currency = item.currency || 'ل.س';
  const originalPrice = item.price;

  const [bidPrice, setBidPrice] = useState<number>(Math.floor(item.price * 0.9));
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; sender: 'user' | 'agent' | 'system'; text: string; time?: string }>>([
    {
      id: 1,
      sender: 'agent',
      text: `مرحباً بك! أنا نظام وساطة سوريازيل الذكي 🇸🇾. يمكنك تقديم عرض سعر ومساومة البائع فورياً هنا. السعر المطلوب حالياً هو ${item.price.toLocaleString('en-US')} ${currency}. ما هو عرضك المالي المقترح؟`,
      time: 'الآن'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const formattedPrice = (priceVal: number) => {
    return `${priceVal.toLocaleString('en-US')} ${currency}`;
  };

  const whatsappUrl = `https://wa.me/963900000000?text=${encodeURIComponent(
    `مرحباً سوريازيل 🇸🇾، أقترح تفاوضاً وشراءً للإعلان:\n` +
    `• الإعلان: ${item.title}\n` +
    `• السعر المطلوب: ${formattedPrice(item.price)}\n` +
    `• عرضي المقترح: ${formattedPrice(bidPrice)}`
  )}`;

  const handleSendOffer = () => {
    if (!bidPrice || bidPrice <= 0) return;
    
    const rawTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user' as const,
      text: `أقترح شراء هذا العقار/المركبة بعرض مالي قيمته: ${formattedPrice(bidPrice)}. هل هذا مناسب؟`,
      time: rawTime
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const percentageOfOriginal = (bidPrice / originalPrice) * 100;
      let reply = '';

      if (percentageOfOriginal < 75) {
        reply = `❌ عذراً، عرضك البالغ ${formattedPrice(bidPrice)} يمثل حوالي ${Math.round(percentageOfOriginal)}% فقط من السعر المطلوب. هذا العرض منخفض جداً ومستبعد من قبل البائع. ننصح برفع السعر إلى 85% على الأقل لتجذب العميل الجاد.`;
      } else if (percentageOfOriginal >= 75 && percentageOfOriginal < 90) {
        reply = `⚠️ عرضك (${formattedPrice(bidPrice)}) معقول نسبياً ولكنه لا يزال أقل من الحد المتوقع للترحيب الفوري. يمكننا تمريره للبائع في حال كنت مستعداً للتواصل وبدء المعاينة الجادة اليوم. يرجى النقر على زر الواتساب لمواصلة النقاش.`;
      } else if (percentageOfOriginal >= 90 && percentageOfOriginal < 98) {
        reply = `✨ ممتاز! عرض السعر (${formattedPrice(bidPrice)}) يمثل حول ${Math.round(percentageOfOriginal)}% من القيمة المطلوبة. هذا عرض شديد الجدية وقريب جداً من الاتفاق! يرجى النقر الآن على زر الواتساب لإتمام الفحص التقني ومعاينة المستندات الرسمية فوراً.`;
      } else {
        reply = `🎉 رائع جداً! هذا العرض كامل ومطابق لمتطلبات البائع للموافقة الفورية. سنقوم بتأكيد رغبتك والتواصل مع البائع لتجهيز عقود البيع فوراً. اضغط على خيار التواصل بالأسفل لإتمام الحجز الآن!`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent' as const,
          text: reply,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col h-[52vh] overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-rose-500 animate-pulse" />
          <span className="text-xs font-black text-rose-500">مفاوض الأسعار الذكي سوريازيل</span>
        </div>
        <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">نظام ذكي للتفاوض الآلي نيابة عن البائعين</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 p-2 bg-slate-950 rounded-2xl border border-slate-850">
        {chatMessages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${isAgent ? 'mr-0 ml-auto' : 'mr-auto ml-0'}`}
            >
              <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                isAgent 
                  ? 'bg-slate-900 text-slate-100 pr-4 rounded-tr-none border-r-4 border-rose-500' 
                  : 'bg-rose-500 text-white pl-4 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
              <span className={`text-[9px] text-slate-500 mt-1 ${isAgent ? 'text-right' : 'text-left'}`}>
                {msg.sender === 'agent' ? 'الوسيط الذكي' : 'أنت'} • {msg.time || 'الآن'}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex flex-col mr-0 ml-auto max-w-[80%]">
            <div className="p-3 bg-slate-900 text-slate-400 rounded-2xl text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              <span>يقوم العقل الذكي بتحليل عرضك المقترح...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Action Form */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850 flex items-center gap-3 shrink-0 flex-col sm:flex-row">
        <div className="flex-1 w-full flex items-center gap-3">
          <div className="text-[11px] text-slate-400 pr-2 shrink-0">عرض السعر ({currency}):</div>
          <input 
            type="number"
            step={100}
            value={bidPrice}
            onChange={(e) => setBidPrice(Number(e.target.value))}
            className="flex-1 h-9 bg-slate-900 border border-slate-800 rounded-lg outline-none text-xs text-white px-3 font-bold"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto self-stretch sm:self-auto">
          <button 
            onClick={handleSendOffer}
            disabled={isTyping}
            className="flex-1 sm:flex-none h-9 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-800 text-white rounded-lg px-4 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send size={13} />
            أرسل عرضك
          </button>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            className="h-9 w-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center shrink-0"
            title="مراسلة عبر واتساب فوراً بالطلب"
          >
            <Phone size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
