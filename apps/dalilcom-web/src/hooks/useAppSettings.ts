import { useEffect, useState } from 'react';

export type AppSettings = { carsEnabled: boolean; loaded: boolean };

const enabledSettings: AppSettings = { carsEnabled: true, loaded: true };

export function useAppSettings() {
  const [settings, setSettings] = useState(enabledSettings);

  const refresh = async () => {
    setSettings(enabledSettings);
  };

  useEffect(() => { refresh(); }, []);

  return { settings, refresh };
}
