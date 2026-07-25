import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { NativeIcon } from './NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const logoImage = require('../../assets/images/logo-mark.png');

export function AppHeaderLogo({ title }: { title?: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoCard}>
        <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
        <View style={styles.logoTextBox}>
          <Text style={styles.logoTitle}>دليل كوم</Text>
          <Text style={styles.logoSub}>عقارات . فرص أكثر</Text>
        </View>
      </View>
      {title ? <Text style={styles.pageTitle}>{title}</Text> : null}
    </View>
  );
}

export function BottomBackButton({ label = 'الرجوع' }: { label?: string }) {
  const router = useRouter();
  return (
    <View style={styles.bottomWrap}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <NativeIcon name="chevron-forward" size={20} color={COLORS.white} />
        <Text style={styles.backText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 16,
    paddingBottom: SPACING.md,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 70,
    flexDirection: 'row-reverse',
    gap: 12,
  },
  logoImage: { width: 54, height: 54 },
  logoTextBox: { alignItems: 'flex-end' },
  logoTitle: { color: '#063f9e', fontSize: 22, fontWeight: '900', lineHeight: 24 },
  logoSub: { color: COLORS.primary, fontSize: 12, fontWeight: '700', marginTop: 3 },
  pageTitle: { color: COLORS.white, fontSize: FONT_SIZES.lg, fontWeight: '900' },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(245,245,247,0.94)',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  backButton: {
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: '#244b70',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: SPACING.sm,
  },
  backText: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '900' },
});
