import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING;
}

export function GlassCard({ children, style, padding = 'md' }: GlassCardProps) {
  return (
    <View style={[styles.card, { padding: SPACING[padding] }, style]}>
      {children}
    </View>
  );
}

interface AppTextProps {
  children: ReactNode;
  size?: keyof typeof FONT_SIZES;
  weight?: '400' | '500' | '600' | '700' | '800';
  color?: string;
  style?: any;
}

export function AppText({ children, size = 'md', weight = '400', color = COLORS.gray900, style }: AppTextProps) {
  return (
    <Text style={[{ fontSize: FONT_SIZES[size], fontWeight: weight, color }, style]}>
      {children}
    </Text>
  );
}

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Badge({ label, variant = 'primary' }: BadgeProps) {
  const bgColor = variant === 'primary' ? COLORS.primary : variant === 'danger' ? COLORS.danger : COLORS.gray500;
  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
});
