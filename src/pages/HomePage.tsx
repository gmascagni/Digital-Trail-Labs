import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Search,
} from 'lucide-react';
import { APP_CATEGORIES, APPS, type AppCategory } from '../data/apps';
import { FOUNDER } from '../data/founder';
import { BrewSandboxCard } from '../components/BrewSandboxCard';
import { LooseLeafSandboxCard } from '../components/LooseLeafSandboxCard';
import { GunniesSandboxCard } from '../components/GunniesSandboxCard';
import { TiltExperimentCard } from '../components/TiltExperimentCard';
import { AppIcon } from '../components/AppIcon';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | AppCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredPlatforms = useMemo(
    () =>
      APPS.filter((a) =>
        ['trailvault-enterprise', 'agentbridge-autonomous-hub', 'mtb-trail-status'].includes(
          a.slug,
        ),
      ),
    [],
  );

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
      {/* Clean Executive Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-specular)]">
        {/* Subtle topographic trail contour lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 520"
          fill="none"
        >
          <path
            d="M-60 400C200 310 360 440 620 340C880 240 1080 350 1500 210"
            stroke="var(--border-specular)"
            strokeWidth="1.25"
          />
          <path
            d="M-60 330C230 240 390 370 650 270C910 170 1110 290 1500 140"
            stroke="var(--border-specular)"
            strokeWidth="1.25"
          />
          <path
            d="M-60 260C260 175 430 300 690 200C950 100 1140 220 1500 75"
            stroke="var(--border-specular)"
            strokeWidth="1.25"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Digital Trail Labs · Software &amp; Applied AI Studio · Atlanta, GA
            </p>

            <h1 className="mt-4 font-[var(--font-grotesk)] text-4xl font-bold tracking-tight text-[var(--text-main)] sm:text-5xl lg:text-6xl">
              Enterprise IT Leadership Meets{' '}
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Hands-On AI Execution.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Founded by{' '}
              <Link
                to="/founder"
                className="font-semibold text-[var(--accent-primary)] hover:underline"
              >
                Georgio Mascagni
              </Link>
              , Digital Trail Labs pairs 25+ years of Fortune 500 platform leadership with 14+
              shipped web, native Android, air-gapped AI, and autonomous multi-agent applications.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#applications"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-sky-500"
              >
                Explore All {APPS.length} Applications
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <Link
                to="/founder"
                className="dtl-surface inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
              >
                <Briefcase className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                Founder &amp; Executive Resume
              </Link>
            </div>
          </div>

          {/* Executive Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FOUNDER.metrics.map((metric) => (
              <div key={metric.label} className="dtl-surface rounded-2xl p-5">
                <p className="font-[var(--font-grotesk)] text-2xl font-bold text-[var(--text-main)] sm:text-3xl">
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

      {/* Interactive Product Spotlights */}
      <section id="spotlights" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Interactive Product Previews
            </p>
            <h2 className="mt-1 font-[var(--font-grotesk)] text-2xl font-bold tracking-tight text-[var(--text-main)] sm:text-3xl">
              Flagship Applications
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            Try the interactive previews below or open any application page for its full technical
            recap and live link.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <BrewSandboxCard />
          <LooseLeafSandboxCard />
          <GunniesSandboxCard />
          {featuredPlatforms.map((exp, idx) => (
            <TiltExperimentCard key={exp.slug} app={exp} index={idx} />
          ))}
        </div>
      </section>

      {/* Autonomous Multi-Agent Telegram Capability */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="dtl-surface rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-telemetry)]">
                <Bot className="h-4 w-4" aria-hidden="true" />
                Autonomous Multi-Agent Systems
              </p>
              <h3 className="mt-2 font-[var(--font-grotesk)] text-2xl font-bold text-[var(--text-main)]">
                AI Agent Orchestration with Live Telegram Chat
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Beyond web and mobile applications, we design and deploy coordinated multi-agent
                systems connected directly to <strong>Telegram</strong>, WhatsApp, Web Chat, and CLI.
                Our <strong>AgentBridge</strong> platform pairs specialized Coordinator, Researcher,
                and Executor agents to automate research and operational tasks straight from mobile.
              </p>
            </div>
            <div className="flex shrink-0">
              <Link
                to="/apps/agentbridge-autonomous-hub"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                View AgentBridge Recap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Application Directory */}
      <section id="applications" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Portfolio Catalog
            </p>
            <h2 className="mt-1 font-[var(--font-grotesk)] text-2xl font-bold tracking-tight text-[var(--text-main)] sm:text-3xl">
              All Applications ({APPS.length})
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or stack..."
              aria-label="Filter applications"
              className="dtl-surface w-full rounded-xl py-2 pl-10 pr-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
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
                    ? 'bg-sky-600 text-white'
                    : 'dtl-surface text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 14-App Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <article
              key={app.slug}
              className="dtl-card flex flex-col justify-between rounded-2xl p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <AppIcon name={app.iconName} from={app.accentFrom} to={app.accentTo} size="sm" />
                  <span className="dtl-surface-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-muted)]">
                    {app.status}
                  </span>
                </div>
                <h3 className="mt-4 font-[var(--font-grotesk)] text-base font-bold text-[var(--text-main)]">
                  <Link to={`/apps/${app.slug}`} className="hover:text-[var(--accent-primary)]">
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

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border-specular)] pt-3.5">
                <Link
                  to={`/apps/${app.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                >
                  Application Recap
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <div className="flex items-center gap-3 text-xs">
                  {app.liveUrl && (
                    <a
                      href={app.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      Live ↗
                    </a>
                  )}
                  {app.repoUrl && (
                    <a
                      href={app.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Executive Leadership CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="dtl-surface rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                Leadership &amp; Background
              </p>
              <h2 className="mt-2 font-[var(--font-grotesk)] text-2xl font-bold text-[var(--text-main)] sm:text-3xl">
                Built by an IT Leader Who Delivers.
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Review Georgio Mascagni’s executive profile—governing 7,500+ global Salesforce users
                across 15 production orgs at Equifax, leading international DataOps &amp; CI/CD
                teams, and driving enterprise-wide Agentic AI adoption.
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
                className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                LinkedIn Profile
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
