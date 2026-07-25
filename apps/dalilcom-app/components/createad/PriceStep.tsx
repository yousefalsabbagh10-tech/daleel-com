import React from 'react';
import { View } from 'react-native';
import { Field, Choice, ChoiceWrap } from './Controls';
import { CreateAdForm } from './data';

const currencies = ['ل.س', 'دولار'];

type Props = {
  form: CreateAdForm;
  setField: (key: keyof CreateAdForm, value: string) => void;
};

export function PriceStep({ form, setField }: Props) {
  return (
    <View>
      <ChoiceWrap>
        {currencies.map(currency => (
          <Choice
            key={currency}
            label={currency}
            active={form.currency === currency}
            onPress={() => setField('currency', currency)}
          />
        ))}
      </ChoiceWrap>
      <Field
        label="السعر المطلوب النهائي"
        value={form.price}
        onChangeText={value => setField('price', value)}
        placeholder="50000"
        keyboardType="numeric"
      />
      <Field
        label="رقم هاتف المعلن للتواصل"
        value={form.ownerPhone}
        onChangeText={value => setField('ownerPhone', value)}
        placeholder="09xxxxxxxx"
        keyboardType="phone-pad"
      />
      <Field
        label="رقم واتساب للتواصل"
        value={form.whatsappPhone}
        onChangeText={value => setField('whatsappPhone', value)}
        placeholder="963xxxxxxxxx"
        keyboardType="phone-pad"
      />
    </View>
  );
}
