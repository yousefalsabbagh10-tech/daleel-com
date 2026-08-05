import { AppState } from './types';
import { fallbackAds } from './fallbackAds';

export const initialState: AppState = {
  ads: fallbackAds,
  favorites: [],
  loading: false,
  error: null,
};
