import { useCallback, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, Moon, Mountain, Sparkles, Sun } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import { FOUNDER } from '../data/founder';
import { CustomCursor } from './CustomCursor';
import { TrailGuideConcierge } from './TrailGuideConcierge';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, selectPreset, fps, openConcierge } = useAtmosphere();
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 512, y: 284 });

  const handleCoordinates = useCallback((x: number, y: number) => {
    setCoords({ x, y });
  }, []);

  const toggleLightDark = () => {
    selectPreset(theme.isLight ? 'obsidian' : 'daylight');
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Subtle Animated SVG Noise / Film-Grain Overlay */}
      <svg className="dtl-grain" aria-hidden="true">
        <filter id="dtlNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#dtlNoiseFilter)" />
      </svg>

      {/* Dynamic Cursor Radial Spotlight + Magnetic Contextual Cursor */}
      <div className="dtl-cursor-spotlight" aria-hidden="true" />
      <CustomCursor onCoordinates={handleCoordinates} />

      {/* Refractive Liquid Glass Navigation Bar */}
      <header className="dtl-nav sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="group flex items-center gap-2.5 text-[var(--text-main)] no-underline"
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-950 shadow-sm transition-transform group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, var(--accent-primary), var(--accent-telemetry))`,
                }}
              >
                <Mountain className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <span className="block font-[var(--font-display)] text-sm font-extrabold tracking-tight sm:text-base">
                  Digital Trail Labs
                </span>
                <span className="dtl-telemetry block text-[9px] text-[var(--text-muted)]">
                  DTL // v2.6
                </span>
              </div>
            </Link>

            {/* Live Viewport & Shader Telemetry Strip */}
            <div
              aria-hidden="true"
              className="hidden items-center gap-2.5 border-l border-[var(--border-specular)] pl-4 font-mono text-[10px] tracking-widest text-[var(--text-muted)] xl:flex"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-telemetry)]" />
              <span>
                XY {String(coords.x).padStart(4, '0')}:{String(coords.y).padStart(4, '0')}
              </span>
              <span>·</span>
              <span className="text-[var(--accent-telemetry)]">{fps} FPS</span>
              <span>·</span>
              <span className="uppercase">{theme.themeName}</span>
            </div>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`
              }
            >
              Lab Showcase
            </NavLink>
            <NavLink
              to="/apps/agentbridge-autonomous-hub"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`
              }
            >
              Autonomous Agents
            </NavLink>
            <NavLink
              to="/founder"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`
              }
            >
              Founder &amp; Resume
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-cursor="REMIX"
              onClick={() => openConcierge('remix')}
              className="dtl-surface-2 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 font-mono text-[11px] font-semibold text-[var(--accent-primary)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">AI CONCIERGE</span>
              <kbd className="hidden rounded border border-[var(--border-specular)] px-1 text-[9px] text-[var(--text-muted)] lg:inline">
                ⌘K
              </kbd>
            </button>

            <Link
              to="/founder"
              className="rounded-lg px-2 py-1.5 font-mono text-[11px] font-semibold text-[var(--accent-primary)] md:hidden"
            >
              FOUNDER
            </Link>

            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Georgio Mascagni on LinkedIn"
              className="dtl-surface-2 hidden h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:inline-flex"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={toggleLightDark}
              aria-label={theme.isLight ? 'Switch to Obsidian dark mode' : 'Switch to Alabaster light mode'}
              title={theme.isLight ? 'Switch to Obsidian dark mode' : 'Switch to Alabaster light mode'}
              className="dtl-surface-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              {theme.isLight ? (
                <Moon className="h-4 w-4 text-sky-700" aria-hidden="true" />
              ) : (
                <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      <footer className="relative z-10 mt-24 border-t border-[var(--border-specular)] bg-[var(--bg-elevated)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-[var(--font-display)] text-lg font-extrabold text-[var(--text-main)]">
                Digital Trail Labs
              </span>
              <span className="dtl-telemetry rounded-full border border-[var(--border-specular)] px-2.5 py-0.5 text-[10px] text-[var(--accent-telemetry)]">
                DTL // v2.6
              </span>
            </div>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
              Founded by {FOUNDER.name} · {FOUNDER.location} · Tactile Product Studio &amp; Enterprise AI Engineering
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${FOUNDER.email}`}
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Mail className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              {FOUNDER.email}
            </a>
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Linkedin className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Github className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <TrailGuideConcierge />
    </div>
  );
}
