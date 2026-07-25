import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import { AdItem, AppState, Category } from './types';
import { initialState } from './state';
import { FilterParams, getFilteredAds } from './filters';
import { mapAdFromApi } from './mappers';
import { listApi } from '../services/api';
import { api } from '../services/api';

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ADS'; payload: AdItem[] }
  | { type: 'ADD_AD'; payload: AdItem }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_FAVORITES'; payload: string[] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ADS':
      return { ...state, ads: action.payload, loading: false, error: null };
    case 'ADD_AD':
      return { ...state, ads: [action.payload, ...state.ads], loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    }
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  toggleFavorite: (id: string) => void;
  addAd: (payload: any) => Promise<AdItem>;
  getFilteredAds: (params: FilterParams) => AdItem[];
  refresh: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadAds = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await listApi<any>('/ads', { per_page: '200' });
      const items = data.map(mapAdFromApi);
      dispatch({ type: 'SET_ADS', payload: items });
    } catch (e: any) {
      dispatch({ type: 'SET_ERROR', payload: e.message || 'فشل تحميل الإعلانات' });
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  }, []);

  const refresh = useCallback(async () => {
    await loadAds();
  }, [loadAds]);

  const addAd = useCallback(async (payload: any) => {
    const created = await api.post<any>('/ads', payload);
    const item = mapAdFromApi(created);
    dispatch({ type: 'ADD_AD', payload: item });
    return item;
  }, []);

  const filtered = useCallback((params: FilterParams) => {
    return getFilteredAds(state.ads, params);
  }, [state.ads]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  return (
    <AppContext.Provider value={{ state, toggleFavorite, addAd, getFilteredAds: filtered, refresh }}>
      {children}
    </AppContext.Provider>
  );
}

export type { AdItem, Category };

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
