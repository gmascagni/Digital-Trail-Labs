import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'color-scheme';

function getSystemScheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredScheme(): 'light' | 'dark' | null {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === 'light' || val === 'dark' ? val : null;
  } catch {
    return null;
  }
}

function applyMetaScheme(scheme: 'light' | 'dark' | null) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) {
    meta.content = scheme ?? 'light dark';
  }
}

export function ThemeToggle() {
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const next = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
        applyMetaScheme(next);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleToggle = () => {
    const system = getSystemScheme();
    const current = getStoredScheme() ?? system;
    const target: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';

    if (target === system) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage restrictions; still apply scheme to meta.
      }
      applyMetaScheme(null);
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, target);
      } catch {
        // Ignore storage restrictions; still apply scheme to meta.
      }
      applyMetaScheme(target);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="dtl-surface-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer"
      title="Toggle light or dark theme"
    >
      <span className="theme-toggle-to-light items-center gap-1.5 text-[var(--text-primary)]">
        <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
        <span className="sr-only">Switch to light theme</span>
        <span className="hidden sm:inline" aria-hidden="true">Light</span>
      </span>
      <span className="theme-toggle-to-dark items-center gap-1.5 text-[var(--text-primary)]">
        <Moon className="h-4 w-4 text-sky-500" aria-hidden="true" />
        <span className="sr-only">Switch to dark theme</span>
        <span className="hidden sm:inline" aria-hidden="true">Dark</span>
      </span>
    </button>
  );
}
