import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, Moon, Mountain, Sun } from 'lucide-react';
import { useAtmosphere } from '../context/AtmosphereContext';
import { FOUNDER } from '../data/founder';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useAtmosphere();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Clean Executive Header */}
      <header className="dtl-nav sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-[var(--text-main)] no-underline"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-xs transition-transform group-hover:scale-105">
              <Mountain className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-[var(--font-grotesk)] text-base font-bold tracking-tight sm:text-lg">
              Digital Trail Labs
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`
              }
            >
              Applications
            </NavLink>
            <NavLink
              to="/apps/agentbridge-autonomous-hub"
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
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
                `rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
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
            <Link
              to="/founder"
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--accent-primary)] md:hidden"
            >
              Founder
            </Link>

            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Georgio Mascagni on LinkedIn"
              className="dtl-surface-2 hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:inline-flex"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Georgio Mascagni on GitHub"
              className="dtl-surface-2 hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:inline-flex"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme.isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme.isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              className="dtl-surface-2 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              {theme.isLight ? (
                <>
                  <Moon className="h-4 w-4 text-sky-600" aria-hidden="true" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Light</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      <footer className="relative z-10 mt-24 border-t border-[var(--border-specular)] bg-[var(--bg-elevated)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="font-[var(--font-grotesk)] text-base font-bold text-[var(--text-main)]">
              Digital Trail Labs
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Founded by {FOUNDER.name} · {FOUNDER.location} · Enterprise IT Leadership &amp; Applied Software Studio
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${FOUNDER.email}`}
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Mail className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              {FOUNDER.email}
            </a>
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Linkedin className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Github className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
