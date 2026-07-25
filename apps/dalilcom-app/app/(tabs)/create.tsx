import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { StepHeader } from '../../components/createad/StepHeader';
import { CategoryStep } from '../../components/createad/CategoryStep';
import { DetailsStep } from '../../components/createad/DetailsStep';
import { LocationStep } from '../../components/createad/LocationStep';
import { MediaStep } from '../../components/createad/MediaStep';
import { PriceStep } from '../../components/createad/PriceStep';
import { CreateAdForm, initialForm, steps } from '../../components/createad/data';

export default function CreateTab() {
  const router = useRouter();
  const { addAd } = useApp();
  const [form, setForm] = useState<CreateAdForm>(initialForm);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const setField = (key: keyof CreateAdForm, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const stepView = useMemo(() => {
    const props = { form, setField };
    if (step === 0) return <CategoryStep {...props} />;
    if (step === 1) return <DetailsStep {...props} />;
    if (step === 2) return <LocationStep {...props} />;
    if (step === 3) return <MediaStep {...props} />;
    return <PriceStep {...props} />;
  }, [form, step]);

  const validate = () => {
    if (step === 0 && !form.subcategory) return 'اختر القسم الفرعي';
    if (step === 1 && (!form.title.trim() || !form.description.trim())) return 'اكتب العنوان والوصف';
    if (step === 1 && form.category === 'cars' && (!form.carBrand.trim() || !form.carModel.trim())) return 'اكتب ماركة وموديل السيارة';
    if (step === 2 && !form.neighborhood.trim()) return 'اكتب الحي أو العنوان';
    if (step === 3 && !form.imageUrl.trim()) return 'أضف صورة للإعلان';
    if (step === 4 && !(Number(form.price.replace(/[^\d.]/g, '')) > 0)) return 'أدخل سعر صحيح';
    return '';
  };

  const next = async () => {
    const error = validate();
    if (error) return Alert.alert('تنبيه', error);
    if (step < steps.length - 1) return setStep(prev => prev + 1);
    await submit();
  };

  const submit = async () => {
    setSaving(true);
    try {
      const ad = await addAd(buildPayload(form));
      const path = form.category === 'cars' ? `/details/car/${ad.id}` : `/details/property/${ad.id}`;
      setForm(initialForm);
      setStep(0);
      router.push(path as any);
    } catch (error: any) {
      Alert.alert('فشل الحفظ', error?.message || 'تعذر حفظ الإعلان');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <StepHeader step={step} />
      <View style={styles.panel}>{stepView}</View>
      <View style={styles.actions}>
        <TouchableOpacity disabled={step === 0 || saving} style={styles.back} onPress={() => setStep(prev => prev - 1)}>
          <Text style={styles.backText}>السابق</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={saving} style={[styles.next, saving && styles.disabled]} onPress={next}>
          <Text style={styles.nextText}>{saving ? 'جاري الحفظ...' : step === 4 ? 'نشر الإعلان' : 'المتابع التالي'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function buildPayload(form: CreateAdForm) {
  const price = Number(form.price.replace(/[^\d.]/g, '')) || 0;
  const image = form.imageUrl.trim();
  const specs = form.category === 'cars' ? carSpecs(form) : realEstateSpecs(form);
  return {
    id: `${form.category}-${Date.now()}`,
    category: form.category,
    title: form.title.trim(),
    description: form.description.trim(),
    price,
    currency: form.currency,
    location: `${form.city}، ${form.neighborhood.trim()}`,
    subcategory: form.subcategory,
    purpose: form.category === 'cars' ? form.carType : form.reType,
    cover_image_url: image,
    published_on: new Date().toISOString().slice(0, 10),
    images: form.images.length > 0 ? form.images : [image],
    videos: form.videos.length > 0 ? form.videos : (form.videoUrl.trim() ? [form.videoUrl.trim()] : []),
    owner_phone: form.ownerPhone.trim(),
    whatsapp_phone: form.whatsappPhone.trim(),
    details: [...Object.values(specs).filter(Boolean).map(String), form.mapUrl.trim() ? `map_url:${form.mapUrl.trim()}` : ''].filter(Boolean),
    specs,
  };
}

function realEstateSpecs(form: CreateAdForm) {
  if (form.subcategory === 'مشاريع عقارية قيد التنفيذ') {
    return {
      propType: 'مشروع',
      projectStatus: form.projectStatus,
      deliveryYear: form.deliveryYear,
      projectFloors: form.projectFloors,
      projectFinishing: form.projectFinishing,
      projectLandArea: form.projectLandArea,
      projectUnitsCount: form.projectUnitsCount,
    };
  }
  return {
    propType: form.subcategory === 'فلل ومزارع نزهة' ? 'فيلا' : form.subcategory === 'أراضي للبيع' ? 'أرض' : 'شقة',
    reRooms: form.rooms,
    reBaths: form.baths,
    reArea: form.area,
    reFloor: form.floor,
    reFurnished: form.furnished,
    reBuildingAge: form.age,
    reType: form.reType,
  };
}

function carSpecs(form: CreateAdForm) {
  return {
    brand: form.carBrand,
    model: form.carModel,
    year: form.carYear,
    gear: form.carGear,
    fuel: form.carFuel,
    carMileage: form.carMileage,
    carBodyType: form.carBodyType,
    carCondition: form.carCondition,
    carType: form.carType,
    carColor: form.carColor,
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  content: { padding: SPACING.lg, paddingBottom: 112 },
  panel: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xl, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.gray200 },
  actions: { flexDirection: 'row-reverse', gap: SPACING.md, marginTop: SPACING.lg },
  next: { flex: 1, height: 52, backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.full, alignItems: 'center', justifyContent: 'center' },
  back: { width: 110, height: 52, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.full, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white },
  disabled: { opacity: 0.65 },
  nextText: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '900' },
  backText: { color: COLORS.gray900, fontSize: FONT_SIZES.md, fontWeight: '900' },
});
