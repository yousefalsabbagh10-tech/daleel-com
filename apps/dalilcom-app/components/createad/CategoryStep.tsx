import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeIcon } from '../common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/theme';
import { Choice, ChoiceWrap } from './Controls';
import { CreateAdForm, presetImages, subcategories } from './data';

type Props = {
  form: CreateAdForm;
  setField: (key: keyof CreateAdForm, value: any) => void;
};

export function CategoryStep({ form, setField }: Props) {
  const activeCategory = form.category as 'real-estate' | 'cars';
  const pickCategory = (category: 'real-estate' | 'cars') => {
    setField('category', category);
    setField('subcategory', subcategories[category][0]);
    setField('imageUrl', presetImages[category]);
    setField('images', [presetImages[category]]);
  };

  return (
    <View>
      <Text style={styles.title}>اختر نوع وتصنيف الإعلان</Text>
      <View style={styles.cards}>
        <Choice label="قسم العقارات والمباني" active={form.category === 'real-estate'} onPress={() => pickCategory('real-estate')}>
          <NativeIcon name="business" size={28} color={form.category === 'real-estate' ? COLORS.white : COLORS.primary} />
        </Choice>
        <Choice label="قسم السيارات والمركبات" active={form.category === 'cars'} onPress={() => pickCategory('cars')}>
          <NativeIcon name="car" size={28} color={form.category === 'cars' ? COLORS.white : COLORS.primary} />
        </Choice>
      </View>
      <Text style={styles.subTitle}>القسم الفرعي المحدد:</Text>
      <ChoiceWrap>
        {subcategories[activeCategory].map((item: string) => (
          <Choice
            key={item}
            label={item}
            active={form.subcategory === item}
            onPress={() => {
              setField('subcategory', item);
              if (form.category === 'cars') setField('carType', item.includes('إيجار') ? 'للإيجار' : 'للبيع');
            }}
          />
        ))}
      </ChoiceWrap>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: COLORS.gray900, fontSize: FONT_SIZES.lg, fontWeight: '900', textAlign: 'center', marginBottom: SPACING.md },
  cards: { gap: SPACING.md, marginBottom: SPACING.lg },
  subTitle: { color: COLORS.gray900, fontSize: FONT_SIZES.sm, fontWeight: '900', textAlign: 'right', marginBottom: SPACING.sm },
});
