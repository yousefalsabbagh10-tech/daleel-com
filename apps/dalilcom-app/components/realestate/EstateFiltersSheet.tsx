import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeIcon } from '../common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { EstateFilters, initialEstateFilters } from './filterLogic';

const purposes = ['الكل', 'للبيع', 'للإيجار'];
const types = ['الكل', 'شقة', 'بيت عربي', 'فيلا', 'أرض', 'محل', 'بناء', 'مشروع'];
const rooms = ['الكل', '1 غرف', '2 غرف', '3 غرف', '4 غرف', '5 غرف'];
const baths = ['الكل', '1 حمام', '2 حمام', '3 حمام', '4 حمام'];
const locations = ['الكل', 'دمشق', 'ريف دمشق', 'حلب', 'حمص', 'اللاذقية', 'طرطوس'];

type Props = {
  visible: boolean;
  filters: EstateFilters;
  setFilters: (filters: EstateFilters) => void;
  onClose: () => void;
};

export function EstateFiltersSheet({ visible, filters, setFilters, onClose }: Props) {
  const set = (key: keyof EstateFilters, value: string) => setFilters({ ...filters, [key]: value });
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}><NativeIcon name="close" size={24} color={COLORS.white} /></TouchableOpacity>
            <Text style={styles.headerTitle}>بحث متقدم</Text>
            <TouchableOpacity onPress={() => setFilters(initialEstateFilters)}>
              <Text style={styles.reset}>إعادة تهيئة</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Field label="البحث بكلمة دلالية" value={filters.query} onChangeText={(v: string) => set('query', v)} placeholder="مثال: شقة، دمر، فيلا" />
            <Text style={styles.label}>نطاق السعر المقبول</Text>
            <View style={styles.row}>
              <Input value={filters.maxPrice} onChangeText={(v: string) => set('maxPrice', v)} placeholder="أقصى" />
              <Input value={filters.minPrice} onChangeText={(v: string) => set('minPrice', v)} placeholder="أدنى" />
            </View>
            <Chips title="المنطقة والموقع" items={locations} value={filters.location} onPick={v => set('location', v)} />
            <Chips title="الغرض من الإعلان" items={purposes} value={filters.purpose} onPick={v => set('purpose', v)} />
            <Chips title="نوع العقار" items={types} value={filters.propType} onPick={v => set('propType', v)} />
            <Chips title="عدد الغرف" items={rooms} value={filters.rooms} onPick={v => set('rooms', v)} />
            <Chips title="عدد الحمامات" items={baths} value={filters.baths} onPick={v => set('baths', v)} />
            <Text style={styles.label}>المساحة الإجمالية (متر مربع)</Text>
            <View style={styles.row}>
              <Input value={filters.maxArea} onChangeText={(v: string) => set('maxArea', v)} placeholder="أقصى م²" />
              <Input value={filters.minArea} onChangeText={(v: string) => set('minArea', v)} placeholder="أدنى م²" />
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
  return <TextInput {...props} textAlign="right" keyboardType={props.placeholder?.includes('أ') ? 'numeric' : 'default'} placeholderTextColor={COLORS.gray400} style={styles.input} />;
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

