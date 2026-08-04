import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeIcon } from '../common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { AdItem } from '../../context/AppContext';

const ALL = 'الكل';

export type CarFilters = {
  query: string;
  minPrice: number | '';
  maxPrice: number | '';
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
  minPrice: '',
  maxPrice: '',
  carPurpose: ALL,
  selectedBrand: ALL,
  selectedModel: ALL,
  minYear: '',
  maxYear: '',
  minMileage: '',
  maxMileage: '',
  transmission: ALL,
  fuelType: ALL,
  carBodyType: ALL,
  carCondition: ALL,
  enginePower: ALL,
  engineSize: '',
  carDrive: ALL,
  carColor: ALL,
  carWarranty: ALL,
  carAdvertiser: ALL,
  adDateRange: ALL,
  onlyWithVideo: false,
};

export type BrandOption = { ar: string; en: string };
export type ModelOption = { ar: string; en: string };

type Props = {
  visible: boolean;
  filters: CarFilters;
  brands: BrandOption[];
  carModelsMap: Record<string, ModelOption[]>;
  setFilters: (filters: CarFilters) => void;
  onClose: () => void;
};

const purposes = [ALL, 'للبيع', 'للإيجار'];
const transmissions = [ALL, 'أوتوماتيك', 'عادي'];
const fuels = [ALL, 'بنزين', 'ديزل', 'كهرباء', 'هجين'];
const bodyTypes = [ALL, 'سيدان', 'هاتشباك', 'SUV', 'كروس أوفر', 'بيك أب', 'فان', 'كوبيه', 'كشف', 'شاحنة', 'دراجة نارية'];
const conditions = [ALL, 'جديد', 'مستعمل', 'ممتاز', 'جيد', 'بحاجة صيانة', 'حادث'];
const enginePowers = [ALL, 'اقتصادي', 'متوسط', 'قوي', 'رياضي', '4 سلندر', '6 سلندر', '8 سلندر'];
const drives = [ALL, 'دفع أمامي', 'دفع خلفي', 'دفع رباعي', '4x4'];
const colors = [ALL, 'أبيض', 'أسود', 'فضي', 'رمادي', 'أحمر', 'أزرق', 'ذهبي', 'بني', 'أخضر'];
const warranty = [ALL, 'نعم', 'لا'];
const advertisers = [ALL, 'المالك', 'وسيط'];
const dates = [ALL, 'اليوم', 'آخر 3 أيام', 'آخر أسبوع', 'آخر شهر'];

const normalize = (value?: string | number) => String(value ?? '').toLowerCase();
const sourceText = (ad: AdItem) => normalize(`${ad.title} ${ad.location} ${(ad.details || []).join(' ')} ${ad.currency} ${ad.description || ''}`);
const includesValue = (ad: AdItem, value: string) => sourceText(ad).includes(value.toLowerCase());
const numericOnly = (value: string) => value.replace(/[^\d]/g, '');

export function applyCarFilters(
  ads: AdItem[],
  filters: CarFilters,
  brands: BrandOption[] = [],
  carModelsMap: Record<string, ModelOption[]> = {},
) {
  return ads.filter(ad => {
    const source = sourceText(ad);
    if (filters.query.trim() && !source.includes(filters.query.trim().toLowerCase())) return false;
    if (filters.minPrice !== '' && ad.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice !== '' && ad.price > Number(filters.maxPrice)) return false;

    if (filters.selectedBrand !== ALL) {
      const brand = brands.find(b => b.ar === filters.selectedBrand || b.en === filters.selectedBrand);
      const brandAr = brand?.ar || filters.selectedBrand;
      const brandEn = brand?.en || filters.selectedBrand;
      const brandMatch = normalize(ad.carBrand) === normalize(brandAr) ||
        normalize(ad.carBrand) === normalize(brandEn) ||
        source.includes(brandAr.toLowerCase()) ||
        source.includes(brandEn.toLowerCase());
      if (!brandMatch) return false;
    }

    if (filters.selectedModel !== ALL) {
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
    if (filters.minYear && year && year < Number(filters.minYear)) return false;
    if (filters.maxYear && year && year > Number(filters.maxYear)) return false;

    const mileage = typeof ad.carMileage === 'number'
      ? ad.carMileage
      : Number((source.match(/(\d[\d,.]*)\s*(كم|كيلو|ممشى)/)?.[1] || '').replace(/[,.]/g, ''));
    if (filters.minMileage !== '' && mileage && mileage < Number(filters.minMileage)) return false;
    if (filters.maxMileage !== '' && mileage && mileage > Number(filters.maxMileage)) return false;

    if (filters.carPurpose !== ALL) {
      const rental = source.includes('إيجار') || source.includes('للإيجار') || source.includes('/شهر') || source.includes('/سنة') || source.includes('/يوم');
      if (filters.carPurpose === 'للإيجار' && !rental) return false;
      if (filters.carPurpose === 'للبيع' && rental) return false;
    }

    if (filters.transmission !== ALL && normalize(ad.carGear || '').indexOf(filters.transmission.toLowerCase()) === -1 && !includesValue(ad, filters.transmission)) return false;
    if (filters.fuelType !== ALL && normalize(ad.carFuel || '').indexOf(filters.fuelType.toLowerCase()) === -1 && !includesValue(ad, filters.fuelType)) return false;
    if (filters.carBodyType !== ALL && normalize(ad.carBodyType || '').indexOf(filters.carBodyType.toLowerCase()) === -1 && !includesValue(ad, filters.carBodyType)) return false;
    if (filters.carCondition !== ALL && normalize(ad.carCondition || '').indexOf(filters.carCondition.toLowerCase()) === -1 && !includesValue(ad, filters.carCondition)) return false;
    if (filters.enginePower !== ALL && !includesValue(ad, filters.enginePower)) return false;
    if (filters.engineSize && !source.includes(numericOnly(filters.engineSize))) return false;
    if (filters.carDrive !== ALL && !includesValue(ad, filters.carDrive)) return false;
    if (filters.carColor !== ALL && normalize(ad.carColor || '').indexOf(filters.carColor.toLowerCase()) === -1 && !includesValue(ad, filters.carColor)) return false;

    if (filters.carWarranty !== ALL) {
      const hasWarranty = source.includes('كفالة') || source.includes('ضمان') || source.includes('مضمونة');
      if (filters.carWarranty === 'نعم' && !hasWarranty) return false;
      if (filters.carWarranty === 'لا' && hasWarranty) return false;
    }

    if (filters.carAdvertiser !== ALL) {
      const isOwner = source.includes('مالك') || source.includes('مباشرة') || source.includes('مباشر');
      if (filters.carAdvertiser === 'المالك' && !isOwner) return false;
      if (filters.carAdvertiser === 'وسيط' && isOwner) return false;
    }

    if (filters.onlyWithVideo && !(ad.videos?.length || source.includes('فيديو') || source.includes('مصور'))) return false;

    if (filters.adDateRange !== ALL && ad.date) {
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
  const selectedBrandEn = filters.selectedBrand !== ALL
    ? (brands.find(b => b.ar === filters.selectedBrand || b.en === filters.selectedBrand)?.en || filters.selectedBrand)
    : '';
  const activeModels = selectedBrandEn ? carModelsMap[selectedBrandEn] || [] : [];
  const set = (key: keyof CarFilters, value: string | number | boolean) => setFilters({ ...filters, [key]: value } as CarFilters);
  const setBrand = (value: string) => setFilters({ ...filters, selectedBrand: value, selectedModel: ALL });

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}><NativeIcon name="close" size={24} color={COLORS.white} /></TouchableOpacity>
            <Text style={styles.headerTitle}>بحث متقدم</Text>
            <TouchableOpacity onPress={() => setFilters(initialCarFilters)}>
              <Text style={styles.reset}>إعادة تهيئة</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Field label="البحث بكلمة دلالية" value={filters.query} onChangeText={(v: string) => set('query', v)} placeholder="مثال: تويوتا، 2022، أوتوماتيك" />
            <Text style={styles.label}>نطاق السعر</Text>
            <View style={styles.row}>
              <Input value={filters.maxPrice} onChangeText={(v: string) => set('maxPrice', v === '' ? '' : Number(v))} placeholder="أقصى سعر" numeric />
              <Input value={filters.minPrice} onChangeText={(v: string) => set('minPrice', v === '' ? '' : Number(v))} placeholder="أدنى سعر" numeric />
            </View>
            <PickerField title="الماركة (الشركة المصنعة)" value={filters.selectedBrand} items={[ALL, ...brands.map(b => b.ar)]} onPick={setBrand} />
            <PickerField title="الموديل (الطراز)" value={filters.selectedModel} items={[ALL, ...activeModels.map(m => m.ar)]} onPick={v => set('selectedModel', v)} />
            <Chips title="الغرض من الإعلان" items={purposes} value={filters.carPurpose} onPick={v => set('carPurpose', v)} />
            <Text style={styles.label}>سنة الصنع (إدخال يدوي)</Text>
            <View style={styles.row}>
              <Input value={filters.maxYear} onChangeText={(v: string) => set('maxYear', numericOnly(v))} placeholder="إلى عام" numeric />
              <Input value={filters.minYear} onChangeText={(v: string) => set('minYear', numericOnly(v))} placeholder="من عام" numeric />
            </View>
            <Text style={styles.label}>المسافة المقطوعة (كم)</Text>
            <View style={styles.row}>
              <Input value={filters.maxMileage} onChangeText={(v: string) => set('maxMileage', v === '' ? '' : Number(v))} placeholder="أقصى كم" numeric />
              <Input value={filters.minMileage} onChangeText={(v: string) => set('minMileage', v === '' ? '' : Number(v))} placeholder="أدنى كم" numeric />
            </View>
            <Chips title="ناقل الحركة" items={transmissions} value={filters.transmission} onPick={v => set('transmission', v)} />
            <Chips title="نوع الوقود" items={fuels} value={filters.fuelType} onPick={v => set('fuelType', v)} />
            <PickerField title="نوع الهيكل" value={filters.carBodyType} items={bodyTypes} onPick={v => set('carBodyType', v)} />
            <PickerField title="حالة المركبة" value={filters.carCondition} items={conditions} onPick={v => set('carCondition', v)} />
            <PickerField title="قوة المحرك" value={filters.enginePower} items={enginePowers} onPick={v => set('enginePower', v)} />
            <Field label="حجم المحرك (إدخال يدوي)" value={filters.engineSize} onChangeText={(v: string) => set('engineSize', v)} placeholder="مثال: 1600 CC" />
            <PickerField title="نظام الدفع" value={filters.carDrive} items={drives} onPick={v => set('carDrive', v)} />
            <PickerField title="اللون" value={filters.carColor} items={colors} onPick={v => set('carColor', v)} />
            <Chips title="الكفالة / الضمان" items={warranty} value={filters.carWarranty} onPick={v => set('carWarranty', v)} />
            <Chips title="نوع المعلن" items={advertisers} value={filters.carAdvertiser} onPick={v => set('carAdvertiser', v)} />
            <PickerField title="تاريخ الإعلان" value={filters.adDateRange} items={dates} onPick={v => set('adDateRange', v)} />
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
            <TouchableOpacity style={styles.apply} onPress={onClose}><Text style={styles.applyText}>تطبيق البحث المتقدم</Text></TouchableOpacity>
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

function PickerField({ title, value, items, onPick }: { title: string; value: string; items: string[]; onPick: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(item => item.toLowerCase().includes(needle));
  }, [items, query]);

  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.84} onPress={() => setOpen(true)}>
        <NativeIcon name="chevron-down" size={18} color="#0D3B46" />
        <Text style={styles.dropdownValue} numberOfLines={1}>{value || ALL}</Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <View style={styles.pickerBackdrop}>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setOpen(false)}><NativeIcon name="close" size={22} color={COLORS.white} /></TouchableOpacity>
              <Text style={styles.pickerTitle}>{title}</Text>
            </View>
            <View style={styles.searchBox}>
              <NativeIcon name="search" size={18} color={COLORS.gray400} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="ابحث..."
                placeholderTextColor={COLORS.gray400}
                style={styles.searchInput}
              />
            </View>
            <ScrollView contentContainerStyle={styles.pickerItems}>
              {filtered.map(item => (
                <TouchableOpacity
                  key={item}
                  style={[styles.pickerItem, value === item && styles.pickerItemActive]}
                  onPress={() => {
                    onPick(item);
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  <Text style={[styles.pickerItemText, value === item && styles.chipTextActive]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  chipActive: { backgroundColor: 'rgba(201,161,90,0.18)', borderColor: '#C9A15A' },
  chipText: { color: COLORS.gray600, fontWeight: '800', fontSize: FONT_SIZES.xs },
  chipTextActive: { color: '#0D3B46' },
  dropdownButton: { minHeight: 48, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E3C98D', borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownValue: { flex: 1, textAlign: 'right', color: COLORS.gray900, fontSize: FONT_SIZES.sm, fontWeight: '900', marginLeft: SPACING.sm },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md },
  switchLabel: { color: '#0D3B46', fontSize: FONT_SIZES.sm, fontWeight: '900' },
  footer: { backgroundColor: COLORS.white, padding: SPACING.lg, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  apply: { height: 48, borderRadius: BORDER_RADIUS.lg, backgroundColor: '#0D3B46', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: COLORS.white, fontWeight: '900' },
  pickerBackdrop: { flex: 1, backgroundColor: 'rgba(13,59,70,0.58)', justifyContent: 'flex-end' },
  pickerSheet: { maxHeight: '82%', backgroundColor: COLORS.offWhite, borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden' },
  pickerHeader: { backgroundColor: '#0D3B46', padding: SPACING.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pickerTitle: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '900' },
  searchBox: { height: 52, margin: SPACING.lg, marginBottom: SPACING.sm, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.gray200 },
  searchInput: { flex: 1, textAlign: 'right', fontSize: FONT_SIZES.md, color: COLORS.gray900, paddingVertical: 0 },
  pickerItems: { padding: SPACING.lg, paddingTop: SPACING.xs, gap: SPACING.sm },
  pickerItem: { minHeight: 46, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, alignItems: 'flex-end', justifyContent: 'center' },
  pickerItemActive: { backgroundColor: 'rgba(201,161,90,0.18)', borderColor: '#C9A15A' },
  pickerItemText: { color: COLORS.gray900, fontWeight: '900', fontSize: FONT_SIZES.sm },
});
