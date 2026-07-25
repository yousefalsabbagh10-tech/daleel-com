import React from 'react';
import { View } from 'react-native';
import { Field, Choice, ChoiceWrap } from './Controls';
import { CreateAdForm } from './data';

type Props = {
  form: CreateAdForm;
  setField: (key: keyof CreateAdForm, value: string) => void;
};

const purposes = ['للبيع', 'للإيجار'];
const gears = ['أوتوماتيك', 'عادي'];
const fuels = ['بنزين', 'ديزل', 'كهرباء', 'هجين'];

export function DetailsStep({ form, setField }: Props) {
  const set = (key: keyof CreateAdForm) => (value: string) => setField(key, value);
  return (
    <View>
      <Field label="عنوان الإعلان" value={form.title} onChangeText={set('title')} placeholder="مثال: شقة مفروشة أو سيارة للبيع" />
      <Field label="وصف الإعلان" value={form.description} onChangeText={set('description')} placeholder="اكتب وصف واضح..." multiline />
      {form.category === 'cars' ? <CarFields form={form} setField={setField} /> : form.subcategory === 'مشاريع عقارية قيد التنفيذ'
        ? <ProjectFields form={form} setField={setField} />
        : <RealEstateFields form={form} setField={setField} />}
    </View>
  );
}

function RealEstateFields({ form, setField }: Props) {
  const set = (key: keyof CreateAdForm) => (value: string) => setField(key, value);
  return (
    <View>
      <ChoiceWrap>{purposes.map(v => <Choice key={v} label={v} active={form.reType === v} onPress={() => setField('reType', v)} />)}</ChoiceWrap>
      <Field label="عدد الغرف" value={form.rooms} onChangeText={set('rooms')} />
      <Field label="عدد الحمامات" value={form.baths} onChangeText={set('baths')} />
      <Field label="المساحة" value={form.area} onChangeText={set('area')} />
      <Field label="الطابق" value={form.floor} onChangeText={set('floor')} />
      <Field label="الفرش" value={form.furnished} onChangeText={set('furnished')} />
      <Field label="عمر البناء" value={form.age} onChangeText={set('age')} />
    </View>
  );
}

function CarFields({ form, setField }: Props) {
  const set = (key: keyof CreateAdForm) => (value: string) => setField(key, value);
  return (
    <View>
      <ChoiceWrap>{purposes.map(v => <Choice key={v} label={v} active={form.carType === v} onPress={() => setField('carType', v)} />)}</ChoiceWrap>
      <Field label="الماركة" value={form.carBrand} onChangeText={set('carBrand')} placeholder="مثال: تويوتا" />
      <Field label="الموديل" value={form.carModel} onChangeText={set('carModel')} placeholder="مثال: كورولا" />
      <Field label="سنة الصنع" value={form.carYear} onChangeText={set('carYear')} keyboardType="numeric" />
      <ChoiceWrap>{gears.map(v => <Choice key={v} label={v} active={form.carGear === v} onPress={() => setField('carGear', v)} />)}</ChoiceWrap>
      <ChoiceWrap>{fuels.map(v => <Choice key={v} label={v} active={form.carFuel === v} onPress={() => setField('carFuel', v)} />)}</ChoiceWrap>
      <Field label="الممشى بالكيلومتر" value={form.carMileage} onChangeText={set('carMileage')} keyboardType="numeric" />
      <Field label="نوع الهيكل" value={form.carBodyType} onChangeText={set('carBodyType')} placeholder="سيدان، SUV، بيك أب" />
      <Field label="الحالة" value={form.carCondition} onChangeText={set('carCondition')} />
      <Field label="اللون" value={form.carColor} onChangeText={set('carColor')} />
    </View>
  );
}

function ProjectFields({ form, setField }: Props) {
  const set = (key: keyof CreateAdForm) => (value: string) => setField(key, value);
  return (
    <View>
      <Field label="حالة المشروع" value={form.projectStatus} onChangeText={set('projectStatus')} />
      <Field label="سنة التسليم" value={form.deliveryYear} onChangeText={set('deliveryYear')} keyboardType="numeric" />
      <Field label="عدد الطوابق" value={form.projectFloors} onChangeText={set('projectFloors')} keyboardType="numeric" />
      <Field label="الإكساء" value={form.projectFinishing} onChangeText={set('projectFinishing')} />
      <Field label="مساحة الأرض" value={form.projectLandArea} onChangeText={set('projectLandArea')} keyboardType="numeric" />
      <Field label="عدد الوحدات" value={form.projectUnitsCount} onChangeText={set('projectUnitsCount')} keyboardType="numeric" />
    </View>
  );
}
