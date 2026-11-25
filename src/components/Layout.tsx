import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, Mountain } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { FOUNDER } from '../data/founder';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="dtl-nav sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[var(--text-primary)] no-underline group"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-sm transition-transform group-hover:scale-105">
              <Mountain className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <span className="block font-[var(--font-display)] text-sm font-bold tracking-tight sm:text-base">
                Digital Trail Labs
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                digitaltraillabs.com
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              Applications
            </NavLink>
            <NavLink
              to="/apps/agentbridge-autonomous-hub"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              Autonomous Agents
            </NavLink>
            <NavLink
              to="/founder"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              Founder &amp; Resume
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/founder"
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] md:hidden"
            >
              Founder
            </Link>
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="dtl-surface-2 hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repositories"
              className="dtl-surface-2 hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="font-[var(--font-display)] text-base font-bold text-[var(--text-primary)]">
              Digital Trail Labs
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Founded by {FOUNDER.name} · {FOUNDER.location} · Enterprise IT Leadership &amp; Applied AI Studio
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${FOUNDER.email}`}
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              <Mail className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              {FOUNDER.email}
            </a>
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              <Linkedin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              <Github className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
