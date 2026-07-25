import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = Ionicons as any;

const iconMap: Record<string, string> = {
  close: 'close',
  home: 'home',
  'home-outline': 'home-outline',
  business: 'business',
  'business-outline': 'business-outline',
  person: 'person',
  'person-outline': 'person-outline',
  'notifications-outline': 'notifications-outline',
  search: 'search',
  'close-circle': 'close-circle',
  'checkmark-circle-outline': 'checkmark-circle-outline',
  heart: 'heart',
  'heart-outline': 'heart-outline',
  'location-outline': 'location-outline',
  'image-outline': 'image-outline',
  'map-outline': 'map-outline',
  'shield-checkmark-outline': 'shield-checkmark-outline',
  'arrow-back': 'chevron-back',
  star: 'sparkles',
  'star-outline': 'sparkles-outline',
  'share-outline': 'share-social-outline',
  'call-outline': 'call-outline',
  'logo-whatsapp': 'logo-whatsapp',
  filter: 'options-outline',
  'trash-outline': 'trash-outline',
  add: 'add-circle-outline',
  calculator: 'calculator-outline',
  map: 'map-outline',
  list: 'list-outline',
  car: 'car',
  'car-outline': 'car-outline',
  'pricetag-outline': 'pricetag-outline',
  'key-outline': 'key-outline',
  'alert-circle-outline': 'alert-circle-outline',
  storefront: 'storefront-outline',
  'chevron-back': 'chevron-back',
  'chevron-forward': 'chevron-forward',
  'options-outline': 'options-outline',
  'add-circle': 'add-circle',
};

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export function NativeIcon({ name, size = 20, color = '#2B2B2B' }: Props) {
  return <Icon name={iconMap[name] || name || 'help-circle-outline'} size={size} color={color} />;
}

