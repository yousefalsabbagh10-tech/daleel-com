import React, { useState } from 'react';
import { Modal, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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

export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = 'اختر من القائمة',
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const displayValue = value || placeholder;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity activeOpacity={0.86} style={styles.selectButton} onPress={() => setOpen(true)}>
        <Text style={[styles.selectValue, !value && styles.placeholder]} numberOfLines={1}>{displayValue}</Text>
        <Text style={styles.selectChevron}>⌄</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.selectSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.sheetClose}>إغلاق</Text>
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>{label}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.optionList}>
              {options.map(option => {
                const active = option === value;
                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.82}
                    style={[styles.optionRow, active && styles.optionRowActive]}
                    onPress={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                  >
                    <Text style={[styles.optionText, active && styles.optionTextActive]}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  selectButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  selectValue: { flex: 1, color: COLORS.gray900, fontSize: FONT_SIZES.sm, fontWeight: '900', textAlign: 'right' },
  placeholder: { color: COLORS.gray400 },
  selectChevron: { color: COLORS.primary, fontSize: 20, fontWeight: '900', lineHeight: 22 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(13,59,70,0.58)', justifyContent: 'flex-end' },
  selectSheet: { maxHeight: '78%', backgroundColor: COLORS.offWhite, borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden' },
  sheetHeader: { backgroundColor: COLORS.primary, padding: SPACING.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetTitle: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '900' },
  sheetClose: { color: COLORS.gold, fontSize: FONT_SIZES.sm, fontWeight: '900' },
  optionList: { padding: SPACING.lg, gap: SPACING.sm },
  optionRow: { minHeight: 48, borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.white, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: SPACING.md },
  optionRowActive: { borderColor: COLORS.gold, backgroundColor: 'rgba(201,161,90,0.18)' },
  optionText: { color: COLORS.gray900, fontSize: FONT_SIZES.sm, fontWeight: '900', textAlign: 'right' },
  optionTextActive: { color: COLORS.primary },
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
