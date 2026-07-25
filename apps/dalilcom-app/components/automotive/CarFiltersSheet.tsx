import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeIcon } from '../common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { AdItem } from '../../context/AppContext';

export type CarFilters = {
  query: string;
  purpose: string;
  brand: string;
  minYear: string;
  maxYear: string;
  transmission: string;
  fuel: string;
};

export const initialCarFilters: CarFilters = {
  query: '',
  purpose: 'الكل',
  brand: 'الكل',
  minYear: '',
  maxYear: '',
  transmission: 'الكل',
  fuel: 'الكل',
};

type Props = {
  visible: boolean;
  filters: CarFilters;
  brands: string[];
  setFilters: (filters: CarFilters) => void;
  onClose: () => void;
};

const purposes = ['الكل', 'للبيع', 'للإيجار'];
const transmissions = ['الكل', 'أوتوماتيك', 'عادي'];
const fuels = ['الكل', 'بنزين', 'ديزل', 'كهرباء', 'هجين'];

export function applyCarFilters(ads: AdItem[], filters: CarFilters) {
  return ads.filter(ad => {
    const source = `${ad.title} ${ad.location} ${(ad.details || []).join(' ')} ${ad.currency}`.toLowerCase();
    if (filters.query.trim() && !source.includes(filters.query.trim().toLowerCase())) return false;
    if (filters.brand !== 'الكل') {
      const brand = filters.brand.toLowerCase();
      if ((ad.carBrand || '').toLowerCase() !== brand && !ad.title.toLowerCase().includes(brand)) return false;
    }
    if (filters.purpose !== 'الكل') {
      const rental = source.includes('إيجار') || source.includes('للإيجار') || source.includes('/شهر') || source.includes('/سنة');
      if (filters.purpose === 'للإيجار' && !rental) return false;
      if (filters.purpose === 'للبيع' && rental) return false;
    }
    const year = Number(ad.carYear || (source.match(/\b(19|20)\d{2}\b/)?.[0] ?? 0));
    if (filters.minYear && year && year < Number(filters.minYear)) return false;
    if (filters.maxYear && year && year > Number(filters.maxYear)) return false;
    if (filters.transmission !== 'الكل' && !source.includes(filters.transmission.toLowerCase())) return false;
    if (filters.fuel !== 'الكل' && !source.includes(filters.fuel.toLowerCase())) return false;
    return true;
  });
}

export function CarFiltersSheet({ visible, filters, brands, setFilters, onClose }: Props) {
  const set = (key: keyof CarFilters, value: string) => setFilters({ ...filters, [key]: value });

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}><NativeIcon name="close" size={24} color={COLORS.white} /></TouchableOpacity>
            <Text style={styles.headerTitle}>فلاتر السيارات</Text>
            <TouchableOpacity onPress={() => setFilters(initialCarFilters)}>
              <Text style={styles.reset}>إعادة تهيئة</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Field label="البحث بكلمة دلالية" value={filters.query} onChangeText={(v: string) => set('query', v)} placeholder="مثال: تويوتا، 2022، أوتوماتيك" />
            <Chips title="الغرض من الإعلان" items={purposes} value={filters.purpose} onPick={v => set('purpose', v)} />
            <Chips title="الماركة" items={['الكل', ...brands]} value={filters.brand} onPick={v => set('brand', v)} />
            <Text style={styles.label}>سنة الصنع</Text>
            <View style={styles.row}>
              <Input value={filters.maxYear} onChangeText={(v: string) => set('maxYear', v)} placeholder="إلى سنة" numeric />
              <Input value={filters.minYear} onChangeText={(v: string) => set('minYear', v)} placeholder="من سنة" numeric />
            </View>
            <Chips title="ناقل الحركة" items={transmissions} value={filters.transmission} onPick={v => set('transmission', v)} />
            <Chips title="نوع الوقود" items={fuels} value={filters.fuel} onPick={v => set('fuel', v)} />
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
  footer: { backgroundColor: COLORS.white, padding: SPACING.lg, borderTopWidth: 1, borderTopColor: COLORS.gray100 },
  apply: { height: 48, borderRadius: BORDER_RADIUS.lg, backgroundColor: '#0D3B46', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: COLORS.white, fontWeight: '900' },
});
