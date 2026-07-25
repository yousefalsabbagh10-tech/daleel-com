import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeIcon } from '../common/NativeIcon';
import { AdItem } from '../../context/AppContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

export function EstateCard({ item, onPress, compact = false }: { item: AdItem; onPress: () => void; compact?: boolean }) {
  return (
    <TouchableOpacity style={[styles.card, compact && styles.compactCard]} activeOpacity={0.86} onPress={onPress}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={[styles.image, compact && styles.compactImage]} />
      ) : (
        <View style={[styles.image, compact && styles.compactImage, styles.placeholder]}>
          <NativeIcon name="image-outline" size={compact ? 20 : 28} color={COLORS.gray400} />
        </View>
      )}
      <View style={styles.body}>
        <Text style={[styles.title, compact && styles.compactTitle]} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
        <Text style={[styles.price, compact && styles.compactPrice]} numberOfLines={1}>
          {item.price.toLocaleString('ar-SY')} {item.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const shadow = { shadowColor: '#0b1b2f', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.07, shadowRadius: 16, elevation: 4 };

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.sm,
    minHeight: 224,
    ...shadow,
  },
  compactCard: { minHeight: 176, padding: 6 },
  image: { width: '100%', height: 118, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.gray200 },
  compactImage: { height: 78, borderRadius: BORDER_RADIUS.md },
  placeholder: { justifyContent: 'center', alignItems: 'center' },
  body: { flex: 1, alignItems: 'flex-end', paddingTop: SPACING.sm },
  title: { fontSize: FONT_SIZES.sm, fontWeight: '900', color: COLORS.gray900, textAlign: 'right' },
  compactTitle: { fontSize: 11 },
  location: { fontSize: FONT_SIZES.xs, color: COLORS.gray500, marginTop: 5 },
  price: { fontSize: FONT_SIZES.md, fontWeight: '900', color: COLORS.danger, marginTop: 7 },
  compactPrice: { fontSize: 11 },
});
