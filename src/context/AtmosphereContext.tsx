import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface StudioTheme {
  id: 'dark' | 'light';
  isLight: boolean;
}

interface AtmosphereContextValue {
  theme: StudioTheme;
  toggleTheme: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

const AtmosphereContext = createContext<AtmosphereContextValue | null>(null);

const COLOR_SCHEME_KEY = 'color-scheme';

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLight] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(COLOR_SCHEME_KEY);
      if (saved === 'light') return true;
      if (saved === 'dark') return false;
    } catch {
      // Ignore storage restrictions
    }
    return false;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.style.setProperty('--bg-primary', '#F8FAFC');
      root.style.setProperty('--bg-elevated', '#FFFFFF');
      root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, 0.88)');
      root.style.setProperty('--accent-primary', '#0284C7');
      root.style.setProperty('--accent-telemetry', '#059669');
      root.style.setProperty('--text-main', '#0F172A');
      root.style.setProperty('--text-secondary', '#334155');
      root.style.setProperty('--text-muted', '#64748B');
      root.style.setProperty('--accent-soft', 'rgba(2, 132, 199, 0.1)');
      root.style.setProperty('--telemetry-soft', 'rgba(5, 150, 105, 0.1)');
      root.style.setProperty('--border-specular', '#E2E8F0');
      root.style.setProperty('--border-strong', '#CBD5E1');
    } else {
      root.style.setProperty('--bg-primary', '#0B1120');
      root.style.setProperty('--bg-elevated', '#111827');
      root.style.setProperty('--surface-glass', 'rgba(17, 24, 39, 0.84)');
      root.style.setProperty('--accent-primary', '#38BDF8');
      root.style.setProperty('--accent-telemetry', '#34D399');
      root.style.setProperty('--text-main', '#F8FAFC');
      root.style.setProperty('--text-secondary', '#CBD5E1');
      root.style.setProperty('--text-muted', '#94A3B8');
      root.style.setProperty('--accent-soft', 'rgba(56, 189, 248, 0.12)');
      root.style.setProperty('--telemetry-soft', 'rgba(52, 211, 153, 0.12)');
      root.style.setProperty('--border-specular', 'rgba(148, 163, 184, 0.16)');
      root.style.setProperty('--border-strong', 'rgba(148, 163, 184, 0.28)');
    }

    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (meta) {
      meta.content = isLight ? 'light' : 'dark';
    }
    try {
      localStorage.setItem(COLOR_SCHEME_KEY, isLight ? 'light' : 'dark');
    } catch {
      // Ignore storage restrictions
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight((prev) => !prev);

  return (
    <AtmosphereContext.Provider
      value={{
        theme: { id: isLight ? 'light' : 'dark', isLight },
        toggleTheme,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere(): AtmosphereContextValue {
  const ctx = useContext(AtmosphereContext);
  if (!ctx) {
    throw new Error('useAtmosphere must be used inside AtmosphereProvider');
  }
  return ctx;
}
