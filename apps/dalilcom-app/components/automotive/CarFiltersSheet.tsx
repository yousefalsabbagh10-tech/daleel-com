import React from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeIcon } from '../common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { AdItem } from '../../context/AppContext';

export type CarFilters = {
  query: string;
  carPurpose: string;
  selectedBrand: string;
  selectedModel: string;
  minYear: string;
  maxYear: string;
  minMileage: number | '';
  maxMileage: number | '';
  transmission: string;
  fuelType: string;
  carBodyType: string;
  carCondition: string;
  enginePower: string;
  engineSize: string;
  carDrive: string;
  carColor: string;
  carWarranty: string;
  carAdvertiser: string;
  adDateRange: string;
  onlyWithVideo: boolean;
};

export const initialCarFilters: CarFilters = {
  query: '',
  carPurpose: 'الكل',
  selectedBrand: 'الكل',
  selectedModel: 'الكل',
  minYear: 'الكل',
  maxYear: 'الكل',
  minMileage: '',
  maxMileage: '',
  transmission: 'الكل',
  fuelType: 'الكل',
  carBodyType: 'الكل',
  carCondition: 'الكل',
  enginePower: 'الكل',
  engineSize: 'الكل',
  carDrive: 'الكل',
  carColor: 'الكل',
  carWarranty: 'الكل',
  carAdvertiser: 'الكل',
  adDateRange: 'الكل',
  onlyWithVideo: false,
};

type BrandOption = { ar: string; en: string };
type ModelOption = { ar: string; en: string };

type Props = {
  visible: boolean;
  filters: CarFilters;
  brands: BrandOption[];
  carModelsMap: Record<string, ModelOption[]>;
  setFilters: (filters: CarFilters) => void;
  onClose: () => void;
};

const years = Array.from({ length: 2027 - 1970 }, (_, i) => String(2026 - i));
const purposes = ['الكل', 'للبيع', 'للإيجار'];
const transmissions = ['الكل', 'أوتوماتيك', 'عادي'];
const fuels = ['الكل', 'بنزين', 'ديزل', 'كهرباء', 'هجين'];
const bodyTypes = ['الكل', 'سيدان', 'هاتشباك', 'SUV', 'كروس أوفر', 'بيك أب', 'فان', 'كوبيه', 'كشف', 'شاحنة', 'دراجة نارية'];
const conditions = ['الكل', 'جديد', 'مستعمل', 'ممتاز', 'جيد', 'بحاجة صيانة', 'حادث'];
const enginePowers = ['الكل', 'اقتصادي', 'متوسط', 'قوي', 'رياضي', '4 سلندر', '6 سلندر', '8 سلندر'];
const engineSizes = ['الكل', '1000 CC', '1200 CC', '1400 CC', '1600 CC', '1800 CC', '2000 CC', '2500 CC', '3000 CC', '4000 CC'];
const drives = ['الكل', 'دفع أمامي', 'دفع خلفي', 'دفع رباعي', '4x4'];
const colors = ['الكل', 'أبيض', 'أسود', 'فضي', 'رمادي', 'أحمر', 'أزرق', 'ذهبي', 'بني', 'أخضر'];
const warranty = ['الكل', 'نعم', 'لا'];
const advertisers = ['الكل', 'المالك', 'وسيط'];
const dates = ['الكل', 'اليوم', 'آخر 3 أيام', 'آخر أسبوع', 'آخر شهر'];

const normalize = (value?: string | number) => String(value ?? '').toLowerCase();
const sourceText = (ad: AdItem) => normalize(`${ad.title} ${ad.location} ${(ad.details || []).join(' ')} ${ad.currency} ${ad.description || ''}`);
const includesValue = (ad: AdItem, value: string) => sourceText(ad).includes(value.toLowerCase());

export function applyCarFilters(
  ads: AdItem[],
  filters: CarFilters,
  brands: BrandOption[] = [],
  carModelsMap: Record<string, ModelOption[]> = {},
) {
  return ads.filter(ad => {
    const source = sourceText(ad);
    if (filters.query.trim() && !source.includes(filters.query.trim().toLowerCase())) return false;

    if (filters.selectedBrand !== 'الكل') {
      const brand = brands.find(b => b.ar === filters.selectedBrand || b.en === filters.selectedBrand);
      const brandAr = brand?.ar || filters.selectedBrand;
      const brandEn = brand?.en || filters.selectedBrand;
      const brandMatch = normalize(ad.carBrand) === normalize(brandAr) ||
        normalize(ad.carBrand) === normalize(brandEn) ||
        source.includes(brandAr.toLowerCase()) ||
        source.includes(brandEn.toLowerCase());
      if (!brandMatch) return false;
    }

    if (filters.selectedModel !== 'الكل') {
      const selectedBrandEn = brands.find(b => b.ar === filters.selectedBrand || b.en === filters.selectedBrand)?.en || filters.selectedBrand;
      const model = (carModelsMap[selectedBrandEn] || []).find(m => m.ar === filters.selectedModel || m.en === filters.selectedModel);
      const modelAr = model?.ar || filters.selectedModel;
      const modelEn = model?.en || filters.selectedModel;
      const modelMatch = normalize(ad.carModel) === normalize(modelAr) ||
        normalize(ad.carModel) === normalize(modelEn) ||
        source.includes(modelAr.toLowerCase()) ||
        source.includes(modelEn.toLowerCase());
      if (!modelMatch) return false;
    }

    const year = Number(ad.carYear || source.match(/\b(19|20)\d{2}\b/)?.[0] || 0);
    if (filters.minYear !== 'الكل' && year && year < Number(filters.minYear)) return false;
    if (filters.maxYear !== 'الكل' && year && year > Number(filters.maxYear)) return false;

    const mileage = typeof ad.carMileage === 'number'
      ? ad.carMileage
      : Number((source.match(/(\d[\d,.]*)\s*(كم|كيلو|ممشى)/)?.[1] || '').replace(/[,.]/g, ''));
    if (filters.minMileage !== '' && mileage && mileage < Number(filters.minMileage)) return false;
    if (filters.maxMileage !== '' && mileage && mileage > Number(filters.maxMileage)) return false;

    if (filters.carPurpose !== 'الكل') {
      const rental = source.includes('إيجار') || source.includes('للإيجار') || source.includes('/شهر') || source.includes('/سنة') || source.includes('/يوم');
      if (filters.carPurpose === 'للإيجار' && !rental) return false;
      if (filters.carPurpose === 'للبيع' && rental) return false;
    }

    if (filters.transmission !== 'الكل' && normalize(ad.carGear || '').indexOf(filters.transmission.toLowerCase()) === -1 && !includesValue(ad, filters.transmission)) return false;
    if (filters.fuelType !== 'الكل' && normalize(ad.carFuel || '').indexOf(filters.fuelType.toLowerCase()) === -1 && !includesValue(ad, filters.fuelType)) return false;
    if (filters.carBodyType !== 'الكل' && normalize(ad.carBodyType || '').indexOf(filters.carBodyType.toLowerCase()) === -1 && !includesValue(ad, filters.carBodyType)) return false;
    if (filters.carCondition !== 'الكل' && normalize(ad.carCondition || '').indexOf(filters.carCondition.toLowerCase()) === -1 && !includesValue(ad, filters.carCondition)) return false;
    if (filters.enginePower !== 'الكل' && !includesValue(ad, filters.enginePower)) return false;
    if (filters.engineSize !== 'الكل' && !source.includes(filters.engineSize.replace('CC', '').trim().toLowerCase())) return false;
    if (filters.carDrive !== 'الكل' && !includesValue(ad, filters.carDrive)) return false;
    if (filters.carColor !== 'الكل' && normalize(ad.carColor || '').indexOf(filters.carColor.toLowerCase()) === -1 && !includesValue(ad, filters.carColor)) return false;

    if (filters.carWarranty !== 'الكل') {
      const hasWarranty = source.includes('كفالة') || source.includes('ضمان') || source.includes('مضمونة');
      if (filters.carWarranty === 'نعم' && !hasWarranty) return false;
      if (filters.carWarranty === 'لا' && hasWarranty) return false;
    }

    if (filters.carAdvertiser !== 'الكل') {
      const isOwner = source.includes('مالك') || source.includes('مباشرة') || source.includes('مباشر');
      if (filters.carAdvertiser === 'المالك' && !isOwner) return false;
      if (filters.carAdvertiser === 'وسيط' && isOwner) return false;
    }

    if (filters.onlyWithVideo && !(ad.videos?.length || source.includes('فيديو') || source.includes('مصور'))) return false;

    if (filters.adDateRange !== 'الكل' && ad.date) {
      const ageDays = (Date.now() - new Date(ad.date).getTime()) / 86400000;
      if (filters.adDateRange === 'اليوم' && ageDays > 1) return false;
      if (filters.adDateRange === 'آخر 3 أيام' && ageDays > 3) return false;
      if (filters.adDateRange === 'آخر أسبوع' && ageDays > 7) return false;
      if (filters.adDateRange === 'آخر شهر' && ageDays > 30) return false;
    }

    return true;
  });
}

export function CarFiltersSheet({ visible, filters, brands, carModelsMap, setFilters, onClose }: Props) {
  const selectedBrandEn = filters.selectedBrand !== 'الكل'
    ? (brands.find(b => b.ar === filters.selectedBrand || b.en === filters.selectedBrand)?.en || filters.selectedBrand)
    : '';
  const activeModels = selectedBrandEn ? carModelsMap[selectedBrandEn] || [] : [];
  const set = (key: keyof CarFilters, value: string | number | boolean) => setFilters({ ...filters, [key]: value } as CarFilters);
  const setBrand = (value: string) => setFilters({ ...filters, selectedBrand: value, selectedModel: 'الكل' });

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}><NativeIcon name="close" size={24} color={COLORS.white} /></TouchableOpacity>
            <Text style={styles.headerTitle}>مواصفات المركبات</Text>
            <TouchableOpacity onPress={() => setFilters(initialCarFilters)}>
              <Text style={styles.reset}>إعادة تهيئة</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Field label="البحث بكلمة دلالية" value={filters.query} onChangeText={(v: string) => set('query', v)} placeholder="مثال: تويوتا، 2022، أوتوماتيك" />
            <Chips title="الغرض من الإعلان" items={purposes} value={filters.carPurpose} onPick={v => set('carPurpose', v)} />
            <Chips title="الماركة (الشركة المصنعة)" items={['الكل', ...brands.map(b => b.ar)]} value={filters.selectedBrand} onPick={setBrand} />
            <Chips title="الموديل (الطراز)" items={['الكل', ...activeModels.map(m => m.ar)]} value={filters.selectedModel} onPick={v => set('selectedModel', v)} />
            <Text style={styles.label}>سنة الصنع (من عام إلى عام)</Text>
            <View style={styles.row}>
              <SelectLike value={filters.maxYear} placeholder="إلى عام" items={['الكل', ...years]} onPick={v => set('maxYear', v)} />
              <SelectLike value={filters.minYear} placeholder="من عام" items={['الكل', ...years]} onPick={v => set('minYear', v)} />
            </View>
            <Text style={styles.label}>المسافة المقطوعة (كم)</Text>
            <View style={styles.row}>
              <Input value={filters.maxMileage} onChangeText={(v: string) => set('maxMileage', v === '' ? '' : Number(v))} placeholder="أقصى كم" numeric />
              <Input value={filters.minMileage} onChangeText={(v: string) => set('minMileage', v === '' ? '' : Number(v))} placeholder="أدنى كم" numeric />
            </View>
            <Chips title="ناقل الحركة" items={transmissions} value={filters.transmission} onPick={v => set('transmission', v)} />
            <Chips title="نوع الوقود" items={fuels} value={filters.fuelType} onPick={v => set('fuelType', v)} />
            <Chips title="نوع الهيكل" items={bodyTypes} value={filters.carBodyType} onPick={v => set('carBodyType', v)} />
            <Chips title="حالة المركبة" items={conditions} value={filters.carCondition} onPick={v => set('carCondition', v)} />
            <Chips title="قوة المحرك" items={enginePowers} value={filters.enginePower} onPick={v => set('enginePower', v)} />
            <Chips title="حجم المحرك" items={engineSizes} value={filters.engineSize} onPick={v => set('engineSize', v)} />
            <Chips title="نظام الدفع" items={drives} value={filters.carDrive} onPick={v => set('carDrive', v)} />
            <Chips title="اللون" items={colors} value={filters.carColor} onPick={v => set('carColor', v)} />
            <Chips title="الكفالة / الضمان" items={warranty} value={filters.carWarranty} onPick={v => set('carWarranty', v)} />
            <Chips title="نوع المعلن" items={advertisers} value={filters.carAdvertiser} onPick={v => set('carAdvertiser', v)} />
            <Chips title="تاريخ الإعلان" items={dates} value={filters.adDateRange} onPick={v => set('adDateRange', v)} />
            <View style={styles.switchRow}>
              <Switch
                value={filters.onlyWithVideo}
                onValueChange={v => set('onlyWithVideo', v)}
                trackColor={{ false: COLORS.gray200, true: 'rgba(201,161,90,0.55)' }}
                thumbColor={filters.onlyWithVideo ? '#C9A15A' : COLORS.white}
              />
              <Text style={styles.switchLabel}>إعلانات مع فيديو فقط</Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.apply} onPress={onClose}><Text style={styles.applyText}>تحديث وتطبيق التصفية</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Field(props: any) {
  return <View><Text style={styles.label}>{props.label}</Text><Input {...props} /></View>;
}

function Input(props: any) {
  return <TextInput {...props} textAlign="right" keyboardType={props.numeric ? 'numeric' : 'default'} placeholderTextColor={COLORS.gray400} style={styles.input} />;
}

function Chips({ title, items, value, onPick }: { title: string; items: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.chips}>{items.map(item => (
        <TouchableOpacity key={item} style={[styles.chip, value === item && styles.chipActive]} onPress={() => onPick(item)}>
          <Text style={[styles.chipText, value === item && styles.chipTextActive]}>{item}</Text>
        </TouchableOpacity>
      ))}</View>
    </View>
  );
}

function SelectLike({ value, placeholder, items, onPick }: { value: string; placeholder: string; items: string[]; onPick: (v: string) => void }) {
  return (
    <View style={styles.selectBox}>
      <Text style={styles.selectPlaceholder}>{placeholder}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectItems}>
        {items.map(item => (
          <TouchableOpacity key={item} style={[styles.smallChip, value === item && styles.chipActive]} onPress={() => onPick(item)}>
            <Text style={[styles.chipText, value === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(13,59,70,0.58)', justifyContent: 'flex-end' },
  sheet: { maxHeight: '92%', backgroundColor: COLORS.offWhite, borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden' },
  header: { backgroundColor: '#0D3B46', padding: SPACING.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '900' },
  reset: { color: '#C9A15A', fontSize: FONT_SIZES.xs, fontWeight: '900' },
  content: { padding: SPACING.lg, gap: SPACING.md },
  label: { textAlign: 'right', color: COLORS.gray900, fontSize: FONT_SIZES.sm, fontWeight: '900', marginBottom: SPACING.xs },
  row: { flexDirection: 'row', gap: SPACING.sm },
  input: { flex: 1, minHeight: 46, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, color: COLORS.gray900 },
  chips: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: SPACING.sm },
  chip: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  smallChip: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.full, paddingHorizontal: SPACING.sm, paddingVertical: 7 },
  chipActive: { backgroundColor: 'rgba(201,161,90,0.18)', borderColor: '#C9A15A' },
  chipText: { color: COLORS.gray600, fontWeight: '800', fontSize: FONT_SIZES.xs },
  chipTextActive: { color: '#0D3B46' },
  selectBox: { flex: 1, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xs },
  selectPlaceholder: { color: COLORS.gray500, fontSize: FONT_SIZES.xs, fontWeight: '900', textAlign: 'right', marginBottom: 6 },
  selectItems: { gap: 6, flexDirection: 'row-reverse' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md },
  switchLabel: { color: '#0D3B46', fontSize: FONT_SIZES.sm, fontWeight: '900' },
  footer: { backgroundColor: COLORS.white, padding: SPACING.lg, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  apply: { height: 48, borderRadius: BORDER_RADIUS.lg, backgroundColor: '#0D3B46', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: COLORS.white, fontWeight: '900' },
});
