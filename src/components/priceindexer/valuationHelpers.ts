export const NEIGHBORHOODS = [
  { value: "دمشق, مشروع دمر", label: "دمشق, مشروع دمر (سكني راقي)" },
  { value: "دمشق, يعفور", label: "دمشق, فلل يعفور السياحية" },
  { value: "دمشق, المزة أوتوستراد", label: "دمشق, المزة أوتوستراد" },
  { value: "حلب, الشهباء", label: "حلب, حي الشهباء" },
  { value: "اللاذقية, الكورنيش الجنوبي", label: "اللاذقية, الكورنيش الجنوبي بمطل بحري" },
  { value: "طرطوس, المشبكة", label: "طرطوس, حي المشبكة الجديد" }
];

export const CAR_BRANDS = [
  { value: "تويوتا", label: "تويوتا Toyota" },
  { value: "هيونداي", label: "هيونداي Hyundai" },
  { value: "كيا", label: "كيا Kia" },
  { value: "مرسيدس", label: "مرسيدس Mercedes" },
  { value: "بي إم دبليو", label: "بي إم دبليو BMW" }
];

interface EvaluateParams {
  valType: 'cars' | 'real-estate';
  currency: 'ل.س' | '$';
  carBrand: string;
  carYear: string;
  carMileage: number;
  carCondition: 'excellent' | 'good' | 'fair';
  locNeighborhood: string;
  reArea: number;
  userAskingPrice: number | '';
}

export function evaluateHeuristic({
  valType,
  currency,
  carBrand,
  carYear,
  carMileage,
  carCondition,
  locNeighborhood,
  reArea,
  userAskingPrice
}: EvaluateParams) {
  let priceBase = 0;
  
  if (valType === 'cars') {
    const multiplier = currency === '$' ? 1 : 14000;
    let brandVal = 20000;
    if (carBrand === 'كيا') brandVal = 14000;
    if (carBrand === 'هيونداي') brandVal = 16000;
    if (carBrand === 'مرسيدس') brandVal = 45000;

    const yearDiff = 2026 - parseInt(carYear, 10);
    let yearFactor = Math.pow(0.91, Math.max(0, yearDiff));
    let mileageFactor = Math.max(0.7, 1 - (carMileage / 350000));
    
    let condFactor = 1.0;
    if (carCondition === 'good') condFactor = 0.9;
    if (carCondition === 'fair') condFactor = 0.75;

    priceBase = Math.round(brandVal * yearFactor * mileageFactor * condFactor * multiplier);
  } else {
    const multiplier = currency === '$' ? 1 : 14000;
    let areaCost = 450;
    if (locNeighborhood.includes('يعفور')) areaCost = 900;
    if (locNeighborhood.includes('المزة')) areaCost = 1200;
    if (locNeighborhood.includes('الشهباء')) areaCost = 550;

    priceBase = Math.round(reArea * areaCost * multiplier);
  }

  const minBounds = Math.round(priceBase * 0.92);
  const maxBounds = Math.round(priceBase * 1.08);
  const confidence = 'high';

  let isOverpriced = false;
  let askingDiffPerc = null;
  if (userAskingPrice && userAskingPrice > 0) {
    askingDiffPerc = Math.round(((Number(userAskingPrice) - priceBase) / priceBase) * 100);
    isOverpriced = Number(userAskingPrice) > maxBounds;
  }

  return {
    fairValue: priceBase,
    minBounds,
    maxBounds,
    confidence,
    isOverpriced,
    askingDiffPerc,
    sampleCount: valType === 'cars' ? 14 : 9,
    roi: valType === 'real-estate' ? 6.8 : undefined,
  };
}
