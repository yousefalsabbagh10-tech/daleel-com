import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants/theme';

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
};

export function Field({ label, value, onChangeText, placeholder, multiline, keyboardType }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray400}
        multiline={multiline}
        keyboardType={keyboardType}
        textAlign="right"
        style={[styles.input, multiline && styles.textarea]}
      />
    </View>
  );
}

export function Choice({
  label,
  active,
  onPress,
  children,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}) {
  return (
    <TouchableOpacity style={[styles.choice, active && styles.choiceActive]} onPress={onPress}>
      {children}
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ChoiceWrap({ children }: { children: React.ReactNode }) {
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  field: { marginBottom: SPACING.md },
  label: {
    color: COLORS.gray900,
    fontSize: FONT_SIZES.sm,
    fontWeight: '900',
    marginBottom: SPACING.xs,
    textAlign: 'right',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    color: COLORS.gray900,
    paddingHorizontal: SPACING.md,
  },
  textarea: { minHeight: 96, paddingTop: SPACING.md, textAlignVertical: 'top' },
  wrap: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  choice: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    gap: 4,
  },
  choiceActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  choiceText: { color: COLORS.gray600, fontWeight: '800' },
  choiceTextActive: { color: COLORS.white },
});
