import React from 'react';
import { Linking, View } from 'react-native';
import { Field, Choice, ChoiceWrap } from './Controls';
import { CreateAdForm } from './data';

const cities = ['دمشق', 'ريف دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'إدلب', 'الرقة', 'دير الزور', 'الحسكة', 'درعا', 'السويداء', 'القنيطرة'];

type Props = {
  form: CreateAdForm;
  setField: (key: keyof CreateAdForm, value: string) => void;
};

export function LocationStep({ form, setField }: Props) {
  const openMap = () => {
    const query = `${form.city} ${form.neighborhood}`.trim();
    const url = form.mapUrl.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };

  return (
    <View>
      <ChoiceWrap>
        {cities.map(city => (
          <Choice key={city} label={city} active={form.city === city} onPress={() => setField('city', city)} />
        ))}
      </ChoiceWrap>
      <Field
        label="الحي أو العنوان التفصيلي"
        value={form.neighborhood}
        onChangeText={value => setField('neighborhood', value)}
        placeholder="مثال: المزة، قرب الجامعة"
      />
      <Field
        label="رابط الموقع على الخريطة"
        value={form.mapUrl}
        onChangeText={value => setField('mapUrl', value)}
        placeholder="الصق رابط Google Maps هنا"
      />
      <ChoiceWrap>
        <Choice label="فتح الموقع على الخريطة" active onPress={openMap} />
      </ChoiceWrap>
    </View>
  );
}
