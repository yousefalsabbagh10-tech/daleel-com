import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeaderLogo, BottomBackButton } from '../../../components/common/AppHeader';
import { EstateCard } from '../../../components/realestate/EstateCard';
import { NativeIcon } from '../../../components/common/NativeIcon';
import { useApp, AdItem } from '../../../context/AppContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../../constants/theme';

const isRent = (ad: AdItem) => `${ad.title} ${ad.details.join(' ')} ${ad.currency}`.includes('إيجار');

export default function CarResultsPage() {
  const router = useRouter();
  const { id, title, brandAr } = useLocalSearchParams<{ id: string; title?: string; brandAr?: string }>();
  const { getFilteredAds, refresh } = useApp();
  const cars = getFilteredAds({ category: 'cars' });

  useEffect(() => { refresh(); }, [refresh]);

  const filtered = cars.filter(ad => {
    if (id === 'all') return true;
    if (id === 'sale') return !isRent(ad);
    if (id === 'rent') return isRent(ad);
    const key = String(id || '').toLowerCase();
    return (ad.carBrand || '').toLowerCase() === key || ad.carBrand === brandAr || ad.title.includes(brandAr || '');
  });

  const renderItem = ({ item }: { item: AdItem }) => (
    <EstateCard item={item} compact onPress={() => router.push(`/details/car/${item.id}` as any)} />
  );

  return (
    <View style={styles.container}>
      <AppHeaderLogo title={title || 'السيارات'} />
      <FlatList
        data={filtered}
        key="cars-grid-3"
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.list}
        ListHeaderComponent={(
          <View style={styles.topBar}>
            <View style={styles.icon}><NativeIcon name="car" size={23} color={COLORS.white} /></View>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>النتائج المطابقة</Text>
              <Text style={styles.resultCount}>{filtered.length.toLocaleString('ar-SY')} إعلان</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={(
          <View style={styles.emptyBox}>
            <NativeIcon name="alert-circle-outline" size={38} color={COLORS.primary} />
            <Text style={styles.emptyTitle}>لا توجد سيارات مطابقة حالياً</Text>
          </View>
        )}
      />
      <BottomBackButton />
    </View>
  );
}

const shadow = { shadowColor: '#0D3B46', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.07, shadowRadius: 16, elevation: 4 };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  list: { padding: SPACING.md, paddingBottom: 170, gap: SPACING.sm },
  columns: { gap: SPACING.sm },
  topBar: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: COLORS.white, padding: SPACING.md, borderRadius: BORDER_RADIUS.xl, marginBottom: SPACING.lg, ...shadow },
  icon: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#C9A15A', alignItems: 'center', justifyContent: 'center', marginLeft: SPACING.md },
  resultBox: { flex: 1, alignItems: 'flex-end' },
  resultLabel: { color: COLORS.gray500, fontSize: FONT_SIZES.xs, fontWeight: '800' },
  resultCount: { color: '#0D3B46', fontSize: FONT_SIZES.md, fontWeight: '900', marginTop: 3 },
  emptyBox: { alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xxl, padding: SPACING.xl, marginTop: SPACING.lg, ...shadow },
  emptyTitle: { color: COLORS.gray900, fontSize: FONT_SIZES.md, fontWeight: '900', marginTop: SPACING.md },
});
