import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Search,
  Sparkles,
} from 'lucide-react';
import { APP_CATEGORIES, APPS, type AppCategory } from '../data/apps';
import { FOUNDER } from '../data/founder';
import { AppIcon } from '../components/AppIcon';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | AppCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredApps = useMemo(() => APPS.filter((a) => a.featured), []);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return APPS.filter((app) => {
      const matchesCat = selectedCategory === 'All' || app.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        app.name.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.primaryStack.some((t) => t.toLowerCase().includes(q)) ||
        app.category.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      {/* Hero Section */}
      <section className="dtl-hero-grid relative overflow-hidden border-b border-[var(--border-subtle)]">
        {/* Subtle topographic contour motif */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 520"
          fill="none"
        >
          <path
            d="M-60 410C180 320 320 460 580 350C840 240 1040 370 1500 220"
            stroke="var(--topo-stroke)"
            strokeWidth="1.5"
          />
          <path
            d="M-60 350C210 250 360 390 620 280C880 170 1090 310 1500 150"
            stroke="var(--topo-stroke)"
            strokeWidth="1.5"
          />
          <path
            d="M-60 285C240 190 410 320 670 210C930 100 1130 240 1500 80"
            stroke="var(--topo-stroke)"
            strokeWidth="1.5"
          />
          <path
            d="M-60 470C150 390 310 510 560 420C820 320 1020 430 1500 300"
            stroke="var(--topo-stroke)"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-medium text-[var(--accent)] shadow-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Enterprise IT Leadership · AI-Native Product Studio</span>
            </div>

            <h1 className="mt-6 font-[var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Where Enterprise Scale Meets{' '}
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                AI-Native Execution.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
              <strong>Digital Trail Labs</strong> is the applied software and AI studio founded by{' '}
              <Link to="/founder" className="font-semibold text-[var(--accent)] hover:underline">
                Georgio Mascagni
              </Link>
              . We build production web, native mobile, air-gapped AI, and autonomous multi-agent
              systems—proving what modern AI-assisted engineering looks like beyond slide decks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#applications"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-500"
              >
                Explore {APPS.length} Applications
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/founder"
                className="dtl-surface inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
              >
                <Briefcase className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                Founder &amp; Executive Resume
              </Link>
            </div>
          </div>

          {/* Impact Metrics Strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FOUNDER.metrics.map((metric) => (
              <div key={metric.label} className="dtl-surface rounded-2xl p-5">
                <p className="font-[var(--font-display)] text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs font-medium text-[var(--text-muted)] sm:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autonomous Agents + Telegram Capability Callout */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="dtl-surface relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--emerald-soft)] px-3 py-1 text-xs font-semibold text-[var(--emerald)]">
                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Autonomous Multi-Agent Capability</span>
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-2xl font-bold text-[var(--text-primary)]">
                Autonomous AI Agent Swarms — Live on Telegram
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Beyond web and mobile software, Digital Trail Labs designs and deploys{' '}
                <strong>autonomous multi-agent systems</strong> you can message directly from{' '}
                <strong>Telegram</strong> (as well as WhatsApp, Web Chat, and CLI). Our{' '}
                <strong>AgentBridge</strong> architecture coordinates specialized agents—
                <em>Orion</em> (Coordinator), <em>Echo</em> (Researcher), and <em>Atlas</em>{' '}
                (Executor)—to automate research, task tracking, and operations right from your phone.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                to="/apps/agentbridge-autonomous-hub"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                View AgentBridge Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flagship Applications */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Flagship Engineering
            </p>
            <h2 className="mt-1 font-[var(--font-display)] text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Featured Applications &amp; Platforms
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            Click any application for its full architecture recap and live links.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {featuredApps.map((app) => (
            <article key={app.slug} className="dtl-card flex flex-col justify-between rounded-2xl p-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <AppIcon name={app.iconName} from={app.accentFrom} to={app.accentTo} />
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--accent)]">
                        {app.category}
                      </span>
                      <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
                        {app.name}
                      </h3>
                    </div>
                  </div>
                  <span className="dtl-surface-2 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                    {app.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {app.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {app.primaryStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="dtl-surface-2 rounded-md px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                <Link
                  to={`/apps/${app.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  Read App Recap
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {app.liveUrl && (
                  <a
                    href={app.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    Live App
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Complete Filterable Application Directory */}
      <section id="applications" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Complete Catalog
            </p>
            <h2 className="mt-1 font-[var(--font-display)] text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              All Digital Trail Labs Applications ({APPS.length})
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or stack..."
              aria-label="Filter applications"
              className="dtl-surface w-full rounded-xl py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Application categories">
          {APP_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'dtl-surface text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <article key={app.slug} className="dtl-card flex flex-col justify-between rounded-2xl p-5">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <AppIcon name={app.iconName} from={app.accentFrom} to={app.accentTo} size="sm" />
                  <span className="dtl-surface-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {app.status}
                  </span>
                </div>
                <h3 className="mt-4 font-[var(--font-display)] text-base font-bold text-[var(--text-primary)]">
                  <Link to={`/apps/${app.slug}`} className="hover:text-[var(--accent)]">
                    {app.name}
                  </Link>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {app.tagline}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {app.primaryStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="dtl-surface-2 rounded px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3.5">
                <Link
                  to={`/apps/${app.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  Application Page
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <div className="flex items-center gap-3">
                  {app.liveUrl && (
                    <a
                      href={app.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      Demo ↗
                    </a>
                  )}
                  {app.repoUrl && (
                    <a
                      href={app.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="dtl-surface mt-6 rounded-2xl p-10 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              No applications matched &ldquo;{searchQuery}&rdquo;. Try clearing your filter.
            </p>
          </div>
        )}
      </section>

      {/* Executive Bridge CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="dtl-surface rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                For Recruiters &amp; Hiring Leaders
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                Looking for an IT Director Who Actually Builds with AI?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Explore Georgio Mascagni’s full enterprise track record—leading global Salesforce CRM
                platforms for 7,500+ users at Equifax, transforming CI/CD pipelines, and championing
                Agentic AI adoption across the enterprise.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
              >
                View Founder &amp; Resume
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noreferrer"
                className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
              >
                Connect on LinkedIn
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
