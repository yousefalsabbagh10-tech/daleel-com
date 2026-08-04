import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { NativeIcon } from './NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const logoImage = require('../../assets/images/logo-header.png');

export function AppHeaderLogo({ title }: { title?: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoCard}>
        <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />

      </View>
      {title ? <Text style={styles.pageTitle}>{title}</Text> : null}
    </View>
  );
}

export function BottomBackButton({ label = 'الرجوع', fallbackHref = '/(tabs)' }: { label?: string; fallbackHref?: string }) {
  const router = useRouter();
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace(fallbackHref as any);
  };

  return (
    <View style={styles.bottomWrap}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
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
    paddingBottom: 20,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 126,
  },
  logoImage: { width: 252, height: 104 },
  pageTitle: { color: COLORS.white, fontSize: FONT_SIZES.lg, fontWeight: '900' },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(246,242,232,0.94)',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  backButton: {
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: '#0D3B46',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: SPACING.sm,
  },
  backText: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '900' },
});

