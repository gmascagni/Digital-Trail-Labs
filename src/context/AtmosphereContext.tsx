import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface StudioTheme {
  id: string;
  themeName: string;
  bgPrimary: string;
  bgElevated: string;
  surfaceGlass: string;
  accentPrimary: string;
  accentTelemetry: string;
  textMain: string;
  textSecondary: string;
  textMuted: string;
  shaderHueA: string;
  shaderHueB: string;
  shaderSpeed: number;
  poeticTagline: string;
  isLight?: boolean;
}

export const ATMOSPHERE_PRESETS: Record<string, StudioTheme> = {
  obsidian: {
    id: 'obsidian',
    themeName: 'Obsidian Lab',
    bgPrimary: '#08090C',
    bgElevated: '#161311',
    surfaceGlass: 'rgba(22, 19, 17, 0.72)',
    accentPrimary: '#F59E0B',
    accentTelemetry: '#22D3EE',
    textMain: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    shaderHueA: '#F59E0B',
    shaderHueB: '#22D3EE',
    shaderSpeed: 1.0,
    poeticTagline: 'Tactile consumer craft & autonomous AI telemetry forged in volcanic obsidian.',
    isLight: false,
  },
  roastery: {
    id: 'roastery',
    themeName: 'Roastery Amber',
    bgPrimary: '#0E0907',
    bgElevated: '#1C120D',
    surfaceGlass: 'rgba(28, 18, 13, 0.75)',
    accentPrimary: '#FB923C',
    accentTelemetry: '#FBBF24',
    textMain: '#FFFBEB',
    textSecondary: '#FDE68A',
    textMuted: '#D6BC9B',
    shaderHueA: '#EA580C',
    shaderHueB: '#FDE047',
    shaderSpeed: 1.25,
    poeticTagline: 'Thermal precision, golden crema thermodynamics, and warm bronze instrumentation.',
    isLight: false,
  },
  botanical: {
    id: 'botanical',
    themeName: 'Botanical Mist',
    bgPrimary: '#060E0C',
    bgElevated: '#0E1D19',
    surfaceGlass: 'rgba(14, 29, 25, 0.74)',
    accentPrimary: '#34D399',
    accentTelemetry: '#38BDF8',
    textMain: '#F0FDF4',
    textSecondary: '#CCFBF1',
    textMuted: '#86EFAC',
    shaderHueA: '#10B981',
    shaderHueB: '#38BDF8',
    shaderSpeed: 0.78,
    poeticTagline: 'High-mountain leaf infusion, calm cellular hydraulics, and living jade telemetry.',
    isLight: false,
  },
  daylight: {
    id: 'daylight',
    themeName: 'Alabaster Lab',
    bgPrimary: '#F8FAFC',
    bgElevated: '#FFFFFF',
    surfaceGlass: 'rgba(255, 255, 255, 0.82)',
    accentPrimary: '#B45309',
    accentTelemetry: '#0E7490',
    textMain: '#090D16',
    textSecondary: '#334155',
    textMuted: '#475569',
    shaderHueA: '#D97706',
    shaderHueB: '#0891B2',
    shaderSpeed: 0.9,
    poeticTagline: 'Architectural daylight clarity with precision bronze & cyan engineering indices.',
    isLight: true,
  },
};

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) return `rgba(245, 158, 11, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isLuminanceLight(hex: string): boolean {
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) return false;
  const r = Number.parseInt(clean.slice(0, 2), 16) / 255;
  const g = Number.parseInt(clean.slice(2, 4), 16) / 255;
  const b = Number.parseInt(clean.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.52;
}

interface AtmosphereContextValue {
  theme: StudioTheme;
  selectPreset: (presetId: keyof typeof ATMOSPHERE_PRESETS) => void;
  applyCustomTheme: (custom: {
    themeName: string;
    bgPrimary: string;
    accentPrimary: string;
    accentTelemetry: string;
    shaderSpeed: number;
    poeticTagline: string;
  }) => void;
  fps: number;
  setFps: (fps: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  conciergeOpen: boolean;
  setConciergeOpen: (open: boolean) => void;
  conciergeInitialTab: 'remix' | 'scope' | 'ask';
  openConcierge: (tab?: 'remix' | 'scope' | 'ask') => void;
}

const AtmosphereContext = createContext<AtmosphereContextValue | null>(null);

const THEME_STORAGE_KEY = 'dtl_studio_theme_v2';

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<StudioTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StudioTheme;
        if (parsed && parsed.bgPrimary && parsed.accentPrimary) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return ATMOSPHERE_PRESETS.obsidian;
  });

  const [fps, setFps] = useState<number>(60);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [conciergeOpen, setConciergeOpen] = useState<boolean>(false);
  const [conciergeInitialTab, setConciergeInitialTab] = useState<'remix' | 'scope' | 'ask'>('remix');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-elevated', theme.bgElevated);
    root.style.setProperty('--surface-glass', theme.surfaceGlass);
    root.style.setProperty('--accent-primary', theme.accentPrimary);
    root.style.setProperty('--accent-telemetry', theme.accentTelemetry);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--shader-hue-a', theme.shaderHueA);
    root.style.setProperty('--shader-hue-b', theme.shaderHueB);
    root.style.setProperty('--shader-speed', String(theme.shaderSpeed));
    root.style.setProperty('--accent-soft', hexToRgba(theme.accentPrimary, 0.14));
    root.style.setProperty('--telemetry-soft', hexToRgba(theme.accentTelemetry, 0.14));
    root.style.setProperty(
      '--border-specular',
      theme.isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(248, 250, 252, 0.11)',
    );
    root.style.setProperty(
      '--border-strong',
      theme.isLight ? 'rgba(15, 23, 42, 0.24)' : 'rgba(248, 250, 252, 0.22)',
    );

    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme.isLight ? 'light' : 'dark';
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
      localStorage.setItem('color-scheme', theme.isLight ? 'light' : 'dark');
    } catch {
      // Ignore storage restrictions
    }
  }, [theme]);

  const selectPreset = (presetId: keyof typeof ATMOSPHERE_PRESETS) => {
    const next = ATMOSPHERE_PRESETS[presetId];
    if (next) setTheme(next);
  };

  const applyCustomTheme = (custom: {
    themeName: string;
    bgPrimary: string;
    accentPrimary: string;
    accentTelemetry: string;
    shaderSpeed: number;
    poeticTagline: string;
  }) => {
    const light = isLuminanceLight(custom.bgPrimary);
    const next: StudioTheme = {
      id: 'custom',
      themeName: custom.themeName,
      bgPrimary: custom.bgPrimary,
      bgElevated: light ? '#FFFFFF' : hexToRgba(custom.bgPrimary, 0.94),
      surfaceGlass: light ? 'rgba(255, 255, 255, 0.82)' : 'rgba(18, 18, 24, 0.74)',
      accentPrimary: custom.accentPrimary,
      accentTelemetry: custom.accentTelemetry,
      textMain: light ? '#090D16' : '#F8FAFC',
      textSecondary: light ? '#334155' : '#CBD5E1',
      textMuted: light ? '#475569' : '#94A3B8',
      shaderHueA: custom.accentPrimary,
      shaderHueB: custom.accentTelemetry,
      shaderSpeed: Math.max(0.25, Math.min(2.8, Number(custom.shaderSpeed) || 1.0)),
      poeticTagline: custom.poeticTagline,
      isLight: light,
    };
    setTheme(next);
  };

  const openConcierge = (tab: 'remix' | 'scope' | 'ask' = 'remix') => {
    setConciergeInitialTab(tab);
    setConciergeOpen(true);
  };

  return (
    <AtmosphereContext.Provider
      value={{
        theme,
        selectPreset,
        applyCustomTheme,
        fps,
        setFps,
        soundEnabled,
        setSoundEnabled,
        conciergeOpen,
        setConciergeOpen,
        conciergeInitialTab,
        openConcierge,
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
