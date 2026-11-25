import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
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
import { ATMOSPHERE_PRESETS, useAtmosphere } from '../context/AtmosphereContext';
import { HeroStage3D } from '../components/HeroStage3D';
import { BrewSandboxCard } from '../components/BrewSandboxCard';
import { LooseLeafSandboxCard } from '../components/LooseLeafSandboxCard';
import { GunniesSandboxCard } from '../components/GunniesSandboxCard';
import { TiltExperimentCard } from '../components/TiltExperimentCard';
import { AppIcon } from '../components/AppIcon';
import { playDetentClick } from '../utils/tactileAudio';

const ATMOSPHERE_ORDER: Array<{ id: keyof typeof ATMOSPHERE_PRESETS; label: string; dot: string }> = [
  { id: 'obsidian', label: 'Obsidian Lab', dot: '#F59E0B' },
  { id: 'roastery', label: 'Roastery Amber', dot: '#FB923C' },
  { id: 'botanical', label: 'Botanical Mist', dot: '#34D399' },
  { id: 'daylight', label: 'Alabaster Daylight', dot: '#0E7490' },
];

export function HomePage() {
  const { theme, selectPreset, openConcierge, fps, soundEnabled } = useAtmosphere();
  const [selectedCategory, setSelectedCategory] = useState<'All' | AppCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Magnetic CTA button offset
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const [ctaOffset, setCtaOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const labExperiments = useMemo(
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

  const handleMagneticMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ctaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.24;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.24;
    setCtaOffset({ x: dx, y: dy });
  };

  return (
    <div>
      {/* ====================================================================
          1. FULL-VIEWPORT (100VH) INTERACTIVE 3D GENERATIVE HERO STAGE
          ==================================================================== */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden border-b border-[var(--border-specular)]">
        <HeroStage3D />

        {/* Subtle radial readability vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: theme.isLight
              ? 'linear-gradient(90deg, rgba(248,250,252,0.92) 0%, rgba(248,250,252,0.62) 55%, rgba(248,250,252,0.2) 100%)'
              : 'linear-gradient(90deg, rgba(8,9,12,0.88) 0%, rgba(8,9,12,0.56) 55%, rgba(8,9,12,0.18) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
          {/* Telemetry Eyebrow */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="dtl-glass dtl-telemetry inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[var(--accent-telemetry)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-telemetry)] animate-pulse" />
              DTL // v2.6 · ATLANTA, GA · {fps} FPS · SHADER {theme.shaderSpeed.toFixed(2)}x
            </span>
          </div>

          {/* Monumental Tight-Tracked Display Headline with Staggered Character/Line Masks */}
          <h1
            className="mt-6 font-[var(--font-display)] font-extrabold tracking-[-0.04em] text-[var(--text-main)]"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)', lineHeight: 1.02 }}
          >
            <span className="dtl-mask-line">
              <span className="dtl-mask-word" style={{ animationDelay: '40ms' }}>
                TACTILE&nbsp;CRAFT.
              </span>
            </span>
            <span className="dtl-mask-line">
              <span
                className="dtl-mask-word bg-clip-text text-transparent"
                style={{
                  animationDelay: '150ms',
                  backgroundImage: `linear-gradient(95deg, var(--accent-primary), var(--accent-telemetry))`,
                }}
              >
                AUTONOMOUS
              </span>
            </span>
            <span className="dtl-mask-line">
              <span className="dtl-mask-word" style={{ animationDelay: '260ms' }}>
                TELEMETRY.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl font-[var(--font-grotesk)] text-base leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            {theme.poeticTagline} Founded by{' '}
            <Link
              to="/founder"
              className="font-semibold text-[var(--accent-primary)] underline decoration-[var(--accent-primary)]/40 underline-offset-4 hover:decoration-[var(--accent-primary)]"
            >
              Georgio Mascagni
            </Link>
            —bridging Fortune 500 platform governance with hyper-crafted consumer software and
            multi-agent AI systems.
          </p>

          {/* Magnetic CTA + TrailGuide Remix + Founder Resume */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              ref={ctaRef}
              href="#bento-lab"
              data-cursor="INSPECT"
              onPointerMove={handleMagneticMove}
              onPointerLeave={() => setCtaOffset({ x: 0, y: 0 })}
              style={{
                transform: `translate3d(${ctaOffset.x.toFixed(1)}px, ${ctaOffset.y.toFixed(1)}px, 0)`,
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-3.5 font-[var(--font-grotesk)] text-sm font-bold text-slate-950 shadow-[0_0_32px_-6px_var(--accent-primary)] transition-transform duration-150"
            >
              Explore the Lab
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              data-cursor="REMIX"
              onClick={() => openConcierge('remix')}
              className="dtl-glass inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs font-semibold text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)]"
            >
              <Sparkles className="h-4 w-4 text-[var(--accent-telemetry)]" aria-hidden="true" />
              REMIX STUDIO VIBE (⌘K)
            </button>

            <Link
              to="/founder"
              className="dtl-glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]"
            >
              <Briefcase className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
              EXECUTIVE RESUME
            </Link>
          </div>
        </div>

        {/* Bottom Dock inside Hero: Live Atmosphere Switcher Pill + Telemetry Readout */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 pb-20 sm:flex-row sm:items-center sm:px-6 sm:pb-10 sm:pr-44 lg:px-8 lg:pr-48">
          <div
            role="group"
            aria-label="Atmosphere lighting switcher"
            className="dtl-glass inline-flex flex-wrap items-center gap-1.5 rounded-full p-1.5"
          >
            <span className="dtl-telemetry px-2.5 text-[10px] text-[var(--text-muted)]">
              ATMOSPHERE
            </span>
            {ATMOSPHERE_ORDER.map((preset) => {
              const active = theme.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    selectPreset(preset.id);
                    playDetentClick(1.0, soundEnabled);
                  }}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold transition-all ${
                    active
                      ? 'bg-[var(--accent-primary)] text-slate-950 shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: active ? '#08090C' : preset.dot }}
                    aria-hidden="true"
                  />
                  {preset.label}
                </button>
              );
            })}
          </div>

          <span className="dtl-telemetry hidden text-[10px] text-[var(--text-muted)] lg:inline">
            WEBGL SHADER // LIQUID TOPOLOGY · SCROLL TO CALIBRATE
          </span>
        </div>
      </section>

      {/* ====================================================================
          2. CHOREOGRAPHED ASYMMETRICAL BENTO + LIVE INTERACTIVE SANDBOXES
          ==================================================================== */}
      <section id="bento-lab" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="dtl-telemetry text-[var(--accent-primary)]">
              SECTION 01 // INTERACTIVE PRODUCT SANDBOX
            </span>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-5xl">
              Crafted to Be Felt.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
            Every Digital Trail Labs product pairs physics-grounded math with tactile micro-UI.
            Test the live extraction &amp; infusion instruments directly inside the cards below.
          </p>
        </div>

        {/* Asymmetrical 12-Col Bento Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Card 1 (7 cols): The Brew App Interactive Dial + Wave Carafe */}
          <BrewSandboxCard />

          {/* Card 2 (5 cols): Loose-Leaf Thermal Slider + Liquor Chromaticity */}
          <LooseLeafSandboxCard />

          {/* Card 3 (12 cols): Gunnies Ballistics Live FFP Reticle & 3-Zone Solver */}
          <GunniesSandboxCard />

          {/* Row 3 (3 x 4 cols): 3D Perspective Tilt R&D & AI Experiments */}
          {labExperiments.map((exp, idx) => (
            <TiltExperimentCard key={exp.slug} app={exp} index={idx} />
          ))}
        </div>
      </section>

      {/* ====================================================================
          3. AUTONOMOUS TELEGRAM SWARM + EXECUTIVE TELEMETRY BAR
          ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FOUNDER.metrics.map((metric) => (
            <div key={metric.label} className="dtl-glass rounded-2xl p-5">
              <p className="font-[var(--font-display)] text-3xl font-extrabold text-[var(--accent-primary)] sm:text-4xl">
                {metric.value}
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="dtl-glass mt-6 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="dtl-telemetry inline-flex items-center gap-2 text-[var(--accent-telemetry)]">
                <Bot className="h-4 w-4" aria-hidden="true" />
                AGENTIC INFRASTRUCTURE // LIVE TELEGRAM ORCHESTRATION
              </span>
              <h3 className="mt-2 font-[var(--font-display)] text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Autonomous Multi-Agent Swarms on Telegram
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                We architect persistent autonomous agent hierarchies connected directly to{' '}
                <strong>Telegram</strong>, WhatsApp, Web Chat, and CLI. Our{' '}
                <strong>AgentBridge</strong> swarm coordinates <em>Orion</em> (Coordinator),{' '}
                <em>Echo</em> (Researcher), and <em>Atlas</em> (Executor) so teams can dispatch deep
                research and operational workflows straight from their phone.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/apps/agentbridge-autonomous-hub"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-telemetry)] px-5 py-3 font-mono text-xs font-bold text-slate-950 transition-transform hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                INSPECT AGENTBRIDGE
              </Link>
              <button
                type="button"
                onClick={() => openConcierge('scope')}
                className="dtl-surface-2 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 font-mono text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                SCOPE AN AGENT SWARM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. COMPLETE STUDIO APPLICATION ARCHIVE (ALL 14 LIVE APPS & DOSSIERS)
          ==================================================================== */}
      <section id="applications" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="dtl-telemetry text-[var(--accent-primary)]">
              SECTION 02 // COMPLETE PRODUCTION INDEX
            </span>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-4xl">
              All Studio Applications ({APPS.length})
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
              placeholder="Filter apps or stack..."
              aria-label="Filter studio applications"
              className="dtl-surface w-full rounded-full py-2.5 pl-10 pr-4 font-mono text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Application categories">
          {APP_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[var(--accent-primary)] text-slate-950'
                    : 'dtl-surface text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 14-App Grid */}
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <article
              key={app.slug}
              data-cursor="INSPECT"
              className="dtl-card flex flex-col justify-between rounded-2xl p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <AppIcon name={app.iconName} from={app.accentFrom} to={app.accentTo} size="sm" />
                  <span className="dtl-surface-2 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    {app.status}
                  </span>
                </div>
                <h3 className="mt-4 font-[var(--font-display)] text-lg font-bold text-[var(--text-main)]">
                  <Link to={`/apps/${app.slug}`} className="hover:text-[var(--accent-primary)]">
                    {app.name}
                  </Link>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {app.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
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
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                >
                  APP RECAP
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  {app.liveUrl && (
                    <a
                      href={app.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      LIVE ↗
                    </a>
                  )}
                  {app.repoUrl && (
                    <a
                      href={app.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      CODE ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. EXECUTIVE LEADERSHIP & RECRUITER BRIDGE
          ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="dtl-glass rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="dtl-telemetry text-[var(--accent-primary)]">
                FOUNDER // ENTERPRISE IT &amp; AI LEADERSHIP
              </span>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl font-extrabold text-[var(--text-main)] sm:text-4xl">
                Built by an Executive Who Ships.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Review Georgio Mascagni’s full executive track record—governing 7,500+ global
                Salesforce users across 15 production orgs at Equifax, leading international DataOps
                &amp; CI/CD engineering teams, and driving enterprise-wide Agentic AI adoption.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-3.5 font-mono text-xs font-bold text-slate-950 transition-transform hover:scale-105"
              >
                VIEW FOUNDER &amp; RESUME
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noreferrer"
                className="dtl-surface-2 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                LINKEDIN PROFILE
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
