import { useEffect, useState } from 'react';
import { api, listApi } from '../lib/api';

export type AppSettings = { carsEnabled: boolean; loaded: boolean };

const defaults: AppSettings = { carsEnabled: false, loaded: false };

export function useAppSettings() {
  const [settings, setSettings] = useState(defaults);

  const refresh = async () => {
    const rows = await listApi<any>('/app-settings?per_page=50').catch(() => []);
    const map = Object.fromEntries(rows.map(row => [row.setting_key, row.setting_value]));
    setSettings({ carsEnabled: map.cars_enabled !== '0', loaded: true });
  };

  const updateCarsEnabled = async (enabled: boolean) => {
    await api.put('/app-settings/cars_enabled', {
      setting_key: 'cars_enabled',
      setting_value: enabled ? '1' : '0',
    });
    setSettings({ carsEnabled: enabled, loaded: true });
  };

  useEffect(() => { refresh(); }, []);

  return { settings, refresh, updateCarsEnabled };
}
