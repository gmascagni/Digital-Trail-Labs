import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Home,
  Layers,
  Lightbulb,
  Target,
} from 'lucide-react';
import { APPS, getAppBySlug } from '../data/apps';
import { AppIcon } from '../components/AppIcon';
import { GunniesSandboxCard } from '../components/GunniesSandboxCard';
import { GunniesWalkthroughCinema } from '../components/GunniesWalkthroughCinema';

export function AppDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? getAppBySlug(slug) : undefined;

  if (!app) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-[var(--text-primary)]">
          Application Not Found
        </h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          We couldn’t find that application in the Digital Trail Labs catalog.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to All Applications
        </Link>
      </div>
    );
  }

  const currentIndex = APPS.findIndex((a) => a.slug === app.slug);
  const prevApp = currentIndex > 0 ? APPS[currentIndex - 1] : APPS[APPS.length - 1];
  const nextApp = currentIndex < APPS.length - 1 ? APPS[currentIndex + 1] : APPS[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Top Bar: Breadcrumb + Home Button */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link to="/" className="inline-flex items-center gap-1 font-medium text-[var(--accent)] hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All Applications
          </Link>
          <span>/</span>
          <span className="hidden sm:inline">{app.category}</span>
          <span className="hidden sm:inline">/</span>
          <span className="truncate text-[var(--text-primary)]">{app.name}</span>
        </nav>

        <Link
          to="/"
          className="dtl-surface-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <Home className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
          Home
        </Link>
      </div>

      {/* App Header Card */}
      <section className="dtl-surface rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="flex items-start gap-4">
            <AppIcon name={app.iconName} from={app.accentFrom} to={app.accentTo} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {app.category}
                </span>
                <span className="dtl-surface-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                  {app.status}
                </span>
              </div>
              <h1 className="mt-2 font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {app.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                {app.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {app.liveUrl && (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-5 py-2.5 font-mono text-xs font-bold text-slate-950 shadow-xs transition-transform hover:scale-105"
            >
              Launch Live Application
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {app.repoUrl && (
            <a
              href={app.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View GitHub Repository
            </a>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-7 border-t border-[var(--border-subtle)] pt-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Core Technology Stack
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {app.primaryStack.map((tech) => (
              <span
                key={tech}
                className="dtl-surface-2 rounded-lg px-3 py-1 font-mono text-xs font-medium text-[var(--text-primary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gunnies Ballistics Showcase (Walkthrough Cinema + Live FFP Solver) */}
      {app.slug === 'gunnies-ballistics' && (
        <>
          <GunniesWalkthroughCinema />
          <div className="mt-8">
            <GunniesSandboxCard compact />
          </div>
        </>
      )}

      {/* Case Study Content Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="dtl-surface rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Layers className="h-4 w-4" aria-hidden="true" />
            <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
              Executive Recap
            </h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {app.executiveRecap}
          </p>
        </section>

        <section className="dtl-surface rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Target className="h-4 w-4" aria-hidden="true" />
            <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
              Problem Solved
            </h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {app.problemStatement}
          </p>
        </section>
      </div>

      {/* Architecture */}
      <section className="dtl-surface mt-6 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[var(--accent)]">
          <Cpu className="h-4 w-4" aria-hidden="true" />
          <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
            Architecture &amp; Engineering Approach
          </h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          {app.architectureSummary}
        </p>

        <h3 className="mt-6 font-[var(--font-display)] text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Key Capabilities &amp; Highlights
        </h3>
        <ul className="mt-3 space-y-2.5">
          {app.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emerald)]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Enterprise Takeaway */}
      <section className="mt-6 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
          <div>
            <h2 className="font-[var(--font-display)] text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
              Why This Matters for Enterprise Leadership
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-primary)]">
              {app.enterpriseTakeaway}
            </p>
          </div>
        </div>
      </section>

      {/* Prev / Home / Next Navigation */}
      <nav
        aria-label="Adjacent applications"
        className="mt-10 grid gap-4 border-t border-[var(--border-subtle)] pt-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
      >
        <Link
          to={`/apps/${prevApp.slug}`}
          className="dtl-card flex items-center gap-3 rounded-2xl p-4"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
          <div className="min-w-0">
            <span className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
              Previous App
            </span>
            <span className="block truncate font-[var(--font-display)] text-sm font-bold text-[var(--text-primary)]">
              {prevApp.name}
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="dtl-card inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
        >
          <Home className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          Home
        </Link>

        <Link
          to={`/apps/${nextApp.slug}`}
          className="dtl-card flex items-center justify-end gap-3 rounded-2xl p-4 text-right"
        >
          <div className="min-w-0">
            <span className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
              Next App
            </span>
            <span className="block truncate font-[var(--font-display)] text-sm font-bold text-[var(--text-primary)]">
              {nextApp.name}
            </span>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
