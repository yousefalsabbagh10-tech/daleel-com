import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants/theme';
import { steps } from './data';

export function StepHeader({ step }: { step: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>تأسيس ونشر إعلان جديد</Text>
      <View style={styles.row}>
        {steps.map((label, index) => {
          const active = index === step;
          return (
            <View key={label} style={styles.item}>
              <View style={[styles.dot, active && styles.dotActive]}>
                <Text style={[styles.number, active && styles.numberActive]}>{index + 1}</Text>
              </View>
              <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f4668',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  row: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
  item: { alignItems: 'center', flex: 1 },
  dot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#dce3ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: { backgroundColor: COLORS.primary },
  number: { color: COLORS.gray600, fontWeight: '900' },
  numberActive: { color: COLORS.white },
  label: { color: '#dce3ec', fontSize: FONT_SIZES.xs, fontWeight: '800', marginTop: 5 },
  labelActive: { color: COLORS.white },
});
