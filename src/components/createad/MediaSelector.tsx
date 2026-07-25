import { Trash2, Upload, Video } from 'lucide-react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

type PresetImage = { url: string; label: string };

interface MediaSelectorProps {
  category: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
  videoUrls: string[];
  setVideoUrls: Dispatch<SetStateAction<string[]>>;
  currentMaxImages: number;
  currentMaxVideos: number;
  PRESET_CAR_IMAGES: PresetImage[];
  PRESET_HOME_IMAGES: PresetImage[];
}

const readFile = (file: File) => new Promise<string>((resolve) => {
  const reader = new FileReader();
  reader.onloadend = () => resolve(String(reader.result || ''));
  reader.readAsDataURL(file);
});

export function MediaSelector({
  category, imageUrl, setImageUrl, imageUrls, setImageUrls, videoUrls, setVideoUrls,
  currentMaxImages, currentMaxVideos, PRESET_CAR_IMAGES, PRESET_HOME_IMAGES,
}: MediaSelectorProps) {
  const presets = category === 'cars' ? PRESET_CAR_IMAGES : PRESET_HOME_IMAGES;

  const addImage = (url: string) => {
    if (imageUrls.length >= currentMaxImages) return alert(`الحد الأقصى ${currentMaxImages} صور.`);
    if (imageUrls.includes(url)) return;
    setImageUrls(prev => [...prev, url]);
    if (!imageUrl || imageUrl === presets[0]?.url) setImageUrl(url);
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    for (const file of files) {
      if (imageUrls.length >= currentMaxImages) return alert(`الحد الأقصى ${currentMaxImages} صور.`);
      const dataUrl = await readFile(file);
      setImageUrls(prev => prev.includes(dataUrl) ? prev : [...prev, dataUrl]);
      if (!imageUrl || imageUrl === presets[0]?.url) setImageUrl(dataUrl);
    }
    event.target.value = '';
  };

  const uploadVideos = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    for (const file of files) {
      if (videoUrls.length >= currentMaxVideos) return alert(`الحد الأقصى ${currentMaxVideos} فيديو.`);
      if (!file.type.startsWith('video/')) continue;
      const dataUrl = await readFile(file);
      setVideoUrls(prev => prev.includes(dataUrl) ? prev : [...prev, dataUrl]);
    }
    event.target.value = '';
  };
  
  const removeVideo = (index: number) => {
    setVideoUrls(prev => prev.filter((_, idx) => idx !== index));
  };

  const removeImage = (index: number) => {
    const removed = imageUrls[index];
    const next = imageUrls.filter((_, idx) => idx !== index);
    setImageUrls(next);
    if (imageUrl === removed) setImageUrl(next[0] || '');
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h3 className="font-extrabold text-[#1e3c5a] text-sm sm:text-md">إضافة الوسائط</h3>
        <p className="text-xs text-gray-500 mt-1">
          مسموح لك بإضافة {currentMaxImages} صور و {currentMaxVideos} فيديو.
        </p>
      </div>

      <div className="bg-white border border-gray-150 p-4 rounded-3xl space-y-3">
        <label className="text-xs font-bold text-gray-700 block">اختر من الصور الجاهزة:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {presets.map(item => {
            const selected = imageUrls.includes(item.url);
            return (
              <button key={item.url} type="button" onClick={() => addImage(item.url)}
                className={`relative rounded-xl overflow-hidden aspect-video border group transition-all cursor-pointer ${selected ? 'border-indigo-600 scale-95 ring-2 ring-indigo-500/20' : 'border-gray-200 hover:scale-[1.02]'}`}>
                <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-[9.5px] text-white font-bold text-center">{item.label}</div>
                {selected && <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-4 h-4 text-[8px] font-black">✓</div>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-dashed border-gray-300 p-6 rounded-3xl text-center space-y-3 hover:border-indigo-500 relative cursor-pointer group">
        <input type="file" accept="image/*" multiple onChange={uploadImages} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Upload size={22} /></div>
          <p className="text-xs font-black text-slate-800">اضغط هنا لرفع الصور من جهازك</p>
          <p className="text-[10px] font-bold text-gray-550">اختر الصور وسيتم إرفاقها بالإعلان تلقائياً.</p>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-650 block">الصور المرفقة ({imageUrls.length}/{currentMaxImages}):</span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square border border-gray-200 rounded-xl overflow-hidden group">
                <img src={url} alt="Attached" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1" title="حذف الصورة"><Trash2 size={11} /></button>
                {imageUrl === url ? <div className="absolute inset-x-0 bottom-0 bg-indigo-600 text-white text-[8.5px] font-black text-center py-0.5">غلاف</div>
                  : <button type="button" onClick={() => setImageUrl(url)} className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[8px] font-bold py-0.5 opacity-0 group-hover:opacity-100">تحديد كغلاف</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-150 p-4 rounded-3xl space-y-3">
        <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
          <Video size={14} className="text-red-500" /> فيديو اختياري من ملفات الجهاز
        </label>
        <div className="border border-dashed border-gray-300 rounded-2xl p-5 text-center relative hover:border-rose-500">
          <input type="file" accept="video/*" multiple onChange={uploadVideos} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <p className="text-xs font-black text-slate-800">اضغط لاختيار ملفات فيديو</p>
          <p className="text-[10px] text-slate-400 font-semibold">سيتم رفعها وحفظها مع الإعلان، بدون روابط خارجية.</p>
        </div>
        {videoUrls.length > 0 && (
          <div className="space-y-4 mt-4">
            <span className="text-xs font-bold text-gray-650 block">الفيديوهات المرفقة ({videoUrls.length}/{currentMaxVideos}):</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videoUrls.map((url, index) => (
                <div key={index} className="space-y-2">
                  <video src={url} controls className="w-full max-h-56 rounded-2xl bg-black" />
                  <button type="button" onClick={() => removeVideo(index)} className="w-full bg-rose-50 text-rose-600 rounded-xl px-3 py-2 text-xs font-bold hover:bg-rose-100 transition-colors">حذف الفيديو</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
